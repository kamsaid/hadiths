"""Light-weight wrapper around LangChain + Pinecone to retrieve top-k context
for a given user query.  Isolated into its own module for easier testing and
potential swapping of vector DB or embedding model in the future.
"""

from __future__ import annotations

import logging
from typing import List, Tuple
import os

# Import Pinecone and LangChain lazily inside the retrieval function to avoid
# heavy dependencies (and ModuleNotFoundError) when Pinecone is not configured
from typing import TYPE_CHECKING

if TYPE_CHECKING:  # pragma: no cover
    # These imports are for type checkers only; at runtime they are loaded
    # lazily in `retrieve_context`.
    from pinecone import Pinecone  # type: ignore
    from langchain_openai import OpenAIEmbeddings  # type: ignore
    from langchain_pinecone import PineconeVectorStore  # type: ignore

from backend.config import get_settings

# Set up logging
logger = logging.getLogger(__name__)

async def retrieve_context(query: str, k: int = 5) -> Tuple[List[str], float]:
    """Embed *query* and fetch the *k* most similar chunks from Pinecone.

    Returns a tuple `(contents, max_similarity)` where:
      *contents*         list of plain text strings representing the retrieved
                         knowledge chunks (Qur'an ayāt or ahadith).
      *max_similarity*   the cosine similarity score of the top match; used as
                         a crude confidence proxy upstream.
    """

    settings = get_settings()

    # ------------------------------------------------------------------
    # Graceful fallback when Pinecone isn't configured
    # ------------------------------------------------------------------
    # During local development many contributors do not have a Pinecone
    # account – or simply haven’t added `PINECONE_API_KEY` to their env.  In
    # that case we skip vector retrieval entirely and tell the caller that no
    # useful context was found by returning ([], 0.0) instead of raising and
    # bubbling a 500 error up to the frontend.

    if not settings.PINECONE_API_KEY:
        logger.warning(
            "PINECONE_API_KEY not set. Skipping semantic retrieval and "
            "falling back to low-confidence answer."
        )
        return [], 0.0

    # ------------------------------------------------------------------
    # Import 3rd-party dependencies *after* we know we actually need them
    # ------------------------------------------------------------------
    from pinecone import Pinecone  # type: ignore
    from langchain_openai import OpenAIEmbeddings  # type: ignore
    from langchain_pinecone import PineconeVectorStore  # type: ignore

    # Lazily create Pinecone instance so repeated calls are cheap
    pc: 'Pinecone' = getattr(retrieve_context, "_pc", None)  # type: ignore[assignment]
    if pc is None:
        pc = Pinecone(
            api_key=settings.PINECONE_API_KEY,
            environment=settings.PINECONE_ENV,
        )
        retrieve_context._pc = pc  # type: ignore[attr-defined]

    # Ensure index exists
    if settings.PINECONE_INDEX_NAME not in pc.list_indexes().names():  # pragma: no cover
        raise RuntimeError(
            f"Pinecone index '{settings.PINECONE_INDEX_NAME}' not found. Did you run the ingestion script?"
        )

    # ------------------------------------------------------------------
    # Build embedding model
    # ------------------------------------------------------------------
    # When the environment variable `OPENAI_API_KEY` is not set, LangChain's
    # `OpenAIEmbeddings` constructor throws the error seen by the user
    # ("The api_key client option must be set ...").  We already **require**
    # the key in our `Settings` model, so pass it explicitly here to avoid
    # relying on the global environment and to make unit-testing easier.

    embed_model = OpenAIEmbeddings(openai_api_key=settings.OPENAI_API_KEY)

    # Obtain index object
    index = pc.Index(settings.PINECONE_INDEX_NAME)

    # Log index stats for debugging
    try:
        stats = index.describe_index_stats()
        logger.info(f"Pinecone index '{settings.PINECONE_INDEX_NAME}' stats: {stats}")
    except Exception as e:
        logger.error(f"Failed to get Pinecone index stats: {e}")

    # Ensure third-party libs that expect env vars (LangChain Pinecone wrapper)
    # see the keys even though we already loaded them via settings. Some
    # versions of `langchain_pinecone` read only from env, not from the
    # instantiated client above.
    os.environ['OPENAI_API_KEY'] = settings.OPENAI_API_KEY
    os.environ['PINECONE_API_KEY'] = settings.PINECONE_API_KEY

    # Wrap existing Pinecone index with LangChain vector store
    vector_store = PineconeVectorStore(
        index_name=settings.PINECONE_INDEX_NAME,
        embedding=embed_model,
        text_key="text"
    )

    # LangChain returns list[Document] with .page_content and .metadata
    docs_with_score = vector_store.similarity_search_with_score(query, k=k)

    logger.info(f"Retrieval query: '{query}'")
    logger.info(f"Docs with scores (raw): {docs_with_score}")

    if not docs_with_score:
        return [], 0.0

    contents, scores = zip(*[(doc.page_content, score) for doc, score in docs_with_score])

    # Scores from similarity_search_with_score are already cosine similarities (higher is better)
    max_sim = max(scores) if scores else 0.0

    logger.info(f"Retrieved scores (cosine similarity): {scores}")
    logger.info(f"Max similarity: {max_sim}")

    return list(contents), max_sim 