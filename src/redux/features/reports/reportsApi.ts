import { baseApi } from "@/redux/api/baseApi";

const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOperationReports: builder.query({
      query: () => ({
        url: "/api/dashboards/operations/reports/",
        method: "GET",
      }),
      providesTags: ["OperationReports"],
    }),
  }),
});
export const { useGetOperationReportsQuery } = reportsApi;