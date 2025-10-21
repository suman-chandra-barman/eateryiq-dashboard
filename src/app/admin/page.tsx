"use client";

import AdminStatsCards from "@/components/Admin/Card/AdminStatsCard";
import DeleteModal from "@/components/Admin/Modal/DeleteModal";
import UserDetailsModal from "@/components/Admin/Modal/UserDetailsModal";
import UsersTable from "@/components/Admin/Table/UsersTable";
import { useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  address: string;
  joinDate: string;
}

export default function AdminDashboardPage() {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const users: User[] = [
    {
      id: "1",
      name: "User",
      email: "name@gmail.com",
      role: "Operator",
      address: "UK",
      joinDate: "1 Jan, 2025",
    },
    {
      id: "2",
      name: "User",
      email: "name@gmail.com",
      role: "Operator",
      address: "UK",
      joinDate: "1 Jan, 2025",
    },
    {
      id: "3",
      name: "User",
      email: "name@gmail.com",
      role: "Operator",
      address: "UK",
      joinDate: "1 Jan, 2025",
    },
    {
      id: "4",
      name: "User",
      email: "name@gmail.com",
      role: "Operator",
      address: "UK",
      joinDate: "1 Jan, 2025",
    },
    {
      id: "5",
      name: "User",
      email: "name@gmail.com",
      role: "Operator",
      address: "UK",
      joinDate: "1 Jan, 2025",
    },
    {
      id: "6",
      name: "User",
      email: "name@gmail.com",
      role: "Operator",
      address: "UK",
      joinDate: "1 Jan, 2025",
    },
    {
      id: "7",
      name: "User",
      email: "name@gmail.com",
      role: "Operator",
      address: "UK",
      joinDate: "1 Jan, 2025",
    },
    {
      id: "8",
      name: "User",
      email: "name@gmail.com",
      role: "Operator",
      address: "UK",
      joinDate: "1 Jan, 2025",
    },
    {
      id: "9",
      name: "User",
      email: "name@gmail.com",
      role: "Operator",
      address: "UK",
      joinDate: "1 Jan, 2025",
    },
  ];

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setDetailsModalOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setDeleteModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1">
          <AdminStatsCards />
          <UsersTable
            users={users}
            onViewDetails={handleViewDetails}
            onDelete={handleDeleteClick}
          />
        </main>
      </div>

      {selectedUser && (
        <>
          <UserDetailsModal
            isOpen={detailsModalOpen}
            onClose={() => setDetailsModalOpen(false)}
            user={selectedUser}
          />
          <DeleteModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={handleConfirmDelete}
            userName={selectedUser.name}
          />
        </>
      )}
    </div>
  );
}
