"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Earning {
  id: string;
  name: string;
  email: string;
  address: string;
  plan: string;
  date: string;
  price: number;
}

interface EarningDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  earning: Earning;
}

export default function EarningDetailsModal({
  isOpen,
  onClose,
  earning,
}: EarningDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Earning Details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        <div className="space-y-6">
          <DetailField label="User Name :" value={earning.name} />
          <DetailField label="Email :" value={earning.email} />
          <DetailField label="Address :" value={earning.address} />
          <DetailField label="Plan :" value={earning.plan} />
          <DetailField label="Date :" value={earning.date} />
          <DetailField label="Price :" value={earning.price} />
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
  value: string | number;
}

function DetailField({ label, value }: DetailFieldProps) {
  return (
    <div className="border-b border-gray-200 pb-4 flex items-center justify-between text-gray-600 text-sm font-medium ">
      <p className="mb-2">{label}</p>
      <p>{value}</p>
    </div>
  );
}
