"use client";

import type React from "react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import FlagSelect from "react-flags-select";

interface AccountEditFormProps {
  onCancel: () => void;
  onSave: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
}

export function AccountEditForm({ onCancel, onSave }: AccountEditFormProps) {
  const [photoPreview, setPhotoPreview] = useState("/user-avatar.jpg");
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      fullName: "John Marpung",
      email: "Name@gmail.com",
      phone: "+12135554927",
      country: "US",
    },
  });

  const phone = watch("phone");
  const country = watch("country");

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (1MB max)
      if (file.size > 1024 * 1024) {
        alert("File size must be less than 1MB");
        return;
      }

      // Validate file type
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        alert("Only JPG or PNG files are allowed");
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (data: FormData) => {
    setIsLoading(true);
    try {
      console.log("[v0] Saving form data:", { ...data, photo: photoPreview });
      // Here you would typically send the data to your backend
      await new Promise((resolve) => setTimeout(resolve, 500));
      onSave();
    } catch (error) {
      console.error("[v0] Error saving form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-4 bg-card border-0 shadow-none text-[#3B3B3B]">
      <form onSubmit={handleSubmit(handleSave)}>
        {/* Your Photo */}
        <div className="flex items-center justify-between gap-6">
          <label className="text-lg font-medium  w-44">Your Photo</label>
          <div className="flex-1 flex gap-6 border-b pb-4 border-gray-200">
            <Avatar className="w-14 h-14">
              <AvatarImage src={"/placeholder.svg"} alt="User photo" />
              <AvatarFallback>JM</AvatarFallback>
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
        <div className="flex items-center gap-6 py-4">
          <label className="text-sm font-medium text-foreground w-44">
            Full Name
          </label>
          <div className="flex-1 border-b pb-4 border-gray-200">
            <Input
              {...register("fullName")}
              className="flex-1 border-gray-200 text-foreground"
              placeholder="Enter full name"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-6 pb-4">
          <label className="text-sm font-medium text-foreground w-44">
            Email
          </label>
          <div className="flex-1 border-b pb-4 border-gray-200">
            <Input
              {...register("email")}
              type="email"
              className="flex-1 border-gray-200 text-foreground"
              placeholder="Enter email"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="flex items-center gap-6 pb-4 ">
          <label className="text-sm font-medium text-foreground w-44">
            Phone Number
          </label>
          <div className="flex-1 border-b pb-4 border-gray-200">
            <PhoneInput
              country={country.toLowerCase()}
              value={phone}
              onChange={(phone) => setValue("phone", phone)}
              inputClass="!w-full"
              containerClass="phone-input-container w-full"
              
            />
          </div>
        </div>

        {/* Country */}
        <div className="flex items-center gap-6 pb-4">
          <label className="text-sm font-medium text-foreground w-44">
            Country
          </label>
          <div className="flex-1">
            <FlagSelect
              selected={country}
              onSelect={(code) => setValue("country", code)}
              className="flag-select"
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
      </form>
    </Card>
  );
}
