"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AccountEditForm } from "./AccountEditForm";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Edit } from "lucide-react";

export function AccountTab() {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <AccountEditForm
        onCancel={() => setIsEditing(false)}
        onSave={() => setIsEditing(false)}
      />
    );
  }

  return (
    <Card className="p-4 bg-card border-0 shadow-none text-[#3B3B3B]">
      <div className="">
        {/* Your Photo */}
        <div className="flex items-center justify-between">
          <label className="text-lg font-medium  w-44">
           Your Photo
          </label>
          <div className="flex-1 border-b pb-4 border-gray-200">
           <Avatar className="w-14 h-14">
              <AvatarImage src={"/placeholder.svg"} alt="User photo" />
              <AvatarFallback>JM</AvatarFallback>
            </Avatar>
          </div>
        </div>
        {/* Full Name */}
        <div className="flex items-center justify-between py-4 ">
          <label className="text-lg font-medium  w-44">
            Full Name
          </label>
          <div className="flex-1 border-b pb-4 border-gray-200">
            <p className="p-2 bg-gray-200 rounded-xl">John Marpung</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center justify-between">
          <label className="text-lg font-medium  w-44">
            Email
          </label>
          <div className="flex-1 border-b pb-4 border-gray-200">
            <p className="p-2 bg-gray-200 rounded-xl">Name@gmail.com</p>
          </div>
        </div>

        {/* Phone Number */}
        <div className="flex items-center justify-between pt-4">
          <label className="text-lg font-medium  w-44">
            Phone Number
          </label>
          <div className="flex-1 border-b pb-4 border-gray-200">
            <p className="p-2 bg-gray-200 rounded-xl">+1 (213) 555-4927</p>
          </div>
        </div>

        {/* Country */}
        <div className="flex items-center justify-between py-4">
          <label className="text-lg font-medium  w-44">
            Country
          </label>
          <div className="flex-1 ">
            <p className="p-2 bg-gray-200 rounded-xl">United States</p>
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
