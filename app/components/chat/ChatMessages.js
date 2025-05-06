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
      <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Citations:</p>
        <div className="space-y-1">
          {citations.map((citation, i) => {
            const citationKey = `${messageIndex}-${i}`;
            const isExpanded = expandedCitations[citationKey];
            
            return (
              <div 
                key={i} 
                className="text-xs bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded"
              >
                <button 
                  onClick={() => toggleCitation(messageIndex, i)}
                  className="text-left w-full flex items-center justify-between"
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
                  <div className="mt-1 text-gray-600 dark:text-gray-300">
                    {citation.type === "quran" ? (
                      <a 
                        href={`/quran?verse=${citation.ref}`} 
                        className="text-emerald-600 dark:text-emerald-400 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View in Quran
                      </a>
                    ) : (
                      <a 
                        href={`/hadith?ref=${citation.ref}`} 
                        className="text-emerald-600 dark:text-emerald-400 hover:underline"
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
                  ? 'bg-emerald-100 dark:bg-emerald-900/30 text-gray-800 dark:text-gray-100'
                  : message.isError
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100'
              }`}
            >
              {/* Display message content with proper whitespace handling */}
              <div className="whitespace-pre-wrap">
                {message.content}
              </div>
              
              {/* Render citations if present (only for assistant messages) */}
              {!isUser && message.citations && renderCitations(message.citations, index)}
            </div>
          </div>
        );
      })}
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex items-center space-x-2 max-w-[80%]">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Yaseen is thinking...</span>
          </div>
        </div>
      )}
    </div>
  );
} 