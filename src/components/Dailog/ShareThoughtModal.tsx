"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ShareThoughtModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShareThoughtModal({
  open,
  onOpenChange,
}: ShareThoughtModalProps) {
  const [thought, setThought] = useState("");

  const handleShare = () => {
    console.log("Sharing thought:", thought);
    setThought("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0 bg-white rounded-2xl">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-xl font-semibold text-center text-gray-900">
            Share your Thought
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6 relative">
          <Textarea
            placeholder="Start Writing..."
            value={thought}
            onChange={(e) => setThought(e.target.value)}
            className="min-h-[150px] resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
          />

          <Button
            onClick={handleShare}
            className="w-full mt-4 text-white py-6 text-base rounded-full"
          >
            Share
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
