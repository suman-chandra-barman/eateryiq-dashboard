import { baseApi } from "@/redux/api/baseApi";

export interface OperatorDocument {
  id: number;
  file_size_mb: number;
  title: string;
  document_type: string;
  file_format: string;
  file: string;
  file_size: number;
  dashboard_role: string;
  created_at: string;
  created_by: number;
}

export interface GetOperatorDocumentsParams {
  file_format?: string;
  limit?: number;
  page?: number;
  search?: string;
}

export interface GetOperatorDocumentsResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: OperatorDocument[];
  requestId: string;
}

export interface AddOperatorDocumentResponse {
  success: boolean;
  message: string;
  meta: {
    total: number;
  };
  data: OperatorDocument;
  requestId: string;
}

export interface DeleteOperatorDocumentResponse {
  success: boolean;
  message: string;
  meta: {
    total: number;
  };
  data: Record<string, never>;
  requestId: string;
}

const documentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ----------------- Operations Documents APIs -----------------
    getOperatorDocuments: builder.query<
      GetOperatorDocumentsResponse,
      GetOperatorDocumentsParams
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.file_format)
          queryParams.append("file_format", params.file_format);
        if (params.limit) queryParams.append("limit", params.limit.toString());
        if (params.page) queryParams.append("page", params.page.toString());
        if (params.search) queryParams.append("search", params.search);

        return {
          url: `/api/dashboards/operations/documents/${
            queryParams.toString() ? `?${queryParams.toString()}` : ""
          }`,
          method: "GET",
        };
      },
      providesTags: ["OperatorDocuments"],
    }),

    addOperatorDocument: builder.mutation<
      AddOperatorDocumentResponse,
      FormData
    >({
      query: (formData) => ({
        url: "/api/dashboards/operations/documents/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["OperatorDocuments"],
    }),

    deleteOperatorDocument: builder.mutation<
      DeleteOperatorDocumentResponse,
      number
    >({
      query: (id) => ({
        url: `/api/dashboards/operations/documents/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["OperatorDocuments"],
    }),

    bulkDeleteOperatorDocuments: builder.mutation<
      DeleteOperatorDocumentResponse,
      { ids: number[] }
    >({
      query: (body) => ({
        url: "/api/dashboards/operations/documents/bulk-delete/",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["OperatorDocuments"],
    }),

    // ----------------- End of Operations Documents APIs -----------------

    // --------------- Executive Documents APIs -----------------
    getExecutiveDocuments: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.file_format)
          queryParams.append("file_format", params.file_format);
        if (params.limit) queryParams.append("limit", params.limit.toString());
        if (params.page) queryParams.append("page", params.page.toString());
        if (params.search) queryParams.append("search", params.search);

        return {
          url: `/api/dashboards/executive/documents/${
            queryParams.toString() ? `?${queryParams.toString()}` : ""
          }`,
          method: "GET",
        };
      },
      providesTags: ["ExecutiveDocuments"],
    }),

    addExecutiveDocument: builder.mutation({
      query: (formData) => ({
        url: "/api/dashboards/executive/documents/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["ExecutiveDocuments"],
    }),

    deleteExecutiveDocument: builder.mutation({
      query: (id) => ({
        url: `/api/dashboards/executive/documents/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["ExecutiveDocuments"],
    }),

    bulkDeleteExecutiveDocuments: builder.mutation({
      query: (body) => ({
        url: "/api/dashboards/executive/documents/bulk-delete/",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["ExecutiveDocuments"],
    }),
    // --------------- End of Executive Documents APIs -----------------

    // --------------- Marketing Manager Documents APIs -----------------
    getMarketingManagerDocuments: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.file_format)
          queryParams.append("file_format", params.file_format);
        if (params.limit) queryParams.append("limit", params.limit.toString());
        if (params.page) queryParams.append("page", params.page.toString());
        if (params.search) queryParams.append("search", params.search);

        return {
          url: `/api/dashboards/marketing/documents/${
            queryParams.toString() ? `?${queryParams.toString()}` : ""
          }`,
          method: "GET",
        };
      },
      providesTags: ["OperatorDocuments"],
    }),

    addMarketingManagerDocument: builder.mutation({
      query: (formData) => ({
        url: "/api/dashboards/marketing/documents/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["MarketingManagerDocuments"],
    }),

    deleteMarketingManagerDocument: builder.mutation({
      query: (id) => ({
        url: `/api/dashboards/marketing/documents/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["MarketingManagerDocuments"],
    }),

    bulkDeleteMarketingManagerDocuments: builder.mutation({
      query: (body) => ({
        url: "/api/dashboards/marketing/documents/bulk-delete/",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["MarketingManagerDocuments"],
    }),
    // --------------- End of Marketing Manager Documents APIs -----------------
  }),
});

export const {
  useGetOperatorDocumentsQuery,
  useAddOperatorDocumentMutation,
  useDeleteOperatorDocumentMutation,
  useBulkDeleteOperatorDocumentsMutation,

  useGetExecutiveDocumentsQuery,
  useAddExecutiveDocumentMutation,
  useDeleteExecutiveDocumentMutation,
  useBulkDeleteExecutiveDocumentsMutation,

  useGetMarketingManagerDocumentsQuery,
  useAddMarketingManagerDocumentMutation,
  useDeleteMarketingManagerDocumentMutation,
  useBulkDeleteMarketingManagerDocumentsMutation,
} = documentApi;
