/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */
"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  currentImage: string;
  updateProfile: any;
  isUpdating: boolean;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  currentName,
  currentImage,
  updateProfile,
  isUpdating,
}) => {
  const [fullName, setFullName] = useState(currentName);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState(currentImage);

  // Update state when props change
  useEffect(() => {
    setFullName(currentName);
    setPreviewImage(currentImage);
  }, [currentName, currentImage]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      // Prepare data for API
      const updateData: { full_name?: string; profile_image?: File } = {};

      if (fullName !== currentName) {
        updateData.full_name = fullName;
      }

      if (profileImageFile) {
        updateData.profile_image = profileImageFile;
      }

      // Only make API call if there are changes
      if (Object.keys(updateData).length === 0) {
        toast.info("No changes to save");
        onClose();
        return;
      }

      const result = await updateProfile(updateData).unwrap();

      toast.success(result?.message || "Profile updated successfully");
      onClose();
    } catch (error: any) {
      console.error("Profile update error:", error);
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  const handleClose = () => {
    // Reset to original values
    setFullName(currentName);
    setProfileImageFile(null);
    setPreviewImage(currentImage);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 text-center">
            Edit your profile
          </DialogTitle>
          <p className="text-gray-500 text-center mt-2">
            Make changes to your profile here. Click save when you&apos;re done.
          </p>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-6 py-6">
          {/* Profile Image Upload */}
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-gray-200">
              <Image
                src={previewImage || "/api/placeholder/128/128"}
                alt="Profile"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            <label
              htmlFor="profile-upload"
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <Edit className="w-6 h-6 text-white" />
            </label>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* Full Name Input */}
          <div className="w-full space-y-2">
            <Label htmlFor="fullname" className="text-gray-700 font-medium">
              Full Name
            </Label>
            <Input
              id="fullname"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-0 transition-colors"
            />
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={isUpdating}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditModal;
