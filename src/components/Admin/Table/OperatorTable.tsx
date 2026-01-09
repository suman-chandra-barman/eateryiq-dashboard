"use client";

import { Eye, Trash2 } from "lucide-react";
import Pagination from "../Pagination";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  plan: string;
  joinDate: string;
}

interface UsersTableProps {
  users: User[];
  onViewDetails: (user: User) => void;
  onDelete: (user: User) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const ITEMS_PER_PAGE = 10;

export default function OperatorTable({
  users,
  onViewDetails,
  onDelete,
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
}: UsersTableProps) {
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-600 text-white w-full">
              <th className="px-6 py-4 text-left text-sm font-semibold">
                #TR.ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                User Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Email
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Plan
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-600">
                  #{startIndex + index + 1}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.plan}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onViewDetails(user)}
                      className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
                      aria-label="View details"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(user)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                      aria-label="Delete user"
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
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={onPageChange}
      />
    </div>
  );
}
