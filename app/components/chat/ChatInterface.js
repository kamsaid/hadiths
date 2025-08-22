"use client";

/**
 * ChatInterface component
 * Main component for the chat functionality with streaming support and enhanced UI
 */
import { useState, useRef, useEffect, useCallback } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import ChatStatus from "./ChatStatus";

export default function ChatInterface() {
  // State for chat messages
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "As-salamu alaykum! I'm Yaseen, your Islamic knowledge companion. How can I assist you today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to scroll to the bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Parse Server-Sent Events data
  const parseSSEData = useCallback((chunk) => {
    const lines = chunk.split('\n');
    let content = '';
    
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6); // Remove 'data: ' prefix
        if (data === '[DONE]') {
          return { done: true, content };
        }
        content += data;
      }
    }
    
    return { done: false, content };
  }, []);

  // Handle streaming response
  const handleStreamingResponse = useCallback(async (response) => {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let fullContent = '';
    let citations = [];
    
    setIsStreaming(true);
    setStreamingMessage('');
    
    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep incomplete line in buffer
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            
            if (data === '[DONE]') {
              setIsStreaming(false);
              // Add final message to chat
              setMessages((prev) => [
                ...prev,
                { 
                  role: "assistant", 
                  content: fullContent || "I wasn't able to generate a response this time. Please try rephrasing your question.",
                  citations: citations
                },
              ]);
              setStreamingMessage('');
              return;
            }
            
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                fullContent += parsed.content;
                setStreamingMessage(fullContent);
              }
              if (parsed.citations) {
                citations = parsed.citations;
              }
            } catch (e) {
              // If not JSON, treat as plain text
              fullContent += data;
              setStreamingMessage(fullContent);
            }
          }
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Streaming error:', err);
        setError('Connection interrupted. Please try again.');
        setIsStreaming(false);
        setStreamingMessage('');
      }
    }
  }, []);

  // Handle sending a new message with streaming support
  const handleSendMessage = async (message) => {
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage = { role: "user", content: message };
    setMessages((prev) => [...prev, userMessage]);
    
    // Show loading state
    setIsLoading(true);
    setError(null);
    setStreamingMessage('');
    
    // Create new AbortController for this request
    abortControllerRef.current = new AbortController();
    
    try {
      // Try streaming endpoint first
      const response = await fetch("/api/chat/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: message }),
        signal: abortControllerRef.current.signal
      });
      
      setIsLoading(false);
      
      if (!response.ok) {
        // Fallback to regular endpoint if streaming fails
        console.log('Streaming endpoint failed, falling back to regular endpoint');
        return handleFallbackRequest(message);
      }
      
      // Handle streaming response
      await handleStreamingResponse(response);
      
    } catch (err) {
      setIsLoading(false);
      
      if (err.name === 'AbortError') {
        console.log('Request aborted');
        return;
      }
      
      console.error("Error with streaming endpoint:", err);
      // Fallback to regular endpoint
      return handleFallbackRequest(message);
    }
  };
  
  // Fallback to regular API endpoint
  const handleFallbackRequest = async (message) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);
      
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: message }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get a response");
      }
      
      const data = await response.json();

      const normalizedAnswer =
        typeof data?.answer === "string" && data.answer.trim().length > 0
          ? data.answer
          : "I wasn't able to generate a response this time. Please try rephrasing your question.";

      // Add assistant response to chat
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: normalizedAnswer, citations: data.citations || [] },
      ]);
    } catch (err) {
      console.error("Error sending message:", err);
      setError(err.message || "An error occurred while sending your message");
      
      // Add error message to chat
      setMessages((prev) => [
        ...prev,
        { 
          role: "assistant", 
          content: "I'm sorry, I encountered an error while processing your request. Please try again later.",
          isError: true 
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <div className="flex flex-col bg-gradient-to-br from-duson-cream/95 via-duson-cream to-duson-cream/90 dark:from-duson-ebony/95 dark:via-duson-ebony dark:to-duson-ebony/90 backdrop-blur-sm rounded-xl shadow-2xl border border-duson-ebony/10 dark:border-duson-cream/10 h-[600px] md:h-[700px] overflow-hidden relative">
      {/* Status indicator */}
      <ChatStatus 
        isLoading={isLoading}
        isStreaming={isStreaming}
        isConnected={true}
      />
      {/* Messages section */}
      <div className="flex-grow overflow-auto p-4 md:p-6 scrollbar-thin scrollbar-thumb-duson-yellow/20 scrollbar-track-transparent">
        <ChatMessages 
          messages={messages} 
          isLoading={isLoading}
          isStreaming={isStreaming}
          streamingMessage={streamingMessage}
        />
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input section */}
      <div className="border-t border-duson-ebony/10 dark:border-duson-cream/10 bg-duson-cream/50 dark:bg-duson-ebony/50 backdrop-blur-sm p-4 md:p-6">
        <ChatInput 
          onSendMessage={handleSendMessage} 
          isLoading={isLoading || isStreaming} 
          error={error}
        />
      </div>
    </div>
  );
} 