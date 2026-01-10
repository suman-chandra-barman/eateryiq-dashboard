/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */
"use client";

import BackButton from "@/components/Shared/BackButton";
import PageLoader from "@/components/Shared/PageLoader";
import TipTapEditor from "@/components/Shared/TipTapEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useGetPrivacyPolicyQuery,
  useCreatePrivacyPolicyMutation,
  useUpdatePrivacyPolicyMutation,
} from "@/redux/features/privacy/privacyPolicyApi";
import { PenLine, Save, X, Plus } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

const Page = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [currentPolicyId, setCurrentPolicyId] = useState<number | null>(null);

  const { data: policyData, isLoading } = useGetPrivacyPolicyQuery();
  const [createPolicy, { isLoading: isCreatingPolicy }] =
    useCreatePrivacyPolicyMutation();
  const [updatePolicy, { isLoading: isUpdating }] =
    useUpdatePrivacyPolicyMutation();

  useEffect(() => {
    if (policyData?.data && policyData.data.length > 0) {
      const latestPolicy = policyData.data[0];
      setTitle(latestPolicy.title);
      setContent(latestPolicy.content);
      setCurrentPolicyId(latestPolicy.id);
    }
  }, [policyData]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCreateNew = () => {
    setTitle("");
    setContent("");
    setCurrentPolicyId(null);
    setIsCreating(true);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in both title and content");
      return;
    }

    try {
      if (isCreating || currentPolicyId === null) {
        await createPolicy({ title, content }).unwrap();
        toast.success("Privacy policy created successfully");
        setIsCreating(false);
      } else {
        await updatePolicy({
          id: currentPolicyId,
          body: { title, content },
        }).unwrap();
        toast.success("Privacy policy updated successfully");
      }
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to save privacy policy");
    }
  };

  const handleCancel = () => {
    if (policyData?.data && policyData.data.length > 0) {
      const latestPolicy = policyData.data[0];
      setTitle(latestPolicy.title);
      setContent(latestPolicy.content);
      setCurrentPolicyId(latestPolicy.id);
    }
    setIsEditing(false);
    setIsCreating(false);
  };

  if (isLoading) return <PageLoader className="h-[50vh]" />;

  return (
    <div className="min-h-screen bg-transparent pt-2 md:pt-6">
      <div className="max-w-full mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <BackButton name="Privacy & Policy" />
          {!isEditing ? (
            <div className="flex gap-2">
              {policyData?.data && policyData.data.length > 0 && (
                <Button
                  onClick={handleEdit}
                  className="w-20 flex bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <PenLine /> Edit
                </Button>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                disabled={isCreatingPolicy || isUpdating}
                className="flex bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Save className="w-4 h-4 mr-1" />
                {isCreatingPolicy || isUpdating ? "Saving..." : "Save"}
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="flex border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                <X className="w-4 h-4 mr-1" /> Cancel
              </Button>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl p-6 border border-blue-300 shadow-sm">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter privacy policy title..."
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <TipTapEditor
                  content={content}
                  onChange={setContent}
                  editable={true}
                />
              </div>
            </div>
          ) : (
            <>
              {policyData?.data && policyData.data.length > 0 ? (
                <>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                    {title}
                  </h3>
                  <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
                    <TipTapEditor
                      content={content}
                      onChange={() => {}}
                      editable={false}
                    />
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">
                    No privacy policy available
                  </p>
                  <Button
                    onClick={handleCreateNew}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Create First Policy
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
