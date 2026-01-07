"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChatHistory } from "@/components/Chat/ChatHistory";
import { ChatInterface } from "@/components/Chat/ChatInterface";

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentChatId, setCurrentChatId] = useState<number | null>(null);

  // Load chat ID from URL on mount
  useEffect(() => {
    const chatIdParam = searchParams.get("chatId");
    if (chatIdParam) {
      setCurrentChatId(Number(chatIdParam));
    }
  }, [searchParams]);

  const handleChatSelect = (chatId: number) => {
    setCurrentChatId(chatId);
    router.push(`?chatId=${chatId}`, { scroll: false });
  };

  const handleNewChat = () => {
    setCurrentChatId(null);
    router.push("?", { scroll: false });
  };

  const handleChatCreated = (chatId: number) => {
    setCurrentChatId(chatId);
    router.push(`?chatId=${chatId}`, { scroll: false });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-125px)]">
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
