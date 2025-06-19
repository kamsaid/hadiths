"use client";

/**
 * ChatInput component
 * Handles user input for sending messages to the AI assistant
 */
import { useState, useRef, useEffect } from "react";

export default function ChatInput({ onSendMessage, isLoading, error }) {
  // State for the input value
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  // Focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  // Handle keydown for textarea (Ctrl+Enter or Command+Enter to submit)
  const handleKeyDown = (e) => {
    // Submit on Enter (not Shift+Enter which is for new line)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      {/* Error message (if any) */}
      {error && (
        <div className="mb-2 text-sm text-duson-crimson">
          Error: {error}
        </div>
      )}
      
      <div className="relative flex items-center">
        {/* Text input area - updated to use current app theme colors */}
        <textarea
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask Yaseen a question about Islam..."
          className="flex-grow py-3 px-4 pr-12 bg-duson-cream/50 dark:bg-duson-ebony/80 border border-duson-ebony/20 dark:border-duson-cream/20 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-duson-yellow focus:border-duson-yellow text-duson-ebony dark:text-duson-cream placeholder:text-duson-ebony/60 dark:placeholder:text-duson-cream/60"
          rows={1}
          disabled={isLoading}
          aria-label="Your message"
        />
        
        {/* Send button - updated to use current app theme colors */}
        <button
          type="submit"
          className={`absolute right-2 p-2 rounded-full transition-colors duration-200 ${
            isLoading || !inputValue.trim()
              ? 'text-duson-ebony/40 dark:text-duson-cream/40 cursor-not-allowed'
              : 'text-duson-crimson hover:bg-duson-yellow/20 hover:text-duson-ebony dark:hover:bg-duson-yellow/20'
          }`}
          disabled={isLoading || !inputValue.trim()}
          aria-label="Send message"
        >
          {isLoading ? (
            // Loading spinner
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            // Send icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Hint below the input - updated to use current app theme colors */}
      <p className="text-xs text-duson-ebony/60 dark:text-duson-cream/60 mt-2">
        Press Enter to send. Yaseen will answer based on authentic Islamic sources.
      </p>
    </form>
  );
} 