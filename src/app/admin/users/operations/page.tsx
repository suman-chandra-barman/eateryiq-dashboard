"use client";

import DeleteModal from "@/components/Admin/Modal/DeleteModal";
import UserDetailsModal from "@/components/Admin/Modal/UserDetailsModal";
import OperatorTable from "@/components/Admin/Table/OperatorTable";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  address: string;
  plan: string;
  joinDate: string;
}

export default function OperationsPage() {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const users: User[] = [
    {
      id: "1",
      name: "User",
      email: "name@gmail.com",
      role: "Operator",
      plan: "Professional",
      address: "UK",
      joinDate: "1 Jan, 2025",
    },
    {
      id: "2",
      name: "User",
      email: "name@gmail.com",
      role: "Operator",
      plan: "Professional",
      address: "UK",
      joinDate: "1 Jan, 2025",
    },
    {
      id: "3",
      name: "User",
      email: "name@gmail.com",
      role: "Operator",
      plan: "Starter",
      address: "UK",
      joinDate: "1 Jan, 2025",
    },
    {
      id: "4",
      name: "User",
      email: "name@gmail.com",
      role: "Operator",
      plan: "Starter",
      address: "UK",
      joinDate: "1 Jan, 2025",
    },
    {
      id: "5",
      name: "User",
      email: "name@gmail.com",
      role: "Operator",
      plan: "Professional",
      address: "UK",
      joinDate: "1 Jan, 2025",
    },
    {
      id: "6",
      name: "User",
      email: "name@gmail.com",
      role: "Operator",
      plan: "Starter",
      address: "UK",
      joinDate: "1 Jan, 2025",
    },
    {
      id: "7",
      name: "User",
      email: "name@gmail.com",
      role: "Operator",
      address: "UK",
      plan: "Professional",
      joinDate: "1 Jan, 2025",
    },
    {
      id: "8",
      name: "User",
      email: "name@gmail.com",
      plan: "Starter",
      role: "Operator",
      address: "UK",
      joinDate: "1 Jan, 2025",
    },
    {
      id: "9",
      name: "User",
      email: "name@gmail.com",
      role: "Operator",
      plan: "Starter",
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
    <div className=" bg-gray-50">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          Operations List
        </h2>
        <InputGroup className="max-w-sm">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <OperatorTable
        users={users}
        onViewDetails={handleViewDetails}
        onDelete={handleDeleteClick}
      />

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
            title={"user"}
          />
        </>
      )}
    </div>
  );
}
