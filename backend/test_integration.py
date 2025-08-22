#!/usr/bin/env python3
"""
Test the integration by simulating the FastAPI chat endpoint flow.
"""

import asyncio
import sys
import logging
from pathlib import Path

# Add the backend directory to Python path
sys.path.insert(0, str(Path(__file__).parent))

# Configure logging to see the detailed logs
logging.basicConfig(level=logging.INFO)

from config import get_settings

# Import the actual functions that will be used
def mock_retrieve_context(query):
    """Mock the retrieval function for testing."""
    # Simulate some retrieved context
    context_chunks = [
        "The Quran is the holy book of Islam, revealed to Prophet Muhammad.",
        "Islam means submission to Allah and following the teachings of the Prophet.",
        "The five pillars of Islam are: Shahada, Salah, Zakat, Sawm, and Hajj."
    ]
    similarity_score = 0.85  # Above the confidence threshold
    return context_chunks, similarity_score

async def test_full_integration():
    """Test the complete integration flow."""
    # Import here to avoid module import issues
    import importlib.util
    
    # Load the llm module manually
    spec = importlib.util.spec_from_file_location("llm", Path(__file__).parent / "llm.py")
    llm_module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(llm_module)
    
    settings = get_settings()
    
    test_queries = [
        "What is Islam?",
        "Can you explain the five pillars of Islam?",
        "What are the main beliefs in Islam?",
        "How do Muslims pray?"
    ]
    
    print("=== Testing Full Integration Flow ===")
    
    for i, query in enumerate(test_queries, 1):
        print(f"\n--- Test {i}: {query} ---")
        
        try:
            # Step 1: Simulate moderation (should pass)
            print("✅ Moderation check: passed")
            
            # Step 2: Retrieve context
            context_chunks, sim_score = mock_retrieve_context(query)
            print(f"✅ Context retrieved: {len(context_chunks)} chunks, similarity: {sim_score}")
            
            # Step 3: Check confidence threshold
            if sim_score < settings.CONFIDENCE_THRESHOLD:
                print(f"❌ Low confidence: {sim_score} < {settings.CONFIDENCE_THRESHOLD}")
                continue
            
            print(f"✅ Confidence check passed: {sim_score} >= {settings.CONFIDENCE_THRESHOLD}")
            
            # Step 4: Generate answer using the fixed LLM
            answer, model_conf = await llm_module.chat(context_chunks, query)
            
            print(f"✅ LLM response generated")
            print(f"Answer length: {len(answer)}")
            print(f"Model confidence: {model_conf}")
            print(f"Answer preview: {answer[:150]}{'...' if len(answer) > 150 else ''}")
            
            # Step 5: Calculate overall confidence
            overall_conf = (sim_score + model_conf) / 2
            print(f"✅ Overall confidence: {overall_conf}")
            
            # Validate response
            if len(answer) > 50 and "I wasn't able to generate" not in answer:
                print("✅ Response validation: PASSED")
            else:
                print("❌ Response validation: FAILED")
                
        except Exception as e:
            print(f"❌ Error in test {i}: {e}")
            import traceback
            traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_full_integration())