import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRecentUsers: builder.query({
      query: ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => ({
        url: "/api/dashboards/admin/recent-users/",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Users"],
    }),
    getSingleUser: builder.query({
      query: (userId: number) => ({
        url: `/api/dashboards/admin/users/${userId}/`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (userId: number) => ({
        url: `/api/dashboards/admin/users/${userId}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    getAllOperationUsers: builder.query({
      query: ({
        page = 1,
        limit = 10,
        search = "",
      }: {
        page?: number;
        limit?: number;
        search?: string;
      }) => ({
        url: "/api/dashboards/admin/operators/",
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: ["Users"],
    }),
    getSingleOperationUser: builder.query({
      query: (userId: number) => ({
        url: `/api/dashboards/admin/operators/${userId}/`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    deleteOperationUser: builder.mutation({
      query: (userId: number) => ({
        url: `/api/dashboards/admin/operators/${userId}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    getAllExecutiveUsers: builder.query({
      query: ({
        page = 1,
        limit = 10,
        search = "",
      }: {
        page?: number;
        limit?: number;
        search?: string;
      }) => ({
        url: "/api/dashboards/admin/executives/",
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: ["Users"],
    }),
    getSingleExecutiveUser: builder.query({
      query: (userId: number) => ({
        url: `/api/dashboards/admin/executives/${userId}/`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    deleteExecutiveUser: builder.mutation({
      query: (userId: number) => ({
        url: `/api/dashboards/admin/executives/${userId}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    getAllMarketingManagers: builder.query({
      query: ({
        page = 1,
        limit = 10,
        search = "",
      }: {
        page?: number;
        limit?: number;
        search?: string;
      }) => ({
        url: "/api/dashboards/admin/marketing-managers/",
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: ["Users"],
    }),
    getSingleMarketingManager: builder.query({
      query: (userId: number) => ({
        url: `/api/dashboards/admin/marketing-managers/${userId}/`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    deleteMarketingManager: builder.mutation({
      query: (userId: number) => ({
        url: `/api/dashboards/admin/marketing-managers/${userId}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAllRecentUsersQuery,
  useGetSingleUserQuery,
  useDeleteUserMutation,
  useGetAllOperationUsersQuery,
  useGetSingleOperationUserQuery,
  useDeleteOperationUserMutation,
  useGetAllExecutiveUsersQuery,
  useGetSingleExecutiveUserQuery,
  useDeleteExecutiveUserMutation,
  useGetAllMarketingManagersQuery,
  useGetSingleMarketingManagerQuery,
  useDeleteMarketingManagerMutation,
} = userApi;
