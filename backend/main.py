"""FastAPI entrypoint for the Yaseen backend."""

from __future__ import annotations

import asyncio
import re
import logging
import json
from typing import List, Dict, Any, Optional

from fastapi import FastAPI, HTTPException, Body, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from starlette.status import HTTP_400_BAD_REQUEST, HTTP_429_TOO_MANY_REQUESTS

from backend.config import get_settings
from backend.llm import chat, moderate, chat_stream
from backend.models import ChatRequest, ChatResponse, Citation
from backend.retrieval import retrieve_context

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

settings = get_settings()

app = FastAPI(debug=settings.FASTAPI_DEBUG, title="Yaseen API")

# For development use
# Note: Cannot use allow_origins=["*"] with allow_credentials=True
# The browser will reject this combination for security reasons
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # Include Vite dev server origin for CORS
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
    expose_headers=["*"],  # Expose headers for streaming responses
)

# ---------------------------------------------------------------------------
# Helper functions
# ---------------------------------------------------------------------------

_CITATION_RE = re.compile(r"\[\[(Q\s\d+:\d+|Bukhari[^\]]+|Muslim[^\]]+)\]\]")

def _extract_citations(text: str) -> List[Citation]:
    """Parse `[[Q 2:255]]` or `[[Bukhari 1/2]]` patterns into Citation objects."""

    matches = _CITATION_RE.findall(text)
    citations: List[Citation] = []
    for m in matches:
        if m.startswith("Q"):
            citations.append(Citation(type="quran", ref=m.split()[1]))
        else:
            citations.append(Citation(type="hadith", ref=m.strip()))
    return citations


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------


@app.post("/chat")
async def chat_endpoint(request: Request) -> ChatResponse:
    """Main chat completion endpoint used by the front-end."""
    
    # Get the raw request body for debugging
    try:
        body_raw = await request.body()
        logger.info(f"Raw request body: {body_raw}")
        
        # Try to parse as JSON
        try:
            body = json.loads(body_raw)
            logger.info(f"Parsed body: {body}")
        except json.JSONDecodeError:
            logger.error("Failed to parse request body as JSON")
            body = {}
    except Exception as e:
        logger.error(f"Error reading request body: {str(e)}")
        body = {}
    
    # Handle both direct ChatRequest and Vercel AI SDK format
    query = ""
    
    if "query" in body:
        # Standard request using our ChatRequest model
        query = body["query"]
        logger.info(f"Found query in body: {query}")
    elif "messages" in body:
        # Vercel AI SDK format
        messages = body["messages"]
        logger.info(f"Found messages in body: {messages}")
        if messages and len(messages) > 0:
            # Get the last user message
            for message in reversed(messages):
                if message.get("role") == "user":
                    query = message.get("content", "")
                    logger.info(f"Extracted query from messages: {query}")
                    break

    if not query or len(query.strip()) < 3:
        detail = "No valid query provided in request or query too short (min 3 characters)"
        logger.error(detail)
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail=detail,
        )

    logger.info(f"Processing chat request with query: '{query}'")

    # 1️⃣ Safety: moderation check
    if await moderate(query):
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail="Your question violates content policy. Please rephrase.",
        )

    # 2️⃣ Retrieve knowledge context
    try:
        context_chunks, sim_score = await retrieve_context(query)
    except Exception as e:
        logger.error(f"Error retrieving context: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error retrieving context: {str(e)}",
        )

    # 3️⃣ Fallback when low similarity
    if sim_score < settings.CONFIDENCE_THRESHOLD:
        return ChatResponse(
            answer="I'm not sure about that. It may be best to consult a qualified scholar.",
            citations=[],
            confidence=sim_score,
        )

    # 4️⃣ Generate answer from LLM
    try:
        answer, model_conf = await chat(context_chunks, query)
    except Exception as e:
        logger.error(f"Error generating answer: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error generating answer: {str(e)}",
        )

    # 5️⃣ Extract citations from answer text
    citations = _extract_citations(answer)

    # 6️⃣ Combine confidences (simple average for MVP)
    overall_conf = (sim_score + model_conf) / 2

    response = ChatResponse(answer=answer, citations=citations, confidence=overall_conf)
    logger.info(f"Returning response: {response}")
    return response


