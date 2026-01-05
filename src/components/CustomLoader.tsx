import { Loader2 } from "lucide-react";
import React from "react";

function CustomLoader() {
  return (
    <div className="flex items-center justify-center h-[80vh] w-full">
      <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
    </div>
  );
}

export default CustomLoader;
