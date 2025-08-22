#!/usr/bin/env python3
"""
Test the fixed LLM implementation to ensure all issues are resolved.
"""

import asyncio
import sys
from pathlib import Path

# Add the backend directory to Python path
sys.path.insert(0, str(Path(__file__).parent))

from openai import AsyncOpenAI
from config import get_settings

# Test the optimized system prompt
SYSTEM_PROMPT_OPTIMIZED = """You are Yaseen, an AI Islamic scholar assistant for Islamic Q&A.

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

async def test_fixed_implementation():
    """Test the fixed LLM implementation with the optimized prompt and increased tokens."""
    settings = get_settings()
    client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
    
    test_cases = [
        {
            "name": "Basic Islamic question",
            "context": ["Islam is a monotheistic religion founded by Prophet Muhammad."],
            "query": "What is Islam?"
        },
        {
            "name": "Complex theological question", 
            "context": ["The five pillars of Islam are fundamental acts of worship."],
            "query": "Can you explain the five pillars of Islam?"
        },
        {
            "name": "Question with context",
            "context": [
                "Hadith from Sahih Bukhari: The Prophet said 'Actions are judged by intentions'",
                "Quran 2:255: Allah - there is no deity except Him, the Ever-Living, the Sustainer"
            ],
            "query": "What does Islam say about intentions in worship?"
        }
    ]
    
    for test_case in test_cases:
        print(f"\n=== {test_case['name']} ===")
        print(f"Query: {test_case['query']}")
        print(f"Context: {test_case['context']}")
        
        messages = [
            {"role": "system", "content": SYSTEM_PROMPT_OPTIMIZED},
            {"role": "system", "content": "\n".join(test_case['context'])},
            {"role": "user", "content": test_case['query']},
        ]
        
        try:
            # Test with 2048 tokens (the fix)
            response = await client.chat.completions.create(
                model="gpt-5-mini",
                messages=messages,
                max_completion_tokens=2048,
            )
            
            content = response.choices[0].message.content or ""
            finish_reason = response.choices[0].finish_reason
            
            print(f"✅ Response received")
            print(f"Length: {len(content)}")
            print(f"Finish reason: {finish_reason}")
            print(f"Preview: {content[:200]}{'...' if len(content) > 200 else ''}")
            
            if hasattr(response, 'usage') and response.usage:
                usage = response.usage
                print(f"Token usage - Prompt: {usage.prompt_tokens}, "
                     f"Completion: {usage.completion_tokens}, Total: {usage.total_tokens}")
            
            # Validate response quality
            if len(content) > 50 and finish_reason == "stop":
                print("✅ Response appears valid")
            else:
                print(f"⚠️  Response may have issues - Length: {len(content)}, Finish: {finish_reason}")
                
        except Exception as e:
            print(f"❌ Error: {e}")
    
    print(f"\n=== Testing Fallback to gpt-4o-mini ===")
    try:
        # Test fallback with a simple prompt
        response = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT_OPTIMIZED},
                {"role": "user", "content": "What is Islam?"}
            ],
            max_tokens=2048,
        )
        
        content = response.choices[0].message.content or ""
        print(f"✅ Fallback model working - Length: {len(content)}")
        print(f"Preview: {content[:100]}...")
        
    except Exception as e:
        print(f"❌ Fallback model error: {e}")

if __name__ == "__main__":
    asyncio.run(test_fixed_implementation())