import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = (getState() as RootState).auth.token;

    // For reset password, use token from sessionStorage if available
    if (endpoint === "resetPassword") {
      const resetToken = sessionStorage.getItem("resetPasswordToken");
      if (resetToken) {
        const headerValue = resetToken.startsWith("Bearer ")
          ? resetToken
          : `Bearer ${resetToken}`;
        headers.set("authorization", headerValue);
        return headers;
      }
    }

    if (token) {
      const headerValue = token.startsWith("Bearer ")
        ? token
        : `Bearer ${token}`;
      headers.set("authorization", headerValue);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: [
    "User",
    "Users",
    "OperationStats",
    "OperationReports",
    "Chats",
    "ChatMessages",
    "OperatorDocuments",
    "OnboardingProgress",
    "Calendar",
    "AdminDashboardStats",
  ],
  endpoints: () => ({}),
});
