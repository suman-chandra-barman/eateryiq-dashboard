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
  }),
});

export const {
  useGetAllRecentUsersQuery,
  useGetSingleUserQuery,
  useDeleteUserMutation,
} = userApi;
