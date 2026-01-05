"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { DocumentsTable } from "@/components/DocumentsTable";
import { AddDocumentDialog } from "@/components/Dailog/AddDocumentDailog";
import { FilterDocumentsDialog } from "@/components/Dailog/FilterDocumentDailog";
import {
  useGetOperatorDocumentsQuery,
  useDeleteOperatorDocumentMutation,
  useBulkDeleteOperatorDocumentsMutation,
  type OperatorDocument,
} from "@/redux/features/documents/documentsApi";
import { toast } from "sonner";

export type Document = {
  id: string;
  fileName: string;
  type: string;
  fileFormat: string;
  uploadDate: string;
  fileSize: string;
  fileUrl?: string;
};

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [filters, setFilters] = useState({ type: "All", format: "All" });
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const {
    data: documentsData,
    isLoading: isDocumentsLoading,
    refetch,
  } = useGetOperatorDocumentsQuery({
    page: currentPage,
    limit: limit,
    search: searchQuery,
    file_format: filters.format !== "All" ? filters.format : undefined,
  });

  const [deleteDocument] = useDeleteOperatorDocumentMutation();
  const [bulkDeleteDocuments] = useBulkDeleteOperatorDocumentsMutation();

  // Transform API data to local format
  const transformedDocuments: Document[] =
    documentsData?.data?.map((doc: OperatorDocument) => ({
      id: doc.id.toString(),
      fileName: doc.title,
      type: doc.document_type,
      fileFormat: doc.file_format,
      uploadDate: new Date(doc.created_at).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      fileSize: `${doc.file_size_mb.toFixed(1)} MB`,
      fileUrl: doc.file,
    })) || [];

  const filteredDocuments = transformedDocuments.filter((doc) => {
    const matchesType = filters.type === "All" || doc.type === filters.type;
    return matchesType;
  });

  const handleAddDocument = () => {
    // This will be handled by the dialog itself now
    setShowAddDialog(false);
    refetch();
  };

  const handleDeleteDocuments = async (ids: string[]) => {
    try {
      const numericIds = ids.map((id) => Number(id));

      if (numericIds.length === 1) {
        // Single delete
        const response = await deleteDocument(numericIds[0]).unwrap();
        toast.success(response.message || "Document deleted successfully");
      } else {
        // Bulk delete
        const response = await bulkDeleteDocuments({
          ids: numericIds,
        }).unwrap();
        toast.success(
          response.message ||
            `${numericIds.length} documents deleted successfully`
        );
      }

      refetch();
    } catch (error: unknown) {
      console.error("Failed to delete documents:", error);
      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message ||
        "Failed to delete documents";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-3xl font-medium text-[#3B3B3B] mb-4">Documents</h1>
      <div className="flex-1 p-6 overflow-auto bg-white rounded-2xl">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Actions */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search for documents"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-gray-200"
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowFilterDialog(true)}
                className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filter
              </Button>
              <Button
                onClick={() => setShowAddDialog(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Document
              </Button>
            </div>
          </div>

          {/* Loading State */}
          {isDocumentsLoading ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-500">Loading documents...</p>
            </div>
          ) : (
            <>
              {/* Documents Table */}
              <DocumentsTable
                documents={filteredDocuments}
                onDeleteDocuments={handleDeleteDocuments}
              />

              {/* Pagination Info */}
              {documentsData?.meta && (
                <div className="flex items-center justify-between pt-4">
                  <p className="text-sm text-gray-600">
                    Showing {(currentPage - 1) * limit + 1} to{" "}
                    {Math.min(currentPage * limit, documentsData.meta.total)} of{" "}
                    {documentsData.meta.total} documents
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                      disabled={currentPage >= documentsData.meta.totalPage}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Dialogs */}
      <AddDocumentDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAdd={handleAddDocument}
      />
      <FilterDocumentsDialog
        open={showFilterDialog}
        onOpenChange={setShowFilterDialog}
        filters={filters}
        onApplyFilters={setFilters}
      />
    </div>
  );
}
