"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Plus, Trash2 } from "lucide-react";
import { DeleteChatDialog } from "@/components/Dailog/DeleteChatDialog";
import {
  useGetChatsQuery,
  useDeleteChatsMutation,
  useGetExecutiveChatsQuery,
  useDeleteExecutiveChatsMutation,
  useGetMarketingChatsQuery,
  useDeleteMarketingChatsMutation,
} from "@/redux/features/chats/chatApi";

type DashboardRole = "operations" | "executive" | "marketing";

interface ChatHistoryProps {
  onChatSelect?: (chatId: number) => void;
  onNewChat?: () => void;
  selectedChatId?: number | null;
  role?: DashboardRole;
}

export function ChatHistory({
  onChatSelect,
  onNewChat,
  selectedChatId,
  role = "operations",
}: ChatHistoryProps = {}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChats, setSelectedChats] = useState<number[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // API hooks - Operations
  const {
    data: operationsChatsData,
    isLoading: isOperationsLoading,
    error: operationsError,
  } = useGetChatsQuery(
    {
      search: searchQuery || undefined,
    },
    {
      skip: role !== "operations",
    }
  );
  const [deleteOperationsChats, { isLoading: isDeletingOperations }] =
    useDeleteChatsMutation();

  // API hooks - Executive
  const {
    data: executiveChatsData,
    isLoading: isExecutiveLoading,
    error: executiveError,
  } = useGetExecutiveChatsQuery(
    {
      search: searchQuery || undefined,
    },
    {
      skip: role !== "executive",
    }
  );
  const [deleteExecutiveChats, { isLoading: isDeletingExecutive }] =
    useDeleteExecutiveChatsMutation();

  // API hooks - Marketing
  const {
    data: marketingChatsData,
    isLoading: isMarketingLoading,
    error: marketingError,
  } = useGetMarketingChatsQuery(
    {
      search: searchQuery || undefined,
    },
    {
      skip: role !== "marketing",
    }
  );
  const [deleteMarketingChats, { isLoading: isDeletingMarketing }] =
    useDeleteMarketingChatsMutation();

  // Select the appropriate hooks based on role
  const chatsData =
    role === "executive"
      ? executiveChatsData
      : role === "marketing"
      ? marketingChatsData
      : operationsChatsData;

  const isLoading =
    role === "executive"
      ? isExecutiveLoading
      : role === "marketing"
      ? isMarketingLoading
      : isOperationsLoading;

  const error =
    role === "executive"
      ? executiveError
      : role === "marketing"
      ? marketingError
      : operationsError;

  const deleteChats =
    role === "executive"
      ? deleteExecutiveChats
      : role === "marketing"
      ? deleteMarketingChats
      : deleteOperationsChats;

  const isDeleting =
    role === "executive"
      ? isDeletingExecutive
      : role === "marketing"
      ? isDeletingMarketing
      : isDeletingOperations;

  const history = chatsData?.data || [];

  const filteredHistory = searchQuery
    ? history.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : history;

  const toggleChatSelection = (id: number) => {
    setSelectedChats((prev) =>
      prev.includes(id) ? prev.filter((chatId) => chatId !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    try {
      await deleteChats(selectedChats).unwrap();
      setSelectedChats([]);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error("Failed to delete chats:", error);
      // Optionally show error toast
    }
  };

  const handleNewPage = async () => {
    setSelectedChats([]);
    if (onNewChat) {
      onNewChat();
    }
  };

  const handleChatClick = (chatId: number) => {
    if (onChatSelect) {
      onChatSelect(chatId);
    }
  };

  return (
    <>
      <Card className="w-80 border-l border-border bg-background flex flex-col h-full py-4">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-xl md:text-2xl">Chat History</h2>
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
          <Button
            variant="ghost"
            className="w-full justify-between hover:bg-accent p-2 h-16"
            onClick={handleNewPage}
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">New Page</span>
              <span className="text-xs text-muted-foreground">
                Ask Anything...
              </span>
            </div>
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        {/* Chat History List */}
        <div className="flex-1 overflow-auto">
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground">
              Loading chats...
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-500">
              Failed to load chats
            </div>
          ) : filteredHistory.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              {searchQuery ? "No chats found" : "No chat history yet"}
            </div>
          ) : (
            filteredHistory.map((item) => (
              <div
                key={item.id}
                className={`p-4 border-b border-border hover:bg-accent cursor-pointer group relative ${
                  selectedChatId === item.id ? "bg-accent" : ""
                }`}
                onClick={() => handleChatClick(item.id)}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={selectedChats.includes(item.id)}
                    onCheckedChange={() => {
                      toggleChatSelection(item.id);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm text-foreground truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate mt-1">
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Delete Confirmation Dialog */}
      <DeleteChatDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        selectedCount={selectedChats.length}
        onConfirm={handleBulkDelete}
        isDeleting={isDeleting}
      />
    </>
  );
}