@app.post("/chat/stream")
async def chat_stream_endpoint(request: Request) -> StreamingResponse:
    """Streaming chat completion endpoint for real-time responses."""
    
    # Get the raw request body for debugging
    try:
        body_raw = await request.body()
        logger.info(f"Streaming request - Raw body: {body_raw}")
        
        # Try to parse as JSON
        try:
            body = json.loads(body_raw)
            logger.info(f"Streaming request - Parsed body: {body}")
        except json.JSONDecodeError:
            logger.error("Failed to parse streaming request body as JSON")
            body = {}
    except Exception as e:
        logger.error(f"Error reading streaming request body: {str(e)}")
        body = {}
    
    # Handle both direct ChatRequest and Vercel AI SDK format
    query = ""
    
    if "query" in body:
        # Standard request using our ChatRequest model
        query = body["query"]
        logger.info(f"Streaming - Found query in body: {query}")
    elif "messages" in body:
        # Vercel AI SDK format
        messages = body["messages"]
        logger.info(f"Streaming - Found messages in body: {messages}")
        if messages and len(messages) > 0:
            # Get the last user message
            for message in reversed(messages):
                if message.get("role") == "user":
                    query = message.get("content", "")
                    logger.info(f"Streaming - Extracted query from messages: {query}")
                    break

    if not query or len(query.strip()) < 3:
        detail = "No valid query provided in streaming request or query too short (min 3 characters)"
        logger.error(detail)
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail=detail,
        )

    logger.info(f"Processing streaming chat request with query: '{query}'")

    # 1️⃣ Safety: moderation check
    if await moderate(query):
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail="Your question violates content policy. Please rephrase.",
        )

    # 2️⃣ Retrieve knowledge context
    try:
        context_chunks, sim_score = await retrieve_context(query)
    except Exception as e:
        logger.error(f"Error retrieving context for streaming: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error retrieving context: {str(e)}",
        )

    # 3️⃣ Handle low similarity case
    if sim_score < settings.CONFIDENCE_THRESHOLD:
        async def low_confidence_response():
            yield "data: I'm not sure about that. It may be best to consult a qualified scholar.\n\n"
            yield "data: [DONE]\n\n"
        
        return StreamingResponse(
            low_confidence_response(),
            media_type="text/plain",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "*",
            }
        )

    # 4️⃣ Stream the response
    async def generate_stream():
        """Generate Server-Sent Events formatted stream."""
        try:
            logger.info("Starting streaming response generation")
            async for chunk in chat_stream(context_chunks, query):
                if chunk:
                    # Format as Server-Sent Events
                    yield f"data: {chunk}\n\n"
            
            # Send completion signal
            yield "data: [DONE]\n\n"
            logger.info("Streaming response completed successfully")
            
        except Exception as e:
            logger.error(f"Error during streaming generation: {str(e)}")
            yield f"data: I encountered an error while generating the response. Please try again.\n\n"
            yield "data: [DONE]\n\n"

    return StreamingResponse(
        generate_stream(),
        media_type="text/plain",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "*",
        }
    )


@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring and load balancers."""
    return {"status": "healthy", "version": "1.0.0"}


@app.get("/")
async def api_info():
    """API information and available endpoints."""
    return {
        "name": "Yaseen API",
        "version": "1.0.0",
        "endpoints": {
            "/chat": "Standard chat completion endpoint",
            "/chat/stream": "Streaming chat completion endpoint (SSE format)",
            "/health": "Health check endpoint"
        },
        "streaming": {
            "format": "Server-Sent Events (SSE)",
            "example": "data: response chunk\\n\\n",
            "completion_signal": "data: [DONE]\\n\\n"
        }
    }