import React from "react";

type PageLoaderProps = {
  className?: string;
  level?: string;
};

function PageLoader({ className, level }: PageLoaderProps) {
  return (
    <div className={`flex flex-col items-center justify-center w-full h-[80vh] ${className}`}>
      <p className="text-gray-500">{level || "Loading..."}</p>
    </div>
  );
}

export default PageLoader;