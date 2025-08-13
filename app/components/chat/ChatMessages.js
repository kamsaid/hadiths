"use client";

/**
 * ChatMessages component
 * Renders the list of chat messages with different styling for user and assistant messages
 */
import { useState } from "react";

export default function ChatMessages({ messages, isLoading }) {
  // State to track expanded citation details
  const [expandedCitations, setExpandedCitations] = useState({});
  
  // Toggle citation details
  const toggleCitation = (index, citationIndex) => {
    setExpandedCitations(prev => {
      const key = `${index}-${citationIndex}`;
      return {
        ...prev,
        [key]: !prev[key]
      };
    });
  };
  
  // Function to render citations if present
  const renderCitations = (citations, messageIndex) => {
    if (!citations || citations.length === 0) return null;
    
    return (
      <div className="mt-3 pt-2 border-t border-duson-ebony/20 dark:border-duson-cream/20">
        <p className="text-xs text-duson-ebony/60 dark:text-duson-cream/60 mb-1">Citations:</p>
        <div className="space-y-1">
          {citations.map((citation, i) => {
            const citationKey = `${messageIndex}-${i}`;
            const isExpanded = expandedCitations[citationKey];
            
            return (
              <div 
                key={i} 
                className="text-xs bg-duson-cream/50 dark:bg-duson-ebony/50 px-2 py-1 rounded border border-duson-ebony/10 dark:border-duson-cream/10"
              >
                <button 
                  onClick={() => toggleCitation(messageIndex, i)}
                  className="text-left w-full flex items-center justify-between hover:text-duson-crimson transition-colors duration-200"
                  aria-label={`Toggle citation ${citation.ref} details`}
                >
                  <span className="font-medium">
                    {citation.type === "quran" ? "Quran" : "Hadith"}: {citation.ref}
                  </span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-3 w-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isExpanded && (
                  <div className="mt-1 text-duson-ebony/80 dark:text-duson-cream/80">
                    {citation.type === "quran" ? (
                      <a 
                        href={`/quran?verse=${citation.ref}`} 
                        className="text-duson-crimson hover:text-duson-yellow hover:underline transition-colors duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View in Quran
                      </a>
                    ) : (
                      <a 
                        href={`/hadith?ref=${citation.ref}`} 
                        className="text-duson-crimson hover:text-duson-yellow hover:underline transition-colors duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View in Hadith collection
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Map through messages and render each one */}
      {messages.map((message, index) => {
        const isUser = message.role === "user";
        
        return (
          <div 
            key={index} 
            className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`rounded-lg p-3 max-w-[80%] ${
                isUser
                  ? 'bg-duson-yellow/20 border border-duson-yellow/30 text-duson-ebony dark:text-duson-ebony'
                  : message.isError
                    ? 'bg-duson-crimson/10 border border-duson-crimson/20 text-duson-crimson'
                    : 'bg-duson-cream/80 dark:bg-duson-ebony/80 border border-duson-ebony/10 dark:border-duson-cream/10 text-duson-ebony dark:text-duson-cream'
              }`}
            >
              {/* Display message content with a defensive fallback so the UI never collapses */}
              <div className="whitespace-pre-wrap">
                {typeof message.content === 'string' && message.content.trim().length > 0
                  ? message.content
                  : '...'}
              </div>
              
              {/* Render citations if present (only for assistant messages) */}
              {!isUser && message.citations && renderCitations(message.citations, index)}
            </div>
          </div>
        );
      })}
      
      {/* Loading indicator - updated to use current app theme colors */}
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-duson-cream/80 dark:bg-duson-ebony/80 border border-duson-ebony/10 dark:border-duson-cream/10 rounded-lg p-4 flex items-center space-x-2 max-w-[80%]">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-duson-yellow rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-duson-crimson rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-duson-yellow rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <span className="text-sm text-duson-ebony/70 dark:text-duson-cream/70">Yaseen is thinking...</span>
          </div>
        </div>
      )}
    </div>
  );
} 