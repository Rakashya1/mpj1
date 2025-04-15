import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, RefreshCw } from "lucide-react";

// Use Docker service name when running in container
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

interface ConnectionStatusProps {
  className?: string;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  className = "",
}) => {
  const [mongoStatus, setMongoStatus] = useState<
    "connected" | "disconnected" | "checking"
  >("checking");
  const [elasticStatus, setElasticStatus] = useState<
    "connected" | "disconnected" | "checking"
  >("checking");

  useEffect(() => {
    const checkConnections = async () => {
      try {
        // Check MongoDB connection
        const mongoResponse = await fetch(`${API_BASE_URL}/api/health/mongo`, {
          credentials: "include",
        });
        setMongoStatus(mongoResponse.ok ? "connected" : "disconnected");
      } catch (error) {
        setMongoStatus("disconnected");
        console.error("MongoDB connection error:", error);
      }

      try {
        // Check Elasticsearch connection
        const elasticResponse = await fetch(
          `${API_BASE_URL}/api/health/elasticsearch`,
          { credentials: "include" },
        );
        setElasticStatus(elasticResponse.ok ? "connected" : "disconnected");
      } catch (error) {
        setElasticStatus("disconnected");
        console.error("Elasticsearch connection error:", error);
      }
    };

    checkConnections();
    const interval = setInterval(checkConnections, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <div className="flex items-center">
        <span className="text-sm mr-2">MongoDB:</span>
        {mongoStatus === "checking" ? (
          <span className="text-yellow-500 flex items-center">
            <RefreshCw className="h-4 w-4 animate-spin mr-1" />
            Checking...
          </span>
        ) : mongoStatus === "connected" ? (
          <CheckCircle className="h-4 w-4 text-green-500" />
        ) : (
          <XCircle className="h-4 w-4 text-red-500" />
        )}
      </div>
      <div className="flex items-center">
        <span className="text-sm mr-2">Elasticsearch:</span>
        {elasticStatus === "checking" ? (
          <span className="text-yellow-500 flex items-center">
            <RefreshCw className="h-4 w-4 animate-spin mr-1" />
            Checking...
          </span>
        ) : elasticStatus === "connected" ? (
          <CheckCircle className="h-4 w-4 text-green-500" />
        ) : (
          <XCircle className="h-4 w-4 text-red-500" />
        )}
      </div>
    </div>
  );
};

export default ConnectionStatus;
