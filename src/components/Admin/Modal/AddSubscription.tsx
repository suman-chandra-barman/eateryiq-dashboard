"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";

interface Feature {
  name: string;
  enabled: boolean;
}

interface AddSubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    package_title: string;
    package_subtitle: string;
    package_duration: string;
    package_amount: number;
    features: Feature[];
  }) => void;
  isSubmitting?: boolean;
}

const defaultFeatures: Feature[] = [
  { name: "Dashboard (Daily Insights)", enabled: false },
  { name: "Dashboard (Daily Insights)", enabled: false },
  { name: "AI Chatbot (Basic)", enabled: false },
  { name: "Compliance & Fridge Logs", enabled: false },
  { name: "AI Chatbot (Basic)", enabled: false },
  { name: "Compliance & Fridge Logs", enabled: false },
];

export function AddSubscriptionModal({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting,
}: AddSubscriptionModalProps) {
  const [packageTitle, setPackageTitle] = useState("");
  const [packageSubtitle, setPackageSubtitle] = useState("");
  const [packageDuration, setPackageDuration] = useState("");
  const [packageAmount, setPackageAmount] = useState("");
  const [features, setFeatures] = useState<Feature[]>(defaultFeatures);

  const handleFeatureToggle = (index: number) => {
    const newFeatures = [...features];
    newFeatures[index].enabled = !newFeatures[index].enabled;
    setFeatures(newFeatures);
  };

  const handleSubmit = () => {
    if (!packageTitle || !packageDuration || !packageAmount) {
      return;
    }

    onSubmit({
      package_title: packageTitle,
      package_subtitle: packageSubtitle,
      package_duration: packageDuration,
      package_amount: parseFloat(packageAmount),
      features: features,
    });

    setPackageTitle("");
    setPackageSubtitle("");
    setPackageDuration("");
    setPackageAmount("");
    setFeatures(defaultFeatures);
  };

  const handleCancel = () => {
    setPackageTitle("");
    setPackageSubtitle("");
    setPackageDuration("");
    setPackageAmount("");
    setFeatures(defaultFeatures);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={handleCancel}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold">Add Subscription</h2>
          </div>

          <div className="space-y-5">
            <div>
              <Label htmlFor="title" className="text-sm font-medium text-gray-700 mb-2 block">
                Package Title
              </Label>
              <Input
                id="title"
                placeholder="Enter package title"
                value={packageTitle}
                onChange={(e) => setPackageTitle(e.target.value)}
                className="bg-gray-50 border-gray-200"
              />
            </div>

            <div>
              <Label htmlFor="subtitle" className="text-sm font-medium text-gray-700 mb-2 block">
                Package Subtitle
              </Label>
              <Input
                id="subtitle"
                placeholder="Enter package title"
                value={packageSubtitle}
                onChange={(e) => setPackageSubtitle(e.target.value)}
                className="bg-gray-50 border-gray-200"
              />
            </div>

            <div>
              <Label htmlFor="duration" className="text-sm font-medium text-gray-700 mb-2 block">
                Package Duration
              </Label>
              <Input
                id="duration"
                placeholder="Enter package Duration"
                value={packageDuration}
                onChange={(e) => setPackageDuration(e.target.value)}
                className="bg-gray-50 border-gray-200"
              />
            </div>

            <div>
              <Label htmlFor="amount" className="text-sm font-medium text-gray-700 mb-2 block">
                Package Amount
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="Enter package Amount"
                value={packageAmount}
                onChange={(e) => setPackageAmount(e.target.value)}
                className="bg-gray-50 border-gray-200"
              />
            </div>

            <div className="border-2 border-blue-500 rounded-lg p-4">
              <Label className="text-blue-600 font-medium mb-3 block">
                Select Features:
              </Label>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Checkbox
                      id={`feature-${index}`}
                      checked={feature.enabled}
                      onCheckedChange={() => handleFeatureToggle(index)}
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label
                      htmlFor={`feature-${index}`}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      {feature.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleCancel}
                variant="outline"
                className="flex-1 h-12 border-gray-300 hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isSubmitting || !packageTitle || !packageDuration || !packageAmount}
              >
                {isSubmitting ? "Creating..." : "Create"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
