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
    <form onSubmit={handleSubmit} className="relative space-y-3">
      {/* Error message with enhanced styling */}
      {error && (
        <div className="animate-in slide-in-from-top-2 duration-300 p-3 bg-gradient-to-r from-duson-crimson/20 to-duson-crimson/10 border border-duson-crimson/30 rounded-xl backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-duson-crimson" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-duson-crimson">Error: {error}</span>
          </div>
        </div>
      )}
      
      <div className="relative">
        {/* Enhanced input area with glassmorphism */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-duson-cream/60 via-duson-cream/40 to-duson-cream/30 dark:from-duson-ebony/60 dark:via-duson-ebony/40 dark:to-duson-ebony/30 backdrop-blur-md border border-duson-ebony/20 dark:border-duson-cream/20 shadow-lg transition-all duration-300 focus-within:border-duson-yellow/50 focus-within:shadow-xl focus-within:scale-[1.02]">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-duson-yellow/5 via-transparent to-duson-crimson/5 pointer-events-none" />
          
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask Yaseen a question about Islam..."
            className="w-full py-4 px-6 pr-16 bg-transparent border-none resize-none focus:outline-none text-duson-ebony dark:text-duson-cream placeholder:text-duson-ebony/60 dark:placeholder:text-duson-cream/60 leading-relaxed"
            rows={1}
            disabled={isLoading}
            aria-label="Your message to Yaseen"
            aria-describedby="chat-input-hint"
            autoComplete="off"
            spellCheck="true"
            style={{
              minHeight: '60px',
              maxHeight: '120px'
            }}
          />
          
          {/* Enhanced send button */}
          <button
            type="submit"
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-3 rounded-xl transition-all duration-300 ${
              isLoading || !inputValue.trim()
                ? 'text-duson-ebony/40 dark:text-duson-cream/40 cursor-not-allowed scale-95'
                : 'text-white bg-gradient-to-r from-duson-crimson to-duson-yellow hover:from-duson-yellow hover:to-duson-crimson shadow-lg hover:shadow-xl hover:scale-110 active:scale-95'
            }`}
            disabled={isLoading || !inputValue.trim()}
            aria-label="Send message"
          >
            {isLoading ? (
              // Enhanced loading spinner
              <div className="relative">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-duson-yellow/20 to-duson-crimson/20 animate-pulse" />
              </div>
            ) : (
              // Enhanced send icon with micro-interaction
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform transition-transform duration-200 hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
          
          {/* Typing indicator line */}
          <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-duson-yellow to-duson-crimson transition-all duration-300 ${
            inputValue.trim() ? 'w-full opacity-100' : 'w-0 opacity-0'
          }`} />
        </div>
      </div>
      
      {/* Enhanced hint with Islamic styling */}
      <div id="chat-input-hint" className="flex items-center justify-between text-xs text-duson-ebony/60 dark:text-duson-cream/60">
        <div className="flex items-center space-x-2">
          <svg className="w-3 h-3 text-duson-yellow" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>Press Enter to send • Shift+Enter for new line</span>
        </div>
        <div className="flex items-center space-x-1 text-duson-crimson/70 hidden sm:flex">
          <span>Powered by authentic Islamic sources</span>
          <div className="w-2 h-2 bg-duson-crimson/50 rounded-full animate-pulse" aria-hidden="true" />
        </div>
      </div>
    </form>
  );
} 