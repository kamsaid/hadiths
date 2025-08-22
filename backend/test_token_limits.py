#!/usr/bin/env python3
"""
Test token limits and prompt sizing issues.
"""

import asyncio
import sys
from pathlib import Path

# Add the backend directory to Python path
sys.path.insert(0, str(Path(__file__).parent))

from openai import AsyncOpenAI
from config import get_settings

# Original system prompt
SYSTEM_PROMPT_LONG = """
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

# Shorter system prompt
SYSTEM_PROMPT_SHORT = """You are Yaseen, an AI Islamic scholar assistant. Provide accurate Islamic answers using Qur'an and authentic hadith sources. Always cite your sources using formats like 'Q 2:255' or 'Sahih Bukhari 1:2:13'. If unsure, recommend consulting a qualified scholar. Keep responses concise (150-200 words)."""

async def test_token_limits():
    """Test different prompt lengths and token limits."""
    settings = get_settings()
    client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
    
    test_cases = [
        {
            "name": "Long prompt, 512 tokens",
            "system_prompt": SYSTEM_PROMPT_LONG,
            "max_tokens": 512
        },
        {
            "name": "Long prompt, 1024 tokens", 
            "system_prompt": SYSTEM_PROMPT_LONG,
            "max_tokens": 1024
        },
        {
            "name": "Long prompt, 2048 tokens",
            "system_prompt": SYSTEM_PROMPT_LONG,
            "max_tokens": 2048
        },
        {
            "name": "Short prompt, 512 tokens",
            "system_prompt": SYSTEM_PROMPT_SHORT,
            "max_tokens": 512
        }
    ]
    
    context = ["This is test context about Islamic teachings."]
    user_query = "What is Islam?"
    
    for test_case in test_cases:
        print(f"\n=== {test_case['name']} ===")
        
        messages = [
            {"role": "system", "content": test_case["system_prompt"]},
            {"role": "system", "content": "\n".join(context)},
            {"role": "user", "content": user_query},
        ]
        
        try:
            response = await client.chat.completions.create(
                model="gpt-5-mini",
                messages=messages,
                max_completion_tokens=test_case["max_tokens"],
            )
            
            content = response.choices[0].message.content or ""
            finish_reason = response.choices[0].finish_reason
            
            print(f"Response length: {len(content)}")
            print(f"Finish reason: {finish_reason}")
            print(f"Response preview: '{content[:100]}{'...' if len(content) > 100 else ''}'")
            
            if hasattr(response, 'usage') and response.usage:
                usage = response.usage
                print(f"Prompt tokens: {usage.prompt_tokens}")
                print(f"Completion tokens: {usage.completion_tokens}")
                print(f"Total tokens: {usage.total_tokens}")
                
        except Exception as e:
            print(f"❌ Error: {e}")

if __name__ == "__main__":
    asyncio.run(test_token_limits())