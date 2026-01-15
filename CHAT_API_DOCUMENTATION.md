# Chat API Documentation

This document describes the API endpoints required for the EateryGPT Chat feature.

## Base URL

All endpoints should be prefixed with your API base URL (configured in `NEXT_PUBLIC_BACKEND_URL`).

## Authentication

All endpoints require authentication via Bearer token in the `Authorization` header.

---

## Endpoints

### 1. Get All Chats (Chat History)

**GET** `/api/chats`

Get a paginated list of all chats for the authenticated user.

**Query Parameters:**

- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 20)
- `search` (string, optional): Search query to filter chats by title or preview

**Response:**

```json
{
  "chats": [
    {
      "id": "chat-uuid-1",
      "title": "How many employees do I need?",
      "preview": "Analyzing your traffic and sales trends, you'll...",
      "createdAt": "2026-01-04T10:00:00Z",
      "updatedAt": "2026-01-04T10:05:00Z",
      "messageCount": 5
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 20
}
```

---

### 2. Get Chat Messages

**GET** `/api/chats/:chatId/messages`

Get all messages for a specific chat.

**URL Parameters:**

- `chatId` (string, required): The chat ID

**Response:**

```json
{
  "messages": [
    {
      "id": "msg-uuid-1",
      "chatId": "chat-uuid-1",
      "role": "user",
      "content": "How many employees do I need for tonight's shift?",
      "timestamp": "2026-01-04T10:00:00Z"
    },
    {
      "id": "msg-uuid-2",
      "chatId": "chat-uuid-1",
      "role": "assistant",
      "content": "Analyzing your traffic and sales trends, you'll need approximately 8 employees...",
      "timestamp": "2026-01-04T10:00:05Z"
    }
  ],
  "chatId": "chat-uuid-1",
  "total": 2
}
```

---

### 3. Create New Chat

**POST** `/api/chats`

Create a new chat conversation.

**Request Body:**

```json
{
  "title": "Marketing Strategy Discussion",
  "initialMessage": "Help me create a marketing plan"
}
```

**Response:**

```json
{
  "id": "chat-uuid-1",
  "title": "Marketing Strategy Discussion",
  "preview": "Help me create a marketing plan",
  "createdAt": "2026-01-04T10:00:00Z",
  "updatedAt": "2026-01-04T10:00:00Z",
  "messageCount": 0
}
```

---

### 4. Send Message to Chat

**POST** `/api/chats/:chatId/messages`

Send a message to an existing chat and get AI response.

**URL Parameters:**

- `chatId` (string, required): The chat ID

**Request Body:**

```json
{
  "content": "What are my top selling items?",
  "attachments": ["file-uuid-1", "file-uuid-2"]
}
```

**Response:**

```json
{
  "userMessage": {
    "id": "msg-uuid-3",
    "chatId": "chat-uuid-1",
    "role": "user",
    "content": "What are my top selling items?",
    "timestamp": "2026-01-04T10:10:00Z"
  },
  "assistantMessage": {
    "id": "msg-uuid-4",
    "chatId": "chat-uuid-1",
    "role": "assistant",
    "content": "Based on your sales data, your top 3 selling items are:\n1. Margherita Pizza\n2. Caesar Salad\n3. Tiramisu",
    "timestamp": "2026-01-04T10:10:03Z"
  }
}
```

---

### 5. Start New Conversation

**POST** `/api/dashboards/operations/chat/send/`

Create a new chat and send the first message in one request. This endpoint accepts FormData to support file uploads.

**Content-Type:** `multipart/form-data`

**Request Body (FormData):**

- `message` (string, required): The message content
- `file` (file, optional): File attachment (image, video, PDF, document, etc.)

**Example FormData:**

```javascript
const formData = new FormData();
formData.append("message", "Generate a sales report for today");
formData.append("file", fileObject); // Optional
```

**Response:**

```json
{
  "userMessage": {
    "id": "msg-uuid-1",
    "chatId": "chat-uuid-new",
    "role": "user",
    "content": "Generate a sales report for today",
    "timestamp": "2026-01-04T10:00:00Z"
  },
  "assistantMessage": {
    "id": "msg-uuid-2",
    "chatId": "chat-uuid-new",
    "role": "assistant",
    "content": "Here's your sales report for today...",
    "timestamp": "2026-01-04T10:00:03Z"
  }
}
```

