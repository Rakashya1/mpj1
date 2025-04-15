import React, { useState } from "react";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { CheckCircle, XCircle, Settings } from "lucide-react";

const ElasticsearchDisabler = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleDisableElasticsearch = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      // In a real implementation, this would call an API endpoint to modify the backend configuration
      // For now, we'll simulate success after a delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsDisabled(true);
      setMessage(
        "Elasticsearch dependency has been disabled. Please restart the backend services.",
      );
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 bg-white rounded-lg shadow-sm border">
      <div className="flex items-center gap-3">
        <Settings className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Backend Configuration</h1>
      </div>

      <Alert className={isDisabled ? "bg-green-50" : "bg-yellow-50"}>
        <div className="flex items-center gap-2">
          {isDisabled ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <XCircle className="h-5 w-5 text-yellow-500" />
          )}
          <AlertTitle>
            {isDisabled
              ? "Elasticsearch Dependency Disabled"
              : "Elasticsearch Connection Issue Detected"}
          </AlertTitle>
        </div>
        <AlertDescription className="mt-2">
          {isDisabled
            ? "The backend has been configured to run without Elasticsearch. You can now restart the services."
            : "The backend is failing to start because it cannot connect to Elasticsearch. You can disable the Elasticsearch dependency to allow the backend to start."}
        </AlertDescription>
      </Alert>

      {message && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-blue-700">{message}</p>
        </div>
      )}

      <div className="flex flex-col space-y-4">
        <div className="bg-gray-50 p-4 rounded-md border">
          <h2 className="font-medium mb-2">How This Works</h2>
          <p className="text-sm text-gray-700">
            In a production environment, you would modify the Spring Boot
            configuration to make Elasticsearch optional. For this demo, we're
            simulating the configuration change. In a real implementation, you
            would:
          </p>
          <ol className="list-decimal ml-5 mt-2 text-sm text-gray-700 space-y-1">
            <li>
              Modify the ProductService to handle the absence of Elasticsearch
            </li>
            <li>Use conditional beans in Spring configuration</li>
            <li>Implement fallback mechanisms for search functionality</li>
          </ol>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleDisableElasticsearch}
            disabled={isLoading || isDisabled}
            className={isDisabled ? "bg-green-500 hover:bg-green-600" : ""}
          >
            {isLoading
              ? "Processing..."
              : isDisabled
                ? "Elasticsearch Disabled"
                : "Disable Elasticsearch Dependency"}
          </Button>
        </div>
      </div>

      {isDisabled && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <h2 className="font-medium mb-2">Next Steps</h2>
          <p className="text-sm text-blue-700">
            Run the following command in your terminal to restart the services:
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded mt-2 overflow-x-auto">
            ./start-services.sh
          </pre>
        </div>
      )}
    </div>
  );
};

export default ElasticsearchDisabler;
