import { baseApi } from "@/redux/api/baseApi";
import { 
  setToken, setUser } from "./authSlice";
import type {
  SignupRequest,
  SignupResponse,
  EmailVerifyRequest,
  EmailVerifyResponse,
  LoginRequest,
  LoginResponse,
} from "@/types/auth";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // SIGNUP
    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (userInfo) => ({
        url: "/auth/signup/",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["User"],
    }),

    // EMAIL VERIFICATION
    emailVerify: builder.mutation<EmailVerifyResponse, EmailVerifyRequest>({
      query: (data) => ({
        url: "/auth/verify-email/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // LOGIN
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (userInfo) => ({
        url: "/auth/login/",
        method: "POST",
        body: userInfo,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data?.accessToken) {
            dispatch(setToken(data.data.accessToken));
            dispatch(setUser(data.data.user));
          }
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
      invalidatesTags: ["User"],
    }),

    // RESEND OTP
    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: data,
      }),
    }),

    // FORGOT PASSWORD
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    // RESET PASSWORD
    resetPassword: builder.mutation({
      query: ({ newPassword, token }) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: { newPassword },
        headers: {
          Authorization: token,
        },
      }),
    }),

    // CHANGE PASSWORD (for logged-in user)
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: data,
      }),
    }),
    //  GET CURRENT USER
    getMe: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.data));
        } catch (err) {
          console.error("Get user info failed:", err);
        }
      },
      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useEmailVerifyMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetMeQuery,
} = authApi;
