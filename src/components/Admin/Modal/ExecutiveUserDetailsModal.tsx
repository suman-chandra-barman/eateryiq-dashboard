"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetSingleExecutiveUserQuery } from "@/redux/features/users/userApi";

interface ExecutiveUserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
}

export default function ExecutiveUserDetailsModal({
  isOpen,
  onClose,
  userId,
}: ExecutiveUserDetailsModalProps) {
  const {
    data: executiveData,
    isLoading,
    error,
  } = useGetSingleExecutiveUserQuery(userId, {
    skip: !isOpen,
  });

  if (!isOpen) return null;

  const executive = executiveData?.data;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Executive Details
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 bg-gray-200 rounded"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-600 text-sm">
              Error loading executive details
            </p>
          </div>
        ) : executive ? (
          <div className="space-y-6">
            <DetailField
              label="User Name :"
              value={executive.user_name || "N/A"}
            />
            <DetailField label="Email :" value={executive.email || "N/A"} />
            <DetailField label="Plan :" value={executive.plan || "N/A"} />
            <DetailField
              label="Invoice ID :"
              value={executive.invoice_id || "N/A"}
            />
            <DetailField
              label="User Role :"
              value={executive.user_role || "Executive"}
            />
            <DetailField
              label="Joining Date :"
              value={executive.joining_date || "N/A"}
            />
          </div>
        ) : null}

        <Button
          onClick={onClose}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
          disabled={isLoading}
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
    <div className="border-b border-gray-200 flex items-center justify-between text-gray-600 text-sm font-medium ">
      <p className="mb-2">{label}</p>
      <p>{value}</p>
    </div>
  );
}
