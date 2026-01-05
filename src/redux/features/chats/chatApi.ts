import { baseApi } from "@/redux/api/baseApi";

// Types for chat API matching backend structure
export interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  meta: Record<string, unknown>;
  created_at: string;
}

export interface ChatSession {
  id: number;
  dashboard_role: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface ChatSessionDetail {
  session: ChatSession;
  reply: string;
  messages: Message[];
}

export interface SendMessageResponse {
  success: boolean;
  message: string;
  meta: {
    total: number;
  };
  data: ChatSessionDetail;
  requestId: string;
}

export interface GetChatsResponse {
  success: boolean;
  message: string;
  meta: {
    total: number;
  };
  data: ChatSession[];
  requestId: string;
}

export interface GetSingleChatResponse {
  success: boolean;
  message: string;
  meta: {
    total: number;
  };
  data: ChatSessionDetail;
  requestId: string;
}

export interface DeleteChatResponse {
  success: boolean;
  message: string;
  requestId: string;
}

// Extended baseApi with chat endpoints
export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all chat sessions (chat history)
    getChats: builder.query<GetChatsResponse, { search?: string }>({
      query: ({ search }) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        const queryString = params.toString();
        return `/api/dashboards/operations/chat/sessions/${
          queryString ? `?${queryString}` : ""
        }`;
      },
      providesTags: ["Chats"],
    }),

    // Get single chat session with messages
    getChatSession: builder.query<GetSingleChatResponse, number>({
      query: (sessionId) =>
        `/api/dashboards/operations/chat/sessions/${sessionId}/`,
      providesTags: (result, error, sessionId) => [
        { type: "ChatMessages", id: sessionId },
      ],
    }),

    // Start a new conversation or send message to existing chat
    startConversation: builder.mutation<
      SendMessageResponse,
      { message: string; file?: File | null; sessionId?: number }
    >({
      query: ({ message, file, sessionId }) => {
        const formData = new FormData();
        formData.append("message", message);
        if (file) {
          formData.append("file", file);
        }
        if (sessionId) {
          formData.append("session_id", sessionId.toString());
        }
        return {
          url: "/api/dashboards/operations/chat/send/",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { sessionId }) => [
        "Chats",
        ...(sessionId
          ? [{ type: "ChatMessages" as const, id: sessionId }]
          : []),
      ],
    }),

    // Delete a single chat session
    deleteChat: builder.mutation<DeleteChatResponse, number>({
      query: (sessionId) => ({
        url: `/api/dashboards/operations/chat/sessions/${sessionId}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Chats"],
    }),

    // Bulk delete chat sessions
    deleteChats: builder.mutation<
      { success: boolean; deletedCount: number },
      number[]
    >({
      query: (sessionIds) => ({
        url: "/api/dashboards/operations/chat/sessions/bulk-delete/",
        method: "DELETE",
        body: { ids: sessionIds },
      }),
      invalidatesTags: ["Chats"],
    }),
  }),
  overrideExisting: false,
});

// Export hooks for usage in components
export const {
  useGetChatsQuery,
  useGetChatSessionQuery,
  useStartConversationMutation,
  useDeleteChatMutation,
  useDeleteChatsMutation,
  useLazyGetChatsQuery,
  useLazyGetChatSessionQuery,
} = chatApi;
