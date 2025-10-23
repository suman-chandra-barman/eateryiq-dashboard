/** @format */
"use client";

import AddFaqsModal from "@/components/Admin/settings/addFaqsModal";
import FaqsCard from "@/components/Admin/settings/faqsCard";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, Plus } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: "1",
      question: "How do I place an order?",
      answer:
        "Simply browse the products, select the variant (size, color, etc.), tap 'Add to Cart', and proceed to checkout. You'll be guided step-by-step to complete your purchase.",
    },
    {
      id: "2",
      question: "How do I place an order?",
      answer:
        "Simply browse the products, select the variant (size, color, etc.), tap 'Add to Cart', and proceed to checkout. You'll be guided step-by-step to complete your purchase.",
    },
    {
      id: "3",
      question: "How do I place an order?",
      answer:
        "Simply browse the products, select the variant (size, color, etc.), tap 'Add to Cart', and proceed to checkout. You'll be guided step-by-step to complete your purchase.",
    },
    {
      id: "4",
      question: "How do I place an order?",
      answer:
        "Simply browse the products, select the variant (size, color, etc.), tap 'Add to Cart', and proceed to checkout. You'll be guided step-by-step to complete your purchase.",
    },
    {
      id: "5",
      question: "How do I place an order?",
      answer:
        "Simply browse the products, select the variant (size, color, etc.), tap 'Add to Cart', and proceed to checkout. You'll be guided step-by-step to complete your purchase.",
    },
    {
      id: "6",
      question: "How do I place an order?",
      answer:
        "Simply browse the products, select the variant (size, color, etc.), tap 'Add to Cart', and proceed to checkout. You'll be guided step-by-step to complete your purchase.",
    },
  ]);

  const handleEditFaq = (id: string) => {
    const faqToEdit = faqs.find((faq) => faq.id === id);
    if (faqToEdit) {
      setEditingFaq(faqToEdit);
      setIsModalOpen(true);
    }
  };

  const handleDeleteFaq = (id: string) => {
    setFaqs((prev) => prev.filter((faq) => faq.id !== id));
  };

  const handleSaveFaq = (question: string, answer: string) => {
    if (editingFaq) {
      // Edit existing FAQ
      setFaqs((prev) =>
        prev.map((faq) =>
          faq.id === editingFaq.id ? { ...faq, question, answer } : faq
        )
      );
      setEditingFaq(null);
    } else {
      // Add new FAQ
      const newFaq: FAQ = {
        id: Date.now().toString(),
        question,
        answer,
      };
      setFaqs((prev) => [...prev, newFaq]);
    }
  };

  const handleAddNew = () => {
    setEditingFaq(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFaq(null);
  };

  return (
    <div className="min-h-screen bg-transparent pt-2 md:pt-6">
      <div className="max-w-full mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/admin/settings" className="flex items-center gap-0 mb-6">
            <ArrowLeftIcon className="w-8 h-4 text-gray-600" />
            <h2 className="text-lg md:text-xl font-medium text-gray-900">
              FAQ&apos;s
            </h2>
          </Link>
          <Button
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2"
          >
            <Plus className="w-4 h-4" />
            Add New FAQ
          </Button>
        </div>

        {/* FAQs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {faqs.map((faq) => (
            <FaqsCard
              key={faq.id}
              id={faq.id}
              question={faq.question}
              answer={faq.answer}
              onEdit={handleEditFaq}
              onDelete={handleDeleteFaq}
            />
          ))}
        </div>

        {/* Add/Edit FAQ Modal */}
        <AddFaqsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveFaq}
          editData={
            editingFaq
              ? {
                  id: editingFaq.id,
                  question: editingFaq.question,
                  answer: editingFaq.answer,
                }
              : null
          }
        />
      </div>
    </div>
  );
};

export default Page;
