/** @format */
"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeftIcon, PenLine, Save, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [desc, setDesc] = useState(
    "Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magnis convallis arcu enim tortor. Cursus a sed tortor enim mi imperdiet massa donec mauris. Sem morbi morbi posuere faucibus. Cras risus ultrices duis pharetra sit porttitor elementum sagittis elementum. Ut vitae blandit pulvinar fermentum in id sed. At pellentesque non semper eget egestas vulputate id volutpat quis. Dolor etiam sodales at elementum mattis nibh quam placerat ut. Suspendisse est adipiscing proin et. Leo nisl bibendum donec ac non eget euismod suscipit. At ultricies nullam ipsum tellus. Non dictum orci at tortor convallis tortor suspendisse. Ac duis senectus arcu nullam in suspendisse vitae. Tellus interdum enim lorem vel morbi lectus.\n\nLorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magnis convallis arcu enim tortor. Cursus a sed tortor enim mi imperdiet massa donec mauris. Sem morbi morbi posuere faucibus. Cras risus ultrices duis pharetra sit porttitor elementum sagittis elementum. Ut vitae blandit pulvinar fermentum in id sed. At pellentesque non semper eget egestas vulputate id volutpat quis. Dolor etiam sodales at elementum mattis nibh quam placerat ut. Suspendisse est adipiscing proin et. Leo nisl bibendum donec ac non eget euismod suscipit. At ultricies nullam ipsum tellus. Non dictum orci at tortor convallis tortor suspendisse. Ac duis senectus arcu nullam in suspendisse vitae. Tellus interdum enim lorem vel morbi lectus."
  );
  const [tempDesc, setTempDesc] = useState(desc);

  const handleEdit = () => {
    setTempDesc(desc);
    setIsEditing(true);
  };

  const handleSave = () => {
    setDesc(tempDesc);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempDesc(desc);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-transparent pt-2 md:pt-6">
      <div className="max-w-full mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/admin/settings" className="flex items-center gap-0 mb-6">
            <ArrowLeftIcon className="w-8 h-4 text-gray-600" />
            <h2 className="text-lg md:text-xl font-medium text-gray-900">
              Privacy & Policy
            </h2>
          </Link>
          {!isEditing ? (
            <Button
              onClick={handleEdit}
              className="w-20 flex bg-blue-500 hover:bg-blue-600 text-white"
            >
              <PenLine /> Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                className="flex bg-blue-500 hover:bg-blue
                -600 text-white"
              >
                <Save className="w-4 h-4 mr-1" /> Save
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
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            privacy & policy
          </h3>

          {!isEditing ? (
            <div className="text-gray-600 leading-relaxed text-base whitespace-pre-wrap">
              {desc}
            </div>
          ) : (
            <Textarea
              value={tempDesc}
              onChange={(e) => setTempDesc(e.target.value)}
              className="min-h-96 text-base leading-relaxed resize-none border-2 border-gray-200 focus:border-blue-500 focus:ring-0"
              placeholder="Enter privacy policy content..."
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
