import { baseApi } from "@/redux/api/baseApi";

interface EarningListParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface EarningData {
  id: number;
  sl: number;
  invoice_id: string;
  user_name: string;
  email: string;
  role: string;
  plan: string;
  date: string;
  price: number;
  status: string;
}

interface EarningDetailData {
  id: number;
  invoice_id: string;
  user_id: number;
  user_name: string;
  email: string;
  user_role: string;
  plan: string;
  date: string;
  price: number;
  status: string;
  hosted_invoice_url: string;
  invoice_pdf: string;
}

interface EarningListResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: EarningData[];
  requestId: string;
}

interface EarningDetailResponse {
  success: boolean;
  message: string;
  meta: object;
  data: EarningDetailData;
  requestId: string;
}

interface DeleteEarningResponse {
  success: boolean;
  message: string;
  requestId: string;
}

const earningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEarnings: builder.query<EarningListResponse, EarningListParams>({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: "/api/dashboards/admin/earnings/",
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: ["Earnings"],
    }),
    getSingleEarning: builder.query<EarningDetailResponse, number>({
      query: (earningId) => ({
        url: `/api/dashboards/admin/earnings/${earningId}/`,
        method: "GET",
      }),
      providesTags: ["Earnings"],
    }),
    deleteEarning: builder.mutation<DeleteEarningResponse, number>({
      query: (earningId) => ({
        url: `/api/dashboards/admin/earnings/${earningId}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Earnings"],
    }),
  }),
});

export const {
  useGetAllEarningsQuery,
  useGetSingleEarningQuery,
  useDeleteEarningMutation,
} = earningApi;
