#!/usr/bin/env python3
"""
Test the actual system prompt and chat function to identify the issue.
"""

import asyncio
import sys
from pathlib import Path

# Add the backend directory to Python path
sys.path.insert(0, str(Path(__file__).parent))

from openai import AsyncOpenAI
from config import get_settings
import llm
SYSTEM_PROMPT = llm.SYSTEM_PROMPT

async def test_real_implementation():
    """Test the actual chat function and system prompt."""
    settings = get_settings()
    client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
    
    print("=== Testing Real System Prompt ===")
    print(f"System prompt length: {len(SYSTEM_PROMPT)} characters")
    print(f"System prompt preview: {SYSTEM_PROMPT[:200]}...")
    
    # Test with the actual system prompt
    context = ["This is a test context about Islamic knowledge."]
    user_query = "What is Islam?"
    
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "system", "content": "\n".join(context)},
        {"role": "user", "content": user_query},
    ]
    
    print(f"\n=== Testing with actual messages structure ===")
    print(f"Total messages: {len(messages)}")
    print(f"Message lengths: {[len(msg['content']) for msg in messages]}")
    
    try:
        response = await client.chat.completions.create(
            model="gpt-5-mini",
            messages=messages,
            max_completion_tokens=512,
        )
        
        content = response.choices[0].message.content
        print(f"✅ Response received: '{content[:100]}{'...' if len(content) > 100 else ''}'")
        print(f"Response length: {len(content) if content else 0}")
        print(f"Finish reason: {response.choices[0].finish_reason}")
        
        if hasattr(response, 'usage'):
            print(f"Usage: {response.usage}")
            
    except Exception as e:
        print(f"❌ Error: {e}")
        
    print(f"\n=== Testing actual chat function ===")
    try:
        answer, confidence = await llm.chat(context, user_query)
        print(f"✅ Chat function response: '{answer[:100]}{'...' if len(answer) > 100 else ''}'")
        print(f"Confidence: {confidence}")
    except Exception as e:
        print(f"❌ Chat function error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_real_implementation())