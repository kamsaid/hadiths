from pydantic_settings import BaseSettings
from pydantic import Field
from functools import lru_cache
from pathlib import Path


class Settings(BaseSettings):
    """Application settings pulled from environment variables.

    Using Pydantic's BaseSettings gives us automatic environment variable
    parsing and validation while still allowing default values for local
    development.  The `lru_cache` wrapper around `get_settings` ensures we
    only instantiate the Settings object once (singleton-ish) which avoids
    re-reading environment variables on every import.
    """

    # ------------------------------------------------------------------
    # OpenAI / Pinecone credentials & configuration
    # ------------------------------------------------------------------
    OPENAI_API_KEY: str = Field(..., env="OPENAI_API_KEY")
    # Default to empty string so the app can still boot in dev; retrieval path
    # has a graceful fallback when this is not configured.
    PINECONE_API_KEY: str = Field("", env="PINECONE_API_KEY")
    # PINECONE_ENV is used by the Pinecone client to select the environment/region
    PINECONE_ENV: str = Field("us-east1-gcp", env="PINECONE_ENV")
    PINECONE_INDEX_NAME: str = Field("islamic-kb", env="PINECONE_INDEX_NAME")

    # ------------------------------------------------------------------
    # Application behaviour toggles
    # ------------------------------------------------------------------
    MODERATION_ENABLED: bool = Field(True, env="MODERATION_ENABLED")
    CONFIDENCE_THRESHOLD: float = Field(0.25, ge=0.0, le=1.0, env="CONFIDENCE_THRESHOLD")

    # ------------------------------------------------------------------
    # Miscellaneous
    # ------------------------------------------------------------------
    FASTAPI_DEBUG: bool = Field(False, env="FASTAPI_DEBUG")

    # ------------------------------------------------------------------
    # Pydantic v2 configuration
    # ------------------------------------------------------------------
    # `model_config` is the new way (v2) to tweak behaviour.  We keep the
    # original `.env` loading and case-sensitivity, **plus** tell Pydantic
    # to *ignore* unrelated env vars (e.g. VITE_API_URL from the frontend)
    # instead of raising `ValidationError: extra_forbidden`.
    # Resolve the env file from the project root regardless of current working
    # directory so running `uvicorn backend.main:app --reload` from either the
    # repo root or the `backend/` folder consistently picks up variables.
    _ROOT_ENV_PATH = str(Path(__file__).resolve().parents[1] / ".env.local")

    model_config = {
        "env_file": _ROOT_ENV_PATH,
        "case_sensitive": True,
        "extra": "ignore",
    }


@lru_cache()
def get_settings() -> Settings:
    """Retrieve a cached instance of application Settings."""
    return Settings() 