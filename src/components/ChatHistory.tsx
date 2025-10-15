"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Plus, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ChatHistoryItem {
  id: string
  title: string
  preview: string
  timestamp: Date
}

const mockHistory: ChatHistoryItem[] = [
  {
    id: "1",
    title: "How many employees do I ne...",
    preview: "Analyzing your traffic and sales trends, you'll...",
    timestamp: new Date(),
  },
  {
    id: "2",
    title: "How many employees do I ne...",
    preview: "Analyzing your traffic and sales trends, you'll...",
    timestamp: new Date(),
  },
  {
    id: "3",
    title: "How many employees do I ne...",
    preview: "Analyzing your traffic and sales trends, you'll...",
    timestamp: new Date(),
  },
  {
    id: "4",
    title: "How many employees do I ne...",
    preview: "Analyzing your traffic and sales trends, you'll...",
    timestamp: new Date(),
  },
  {
    id: "5",
    title: "How many employees do I ne...",
    preview: "Analyzing your traffic and sales trends, you'll...",
    timestamp: new Date(),
  },
  {
    id: "6",
    title: "How many employees do I ne...",
    preview: "Analyzing your traffic and sales trends, you'll...",
    timestamp: new Date(),
  },
  {
    id: "7",
    title: "How many employees do I ne...",
    preview: "Analyzing your traffic and sales trends, you'll...",
    timestamp: new Date(),
  },
]

export function ChatHistory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedChats, setSelectedChats] = useState<string[]>([])
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [history, setHistory] = useState(mockHistory)

  const filteredHistory = history.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.preview.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleChatSelection = (id: string) => {
    setSelectedChats((prev) => (prev.includes(id) ? prev.filter((chatId) => chatId !== id) : [...prev, id]))
  }

  const handleBulkDelete = () => {
    setHistory((prev) => prev.filter((item) => !selectedChats.includes(item.id)))
    setSelectedChats([])
    setShowDeleteDialog(false)
  }

  const handleNewPage = () => {
    // Reset to welcome screen
    window.location.reload()
  }

  return (
    <>
      <Card className="w-80 border-l border-border bg-background flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-foreground">Chat History</h2>
            <span className="text-xs text-muted-foreground">({history.length})</span>
          </div>
          {selectedChats.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-500/10"
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="p-4 pt-0 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="pl-9 bg-muted border-0"
            />
          </div>
        </div>

        {/* New Page Button */}
        <div className="p-4 pt-0 border-b border-border">
          <Button variant="ghost" className="w-full justify-between hover:bg-accent p-2 h-16" onClick={handleNewPage}>
            <div className="flex flex-col items-start">
              <span className="font-medium">New Page</span>
              <span className="text-xs text-muted-foreground">Ask Anything...</span>
            </div>
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        {/* Chat History List */}
        <div className="flex-1 overflow-auto">
          {filteredHistory.map((item) => (
            <div key={item.id} className="p-4 border-b border-border hover:bg-accent cursor-pointer group relative">
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={selectedChats.includes(item.id)}
                  onCheckedChange={() => toggleChatSelection(item.id)}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm text-foreground truncate">{item.title}</h3>
                  <p className="text-xs text-muted-foreground truncate mt-1">{item.preview}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Chat History</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedChats.length} selected chat
              {selectedChats.length > 1 ? "s" : ""}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
