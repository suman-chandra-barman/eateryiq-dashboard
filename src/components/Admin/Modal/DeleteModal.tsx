"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  userName,
}: DeleteUserModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle size={32} className="text-red-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-3">Delete User</h2>
        <p className="text-gray-600 mb-8">
          Are you sure you want to delete this user? This action cannot be
          undone.
        </p>

        <div className="flex gap-4">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors bg-transparent"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
