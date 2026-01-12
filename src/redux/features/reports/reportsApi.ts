import { baseApi } from "@/redux/api/baseApi";

const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Operation Reports API
    getOperationReports: builder.query({
      query: () => ({
        url: "/api/dashboards/operations/reports/",
        method: "GET",
      }),
      providesTags: ["OperationReports"],
    }),

    // Marketing Reports API
    getMarketingReports: builder.query({
      query: () => ({
        url: "/api/dashboards/marketing/reports/",
        method: "GET",
      }),
      providesTags: ["MarketingReports"],
    }),
    // Executive Reports API
    getExecutiveReports: builder.query({
      query: () => ({
        url: "/api/dashboards/executive/reports/",
        method: "GET",
      }),
      providesTags: ["ExecutiveReports"],
    }),

  }),
});
export const { useGetOperationReportsQuery, useGetMarketingReportsQuery, useGetExecutiveReportsQuery } = reportsApi;