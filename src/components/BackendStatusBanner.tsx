import React, { useState, useEffect } from "react";
import { AlertCircle, X } from "lucide-react";
import { checkBackendConnection } from "@/api/apiService";

const BackendStatusBanner = () => {
  const [isBackendDown, setIsBackendDown] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const checkBackend = async () => {
      const isConnected = await checkBackendConnection();
      setIsBackendDown(!isConnected);
    };

    checkBackend();
    const interval = setInterval(checkBackend, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (!isBackendDown || isDismissed) {
    return null;
  }

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 fixed bottom-4 right-4 max-w-md rounded shadow-lg z-50">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            Backend connection issue detected. Using mock data for
            demonstration.
          </p>
          <p className="mt-2 text-xs text-yellow-600">
            The application is running in fallback mode with sample products.
          </p>
        </div>
        <button
          onClick={() => setIsDismissed(true)}
          className="ml-auto flex-shrink-0 -mt-1 -mr-1"
        >
          <X className="h-5 w-5 text-yellow-500" />
        </button>
      </div>
    </div>
  );
};

export default BackendStatusBanner;
