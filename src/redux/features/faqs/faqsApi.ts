import { baseApi } from "@/redux/api/baseApi";

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  is_active: boolean;
  created_at: string;
}

export interface FAQsResponse {
  success: boolean;
  message: string;
  meta: {
    total: number;
  };
  data: FAQ[];
  requestId: string;
}

export interface CreateFAQBody {
  question: string;
  answer: string;
  is_active: boolean;
}

export interface CreateFAQResponse {
  success: boolean;
  message: string;
  data: FAQ;
  requestId: string;
}

export interface DeleteFAQResponse {
  success: boolean;
  message: string;
  requestId: string;
}

export const faqsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFAQs: builder.query<FAQsResponse, void>({
      query: () => ({
        url: "/api/faq/admin/",
        method: "GET",
      }),
      providesTags: ["FAQs"],
    }),

    createFAQ: builder.mutation<CreateFAQResponse, CreateFAQBody>({
      query: (body) => ({
        url: "/api/faq/admin/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["FAQs"],
    }),

    deleteFAQ: builder.mutation<DeleteFAQResponse, number>({
      query: (id) => ({
        url: `/api/faq/admin/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["FAQs"],
    }),
  }),
});

export const { useGetFAQsQuery, useCreateFAQMutation, useDeleteFAQMutation } =
  faqsApi;
