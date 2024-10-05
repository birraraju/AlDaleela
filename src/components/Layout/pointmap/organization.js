import { X } from "lucide-react";
import { useState } from "react";

export default function Organization() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed top-12 right-0 max-h-[650px] w-[350px] bg-gray-200 rounded-xl shadow-lg m-4 p-4 overflow-y-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-black">Organization</h1>
        <button onClick={() => setIsOpen(false)}>
          <X className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      <div className="h-[500px] border border-dashed border-gray-200 rounded-lg flex items-center justify-center">
        {/* Empty Box */}
      </div>
    </div>
  );
}
