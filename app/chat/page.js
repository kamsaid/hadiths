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
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
          Chat with <span className="text-green-500">Yas</span><span className="text-yellow-500">een</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Ask questions about Islam and receive answers based on authentic Islamic sources.
        </p>
        
        <ChatInterface />
      </div>
    </div>
  );
} 