/** @format */

"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, ArrowLeft, Lock } from "lucide-react";

interface ChangePassModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChangePassModal({ open, onOpenChange }: ChangePassModalProps) {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    console.log("Change password submitted:", {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    });

    // Reset form and close modal
    setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    onOpenChange(false);
  };

  const handleBack = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md mx-auto p-0 border-0 shadow-lg rounded-2xl">
        <div className="bg-white rounded-2xl p-6">
          <DialogHeader className="pb-4">
            <div className="flex items-center">
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                <DialogTitle className="text-lg font-medium text-gray-800">
                  Change Password
                </DialogTitle>
              </button>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Old Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type={showPasswords.oldPassword ? "text" : "password"}
                placeholder="Enter old password"
                value={formData.oldPassword}
                onChange={(e) =>
                  handleInputChange("oldPassword", e.target.value)
                }
                className="h-12 pl-10 pr-10 border-gray-200 focus:border-gray-300 focus:ring-0 text-gray-600 rounded-lg"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("oldPassword")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.oldPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {/* New Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type={showPasswords.newPassword ? "text" : "password"}
                placeholder="Set new password"
                value={formData.newPassword}
                onChange={(e) =>
                  handleInputChange("newPassword", e.target.value)
                }
                className="h-12 pl-10 pr-10 border-gray-200 focus:border-gray-300 focus:ring-0 text-gray-600 rounded-lg"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("newPassword")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.newPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {/* Confirm New Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type={showPasswords.confirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                className="h-12 pl-10 pr-10 border-gray-200 focus:border-gray-300 focus:ring-0 text-gray-600 rounded-lg"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirmPassword")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.confirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {/* Save Changes Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full h-12 text-white font-medium text-base rounded-xl hover:opacity-90 transition-opacity bg-blue-600 hover:bg-blue-700"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
