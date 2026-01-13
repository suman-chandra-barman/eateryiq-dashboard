"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  BarChart3,
  Lightbulb,
  Calendar,
  TrendingUp,
  Paperclip,
  Send,
  Plus,
} from "lucide-react";
import bot from "@/assets/bot.svg";
import user from "@/assets/user.jpg";
import Image from "next/image";
import {
  useStartConversationMutation,
  useGetChatSessionQuery,
  useStartExecutiveConversationMutation,
  useGetExecutiveChatSessionQuery,
  useStartMarketingConversationMutation,
  useGetMarketingChatSessionQuery,
  type Message as ApiMessage,
  type SendMessageResponse,
  type GetSingleChatResponse,
} from "@/redux/features/chats/chatApi";
import Markdown from "react-markdown";
import AIThinkingIndicatorSkeleton from "../Skeletons/AIThinkingIndicatorSkeleton";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  avatar?: string;
}

const actionButtons = [
  {
    id: "sales-report",
    label: "Sales Report",
    icon: BarChart3,
    color: "bg-blue-500",
    prompt: "Generate a sales report for today",
  },
  {
    id: "marketing-planner",
    label: "Marketing Planner",
    icon: Lightbulb,
    color: "bg-red-500",
    prompt: "Give me marketing ideas for my restaurant",
  },
  {
    id: "event-boost",
    label: "Event Boost",
    icon: Calendar,
    color: "bg-pink-500",
    prompt: "How can I boost event attendance?",
  },
  {
    id: "sales-analysis",
    label: "Sales Analysis",
    icon: TrendingUp,
    color: "bg-green-500",
    prompt: "Analyze my sales performance",
  },
];

const quickActions = [
  "Show me today's sales.",
  "Any compliance issues?",
  "Need more staff for tonight's shift?",
];

type DashboardRole = "operations" | "executive" | "marketing";

interface ChatInterfaceProps {
  chatId?: number | null;
  onChatCreated?: (chatId: number) => void;
  role?: DashboardRole;
}

