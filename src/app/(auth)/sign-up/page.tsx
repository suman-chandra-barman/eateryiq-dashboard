"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import signup from "@/assets/auth/signup.png";
import { UserRole } from "@/types/auth";
import { useSignupMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";

type SignUpFormData = {
  full_name: string;
  business_name?: string;
  role: UserRole;
  email: string;
  password: string;
  confirm_password: string;
};

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupMutation, { isLoading }] = useSignupMutation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const password = watch("password");

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await signupMutation(data).unwrap();
      if (response.success) {
        toast.success(response.message);
        // Store email for OTP verification
        sessionStorage.setItem("verifyEmail", data.email);
        router.push("/verify-otp");
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Signup failed. Please try again.");
    }
  };

  const handleGoogleSignIn = () => {
    console.log("[v0] Google sign in clicked");
    // Handle Google sign in logic
  };

  return (
    <div className="min-h-screen flex container mx-auto">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.1)] p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Sign Up</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div>
              <Label htmlFor="fullName" className="text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="fullName"
                placeholder="Enter your name..."
                {...register("full_name", { required: "Full name is required" })}
                className="mt-1"
              />
              {errors.full_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.full_name.message}
                </p>
              )}
            </div>

            {/* Business Name */}
            <div>
              <Label htmlFor="businessName" className="text-sm font-medium">
                Business Name{" "}
                <span className="text-gray-400">(optional for Owners)</span>
              </Label>
              <Input
                id="businessName"
                placeholder="Enter your name..."
                {...register("business_name")}
                className="mt-1"
              />
            </div>

            {/* Role Select */}
            <div>
              <Label htmlFor="role" className="text-sm font-medium">
                Role Select
              </Label>
              <Select onValueChange={(value) => setValue("role", value as UserRole)}>
                <SelectTrigger className="mt-1 w-full !h-12">
                  <SelectValue placeholder="Select your role..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="marketing_manager">Marketing Manager</SelectItem>
                  <SelectItem value="executive">Executive</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email..."
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="mt-1"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password..."
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter your password..."
                  {...register("confirm_password", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {errors.confirm_password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 h-12"
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Signup"}
            </Button>

            {/* Login Link */}
            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 font-medium hover:underline"
              >
                Log in now
              </Link>
            </p>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or</span>
              </div>
            </div>

            {/* Google Sign In */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              className="w-full h-12 bg-transparent"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </Button>
          </form>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8">
        <div className="relative w-full max-w-lg">
          <Image
            src={signup}
            alt="Sign up illustration"
            width={600}
            height={600}
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
