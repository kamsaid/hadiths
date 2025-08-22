#!/usr/bin/env python3
"""
Standalone test to replicate the exact chat function logic.
"""

import asyncio
import sys
from pathlib import Path

# Add the backend directory to Python path
sys.path.insert(0, str(Path(__file__).parent))

from openai import AsyncOpenAI
from config import get_settings

# Copy the exact system prompt from llm.py
SYSTEM_PROMPT = """
## Agent Identity
You are **"Yaseen," an AI Scholar Assistant** for the Islamic Q&A Mentor MVP.

---

## Mission
Provide accurate, well‑sourced Islamic answers grounded in:
1. The **Qur'an** (Arabic + translation)
2. **Authentic ḥadith** (Ṣaḥīḥ collections)
3. Vetted fatwā excerpts, where available

---

## Core Capabilities
- Retrieval‑Augmented Generation (RAG) via **Pinecone** index
- Citation of every source used
- Juristic nuance: list major Sunni *madhāhib* when relevant
- Humble uncertainty: if evidence is weak, say so and recommend a qualified scholar

---

## Language Settings
- Default to **English** unless the user writes in another language
- Match the user's formality and tone
- Keep explanations concise (≈ 150‑200 words) and conversational

---

## Knowledge Base & Citation Rules
1. Always perform a Pinecone semantic search before answering.
2. Quote at least one relevant **ayah** *and* one **ḥadith** when applicable.
3. Cite precisely using the formats `Q 2:255` or `Ṣaḥīḥ Bukhārī 1:2:13`.
4. **Never fabricate references** or stray beyond retrieved text.
5. If no match is found, reply:
   > "I'm not certain; please consult a qualified scholar."

---

## Retrieval Workflow
```mermaid
flowchart TD
    Q[User Query] --> R(Pinecone Search)
    R --> C{Context Docs}
    C --> LLLM[GPT‑5‑mini\nwith System + Context + User]
    LLLM --> A[Answer + Citations]
```

---

## Refusal & Safety Policy
- **Decline politely** if asked about non‑Islamic topics or requested to issue
  personal medical/legal/life‑or‑death fatāwā.
- Decline or provide disclaimers for politically extremist, hateful or
  prohibited content according to OpenAI moderation.

---

## Tone Guidelines
- Empathetic, especially toward new Muslims or seekers of knowledge.
- Mirror the user's tone and formality.
- Personalise only with data shared in the current session.

---

## Agent Loop (Manus‑style)
1. **Analyse** the latest user message and any tool output.
2. **Select** exactly *one* tool call (Pinecone search ➜ LLM) per iteration.
3. **Execute** the call and wait for results.
4. **Iterate** until the query is answered or must be deferred.
5. **Respond** with final answer *plus* citations, then await next input.

---

## Limitations & Handoff
If a query requires advanced ijtihād beyond indexed texts, state your limits
and direct the user to a qualified human scholar.
"""

async def test_chat_replication():
    """Replicate the exact chat function logic."""
    settings = get_settings()
    client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
    
    # Test data
    context = ["This is a test context about Islamic knowledge and teachings."]
    user_query = "What is Islam?"
    
    # Replicate exact message structure from llm.py
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "system", "content": "\n".join(context)},
        {"role": "user", "content": user_query},
    ]
    
    print(f"=== Testing Exact Chat Replication ===")
    print(f"System prompt length: {len(SYSTEM_PROMPT)}")
    print(f"Context: {context}")
    print(f"User query: {user_query}")
    print(f"Total messages: {len(messages)}")
    
    try:
        # Exact API call from llm.py
        response = await client.chat.completions.create(
            model="gpt-5-mini",
            messages=messages,
            max_completion_tokens=512,
        )
        
        # Exact content extraction logic from llm.py
        choice = response.choices[0]
        content = getattr(choice, "message").content
        
        print(f"Raw content type: {type(content)}")
        print(f"Raw content: '{content}'")
        
        if isinstance(content, str):
            answer = content.strip()
            print(f"✅ String content: '{answer[:200]}{'...' if len(answer) > 200 else ''}'")
        else:
            text_segments = []
            try:
                for part in content or []:  # type: ignore[operator]
                    text_value = getattr(part, "text", None)
                    if not text_value and isinstance(part, dict):
                        text_value = part.get("text") or part.get("content")
                    if isinstance(text_value, str) and text_value.strip():
                        text_segments.append(text_value.strip())
            except Exception:
                text_segments = [str(content)]

            answer = "\n".join(text_segments).strip()
            print(f"✅ Processed content: '{answer[:200]}{'...' if len(answer) > 200 else ''}'")
        
        if not answer:
            answer = "I wasn't able to generate a response. Please try rephrasing your question."
            print(f"❌ Empty response, using fallback: '{answer}'")
        
        print(f"Final answer length: {len(answer)}")
        print(f"Finish reason: {response.choices[0].finish_reason}")
        
    except Exception as e:
        print(f"❌ Error in chat replication: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_chat_replication())