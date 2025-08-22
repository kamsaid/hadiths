"use client";

/**
 * ChatMessages component
 * Renders the list of chat messages with modern styling, streaming support, and typewriter effects
 */
import { useState } from "react";
import TypeWriter from "./TypeWriter";

export default function ChatMessages({ messages, isLoading, isStreaming, streamingMessage }) {
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
    <div className="space-y-6">
      {/* Map through messages and render each one */}
      {messages.map((message, index) => {
        const isUser = message.role === "user";
        
        return (
          <div 
            key={index} 
            className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4 duration-500`}
            style={{ animationDelay: `${index * 100}ms` }}
            role="article"
            aria-label={`${isUser ? 'Your message' : 'Yaseen\'s response'}`}
          >
            <div className={`group relative ${isUser ? 'ml-12' : 'mr-12'} max-w-[85%] md:max-w-[75%]`}>
              {/* Message bubble with enhanced styling */}
              <div 
                className={`relative rounded-2xl px-5 py-4 shadow-lg transform transition-all duration-300 hover:scale-[1.02] ${
                  isUser
                    ? 'bg-gradient-to-br from-duson-yellow/30 via-duson-yellow/20 to-duson-yellow/10 border border-duson-yellow/40 text-duson-ebony dark:text-duson-ebony backdrop-blur-sm'
                    : message.isError
                      ? 'bg-gradient-to-br from-duson-crimson/20 via-duson-crimson/10 to-duson-crimson/5 border border-duson-crimson/30 text-duson-crimson backdrop-blur-sm'
                      : 'bg-gradient-to-br from-duson-cream/90 via-duson-cream/80 to-duson-cream/70 dark:from-duson-ebony/90 dark:via-duson-ebony/80 dark:to-duson-ebony/70 border border-duson-ebony/20 dark:border-duson-cream/20 text-duson-ebony dark:text-duson-cream backdrop-blur-md shadow-xl'
                }`}
              >
                {/* Message timestamp (appears on hover) */}
                <div 
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -top-6 text-xs text-duson-ebony/50 dark:text-duson-cream/50"
                  aria-label="Message timestamp"
                >
                  {new Date().toLocaleTimeString()}
                </div>
                
                {/* Display message content */}
                <div className="whitespace-pre-wrap leading-relaxed">
                  {typeof message.content === 'string' && message.content.trim().length > 0
                    ? message.content
                    : '...'}
                </div>
                
                {/* Render citations if present (only for assistant messages) */}
                {!isUser && message.citations && renderCitations(message.citations, index)}
                
                {/* Message tail/pointer */}
                <div className={`absolute top-4 w-0 h-0 ${
                  isUser 
                    ? 'right-[-8px] border-l-[12px] border-l-duson-yellow/40 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent'
                    : 'left-[-8px] border-r-[12px] border-r-duson-cream/80 dark:border-r-duson-ebony/80 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent'
                }`} />
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Streaming message with typewriter effect */}
      {isStreaming && streamingMessage && (
        <div className="flex justify-start animate-in slide-in-from-bottom-4 duration-300" role="article" aria-live="polite" aria-label="Yaseen is typing a response">
          <div className="group relative mr-12 max-w-[85%] md:max-w-[75%]">
            <div className="relative rounded-2xl px-5 py-4 bg-gradient-to-br from-duson-cream/90 via-duson-cream/80 to-duson-cream/70 dark:from-duson-ebony/90 dark:via-duson-ebony/80 dark:to-duson-ebony/70 border border-duson-ebony/20 dark:border-duson-cream/20 text-duson-ebony dark:text-duson-cream backdrop-blur-md shadow-xl">
              <div className="whitespace-pre-wrap leading-relaxed">
                <TypeWriter 
                  text={streamingMessage}
                  speed={50}
                  showCursor={true}
                  className=""
                />
              </div>
              
              {/* Streaming indicator */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-duson-crimson to-duson-yellow rounded-full animate-pulse shadow-lg border-2 border-white dark:border-duson-ebony" />
              
              {/* Message tail */}
              <div className="absolute top-4 left-[-8px] w-0 h-0 border-r-[12px] border-r-duson-cream/80 dark:border-r-duson-ebony/80 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent" />
            </div>
          </div>
        </div>
      )}
      
      {/* Enhanced loading indicator */}
      {isLoading && (
        <div className="flex justify-start animate-in slide-in-from-bottom-4 duration-300" role="status" aria-live="polite" aria-label="Yaseen is thinking">
          <div className="group relative mr-12 max-w-[280px]">
            <div className="relative rounded-2xl px-6 py-5 bg-gradient-to-br from-duson-cream/90 via-duson-cream/80 to-duson-cream/70 dark:from-duson-ebony/90 dark:via-duson-ebony/80 dark:to-duson-ebony/70 border border-duson-ebony/20 dark:border-duson-cream/20 backdrop-blur-md shadow-xl">
              {/* Thinking animation */}
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 bg-gradient-to-r from-duson-yellow to-duson-crimson rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2.5 h-2.5 bg-gradient-to-r from-duson-crimson to-duson-yellow rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                  <div className="w-2.5 h-2.5 bg-gradient-to-r from-duson-yellow to-duson-crimson rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                </div>
                <span className="text-sm font-medium text-duson-ebony/80 dark:text-duson-cream/80 bg-gradient-to-r from-duson-ebony to-duson-crimson bg-clip-text">
                  Yaseen is thinking...
                </span>
              </div>
              
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-duson-yellow/10 to-duson-crimson/10 animate-pulse" />
              
              {/* Message tail */}
              <div className="absolute top-4 left-[-8px] w-0 h-0 border-r-[12px] border-r-duson-cream/80 dark:border-r-duson-ebony/80 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent" />
            </div>
          </div>
        </div>
      )}
      
      {/* Connection status indicator */}
      {isStreaming && !streamingMessage && (
        <div className="flex justify-start animate-in slide-in-from-bottom-4 duration-300" role="status" aria-live="polite" aria-label="Connecting to Yaseen">
          <div className="group relative mr-12 max-w-[240px]">
            <div className="relative rounded-2xl px-5 py-4 bg-gradient-to-br from-duson-crimson/20 via-duson-crimson/10 to-duson-yellow/10 border border-duson-crimson/30 backdrop-blur-md shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-duson-crimson rounded-full animate-pulse" />
                <span className="text-sm font-medium text-duson-crimson">
                  Connecting to Yaseen...
                </span>
              </div>
              
              {/* Message tail */}
              <div className="absolute top-4 left-[-8px] w-0 h-0 border-r-[12px] border-r-duson-crimson/20 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 