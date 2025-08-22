"""Utility functions that wrap OpenAI endpoints for moderation & chat.

All OpenAI calls are async to avoid blocking the FastAPI threadpool.  A simple
heuristic is used to compute a *confidence* score combining retrieval
similarity with the model's own response tokens (e.g., logit bias not
available, so we approximate via retrieval similarity passed in).
"""

from __future__ import annotations

import asyncio
import logging
from typing import Tuple, AsyncGenerator, List, Optional

import openai
from openai import AsyncOpenAI

from backend.config import get_settings
from backend.models import Message

# ---------------------------------------------------------------------------
# Initialise global OpenAI client once; key provided via env var
# ---------------------------------------------------------------------------
settings = get_settings()
_client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

# ---------------------------------------------------------------------------
# System prompt used by GPT‑5‑mini for the Islamic Q&A Mentor MVP
# ---------------------------------------------------------------------------
SYSTEM_PROMPT = """You are Yaseen, an AI Islamic scholar assistant for Islamic Q&A.

MISSION: Provide accurate Islamic answers using Qur'an, authentic hadith, and vetted fatawa sources.

CITATION RULES:
1. Always cite sources using formats: 'Q 2:255' or 'Sahih Bukhari 1:2:13' 
2. Quote relevant ayah and hadith when applicable
3. Never fabricate references or go beyond retrieved context
4. If uncertain, say: "I'm not certain; please consult a qualified scholar"

RESPONSE FORMAT:
- Keep answers concise (150-200 words) and conversational
- Include juristic differences when relevant (madhahib)
- Be empathetic, especially to new Muslims
- Match user's tone and formality

SAFETY:
- Decline non-Islamic topics politely
- Avoid personal medical/legal/life-threatening fatwas
- Refer complex matters to qualified human scholars"""

logger = logging.getLogger(__name__)


async def moderate(text: str) -> bool:
    """Return *True* if content is flagged by OpenAI moderation endpoint."""
    if not settings.MODERATION_ENABLED:
        return False

    try:
        response = await _client.moderations.create(model="text-moderation-latest", input=text)
        return response.results[0].flagged  # type: ignore[attr-defined]
    except Exception as exc:  # noqa: BLE001
        logger.warning("OpenAI moderation failed: %s", exc)
        # Fail open (i.e., *not* flagged) to avoid blocking on errors
        return False


async def chat(
    context: list[str], 
    user_query: str, 
    conversation_history: Optional[List[Message]] = None,
    max_retries: int = 2
) -> Tuple[str, float]:
    """Call GPT‑5‑mini with context and user query, with fallback to gpt-4o-mini.
    
    Includes retry logic and response validation.

    Returns a tuple of (answer, model_confidence) where model_confidence is a
    naive proxy currently fixed to 0.9. This can be refined when the API
    exposes token‑level probabilities.
    """
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "system", "content": "\n".join(context)},
        {"role": "user", "content": user_query},
    ]

    for attempt in range(max_retries + 1):
        try:
            # Try GPT-5-mini first
            try:
                logger.info(f"Attempting GPT-5-mini API call (attempt {attempt + 1})")
                logger.info(f"OpenAI API Key configured: {'Yes' if settings.OPENAI_API_KEY else 'No'}")
                logger.info(f"API Key starts with: {settings.OPENAI_API_KEY[:10]}..." if settings.OPENAI_API_KEY else "No API key")
                response = await _client.chat.completions.create(
                    model="gpt-5-mini",  # Using GPT‑5‑mini model for fast reasoning and lower cost
                    messages=messages,
                    max_completion_tokens=2048,  # Increased from 512 to 2048 for proper response generation
                )
                logger.info("GPT-5-mini call successful")
            except Exception as gpt5_error:
                logger.error(f"GPT-5-mini failed with detailed error: {type(gpt5_error).__name__}: {str(gpt5_error)}")
                logger.error(f"GPT-5-mini error details: {getattr(gpt5_error, 'response', 'No response details')}")
                logger.warning(f"Falling back to gpt-4o-mini...")
                try:
                    response = await _client.chat.completions.create(
                        model="gpt-4o-mini",  # Fallback model
                        messages=messages,
                        max_tokens=2048,  # gpt-4o-mini uses max_tokens instead of max_completion_tokens
                    )
                    logger.info("Fallback to gpt-4o-mini successful")
                except Exception as fallback_error:
                    logger.error(f"gpt-4o-mini also failed: {type(fallback_error).__name__}: {str(fallback_error)}")
                    logger.error(f"gpt-4o-mini error details: {getattr(fallback_error, 'response', 'No response details')}")
                    raise fallback_error
            
            # Extract and validate response
            answer, confidence = _extract_and_validate_response(response)
            
            # If we got a valid response, return it
            if _is_valid_response(answer):
                logger.info(f"Valid response received on attempt {attempt + 1}")
                return answer, confidence
            else:
                logger.warning(f"Invalid response on attempt {attempt + 1}: {answer[:100]}")
                if attempt == max_retries:
                    # Last attempt, return what we have
                    return answer, confidence
                # Otherwise, retry
                await asyncio.sleep(1)  # Brief delay before retry
                
        except Exception as api_error:
            logger.error(f"API error on attempt {attempt + 1}: {api_error}")
            if attempt == max_retries:
                # Last attempt, raise the error
                raise api_error
            # Otherwise, retry after a delay
            await asyncio.sleep(2 ** attempt)  # Exponential backoff


