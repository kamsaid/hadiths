#!/usr/bin/env python3
"""
Script to ingest Islamic content from JSON files into Pinecone index.
Handles both hadith collections and Q&A format content.
"""

import json
import os
import sys
import logging
from pathlib import Path
from typing import List, Dict, Any, Tuple
from datetime import datetime

from pinecone import Pinecone
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from langchain.schema import Document

# Add the backend directory to the Python path for imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from config import get_settings

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def load_json_file(file_path: Path) -> Dict[str, Any]:
    """Load and parse a JSON file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"Error loading {file_path}: {str(e)}")
        return {}

def process_hadith_collection(data: Dict[str, Any], source_file: str) -> List[Document]:
    """Process hadith collection format into documents."""
    documents = []
    
    if 'hadiths' not in data:
        logger.warning(f"No 'hadiths' key found in {source_file}")
        return documents
    
    # Extract metadata about the collection
    collection_title = ""
    collection_author = ""
    
    if 'metadata' in data:
        metadata = data['metadata']
        if 'english' in metadata:
            collection_title = metadata['english'].get('title', '')
            collection_author = metadata['english'].get('author', '')
        elif 'arabic' in metadata:
            collection_title = metadata['arabic'].get('title', '')
            collection_author = metadata['arabic'].get('author', '')
    
    # Process each hadith
    for hadith in data['hadiths']:
        try:
            # Combine Arabic and English text for better searchability
            content_parts = []
            
            # Add English content if available
            if 'english' in hadith:
                english = hadith['english']
                if isinstance(english, dict):
                    if 'narrator' in english:
                        content_parts.append(f"Narrator: {english['narrator']}")
                    if 'text' in english:
                        content_parts.append(f"Text: {english['text']}")
                elif isinstance(english, str):
                    content_parts.append(f"Text: {english}")
            
            # Add Arabic text if available
            if 'arabic' in hadith and hadith['arabic']:
                content_parts.append(f"Arabic: {hadith['arabic']}")
            
            if not content_parts:
                logger.warning(f"No content found for hadith ID {hadith.get('id', 'unknown')} in {source_file}")
                continue
            
            # Create the document content
            page_content = "\n\n".join(content_parts)
            
            # Create metadata for the document
            doc_metadata = {
                "source": source_file,
                "type": "hadith",
                "collection_title": collection_title,
                "collection_author": collection_author,
                "hadith_id": str(hadith.get('id', '')),
                "book_id": str(hadith.get('bookId', '')),
                "chapter_id": str(hadith.get('chapterId', '')),
                "id_in_book": str(hadith.get('idInBook', '')),
                "timestamp": datetime.now().isoformat()
            }
            
            # Create the document
            doc = Document(
                page_content=page_content,
                metadata=doc_metadata
            )
            
            documents.append(doc)
            
        except Exception as e:
            logger.error(f"Error processing hadith {hadith.get('id', 'unknown')} in {source_file}: {str(e)}")
            continue
    
    logger.info(f"Processed {len(documents)} hadiths from {source_file}")
    return documents

def process_qa_collection(data: List[Dict[str, Any]], source_file: str) -> List[Document]:
    """Process Q&A format content into documents."""
    documents = []
    
    for idx, item in enumerate(data):
        try:
            question = item.get('question', '').strip()
            answer = item.get('answer', '').strip()
            
            if not question or not answer:
                logger.warning(f"Missing question or answer in item {idx} of {source_file}")
                continue
            
            # Create the document content
            page_content = f"Question: {question}\n\nAnswer: {answer}"
            
            # Create metadata for the document
            doc_metadata = {
                "source": source_file,
                "type": "qa",
                "question": question,
                "item_index": str(idx),
                "timestamp": datetime.now().isoformat()
            }
            
            # Create the document
            doc = Document(
                page_content=page_content,
                metadata=doc_metadata
            )
            
            documents.append(doc)
            
        except Exception as e:
            logger.error(f"Error processing Q&A item {idx} in {source_file}: {str(e)}")
            continue
    
    logger.info(f"Processed {len(documents)} Q&A items from {source_file}")
    return documents

def determine_content_type(data: Any) -> str:
    """Determine the type of content based on the data structure."""
    if isinstance(data, dict):
        if 'hadiths' in data:
            return 'hadith'
        elif 'question' in data and 'answer' in data:
            return 'qa'
    elif isinstance(data, list):
        if len(data) > 0 and isinstance(data[0], dict):
            if 'question' in data[0] and 'answer' in data[0]:
                return 'qa'
    
    return 'unknown'

def process_json_file(file_path: Path) -> List[Document]:
    """Process a JSON file and return a list of documents."""
    logger.info(f"Processing {file_path.name}...")
    
    data = load_json_file(file_path)
    if not data:
        return []
    
    content_type = determine_content_type(data)
    
    if content_type == 'hadith':
        return process_hadith_collection(data, file_path.name)
    elif content_type == 'qa':
        return process_qa_collection(data, file_path.name)
    else:
        logger.warning(f"Unknown content type for {file_path.name}")
        return []

def setup_pinecone_vectorstore() -> PineconeVectorStore:
    """Initialize Pinecone connection and return vector store."""
    settings = get_settings()
    
    # Set environment variables for LangChain components
    os.environ['OPENAI_API_KEY'] = settings.OPENAI_API_KEY
    os.environ['PINECONE_API_KEY'] = settings.PINECONE_API_KEY
    
    # Initialize Pinecone
    pc = Pinecone(
        api_key=settings.PINECONE_API_KEY,
        environment=settings.PINECONE_ENV
    )
    
    # Check if index exists
    if settings.PINECONE_INDEX_NAME not in pc.list_indexes().names():
        raise RuntimeError(f"Pinecone index '{settings.PINECONE_INDEX_NAME}' not found!")
    
    # Initialize embedding model
    embeddings = OpenAIEmbeddings()
    
    # Create vector store
    vector_store = PineconeVectorStore(
        index_name=settings.PINECONE_INDEX_NAME,
        embedding=embeddings,
        text_key="text"
    )
    
    return vector_store

def get_new_json_files() -> List[Path]:
    """Get list of new JSON files to process."""
    # List of new files mentioned by the user
    new_files = [
        "the-quran-and-its-sciences.json",
        "psychological-and-social-problems.json", 
        "principles-of-fiqh.json",
        "pedagogy-education-and-upbringing.json",
        "knowledge-propagation.json",
        "islamic-politics.json",
        "islamic-history-and-biography.json",
        "hadith-its-sciences.json",
        "fiqh-of-the-family.json",
        "etiquette-morals-and-heart-softeners.json",
        "basic-tenets-of-faith.json"
    ]
    
    content_dir = Path("content")
    found_files = []
    
    for filename in new_files:
        file_path = content_dir / filename
        if file_path.exists():
            found_files.append(file_path)
            logger.info(f"Found file: {filename}")
        else:
            logger.warning(f"File not found: {filename}")
    
    return found_files

def batch_add_documents(vector_store: PineconeVectorStore, documents: List[Document], batch_size: int = 100):
    """Add documents to Pinecone in batches."""
    logger.info(f"Adding {len(documents)} documents to Pinecone in batches of {batch_size}")
    
    for i in range(0, len(documents), batch_size):
        batch = documents[i:i + batch_size]
        try:
            vector_store.add_documents(batch)
            logger.info(f"Added batch {i//batch_size + 1}: {len(batch)} documents")
        except Exception as e:
            logger.error(f"Error adding batch {i//batch_size + 1}: {str(e)}")
            raise

def main():
    """Main function to process and ingest content."""
    try:
        logger.info("Starting content ingestion process...")
        
        # Get list of files to process
        files_to_process = get_new_json_files()
        
        if not files_to_process:
            logger.warning("No files found to process!")
            return
        
        # Setup Pinecone vector store
        logger.info("Setting up Pinecone connection...")
        vector_store = setup_pinecone_vectorstore()
        
        # Process each file and collect documents
        all_documents = []
        
        for file_path in files_to_process:
            documents = process_json_file(file_path)
            all_documents.extend(documents)
        
        if not all_documents:
            logger.warning("No documents to add!")
            return
        
        logger.info(f"Total documents to add: {len(all_documents)}")
        
        # Add documents to Pinecone in batches
        batch_add_documents(vector_store, all_documents)
        
        logger.info("Content ingestion completed successfully!")
        logger.info(f"Added {len(all_documents)} documents from {len(files_to_process)} files")
        
    except Exception as e:
        logger.error(f"Error during ingestion: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main() 