"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import FlagSelect from "react-flags-select";
import { useUpdateProfileMutation } from "@/redux/features/auth/authApi";
import type { TUser } from "@/types/auth";
import { toast } from "sonner";

interface AccountEditFormProps {
  onCancel: () => void;
  onSave: () => void;
  userData?: TUser;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  address: string;
}

export function AccountEditForm({
  onCancel,
  onSave,
  userData,
}: AccountEditFormProps) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      fullName: userData?.full_name || "",
      email: userData?.email || "",
      phone: userData?.phone_number || "",
      country: userData?.country || "",
      address: userData?.restaurant_address || "",
    },
  });

  useEffect(() => {
    if (userData) {
      setValue("fullName", userData.full_name || "");
      setValue("email", userData.email || "");
      setValue("phone", userData.phone_number || "");
      setValue("country", userData.country || "");
      setValue("address", userData.restaurant_address || "");
      setPhotoPreview(
        userData.profile_image_url || userData.profile_image || null
      );
    }
  }, [userData, setValue]);

  const phone = watch("phone");
  const country = watch("country");

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (1MB max)
      if (file.size > 1024 * 1024) {
        toast.error("File size must be less than 1MB");
        return;
      }

      // Validate file type
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        toast.error("Only JPG or PNG files are allowed");
        return;
      }

      // Store file for upload
      setSelectedFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (data: FormData) => {
    try {
      const profileData: Record<string, string | File> = {};

      if (data.phone) {
        profileData.phone_number = data.phone;
      }
      if (data.country) {
        profileData.country = data.country;
      }
      if (data.address) {
        profileData.restaurant_address = data.address;
      }
      if (selectedFile) {
        profileData.profile_image = selectedFile;
      }

      const result = await updateProfile(profileData).unwrap();
      toast.success(result.message || "Profile updated successfully!");
      onSave();
    } catch (error: unknown) {
      console.error("Error updating profile:", error);
      toast.error(
        (error as { data?: { message?: string } })?.data?.message ||
          "Failed to update profile. Please try again."
      );
    }
  };

  return (
    <Card className="p-4 bg-card border-0 shadow-none text-[#3B3B3B]">
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="space-y-4">
          {/* Your Photo */}
          <div className="flex items-center justify-between gap-4">
            <label className="text-lg font-medium w-44">Your Photo</label>
            <div className="flex-1 flex gap-6">
              <Avatar className="w-14 h-14">
                <AvatarImage
                  src={
                    photoPreview ||
                    userData?.profile_image_url ||
                    userData?.profile_image ||
                    "/placeholder.svg"
                  }
                  alt="User photo"
                />
                <AvatarFallback>
                  {userData?.full_name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2 justify-center">
                <label htmlFor="photo-upload">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-fit bg-transparent cursor-pointer"
                    onClick={() =>
                      document.getElementById("photo-upload")?.click()
                    }
                  >
                    Upload Photo
                  </Button>
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                <p className="text-xs text-muted-foreground">
                  JPG or PNG, 1MB Max
                </p>
              </div>
            </div>
          </div>

          {/* Full Name */}
          <div className="flex items-center justify-between gap-4">
            <label className="text-lg font-medium w-44">Full Name</label>
            <div className="flex-1">
              <Input
                {...register("fullName")}
                className="border-gray-200 text-foreground"
                placeholder="Enter full name"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center justify-between gap-4">
            <label className="text-lg font-medium w-44">Email</label>
            <div className="flex-1">
              <Input
                {...register("email")}
                type="email"
                className="border-gray-200 text-foreground"
                placeholder="Enter email"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex items-center justify-between gap-4">
            <label className="text-lg font-medium w-44">Phone Number</label>
            <div className="flex-1">
              <PhoneInput
                country={country ? country.toLowerCase() : undefined}
                value={phone}
                onChange={(phone) => setValue("phone", phone)}
                inputClass="!w-full"
                containerClass="phone-input-container w-full"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          {/* Country */}
          <div className="flex items-center justify-between gap-4">
            <label className="text-lg font-medium w-44">Country</label>
            <div className="flex-1">
              <FlagSelect
                selected={country}
                onSelect={(code) => setValue("country", code)}
                className="flag-select"
                placeholder="Select country"
                searchable
              />
            </div>
          </div>

          {/* Restaurant Address */}
          <div className="flex items-center justify-between gap-4">
            <label className="text-lg font-medium w-44">
              Restaurant Address
            </label>
            <div className="flex-1">
              <Input
                {...register("address")}
                className="border-gray-200 text-foreground"
                placeholder="Enter address"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
              className="border-gray-200 text-foreground bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}
