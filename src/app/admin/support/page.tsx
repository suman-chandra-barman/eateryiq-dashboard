"use client";

import { useState } from "react";
import SupportQueryCard from "@/components/Admin/Card/SupportQueryCard";
import { useGetAllContactsQuery } from "@/redux/features/support/supportApi";
import PageLoader from "@/components/Skeletons/PageLoader";

export default function SupportPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;

  const { data, isLoading, isError } = useGetAllContactsQuery({
    page: currentPage,
    limit,
  });

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError || !data?.success) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500 text-lg">Failed to load support queries</p>
      </div>
    );
  }

  const contacts = data.data || [];
  const totalPages = data.meta?.totalPage || 1;

  return (
    <div className="flex">
      <main className="flex-1 overflow-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Support</h1>

        {contacts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No support queries found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contacts.map((query) => (
                <SupportQueryCard key={query.id} query={query} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
