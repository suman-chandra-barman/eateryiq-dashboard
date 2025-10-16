"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { BarChart3, Lightbulb, Calendar, TrendingUp, Paperclip, Mic, Send, Plus } from "lucide-react"
import bot from "@/assets/bot.svg"
import user from "@/assets/user.jpg"
import Image from "next/image"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  avatar?: string
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
    id: "marketing-idea",
    label: "Marketing Idea",
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
    id: "sales-analyze",
    label: "Sales Analyze",
    icon: TrendingUp,
    color: "bg-green-500",
    prompt: "Analyze my sales performance",
  },
]

const quickActions = ["Show me today's sales.", "Any compliance issues?", "Need more staff for tonight's shift?"]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      avatar: "/abstract-geometric-shapes.png",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateResponse(content),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000)
  }

  const generateResponse = (prompt: string) => {
    // Simulate different responses based on prompt
    if (prompt.toLowerCase().includes("sales")) {
      return "Here's the results of 5 attention-grabbing headlines:\n\n• Revolutionize Customer Engagement with AI Chat Copywriter*\n• unleash the Power of AI Chat Copywriters for Transformative Customer Experiences*\n• Chatbots on Steroids: Meet the AI Copywriter Transforming Conversations*\n• From Bland to Brilliant: How AI Chat Copywriters Make Brands Conversational Rockstars*\n• say Goodbye to Boring Chats: AI Copywriters Elevate Conversational Marketing*"
    }
    return "I'm analyzing your request and will provide insights based on your restaurant's data. How else can I assist you today?"
  }

  const handleActionButton = (prompt: string) => {
    handleSendMessage(prompt)
  }

  const handleQuickAction = (action: string) => {
    handleSendMessage(action)
  }

  const handleFileAttach = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setAttachedFiles((prev) => [...prev, ...files])
    // You can process files here or display them
    console.log("[v0] Files attached:", files)
  }

  const handleVoiceMessage = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const mediaRecorder = new MediaRecorder(stream)
        const audioChunks: Blob[] = []

        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data)
        }

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/wav" })
          console.log("[v0] Voice recording completed:", audioBlob)
          // You can process the audio blob here (e.g., send to backend for transcription)
          stream.getTracks().forEach((track) => track.stop())
        }

        mediaRecorder.start()
        mediaRecorderRef.current = mediaRecorder
        setIsRecording(true)
      } catch (error) {
        console.error("[v0] Error accessing microphone:", error)
        alert("Unable to access microphone. Please check permissions.")
      }
    } else {
      // Stop recording
      mediaRecorderRef.current?.stop()
      setIsRecording(false)
    }
  }

  const showWelcomeScreen = messages.length === 0

  return (
    <Card className="h-full flex flex-col bg-background border-border py-0">
      {/* Chat Messages Area */}
      <div className="flex-1 p-8 overflow-auto">
        {showWelcomeScreen ? (
          // Welcome Screen
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <div className="text-center space-y-3">
              <h1 className="text-4xl font-bold text-foreground">Welcome To EateryGPT</h1>
              <p className="text-muted-foreground text-lg">
                Always-on insights and alerts for growth, compliance, and performance.
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
                    <span className="text-base font-medium">{action.label}</span>
                  </div>
                  <Plus className="w-5 h-5 text-muted-foreground" />
                </Button>
              ))}
            </div>
          </div>
        ) : (
          // Chat Messages
          <div className="space-y-6 max-w-4xl">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end items-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="flex items-end justify-center flex-shrink-0">
                    <Image src={bot} alt="AI" className="w-8 h-8" />
                  </div>
                )}
                <div
                  className={`rounded-lg p-4 max-w-[80%] ${
                    message.role === "user" ? "bg-blue-600 text-white" : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
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
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-semibold">AI</span>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]" />
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
            <div className="flex items-center gap-2 px-4 pt-3 pb-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage(inputValue)
                  }
                }}
                placeholder="Ask Anything..."
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base px-0 shadow-none"
              />
              <Button
                onClick={() => handleSendMessage(inputValue)}
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-transparent"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex items-center justify-between px-4 pb-3 pt-1">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleFileAttach}
                  className="h-auto p-0 text-muted-foreground hover:text-foreground hover:bg-transparent font-normal"
                >
                  <Paperclip className="w-4 h-4 mr-2" />
                  Attach
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*,video/*,.pdf,.doc,.docx,.txt"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleVoiceMessage}
                  className={`h-auto p-0 hover:bg-transparent font-normal ${
                    isRecording ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Mic className="w-4 h-4 mr-2" />
                  {isRecording ? "Stop Recording" : "Voice Message"}
                </Button>
              </div>
              <span className="text-sm text-muted-foreground">{inputValue.length}/3,000</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
