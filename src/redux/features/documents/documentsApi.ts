import { baseApi } from "@/redux/api/baseApi";

const documentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOperatorDocuments: builder.query({
        query: () => ({
            url: "/api/dashboards/operations/documents/",
            method: "GET",
        }),
    }),
  }),
});

export const { useGetOperatorDocumentsQuery } = documentApi;