"use client";

import { Eye, Trash2 } from "lucide-react";
import Pagination from "../Pagination";
import PageLoader from "@/components/Skeletons/PageLoader";

interface Earning {
  id: number;
  sl: number;
  invoice_id: string;
  user_name: string;
  email: string;
  role: string;
  plan: string;
  date: string;
  price: number;
  status: string;
}

interface EarningTableProps {
  earnings: Earning[];
  isLoading?: boolean;
  isError?: boolean;
  onViewDetails: (earningId: number) => void;
  onDelete: (earningId: number) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ITEMS_PER_PAGE = 10;

export default function EarningTable({
  earnings,
  isLoading,
  isError,
  onViewDetails,
  onDelete,
  currentPage,
  totalPages,
  onPageChange,
}: EarningTableProps) {
  if (isLoading) {
    return <PageLoader className="h-[70vh]" />;
  }

  if (isError) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-center py-20">
          <p className="text-red-600">
            Failed to load earnings. Please try again.
          </p>
        </div>
      </div>
    );
  }

  if (earnings.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-500">No earnings found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-6 py-4 text-left text-sm font-semibold">#SL</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Invoice ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                User Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Email
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Role
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Plan
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Price
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {earnings.map((earning) => (
              <tr
                key={earning.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-600">
                  #{earning.sl}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 font-mono text-xs">
                  {earning.invoice_id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {earning.user_name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {earning.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                  {earning.role}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {earning.plan}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {earning.date}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 font-semibold">
                  ${earning.price}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      earning.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {earning.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onViewDetails(earning.id)}
                      className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
                      aria-label="View details"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(earning.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                      aria-label="Delete earning"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={earnings.length * totalPages}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={onPageChange}
      />
    </div>
  );
}
