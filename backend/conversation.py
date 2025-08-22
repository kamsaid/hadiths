"""Conversation context management for maintaining chat sessions and message history.

This module provides in-memory session storage and context window management
to enable coherent multi-turn conversations with Yaseen.
"""

from __future__ import annotations

import logging
import time
from typing import Dict, List, Optional, Tuple
from collections import OrderedDict

from backend.models import Message

logger = logging.getLogger(__name__)


class ConversationManager:
    """Manages conversation sessions and context windows for multi-turn chat."""
    
    def __init__(
        self,
        max_context_messages: int = 8,
        session_timeout_minutes: int = 60,
        max_sessions: int = 1000
    ):
        """Initialize conversation manager.
        
        Args:
            max_context_messages: Maximum number of messages to include in context
            session_timeout_minutes: Minutes of inactivity before session expires
            max_sessions: Maximum number of concurrent sessions to maintain
        """
        self.max_context_messages = max_context_messages
        self.session_timeout = session_timeout_minutes * 60  # Convert to seconds
        self.max_sessions = max_sessions
        
        # OrderedDict for LRU-style session management
        self._sessions: OrderedDict[str, Dict] = OrderedDict()
        
    def get_conversation_context(
        self,
        session_id: Optional[str] = None,
        messages: Optional[List[Message]] = None,
        current_query: str = ""
    ) -> Tuple[List[Message], Optional[str]]:
        """Get conversation context for the current request.
        
        Args:
            session_id: Optional session identifier
            messages: Optional message history from request
            current_query: Current user query
            
        Returns:
            Tuple of (context_messages, session_id)
        """
        # Clean up expired sessions first
        self._cleanup_expired_sessions()
        
        # If messages provided directly, use them as context
        if messages:
            context = self._truncate_context(messages)
            logger.info(f"Using provided message context: {len(context)} messages")
            return context, session_id
        
        # If session_id provided, try to get session context
        if session_id and session_id in self._sessions:
            session_data = self._sessions[session_id]
            session_messages = session_data["messages"]
            context = self._truncate_context(session_messages)
            
            # Move session to end (LRU)
            self._sessions.move_to_end(session_id)
            session_data["last_accessed"] = time.time()
            
            logger.info(f"Retrieved session {session_id}: {len(context)} messages")
            return context, session_id
        
        # No existing context, return empty
        logger.info("No conversation context available")
        return [], session_id
    
    def update_session(
        self,
        session_id: Optional[str],
        user_message: str,
        assistant_response: str
    ) -> Optional[str]:
        """Update session with new message exchange.
        
        Args:
            session_id: Session identifier (creates new if None)
            user_message: User's message
            assistant_response: Assistant's response
            
        Returns:
            Updated session_id
        """
        if not session_id:
            session_id = self._generate_session_id()
            logger.info(f"Created new session: {session_id}")
        
        # Ensure we don't exceed max sessions
        if len(self._sessions) >= self.max_sessions:
            # Remove oldest session
            oldest_session = next(iter(self._sessions))
            del self._sessions[oldest_session]
            logger.info(f"Removed oldest session to make room: {oldest_session}")
        
        # Get or create session
        if session_id not in self._sessions:
            self._sessions[session_id] = {
                "messages": [],
                "created_at": time.time(),
                "last_accessed": time.time()
            }
        
        session_data = self._sessions[session_id]
        
        # Add new messages
        session_data["messages"].extend([
            Message(role="user", content=user_message),
            Message(role="assistant", content=assistant_response)
        ])
        
        # Update access time and move to end (LRU)
        session_data["last_accessed"] = time.time()
        self._sessions.move_to_end(session_id)
        
        # Truncate if necessary
        session_data["messages"] = self._truncate_context(session_data["messages"])
        
        logger.info(f"Updated session {session_id}: {len(session_data['messages'])} total messages")
        return session_id
    
    def _truncate_context(self, messages: List[Message]) -> List[Message]:
        """Truncate message list to fit within context window.
        
        Keeps the most recent messages while preserving conversation flow.
        """
        if len(messages) <= self.max_context_messages:
            return messages
        
        # Keep the most recent messages
        truncated = messages[-self.max_context_messages:]
        
        # Ensure we start with a user message for better context
        while truncated and truncated[0].role == "assistant" and len(truncated) > 1:
            truncated = truncated[1:]
        
        logger.info(f"Truncated context from {len(messages)} to {len(truncated)} messages")
        return truncated
    
    def _cleanup_expired_sessions(self) -> None:
        """Remove expired sessions to free memory."""
        current_time = time.time()
        expired_sessions = []
        
        for session_id, session_data in self._sessions.items():
            if current_time - session_data["last_accessed"] > self.session_timeout:
                expired_sessions.append(session_id)
        
        for session_id in expired_sessions:
            del self._sessions[session_id]
            logger.info(f"Cleaned up expired session: {session_id}")
    
    def _generate_session_id(self) -> str:
        """Generate a simple session identifier."""
        import uuid
        return str(uuid.uuid4())[:8]
    
    def get_session_stats(self) -> Dict:
        """Get statistics about current sessions."""
        current_time = time.time()
        active_sessions = 0
        
        for session_data in self._sessions.values():
            if current_time - session_data["last_accessed"] <= self.session_timeout:
                active_sessions += 1
        
        return {
            "total_sessions": len(self._sessions),
            "active_sessions": active_sessions,
            "max_sessions": self.max_sessions,
            "max_context_messages": self.max_context_messages
        }


# Global conversation manager instance
_conversation_manager: Optional[ConversationManager] = None


def get_conversation_manager() -> ConversationManager:
    """Get or create the global conversation manager instance."""
    global _conversation_manager
    if _conversation_manager is None:
        _conversation_manager = ConversationManager()
        logger.info("Initialized conversation manager")
    return _conversation_manager