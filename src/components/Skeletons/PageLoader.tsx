import React from "react";

type PageLoaderProps = {
  className?: string;
  level?: string;
};

function PageLoader({ className, level }: PageLoaderProps) {
  return (
    <div
      className={`min-h-[80%] flex items-center justify-center ${className}`}
    >
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">{level ? level : "Loading..."}</p>
      </div>
    </div>
  );
}

export default PageLoader;
