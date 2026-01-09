/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DeleteModal from "@/components/Admin/Modal/DeleteModal";
import MarketingManagerDetailsModal from "@/components/Admin/Modal/MarketingManagerDetailsModal";
import OperatorTable from "@/components/Admin/Table/OperatorTable";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";
import {
  useGetAllMarketingManagersQuery,
  useDeleteMarketingManagerMutation,
} from "@/redux/features/users/userApi";
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  plan: string;
  joinDate: string;
}

export default function MarketingManagerPage() {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const limit = 10;

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // Reset to first page on search
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const {
    data: marketingManagersData,
    isLoading,
    error,
  } = useGetAllMarketingManagersQuery({
    page: currentPage,
    limit,
    search: debouncedSearch,
  });

  const [deleteMarketingManager] = useDeleteMarketingManagerMutation();

  const users: User[] =
    marketingManagersData?.data?.map((manager: any) => ({
      id: manager.id.toString(),
      name: manager.user_name,
      email: manager.email,
      role: "Manager",
      plan: manager.plan,
      joinDate: "N/A",
    })) || [];

  const handleViewDetails = (user: User) => {
    setSelectedUserId(Number(user.id));
    setDetailsModalOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setSelectedUserId(Number(user.id));
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedUserId) {
      try {
        await deleteMarketingManager(selectedUserId).unwrap();
        setDeleteModalOpen(false);
        setSelectedUserId(null);
      } catch (error) {
        console.error("Failed to delete marketing manager:", error);
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 flex items-center justify-center min-h-[400px]">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 flex items-center justify-center min-h-[400px]">
        <div className="text-red-600">Error loading marketing managers</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          Marketing Manager List
        </h2>
        <InputGroup className="max-w-sm">
          <InputGroupInput
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <OperatorTable
        users={users}
        onViewDetails={handleViewDetails}
        onDelete={handleDeleteClick}
        currentPage={currentPage}
        totalPages={marketingManagersData?.meta?.totalPages || 1}
        totalItems={marketingManagersData?.meta?.total || 0}
        onPageChange={handlePageChange}
      />

      {selectedUserId && (
        <>
          <MarketingManagerDetailsModal
            isOpen={detailsModalOpen}
            onClose={() => {
              setDetailsModalOpen(false);
              setSelectedUserId(null);
            }}
            userId={selectedUserId}
          />
          <DeleteModal
            isOpen={deleteModalOpen}
            onClose={() => {
              setDeleteModalOpen(false);
              setSelectedUserId(null);
            }}
            onConfirm={handleConfirmDelete}
            title={"user"}
          />
        </>
      )}
    </div>
  );
}
