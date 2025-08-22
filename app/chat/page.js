/**
 * Chat with Yaseen page
 * This is the main page for the chat interface with the Yaseen AI
 */
import ChatInterface from "@/app/components/chat/ChatInterface";

export const metadata = {
  title: "Chat with Yaseen - Islamic AI Assistant",
  description: "Ask questions about Islam and get answers based on the Quran and authentic Hadiths."
};

export default function ChatPage() {
  return (
    <div className="container mx-auto py-4 sm:py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-duson-ebony dark:text-duson-cream">
          Chat with <span className="text-duson-crimson">Yas</span><span className="text-duson-yellow">een</span>
        </h1>
        <p className="text-sm sm:text-base text-duson-ebony/70 dark:text-duson-cream/70 mb-4 sm:mb-6">
          Ask questions about Islam and receive answers based on authentic Islamic sources.
        </p>
        
        <ChatInterface />
      </div>
    </div>
  );
} 