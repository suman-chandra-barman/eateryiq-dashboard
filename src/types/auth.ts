export type UserRole = "operations" | "marketing_manager" | "executive";

export type TUser = {
  id: number;
  email: string;
  full_name: string;
  role: UserRole;
  is_admin?: boolean;
  phone_number?: string;
  country?: string;
  restaurant_address?: string;
  profile_image?: string;
  profile_image_url?: string;
};

export type SignupRequest = {
  email: string;
  full_name: string;
  business_name?: string;
  role: UserRole;
  password: string;
  confirm_password: string;
};

export type SignupResponse = {
  success: boolean;
  message: string;
};

export type EmailVerifyRequest = {
  email: string;
  otp: string;
};

export type EmailVerifyResponse = {
  success: boolean;
  message: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: TUser;
  };
};

export type UpdateProfileRequest = {
  profile_image?: File;
  phone_number?: string;
  country?: string;
  restaurant_address?: string;
};

export type UpdateProfileResponse = {
  success: boolean;
  message: string;
  data: TUser;
};
