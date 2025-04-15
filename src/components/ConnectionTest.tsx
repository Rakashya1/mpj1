import React, { useState, useEffect } from "react";
import { checkBackendConnection } from "@/api/apiService";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle, CheckCircle, RefreshCw } from "lucide-react";

const ConnectionTest = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkConnection = async () => {
    setIsChecking(true);
    try {
      const connected = await checkBackendConnection();
      setIsConnected(connected);
    } catch (error) {
      console.error("Error checking connection:", error);
      setIsConnected(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-lg font-semibold mb-2">Backend Connection Status</h2>

      {isConnected === null ? (
        <div className="flex items-center text-yellow-500">
          <RefreshCw className="animate-spin mr-2 h-4 w-4" />
          <span>Checking connection...</span>
        </div>
      ) : isConnected ? (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertTitle className="text-green-700">Connected</AlertTitle>
          <AlertDescription className="text-green-600">
            Successfully connected to the backend API.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Connection Failed</AlertTitle>
          <AlertDescription>
            Could not connect to the backend API. Please check that the backend
            server is running.
          </AlertDescription>
        </Alert>
      )}

      <Button
        onClick={checkConnection}
        disabled={isChecking}
        className="mt-4"
        variant={isConnected ? "outline" : "default"}
      >
        {isChecking ? (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            Checking...
          </>
        ) : (
          <>
            <RefreshCw className="mr-2 h-4 w-4" />
            Check Connection
          </>
        )}
      </Button>
    </div>
  );
};

export default ConnectionTest;
