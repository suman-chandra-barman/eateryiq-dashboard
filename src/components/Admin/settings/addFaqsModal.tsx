/** @format */
"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCreateFAQMutation } from "@/redux/features/faqs/faqsApi";
import { toast } from "sonner";

interface AddFaqsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddFaqsModal: React.FC<AddFaqsModalProps> = ({ isOpen, onClose }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [createFAQ, { isLoading }] = useCreateFAQMutation();

  React.useEffect(() => {
    if (!isOpen) {
      setQuestion("");
      setAnswer("");
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (question.trim() && answer.trim()) {
      try {
        await createFAQ({
          question: question.trim(),
          answer: answer.trim(),
          is_active: true,
        }).unwrap();

        toast.success("FAQ created successfully");
        setQuestion("");
        setAnswer("");
        onClose();
      } catch (error) {
        const err = error as { data?: { message?: string } };
        toast.error(err?.data?.message || "Failed to create FAQ");
      }
    }
  };

  const handleClose = () => {
    setQuestion("");
    setAnswer("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 text-center">
            Add FAQ
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Question Input */}
          <div className="space-y-3">
            <Label
              htmlFor="question"
              className="text-base font-medium text-gray-700"
            >
              Question
            </Label>
            <Input
              id="question"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter User Questions"
              className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-0 transition-colors bg-gray-50"
            />
          </div>

          {/* Answer Input */}
          <div className="space-y-3">
            <Label
              htmlFor="answer"
              className="text-base font-medium text-gray-700"
            >
              Answer
            </Label>
            <Textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter Question answer"
              className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-0 transition-colors bg-gray-50 min-h-32 resize-none"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-center gap-4 pt-4">
            <Button
              onClick={handleClose}
              variant="outline"
              className="px-8 py-2 border-2 border-gray-300 text-gray-600 hover:bg-gray-50 rounded-full"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!question.trim() || !answer.trim() || isLoading}
              className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFaqsModal;
