import { Loader2 } from "lucide-react";
import React from "react";

function CustomLoader({className}: {className?: string}) {
  return (
    <div className={`flex items-center justify-center w-full ${className}`}>
      <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
    </div>
  );
}

export default CustomLoader;
