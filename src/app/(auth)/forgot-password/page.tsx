"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import forgotPassword from "@/assets/auth/forgot password.png";

type ForgotPasswordFormData = {
  email: string;
};

export default function ForgotPasswordPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = (data: ForgotPasswordFormData) => {
    console.log("[v0] Forgot password data:", data);
    // Handle forgot password logic here
    router.push("/verify-otp");
  };

  return (
    <div className="min-h-screen flex container mx-auto">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.1)] p-8">
          <h1 className="text-3xl font-bold text-center mb-3">
            Forgot Password
          </h1>
          <p className="text-center text-gray-600 text-sm mb-8">
            Enter your email and we&#39;ll send a secure one-time passcode (OTP)
            to reset your password.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 h-12"
            >
              Send OTP
            </Button>
          </form>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8">
        <div className="relative w-full max-w-lg">
          <Image
            src={forgotPassword}
            alt="Forgot password illustration"
            width={600}
            height={600}
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
