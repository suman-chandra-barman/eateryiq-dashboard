"use client";

import ProfileEditModal from "@/components/Admin/settings/profileEditModal";
import BackButton from "@/components/Shared/BackButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import { useUpdateAdminProfileMutation } from "@/redux/features/auth/authApi";
import { PenLine } from "lucide-react";
import React, { useState } from "react";
import PageLoader from "@/components/Skeletons/PageLoader";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateAdminProfile, { isLoading: isUpdating }] =
    useUpdateAdminProfileMutation();

  const { user: currentUser } = useAppSelector((state) => state.auth);

  if (!currentUser) return <PageLoader />;

  return (
    <div className="bg-transparent pt-2">
      <div className="max-w-full mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <BackButton name="Personal Information" />
          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-40 flex bg-blue-600 hover:bg-blue-700 text-white"
          >
            <PenLine /> Edit
          </Button>
        </div>
        <div className=" flex flex-col lg:flex-row gap-2 md:gap-4  ">
          {/* Profile Section */}
          <div className="flex flex-col items-center  bg-white border border-blue-400 py-6 px-12 rounded-xl gap-2 ">
            <div className="relative">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={currentUser?.profile_image_url}
                  alt="Admin Profile Image"
                />
                <AvatarFallback>
                  {currentUser?.full_name
                    ? currentUser.full_name.charAt(0)
                    : ""}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="text-center pb-6">
              <p className="text-base text-gray-500">Admin</p>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                {currentUser?.full_name}
              </h3>
            </div>
          </div>

          <div>
            <div className="mb-6">
              <label className="block text-base font-bold text-gray-900 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={currentUser?.full_name || ""}
                readOnly
                className="w-full px-4 py-2 text-lg text-gray-600 bg-white border-2 border-gray-200 rounded-lg focus:outline-none"
              />
            </div>

            <div className="mb-8">
              <label className="block text-base font-bold text-gray-900 mb-4">
                Email
              </label>
              <input
                type="email"
                value={currentUser?.email || ""}
                readOnly
                className="w-full px-4 py-2 text-lg text-gray-600 bg-white border-2 border-gray-200 rounded-lg focus:outline-none "
              />
            </div>
          </div>
        </div>
      </div>

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentName={currentUser?.full_name || ""}
        currentImage={currentUser?.profile_image_url || ""}
        updateProfile={updateAdminProfile}
        isUpdating={isUpdating}
      />
    </div>
  );
};

export default Page;
