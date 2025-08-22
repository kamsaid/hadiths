from typing import List, Literal, Optional

from pydantic import BaseModel, constr, validator

# ---------------------------------------------------------------------------
# Pydantic models shared across the backend. Keeping these small and explicit
# helps FastAPI auto-generate clear OpenAPI documentation and front-end types.
# ---------------------------------------------------------------------------


class Message(BaseModel):
    """Represents a single message in conversation history."""
    
    role: Literal["user", "assistant", "system"]
    content: str


class ChatRequest(BaseModel):
    """Represents an incoming question from the user with optional conversation context."""

    query: constr(strip_whitespace=True, min_length=3)
    messages: Optional[List[Message]] = None
    session_id: Optional[str] = None


class Citation(BaseModel):
    """Structured representation for either a Qur'an verse or a ḥadith ref."""

    type: Literal["quran", "hadith"]
    ref: str  # e.g. "2:255" for Ayatul-Kursi or "Bukhari 1/2" for hadith


class ChatResponse(BaseModel):
    """The full assistant reply returned to the front-end."""

    answer: str  # markdown-friendly string (~200 words) including Arabic + EN
    citations: List[Citation]
    confidence: float

    # ------------------------------------------------------------------
    # Basic sanity validation: ensure confidence ∈ [0,1].
    # ------------------------------------------------------------------
    @validator("confidence")
    def _check_confidence(cls, v: float) -> float:  # noqa: N805 (pydantic style)
        if not 0.0 <= v <= 1.0:
            raise ValueError("confidence must be between 0 and 1")
        return v 