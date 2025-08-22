#!/usr/bin/env python3
"""
Detailed test for GPT-5-mini to understand why it's returning empty responses.
"""

import asyncio
import sys
from pathlib import Path

# Add the backend directory to Python path
sys.path.insert(0, str(Path(__file__).parent))

from openai import AsyncOpenAI
from config import get_settings

async def test_gpt5_detailed():
    """Test GPT-5-mini with different parameter combinations."""
    settings = get_settings()
    client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
    
    test_cases = [
        {
            "name": "Current implementation (max_completion_tokens)",
            "params": {
                "model": "gpt-5-mini",
                "messages": [
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": "Say 'Hello World' and nothing else."}
                ],
                "max_completion_tokens": 512
            }
        },
        {
            "name": "Using max_tokens instead",
            "params": {
                "model": "gpt-5-mini",
                "messages": [
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": "Say 'Hello World' and nothing else."}
                ],
                "max_tokens": 512
            }
        },
        {
            "name": "Minimal parameters",
            "params": {
                "model": "gpt-5-mini",
                "messages": [
                    {"role": "user", "content": "Hello"}
                ]
            }
        },
        {
            "name": "With temperature",
            "params": {
                "model": "gpt-5-mini",
                "messages": [
                    {"role": "user", "content": "Say hello"}
                ],
                "temperature": 0.7,
                "max_completion_tokens": 100
            }
        },
        {
            "name": "Different model version (gpt-5-mini-2025-08-07)",
            "params": {
                "model": "gpt-5-mini-2025-08-07",
                "messages": [
                    {"role": "user", "content": "Say hello"}
                ],
                "max_completion_tokens": 100
            }
        },
        {
            "name": "Regular GPT-5 model",
            "params": {
                "model": "gpt-5",
                "messages": [
                    {"role": "user", "content": "Say hello"}
                ],
                "max_completion_tokens": 100
            }
        }
    ]
    
    for test_case in test_cases:
        print(f"\n=== {test_case['name']} ===")
        try:
            response = await client.chat.completions.create(**test_case['params'])
            content = response.choices[0].message.content
            print(f"Response: '{content}'")
            print(f"Response type: {type(content)}")
            print(f"Response length: {len(content) if content else 0}")
            
            # Check finish reason
            finish_reason = response.choices[0].finish_reason
            print(f"Finish reason: {finish_reason}")
            
            # Check usage info
            if hasattr(response, 'usage') and response.usage:
                print(f"Usage: {response.usage}")
                
        except Exception as e:
            print(f"❌ Error: {e}")

if __name__ == "__main__":
    asyncio.run(test_gpt5_detailed())