"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetSingleUserQuery } from "@/redux/features/users/userApi";

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
}

export default function UserDetailsModal({
  isOpen,
  onClose,
  userId,
}: UserDetailsModalProps) {
  const { data, isLoading, isError } = useGetSingleUserQuery(userId, {
    skip: !isOpen,
  });

  if (!isOpen) return null;

  const user = data?.data;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {isError && (
          <div className="flex items-center justify-center py-20">
            <p className="text-red-600">Failed to load user details.</p>
          </div>
        )}

        {user && (
          <>
            <div className="space-y-6">
              <DetailField label="User Name :" value={user.user_name} />
              <DetailField label="Email :" value={user.email} />
              <DetailField label="User Role :" value={user.user_role} />
              <DetailField label="Address :" value={user.address || "N/A"} />
              <DetailField
                label="Join Date :"
                value={user.join_date || user.date}
              />
            </div>

            <Button
              onClick={onClose}
              className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Okay
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

interface DetailFieldProps {
  label: string;
  value: string;
}

function DetailField({ label, value }: DetailFieldProps) {
  return (
    <div className="border-b border-gray-200 flex items-center justify-between text-gray-600 text-sm font-medium ">
      <p className="mb-2">{label}</p>
      <p>{value}</p>
    </div>
  );
}
