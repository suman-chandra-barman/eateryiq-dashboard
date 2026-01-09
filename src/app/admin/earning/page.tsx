/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DeleteModal from "@/components/Admin/Modal/DeleteModal";
import EarningDetailsModal from "@/components/Admin/Modal/EarningDetailsModal";
import EarningTable from "@/components/Admin/Table/EarningsTable";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  useGetAllEarningsQuery,
  useDeleteEarningMutation,
} from "@/redux/features/earning/earningApi";
import { SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

function EarningsPage() {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedEarningId, setSelectedEarningId] = useState<number | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1); // Reset to first page on search
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, isLoading, isError } = useGetAllEarningsQuery({
    page: currentPage,
    limit: 10,
    search: debouncedSearch,
  });

  const [deleteEarning, { isLoading: isDeleting }] = useDeleteEarningMutation();

  const handleViewDetails = (earningId: number) => {
    setSelectedEarningId(earningId);
    setDetailsModalOpen(true);
  };

  const handleDeleteClick = (earningId: number) => {
    setSelectedEarningId(earningId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedEarningId) {
      try {
        await deleteEarning(selectedEarningId).unwrap();
        toast.success("Earning deleted successfully");
        setDeleteModalOpen(false);
        setSelectedEarningId(null);
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to delete earning");
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          Earning List
        </h2>
        <InputGroup className="max-w-sm">
          <InputGroupInput
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <EarningTable
        earnings={data?.data || []}
        isLoading={isLoading}
        isError={isError}
        onViewDetails={handleViewDetails}
        onDelete={handleDeleteClick}
        currentPage={currentPage}
        totalPages={data?.meta?.totalPage || 1}
        onPageChange={setCurrentPage}
      />

      {selectedEarningId && (
        <>
          <EarningDetailsModal
            isOpen={detailsModalOpen}
            onClose={() => {
              setDetailsModalOpen(false);
              setSelectedEarningId(null);
            }}
            earningId={selectedEarningId}
          />
          <DeleteModal
            isOpen={deleteModalOpen}
            onClose={() => {
              setDeleteModalOpen(false);
              setSelectedEarningId(null);
            }}
            onConfirm={handleConfirmDelete}
            title={"earning"}
            isLoading={isDeleting}
          />
        </>
      )}
    </div>
  );
}

export default EarningsPage;
