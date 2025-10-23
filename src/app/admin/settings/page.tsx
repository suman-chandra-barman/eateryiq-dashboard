"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import { ChangePassModal } from "@/components/Admin/settings/ChangePassModal";

export default function SettingsPage() {
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);

  const handleChangePasswordClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsChangePasswordModalOpen(true);
  };

  return (
    <div className="bg-transparent pt-2 md:pt-6">
      <div className="max-w-full mx-auto space-y-6">
        {/* Settings Content */}
        <h2 className="text-xl md:text-2xl">Setting</h2>
        {/* Settings Menu */}
        <div className="w-full  flex flex-col gap-2">
          <Link href="/admin/settings/personal-info">
            <div className="flex items-center w-full justify-between px-4 py-2.5 rounded-xl border border-blue-200  bg-white hover:bg-gray-50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <span className="text-gray-700 group-hover:text-gray-900">
                  Personal Information
                </span>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
            </div>
          </Link>

          <div
            onClick={handleChangePasswordClick}
            className="flex items-center w-full justify-between px-4 py-2.5 rounded-xl border border-blue-200  bg-white hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <span className="text-gray-700 group-hover:text-gray-900">
                Change password
              </span>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
          </div>

          <Link href="/admin/settings/terms-conditions">
            <div className="flex items-center w-full justify-between px-4 py-2.5 rounded-xl border border-blue-200  bg-white hover:bg-gray-50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <span className="text-gray-700 group-hover:text-gray-900">
                  Terms & conditions
                </span>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
            </div>
          </Link>

          <Link href="/admin/settings/privacy-policy">
            <div className="flex items-center w-full justify-between px-4 py-2.5 rounded-xl border border-blue-200  bg-white hover:bg-gray-50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <span className="text-gray-700 group-hover:text-gray-900">
                  Privacy & policy
                </span>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
            </div>
          </Link>
          
          <Link href="/admin/settings/faqs">
            <div className="flex items-center w-full justify-between px-4 py-2.5 rounded-xl border border-blue-200   bg-white hover:bg-gray-50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <span className="text-gray-700 group-hover:text-gray-900">
                  FAQ’s
                </span>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
            </div>
          </Link>
        </div>

        {/* Change Password Modal */}
        <ChangePassModal
          open={isChangePasswordModalOpen}
          onOpenChange={setIsChangePasswordModalOpen}
        />
      </div>
    </div>
  );
}
