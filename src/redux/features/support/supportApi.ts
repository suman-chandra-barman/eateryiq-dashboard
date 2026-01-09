import { baseApi } from "@/redux/api/baseApi";

export interface Contact {
  id: number;
  sl: number;
  full_name: string;
  email: string;
  message: string;
  is_agree: boolean;
  created_at: string;
}

export interface ContactsResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: Contact[];
  requestId: string;
}

const supportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllContacts: builder.query<
      ContactsResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 6 }) => ({
        url: "/api/dashboards/admin/contacts/",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Support"],
    }),
  }),
});

export const { useGetAllContactsQuery } = supportApi;
