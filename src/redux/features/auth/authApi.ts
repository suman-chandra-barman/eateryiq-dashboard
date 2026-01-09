import { baseApi } from "@/redux/api/baseApi";
import { setToken, setUser } from "./authSlice";
import type {
  SignupRequest,
  SignupResponse,
  EmailVerifyRequest,
  EmailVerifyResponse,
  LoginRequest,
  LoginResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResendEmailVerifyOtpRequest,
  ResendEmailVerifyOtpResponse,
  VerifyResetOtpRequest,
  VerifyResetOtpResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
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

    // RESEND Email Verify OTP
    resendEmailVerifyOtp: builder.mutation<
      ResendEmailVerifyOtpResponse,
      ResendEmailVerifyOtpRequest
    >({
      query: (data) => ({
        url: "/auth/resend-email-verify-otp/",
        method: "POST",
        body: data,
      }),
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

    // FORGOT PASSWORD
    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: (data) => ({
        url: "/auth/forgot-password/",
        method: "POST",
        body: data,
      }),
    }),

    // RESEND EMAIL VERIFY OTP (for forgot password flow)
    resendForgetPasswordOtp: builder.mutation<
      ResendEmailVerifyOtpResponse,
      ResendEmailVerifyOtpRequest
    >({
      query: (data) => ({
        url: "/auth/resend-forgot-password-otp/",
        method: "POST",
        body: data,
      }),
    }),

    // VERIFY RESET OTP (for forgot password flow)
    verfyForgotPasswordOTP: builder.mutation<
      VerifyResetOtpResponse,
      VerifyResetOtpRequest
    >({
      query: (data) => ({
        url: "/auth/verify-reset-otp/",
        method: "POST",
        body: data,
      }),
      // Don't store token/user here to prevent dashboard redirect
      // Token will be stored in sessionStorage and used for reset password
    }),

    // RESET PASSWORD
    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordRequest
    >({
      query: (data) => ({
        url: "/auth/reset-password/",
        method: "POST",
        body: data,
      }),
      // Don't store token/user here - user should login with new password
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
        url: "/auth/profile/",
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

    // UPDATE PROFILE
    updateProfile: builder.mutation<
      UpdateProfileResponse,
      UpdateProfileRequest
    >({
      query: (data) => {
        const formData = new FormData();

        if (data.profile_image) {
          formData.append("profile_image", data.profile_image);
        }
        if (data.phone_number) {
          formData.append("phone_number", data.phone_number);
        }
        if (data.country) {
          formData.append("country", data.country);
        }
        if (data.restaurant_address) {
          formData.append("restaurant_address", data.restaurant_address);
        }

        return {
          url: "/auth/profile/",
          method: "PATCH",
          body: formData,
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data) {
            dispatch(setUser(data.data));
          }
        } catch (error) {
          console.error("Update profile failed:", error);
        }
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useEmailVerifyMutation,
  useForgotPasswordMutation,
  useResendEmailVerifyOtpMutation,
  useResendForgetPasswordOtpMutation,
  useVerfyForgotPasswordOTPMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
} = authApi;
