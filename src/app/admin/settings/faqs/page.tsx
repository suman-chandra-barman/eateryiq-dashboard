/** @format */
"use client";

import AddFaqsModal from "@/components/Admin/settings/addFaqsModal";
import FaqsCard from "@/components/Admin/settings/faqsCard";
import BackButton from "@/components/Shared/BackButton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import {
  useGetFAQsQuery,
  useDeleteFAQMutation,
} from "@/redux/features/faqs/faqsApi";
import { toast } from "sonner";
import PageLoader from "@/components/Shared/PageLoader";

const FAQPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: faqsData, isLoading, error } = useGetFAQsQuery();
  const [deleteFAQ] = useDeleteFAQMutation();

  const handleDeleteFaq = async (id: number) => {
    try {
      await deleteFAQ(id).unwrap();
      toast.success("FAQ deleted successfully");
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to delete FAQ");
    }
  };

  const handleAddNew = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-transparent pt-2 md:pt-6">
        <div className="max-w-full mx-auto">
          <BackButton name="FAQ's" />
          <div className="mt-6 text-center text-red-500">
            Failed to load FAQs. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  const faqs = faqsData?.data || [];

  return (
    <div className="min-h-screen bg-transparent pt-2 md:pt-6">
      <div className="max-w-full mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <BackButton name="FAQ's" />
          <Button
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2"
          >
            <Plus className="w-4 h-4" />
            Add New FAQ
          </Button>
        </div>

        {/* FAQs Grid */}
        {faqs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No FAQs found. Click &quot;Add New FAQ&quot; to create one.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {faqs.map((faq) => (
              <FaqsCard
                key={faq.id}
                id={faq.id}
                question={faq.question}
                answer={faq.answer}
                onDelete={handleDeleteFaq}
              />
            ))}
          </div>
        )}

        {/* Add FAQ Modal */}
        <AddFaqsModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </div>
  );
};

export default FAQPage;
