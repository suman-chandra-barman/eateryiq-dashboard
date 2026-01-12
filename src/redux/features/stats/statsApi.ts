import { baseApi } from "@/redux/api/baseApi";

const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Operator Stats
    getOperationStats: builder.query({
      query: () => ({
        url: "/api/dashboards/operations/metrics/",
        method: "GET",
      }),
      providesTags: ["OperationStats"],
    }),

    // Executive Stats
    getExecutiveStats: builder.query({
      query: () => ({
        url: "/api/dashboards/executive/metrics/",
        method: "GET",
      }),
      providesTags: ["ExecutiveStats"],
    }),

    // Marketing Stats
    getMarketingStats: builder.query({
      query: () => ({
        url: "/api/dashboards/marketing/metrics/",
        method: "GET",
      }),
      providesTags: ["MarketingStats"],
    }),

    // Admin Dashboard Stats
    getAdminDashboardStats: builder.query({
      query: () => ({
        url: "/api/dashboards/admin/summary/",
        method: "GET",
      }),
      providesTags: ["AdminDashboardStats"],
    }),
  }),
});
export const { useGetOperationStatsQuery, useGetExecutiveStatsQuery, useGetMarketingStatsQuery, useGetAdminDashboardStatsQuery } =
  statsApi;
