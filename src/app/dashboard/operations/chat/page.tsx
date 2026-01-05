"use client";

import { useState } from "react";
import { ChatHistory } from "@/components/ChatHistory";
import { ChatInterface } from "@/components/ChatInterface";

export default function ChatPage() {
  const [currentChatId, setCurrentChatId] = useState<number | null>(null);

  const handleChatSelect = (chatId: number) => {
    setCurrentChatId(chatId);
  };

  const handleNewChat = () => {
    setCurrentChatId(null);
  };

  const handleChatCreated = (chatId: number) => {
    setCurrentChatId(chatId);
  };

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-3xl font-medium text-[#3B3B3B] mb-4">
        EateryGPT Chat
      </h1>
      <div className="flex-1 flex overflow-hidden gap-4">
        <div className="flex-1 overflow-auto">
          <ChatInterface
            chatId={currentChatId}
            onChatCreated={handleChatCreated}
          />
        </div>
        <ChatHistory
          onChatSelect={handleChatSelect}
          onNewChat={handleNewChat}
          selectedChatId={currentChatId}
        />
      </div>
    </div>
  );
}
