"use client";

/**
 * ChatStatus component
 * Displays connection and streaming status with Islamic theming
 */
export default function ChatStatus({ isLoading, isStreaming, isConnected = true }) {
  if (!isLoading && !isStreaming && isConnected) {
    return null;
  }

  return (
    <div className="absolute top-4 right-4 z-10">
      <div className="flex items-center space-x-2 bg-gradient-to-r from-duson-cream/90 to-duson-cream/80 dark:from-duson-ebony/90 dark:to-duson-ebony/80 backdrop-blur-md rounded-full px-3 py-2 shadow-lg border border-duson-ebony/10 dark:border-duson-cream/10">
        {isStreaming ? (
          <>
            <div className="w-2 h-2 bg-gradient-to-r from-duson-crimson to-duson-yellow rounded-full animate-pulse" />
            <span className="text-xs font-medium text-duson-ebony dark:text-duson-cream">
              Streaming
            </span>
          </>
        ) : isLoading ? (
          <>
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 bg-duson-yellow rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-duson-crimson rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-duson-yellow rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-xs font-medium text-duson-ebony dark:text-duson-cream">
              Connecting
            </span>
          </>
        ) : (
          <>
            <div className="w-2 h-2 bg-duson-crimson rounded-full" />
            <span className="text-xs font-medium text-duson-crimson">
              Disconnected
            </span>
          </>
        )}
      </div>
    </div>
  );
}