def _extract_and_validate_response(response) -> Tuple[str, float]:
    """Extract and validate response content from OpenAI API response."""
    try:
        choice = response.choices[0]
        content = getattr(choice, "message").content
        finish_reason = choice.finish_reason

        logger.info(f"Response finish_reason: {finish_reason}")
        
        if isinstance(content, str):
            answer = content.strip()
            logger.info(f"Extracted string content, length: {len(answer)}")
        else:
            text_segments = []
            try:
                for part in content or []:  # type: ignore[operator]
                    text_value = getattr(part, "text", None)
                    if not text_value and isinstance(part, dict):
                        text_value = part.get("text") or part.get("content")
                    if isinstance(text_value, str) and text_value.strip():
                        text_segments.append(text_value.strip())
            except Exception as segment_error:
                logger.warning(f"Error processing content segments: {segment_error}")
                text_segments = [str(content)]

            answer = "\n".join(text_segments).strip()
            logger.info(f"Processed content segments, final length: {len(answer)}")

        # Log token usage if available
        if hasattr(response, 'usage') and response.usage:
            usage = response.usage
            logger.info(f"Token usage - Prompt: {usage.prompt_tokens}, "
                       f"Completion: {usage.completion_tokens}, Total: {usage.total_tokens}")

        # Check for empty responses and provide helpful fallback
        if not answer:
            logger.warning("Empty response received from LLM")
            if finish_reason == "length":
                answer = "The response was too long. Please try asking a more specific question."
            else:
                answer = "I wasn't able to generate a response. Please try rephrasing your question."
        
        model_confidence: float = 0.9
        return answer, model_confidence
        
    except Exception as extraction_error:
        logger.error(f"Error extracting content from LLM response: {extraction_error}")
        return "I encountered an error processing the response. Please try again.", 0.0


def _is_valid_response(answer: str) -> bool:
    """Validate that the response is meaningful and not just an error message."""
    if not answer or len(answer.strip()) < 10:
        return False
    
    # Check for common error patterns
    error_patterns = [
        "I wasn't able to generate",
        "I encountered an error",
        "Please try again",
        "The response was too long"
    ]
    
    for pattern in error_patterns:
        if pattern.lower() in answer.lower():
            return False
    
    return True


async def chat_stream(context: list[str], user_query: str) -> AsyncGenerator[str, None]:
    """Stream GPT responses for better user experience.
    
    Yields chunks of the response as they are generated.
    Falls back to gpt-4o-mini if gpt-5-mini fails.
    """
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "system", "content": "\n".join(context)},
        {"role": "user", "content": user_query},
    ]

    # Try GPT-5-mini first
    try:
        logger.info("Attempting GPT-5-mini streaming API call")
        stream = await _client.chat.completions.create(
            model="gpt-5-mini",
            messages=messages,
            max_completion_tokens=2048,
            stream=True,
        )
        logger.info("GPT-5-mini streaming call initiated")
    except Exception as gpt5_error:
        logger.error(f"GPT-5-mini streaming failed: {type(gpt5_error).__name__}: {str(gpt5_error)}")
        logger.error(f"GPT-5-mini streaming error details: {getattr(gpt5_error, 'response', 'No response details')}")
        logger.warning(f"Falling back to gpt-4o-mini...")
        try:
            stream = await _client.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages,
                max_tokens=2048,
                stream=True,
            )
            logger.info("Fallback to gpt-4o-mini streaming successful")
        except Exception as fallback_error:
            logger.error(f"gpt-4o-mini streaming also failed: {type(fallback_error).__name__}: {str(fallback_error)}")
            logger.error(f"gpt-4o-mini streaming error details: {getattr(fallback_error, 'response', 'No response details')}")
            yield "I encountered an error. Please try again."
            return

    try:
        async for chunk in stream:
            if chunk.choices and len(chunk.choices) > 0:
                delta = chunk.choices[0].delta
                if hasattr(delta, 'content') and delta.content:
                    yield delta.content
    except Exception as stream_error:
        logger.error(f"Error during streaming: {stream_error}")
        yield "I encountered an error while streaming the response."

