#!/usr/bin/env python3
"""
Test script to debug OpenAI API integration issues.
"""

import asyncio
import os
import sys
from pathlib import Path

# Add the backend directory to Python path
sys.path.insert(0, str(Path(__file__).parent))

from openai import AsyncOpenAI
from config import get_settings

async def test_openai_connection():
    """Test the OpenAI API connection and model availability."""
    settings = get_settings()
    
    print(f"Testing OpenAI API connection...")
    print(f"API Key starts with: {settings.OPENAI_API_KEY[:10]}...")
    print(f"API Key length: {len(settings.OPENAI_API_KEY)}")
    
    client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
    
    # Test 1: List available models
    print("\n=== Testing Model Availability ===")
    try:
        models = await client.models.list()
        available_models = [model.id for model in models.data]
        print(f"Available models count: {len(available_models)}")
        
        # Check for GPT models
        gpt_models = [m for m in available_models if 'gpt' in m.lower()]
        print(f"GPT models available: {gpt_models}")
        
        # Check if gpt-5-mini is available
        if "gpt-5-mini" in available_models:
            print("✅ gpt-5-mini is available")
        else:
            print("❌ gpt-5-mini is NOT available")
            
        # Check for alternative models
        alternatives = ["gpt-4o-mini", "gpt-4o", "gpt-4-turbo", "gpt-4", "gpt-3.5-turbo"]
        print("\nAlternative models available:")
        for model in alternatives:
            if model in available_models:
                print(f"✅ {model}")
            else:
                print(f"❌ {model}")
                
    except Exception as e:
        print(f"❌ Error listing models: {e}")
        return
    
    # Test 2: Try the current model (gpt-5-mini)
    print(f"\n=== Testing gpt-5-mini ===")
    try:
        response = await client.chat.completions.create(
            model="gpt-5-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "Say hello in one word."}
            ],
            max_completion_tokens=10
        )
        print(f"✅ gpt-5-mini response: {response.choices[0].message.content}")
    except Exception as e:
        print(f"❌ Error with gpt-5-mini: {e}")
        
    # Test 3: Try gpt-4o-mini as fallback
    print(f"\n=== Testing gpt-4o-mini (fallback) ===")
    try:
        response = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "Say hello in one word."}
            ],
            max_tokens=10  # Using max_tokens for older models
        )
        print(f"✅ gpt-4o-mini response: {response.choices[0].message.content}")
    except Exception as e:
        print(f"❌ Error with gpt-4o-mini: {e}")
        
    # Test 4: Try gpt-3.5-turbo as fallback
    print(f"\n=== Testing gpt-3.5-turbo (fallback) ===")
    try:
        response = await client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "Say hello in one word."}
            ],
            max_tokens=10
        )
        print(f"✅ gpt-3.5-turbo response: {response.choices[0].message.content}")
    except Exception as e:
        print(f"❌ Error with gpt-3.5-turbo: {e}")

if __name__ == "__main__":
    asyncio.run(test_openai_connection())