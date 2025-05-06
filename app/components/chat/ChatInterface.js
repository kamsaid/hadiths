"use client";

/**
 * ChatInterface component
 * Main component for the chat functionality with message history and input handling
 */
import { useState, useRef, useEffect } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function ChatInterface() {
  // State for chat messages
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "As-salamu alaykum! I'm Yaseen, your Islamic knowledge companion. How can I assist you today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to scroll to the bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle sending a new message
  const handleSendMessage = async (message) => {
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage = { role: "user", content: message };
    setMessages((prev) => [...prev, userMessage]);
    
    // Show loading state
    setIsLoading(true);
    setError(null);
    
    try {
      // Send message to API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: message }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get a response");
      }
      
      const data = await response.json();
      
      // Add assistant response to chat
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer, citations: data.citations || [] },
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

  return (
    <div className="flex flex-col bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 h-[600px]">
      {/* Messages section */}
      <div className="flex-grow overflow-auto p-4">
        <ChatMessages 
          messages={messages} 
          isLoading={isLoading} 
        />
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input section */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-4">
        <ChatInput 
          onSendMessage={handleSendMessage} 
          isLoading={isLoading} 
          error={error}
        />
      </div>
    </div>
  );
} 