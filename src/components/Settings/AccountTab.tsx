"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AccountEditForm } from "./AccountEditForm";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Edit } from "lucide-react";
import Link from "next/link";
import PageLoader from "../Shared/PageLoader";
import { useGetOnboardingProgressQuery } from "@/redux/features/onboarding/onboardingApi";
import { useAppSelector } from "@/redux/hooks";

export function AccountTab() {
  const [isEditing, setIsEditing] = useState(false);

  const {user} = useAppSelector((state) => state.auth);

  const {data: onboardingData, isLoading: isOnboardingLoading} = useGetOnboardingProgressQuery();


  if (isEditing) {
    return (
      <AccountEditForm
        onCancel={() => setIsEditing(false)}
        onSave={() => setIsEditing(false)}
        userData={user || undefined}
      />
    );
  }

  if (!user || isOnboardingLoading) {
    return <PageLoader className="h-[60vh]" />;
  }

  return (
    <Card className="p-4 bg-card border-0 shadow-none text-[#3B3B3B]">
      <div className="space-y-4">
        <div className="sticky top-0 z-30 bg-white/90 backdrop-blur">
          <div className="py-3 flex items-center gap-4">
            <RadialProgress value={15} size={42} stroke={8} />
            <div className="flex-1">
              <div className="text-sm font-medium">
                Onboarding progress: <span className="font-bold">{onboardingData?.data?.progress || 0}%</span>
              </div>
            </div>
            <Button variant="outline">
              <Link href="/onboarding">Complete & Change</Link>
            </Button>
          </div>
        </div>

        {/* Your Photo */}
        <div className="flex items-center justify-between gap-4">
          <label className="text-lg font-medium  w-44">Your Photo</label>
          <div className="flex-1">
            <Avatar className="w-14 h-14">
              <AvatarImage
                src={
                  user?.profile_image_url ||
                  user?.profile_image ||
                  "/placeholder.svg"
                }
                alt="User photo"
              />
              <AvatarFallback>
                {user?.full_name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        {/* Full Name */}
        <div className="flex items-center justify-between gap-4 ">
          <label className="text-lg font-medium  w-44">Full Name</label>
          <div className="flex-1">
            <p className="px-6 py-2 bg-gray-100 rounded-sm">
              {user?.full_name || "N/A"}
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center justify-between gap-4">
          <label className="text-lg font-medium  w-44">Email</label>
          <div className="flex-1">
            <p className="px-6 py-2 bg-gray-100 rounded-sm">{user?.email || "N/A"}</p>
          </div>
        </div>

        {/* Phone Number */}
        <div className="flex items-center justify-between gap-4">
          <label className="text-lg font-medium  w-44">Phone Number</label>
          <div className="flex-1">
            <p className="px-6 py-2 bg-gray-100 rounded-sm">
              {user?.phone_number || "N/A"}
            </p>
          </div>
        </div>

        {/* Country */}
        <div className="flex items-center justify-between gap-4">
          <label className="text-lg font-medium  w-44">Country</label>
          <div className="flex-1 ">
            <p className="px-6 py-2 bg-gray-100 rounded-sm">
              {user?.country || "N/A"}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <label className="text-lg font-medium  w-44">
            Restaurant Address
          </label>
          <div className="flex-1">
            <p className="px-6 py-2 bg-gray-100 rounded-sm">
              {user?.restaurant_address || "N/A"}
            </p>
          </div>
        </div>

        {/* Edit Button */}
        <div className="flex justify-end pt-4">
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white !px-8"
          >
            Edit
            <Edit className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

function RadialProgress({
  value,
  size = 40,
  stroke = 6,
}: {
  value: number;
  size?: number;
  stroke?: number;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  const angle = (clamped / 100) * 360;
  const bg = `conic-gradient(#2563eb ${angle}deg, #e5e7eb ${angle}deg)`; // blue → gray
  return (
    <div
      className="rounded-full grid place-items-center"
      style={{ width: size, height: size, background: bg }}
    >
      <div
        className="bg-white rounded-full"
        style={{ width: size - stroke * 2, height: size - stroke * 2 }}
      />
    </div>
  );
}