---

### 6. Delete Single Chat

**DELETE** `/api/chats/:chatId`

Delete a specific chat and all its messages.

**URL Parameters:**

- `chatId` (string, required): The chat ID

**Response:**

```json
{
  "success": true
}
```

---

### 7. Bulk Delete Chats

**POST** `/api/chats/bulk-delete`

Delete multiple chats at once.

**Request Body:**

```json
{
  "chatIds": ["chat-uuid-1", "chat-uuid-2", "chat-uuid-3"]
}
```

**Response:**

```json
{
  "success": true,
  "deletedCount": 3
}
```

---

### 8. Update Chat Title

**PATCH** `/api/chats/:chatId`

Update the title of a chat.

**URL Parameters:**

- `chatId` (string, required): The chat ID

**Request Body:**

```json
{
  "title": "Updated Chat Title"
}
```

**Response:**

```json
{
  "id": "chat-uuid-1",
  "title": "Updated Chat Title",
  "preview": "How many employees do I need...",
  "createdAt": "2026-01-04T10:00:00Z",
  "updatedAt": "2026-01-04T10:15:00Z",
  "messageCount": 5
}
```

---

### 9. Get Chat by ID

**GET** `/api/chats/:chatId`

Get details of a specific chat.

**URL Parameters:**

- `chatId` (string, required): The chat ID

**Response:**

```json
{
  "id": "chat-uuid-1",
  "title": "Marketing Strategy Discussion",
  "preview": "Help me create a marketing plan",
  "createdAt": "2026-01-04T10:00:00Z",
  "updatedAt": "2026-01-04T10:00:00Z",
  "messageCount": 10
}
```

---

### 10. Get Quick Actions

**GET** `/api/chats/quick-actions`

Get AI-powered quick action suggestions for the user.

**Response:**

```json
{
  "suggestions": [
    "Show me today's sales.",
    "Any compliance issues?",
    "Need more staff for tonight's shift?",
    "Generate marketing ideas",
    "Analyze customer feedback"
  ]
}
```

---

### 11. Regenerate Response

**POST** `/api/chats/:chatId/messages/:messageId/regenerate`

Regenerate an AI response for a specific message.

**URL Parameters:**

- `chatId` (string, required): The chat ID
- `messageId` (string, required): The message ID to regenerate

**Response:**

```json
{
  "id": "msg-uuid-new",
  "chatId": "chat-uuid-1",
  "role": "assistant",
  "content": "Here's an alternative response...",
  "timestamp": "2026-01-04T10:20:00Z"
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request

```json
{
  "error": "Bad Request",
  "message": "Invalid request parameters"
}
```

### 401 Unauthorized

```json
{
  "error": "Unauthorized",
  "message": "Authentication token is missing or invalid"
}
```

### 404 Not Found

```json
{
  "error": "Not Found",
  "message": "Chat not found"
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

---

## Database Schema Recommendations

### Chats Table

```sql
CREATE TABLE chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  preview TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at DESC)
);
```

### Messages Table

```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  attachments JSONB,
  INDEX idx_chat_id (chat_id),
  INDEX idx_timestamp (timestamp)
);
```

---

## Notes

1. **Chat Preview Generation**: The `preview` field should be automatically generated from the first user message (truncated to ~50 characters).

2. **Chat Title Generation**: If no title is provided when creating a chat, generate one from the first message.

3. **Real-time Updates**: Consider implementing WebSocket connections for real-time message updates.

4. **Rate Limiting**: Implement rate limiting to prevent API abuse, especially for message sending.

5. **Message Pagination**: For chats with many messages, consider implementing pagination in the messages endpoint.

6. **AI Integration**: The assistant messages should be generated using your AI model (e.g., OpenAI GPT, Claude, etc.) with access to restaurant data.

7. **Attachments**: If supporting file attachments, implement file upload endpoints and storage.

8. **Search Optimization**: For the search feature, consider implementing full-text search using PostgreSQL's `tsvector` or a dedicated search engine like Elasticsearch.
