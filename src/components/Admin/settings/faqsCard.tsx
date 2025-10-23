/** @format */
"use client";

import React, { useState } from "react";
// import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface FaqsCardProps {
  id: string;
  question: string;
  answer: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const FaqsCard: React.FC<FaqsCardProps> = ({
  id,
  question,
  answer,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        {/* Question and Answer Section */}
        <div className="flex-1 space-y-3">
          <div
            className="cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <h3 className="text-lg font-medium text-gray-900  transition-colors">
              {question}
            </h3>
          </div>

          <div className="text-gray-600 text-sm leading-relaxed">{answer}</div>
        </div>

        {/* Controls Section */}
        <div className="flex items-center gap-3">
          {/* Status Switch */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(id)}
              className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4 font-bold" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqsCard;
