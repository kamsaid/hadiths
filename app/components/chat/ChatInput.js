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
        <div className="mb-2 text-sm text-red-500 dark:text-red-400">
          Error: {error}
        </div>
      )}
      
      <div className="relative flex items-center">
        {/* Text input area */}
        <textarea
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask Yaseen a question about Islam..."
          className="flex-grow py-3 px-4 pr-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600"
          rows={1}
          disabled={isLoading}
          aria-label="Your message"
        />
        
        {/* Send button */}
        <button
          type="submit"
          className={`absolute right-2 p-2 rounded-full ${
            isLoading || !inputValue.trim()
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-emerald-600 dark:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-700'
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
      
      {/* Hint below the input */}
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Press Enter to send. Yaseen will answer based on authentic Islamic sources.
      </p>
    </form>
  );
} 