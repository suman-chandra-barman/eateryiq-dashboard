/** @format */

import { baseApi } from "../../api/baseApi";

export interface PrivacyPolicy {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface CreatePrivacyPolicyRequest {
  title: string;
  content: string;
}

export interface UpdatePrivacyPolicyRequest {
  title: string;
  content: string;
}

export interface PrivacyPolicyResponse {
  success: boolean;
  message: string;
  data: PrivacyPolicy;
  requestId: string;
}

export interface PrivacyPolicyListResponse {
  success: boolean;
  message: string;
  meta: {
    total: number;
  };
  data: PrivacyPolicy[];
  requestId: string;
}

const privacyPolicyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacyPolicy: builder.query<PrivacyPolicyListResponse, void>({
      query: () => "/api/privacy/",
      providesTags: ["PrivacyPolicy"],
    }),
    createPrivacyPolicy: builder.mutation<
      PrivacyPolicyResponse,
      CreatePrivacyPolicyRequest
    >({
      query: (body) => ({
        url: "/api/privacy/create/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["PrivacyPolicy"],
    }),
    updatePrivacyPolicy: builder.mutation<
      PrivacyPolicyResponse,
      { id: number; body: UpdatePrivacyPolicyRequest }
    >({
      query: ({ id, body }) => ({
        url: `/api/privacy/${id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["PrivacyPolicy"],
    }),
  }),
});

export const {
  useGetPrivacyPolicyQuery,
  useCreatePrivacyPolicyMutation,
  useUpdatePrivacyPolicyMutation,
} = privacyPolicyApi;
