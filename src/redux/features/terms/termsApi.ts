/** @format */

import { baseApi } from "../../api/baseApi";

export interface Terms {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface CreateTermsRequest {
  title: string;
  content: string;
}

export interface UpdateTermsRequest {
  title: string;
  content: string;
}

export interface TermsResponse {
  success: boolean;
  message: string;
  data: Terms;
  requestId: string;
}

export interface TermsListResponse {
  success: boolean;
  message: string;
  meta: {
    total: number;
  };
  data: Terms[];
  requestId: string;
}

const termsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTerms: builder.query<TermsListResponse, void>({
      query: () => "/api/terms/",
      providesTags: ["Terms"],
    }),
    createTerms: builder.mutation<TermsResponse, CreateTermsRequest>({
      query: (body) => ({
        url: "/api/terms/create/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Terms"],
    }),
    updateTerms: builder.mutation<
      TermsResponse,
      { id: number; body: UpdateTermsRequest }
    >({
      query: ({ id, body }) => ({
        url: `/api/terms/${id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Terms"],
    }),
  }),
});

export const {
  useGetTermsQuery,
  useCreateTermsMutation,
  useUpdateTermsMutation,
} = termsApi;
