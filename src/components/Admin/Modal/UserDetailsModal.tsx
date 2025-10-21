"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  address: string;
  joinDate: string;
}

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export default function UserDetailsModal({
  isOpen,
  onClose,
  user,
}: UserDetailsModalProps) {
  if (!isOpen) return null;

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

        <div className="space-y-6">
          <DetailField label="User Name :" value={user.name} />
          <DetailField label="Email :" value={user.email} />
          <DetailField label="User Role :" value={user.role} />
          <DetailField label="Address :" value={user.address} />
          <DetailField label="Date :" value={user.joinDate} />
        </div>

        <Button
          onClick={onClose}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Okay
        </Button>
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
    <div className="border-b border-gray-200 pb-4 flex items-center justify-between text-gray-600 text-sm font-medium ">
      <p className="mb-2">{label}</p>
      <p>{value}</p>
    </div>
  );
}
