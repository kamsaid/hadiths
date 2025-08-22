#!/usr/bin/env python3
"""Test script for the streaming chat endpoint."""

import asyncio
import aiohttp
import json
import sys

async def test_streaming_endpoint():
    """Test the streaming chat endpoint."""
    
    # Test data
    test_query = {
        "query": "What does Islam say about prayer?"
    }
    
    url = "http://localhost:8000/chat/stream"
    
    print(f"Testing streaming endpoint: {url}")
    print(f"Query: {test_query['query']}")
    print("-" * 50)
    
    try:
        async with aiohttp.ClientSession() as session:
            async with session.post(
                url,
                json=test_query,
                headers={"Content-Type": "application/json"}
            ) as response:
                
                if response.status != 200:
                    print(f"Error: HTTP {response.status}")
                    text = await response.text()
                    print(f"Response: {text}")
                    return False
                
                print("Streaming response:")
                print("-" * 30)
                
                # Read the stream
                full_response = ""
                async for line in response.content:
                    line_str = line.decode('utf-8').strip()
                    if line_str:
                        print(f"Received: {repr(line_str)}")
                        
                        # Parse SSE format
                        if line_str.startswith("data: "):
                            data = line_str[6:]  # Remove "data: " prefix
                            if data == "[DONE]":
                                print("Stream completed!")
                                break
                            else:
                                full_response += data
                                print(f"Chunk: {data}", end="", flush=True)
                
                print(f"\n\nFull response: {full_response}")
                return True
                
    except aiohttp.ClientError as e:
        print(f"Connection error: {e}")
        return False
    except Exception as e:
        print(f"Unexpected error: {e}")
        return False

async def main():
    """Main test function."""
    print("Starting streaming endpoint test...")
    success = await test_streaming_endpoint()
    
    if success:
        print("\nTest completed successfully!")
        sys.exit(0)
    else:
        print("\nTest failed!")
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(main())