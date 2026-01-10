import Image from "next/image";
import React from "react";
import bot from "@/assets/bot.svg";

function AIThinkingIndicatorSkeleton({title, className}: {title?: string, className?: string}) {
  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 via-[#F319DD] to-green-500 p-[3px] animate-pulse">
          <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
            <Image src={bot} alt="AI" className="w-12 h-12" />
          </div>
        </div>
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">
            {title || "AI is thinking..."}
        </h2>
        <div className="flex gap-1 justify-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-[#F319DD] rounded-full animate-bounce [animation-delay:0.2s]" />
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:0.4s]" />
        </div>
      </div>
    </div>
  );
}

export default AIThinkingIndicatorSkeleton;
