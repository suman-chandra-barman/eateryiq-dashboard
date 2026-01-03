"use client"

import type React from "react"

import { useState, useRef, type KeyboardEvent } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import security from "@/assets/auth/security.png"

export default function VerifyOTPPage() {
  const router = useRouter()
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[0]
    }

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, 6)
    const newOtp = [...otp]

    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i]
    }

    setOtp(newOtp)

    // Focus on the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex((val) => !val)
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus()
    } else {
      inputRefs.current[5]?.focus()
    }
  }

  const handleVerify = () => {
    const otpValue = otp.join("")
    console.log("[v0] OTP:", otpValue)
    // Handle OTP verification logic here
    router.push("/onboarding")
  }

  const handleResend = () => {
    console.log("[v0] Resend OTP clicked")
    // Handle resend OTP logic
  }

  return (
    <div className="min-h-screen flex container mx-auto">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.1)] p-8">
          <h1 className="text-3xl font-bold text-center mb-3">Verify with OTP</h1>
          <p className="text-center text-gray-600 text-sm mb-8">Enter the OTP sent to your email</p>

          <div className="space-y-6">
            {/* OTP Inputs */}
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-14 h-14 text-center text-xl font-semibold bg-blue-50 border-blue-200 focus:border-blue-500"
                />
              ))}
            </div>

            {/* Verify Button */}
            <Button onClick={handleVerify} className="w-full bg-blue-600 hover:bg-blue-700 h-12">
              Verify
            </Button>

            {/* Resend Link */}
            <p className="text-center text-sm">
              Don&#39;t receive the OTP{" "}
              <button onClick={handleResend} className="text-blue-600 font-medium hover:underline">
                Resend
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8">
        <div className="relative w-full max-w-lg">
          <Image
            src={security}
            alt="OTP verification illustration"
            width={600}
            height={600}
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  )
}
