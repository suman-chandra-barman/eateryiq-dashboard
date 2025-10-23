import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function BackButton({ name }: { name: string }) {
  const rounter = useRouter();
  return (
    <div className="flex items-center gap-0 mb-6">
      <ArrowLeftIcon
        className="w-8 h-4 text-gray-500 hover:text-blue-500"
        onClick={() => rounter.back()}
      />
      <p className="text-lg md:text-xl font-medium text-gray-900">{name}</p>
    </div>
  );
}

export default BackButton;