export function ChatInterface({
  chatId,
  onChatCreated,
  role = "operations",
}: ChatInterfaceProps = {}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // API hooks - Operations
  const [startOperationsConversation, { isLoading: isOperationsLoading }] =
    useStartConversationMutation();
  const { data: operationsChatSession } = useGetChatSessionQuery(
    chatId as number,
    {
      skip: !chatId || role !== "operations",
    }
  );

  // API hooks - Executive
  const [startExecutiveConversation, { isLoading: isExecutiveLoading }] =
    useStartExecutiveConversationMutation();
  const { data: executiveChatSession } = useGetExecutiveChatSessionQuery(
    chatId as number,
    {
      skip: !chatId || role !== "executive",
    }
  );

  // API hooks - Marketing
  const [startMarketingConversation, { isLoading: isMarketingLoading }] =
    useStartMarketingConversationMutation();
  const { data: marketingChatSession } = useGetMarketingChatSessionQuery(
    chatId as number,
    {
      skip: !chatId || role !== "marketing",
    }
  );

  // Select the appropriate hooks based on role
  const startConversation =
    role === "executive"
      ? startExecutiveConversation
      : role === "marketing"
      ? startMarketingConversation
      : startOperationsConversation;

  const chatSession =
    role === "executive"
      ? executiveChatSession
      : role === "marketing"
      ? marketingChatSession
      : operationsChatSession;

  const isLoading =
    role === "executive"
      ? isExecutiveLoading
      : role === "marketing"
      ? isMarketingLoading
      : isOperationsLoading;

  // Load messages from API when available
  useEffect(() => {
    if (!chatId) {
      // Clear messages when there's no chatId (new chat)
      setMessages([]);
    } else if (chatSession?.data?.messages) {
      const formattedMessages: Message[] = chatSession.data.messages.map(
        (msg: ApiMessage) => ({
          id: msg.id,
          role: msg.role,
          content: msg.content,
        })
      );
      setMessages(formattedMessages);
    }
  }, [chatSession, chatId]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    setInputValue("");
    const fileToSend = selectedFile;
    setSelectedFile(null);

    try {
      // Start a new conversation or continue existing one with FormData
      const response = await startConversation({
        message: content,
        file: fileToSend,
        sessionId: chatId || undefined,
      }).unwrap();

      // Update messages from response
      if (response.data.messages) {
        const formattedMessages: Message[] = response.data.messages.map(
          (msg: ApiMessage) => ({
            id: msg.id,
            role: msg.role,
            content: msg.content,
          })
        );
        setMessages(formattedMessages);
      }

      // Notify parent component about new chat
      if (!chatId && response.data.session.id && onChatCreated) {
        onChatCreated(response.data.session.id);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      // Optionally show error toast
    }
  };

  const handleActionButton = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };

  const handleFileAttach = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const showWelcomeScreen = messages.length === 0;

  return (
    <Card className="h-full flex flex-col bg-background border-border py-0">
      {/* Chat Messages Area */}
      <div className="flex-1 p-8 overflow-auto">
        {showWelcomeScreen ? (
          // Welcome Screen
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {isLoading ? (
              <AIThinkingIndicatorSkeleton />
            ) : (
              <>
                <div className="text-center space-y-3">
                  <h1 className="text-4xl font-bold text-foreground">
                    Welcome To EateryGPT
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Always-on insights and alerts for growth, compliance, and
                    performance.
                  </p>
                </div>

                {/* Action Buttons Grid */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
                  {actionButtons.map((action) => (
                    <Button
                      key={action.id}
                      variant="outline"
                      className="h-auto py-4 px-6 justify-between hover:bg-accent bg-transparent"
                      onClick={() => handleActionButton(action.prompt)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`${action.color} p-2 rounded-lg`}>
                          <action.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-base font-medium">
                          {action.label}
                        </span>
                      </div>
                      <Plus className="w-5 h-5 text-muted-foreground" />
                    </Button>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          // Chat Messages
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === "user"
                    ? "justify-end items-end"
                    : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex items-end justify-center flex-shrink-0">
                    <figure className="p-0.5 rounded-full bg-blue-50">
                      <Image src={bot} alt="AI" className="w-8 h-8" />
                    </figure>
                  </div>
                )}
                {/* User Message  */}
                <div
                  className={`p-4 max-w-[80%] ${
                    message.role === "user"
                      ? "bg-blue-600 text-white rounded-2xl rounded-br-none"
                      : "bg-blue-50 rounded-2xl rounded-bl-none"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">
                    <Markdown>{message.content}</Markdown>
                  </p>
                </div>
                {message.role === "user" && message.avatar && (
                  <Image
                    src={user}
                    alt="User"
                    className="w-8 h-8 rounded-full flex-shrink-0"
                  />
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="flex items-end justify-center flex-shrink-0">
                  <Image src={bot} alt="AI" className="w-8 h-8" />
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      AI is thinking
                    </span>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-[#F319DD] rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Message Input */}
      <div className="p-6">
        {showWelcomeScreen && (
          <div className="flex flex-wrap gap-3 justify-center mb-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                className="text-muted-foreground hover:text-foreground text-sm"
                onClick={() => handleQuickAction(action)}
              >
                {action}
              </Button>
            ))}
          </div>
        )}

        <div className="relative rounded-2xl bg-gradient-to-r from-blue-500 via-[#F319DD] to-green-500 p-[2px]">
          <div className="bg-background rounded-2xl">
            {selectedFile && (
              <div className="px-4 pt-3 pb-2">
                <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
                  <Paperclip className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm flex-1 truncate">
                    {selectedFile.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleRemoveFile}
                    className="h-6 w-6 text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </Button>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2 px-4 pt-3 pb-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(inputValue);
                  }
                }}
                placeholder="Ask Anything..."
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base px-0 shadow-none"
                disabled={isLoading}
              />
              <Button
                onClick={() => handleSendMessage(inputValue)}
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-transparent"
                disabled={isLoading}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex items-center justify-between px-4 pb-3 pt-1">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={isLoading}
                  onClick={handleFileAttach}
                  className="h-auto p-0 text-muted-foreground hover:text-foreground hover:bg-transparent font-normal"
                >
                  <Paperclip className="w-4 h-4 mr-2" />
                  Attach
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*,video/*,.pdf,.doc,.docx,.txt,.xlsx"
                />
              </div>
              <span className="text-sm text-muted-foreground">
                {inputValue.length}/3,000
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
