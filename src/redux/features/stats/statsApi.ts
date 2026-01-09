import { baseApi } from "@/redux/api/baseApi";

const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOperationStats: builder.query({
      query: () => ({
        url: "/api/dashboards/operations/metrics/",
        method: "GET",
      }),
      providesTags: ["OperationStats"],
    }),
    getAdminDashboardStats: builder.query({
      query: () => ({
        url: "/api/dashboards/admin/summary/",
        method: "GET",
      }),
      providesTags: ["AdminDashboardStats"],
    }),
  }),
});
export const { useGetOperationStatsQuery, useGetAdminDashboardStatsQuery } = statsApi;