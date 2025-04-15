import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, FileCode, Terminal, Database } from "lucide-react";
import ElasticsearchDisabler from "./ElasticsearchDisabler";
import BackendConnectionFix from "./BackendConnectionFix";

const BackendFixGuide = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">
        Backend Connection Troubleshooting
      </h1>

      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Backend Connection Issue Detected</AlertTitle>
        <AlertDescription>
          The backend service is failing to start due to Elasticsearch
          connection issues. Follow the steps below to resolve this.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="solution1" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="solution1">Quick Fix</TabsTrigger>
          <TabsTrigger value="solution2">Connection Status</TabsTrigger>
          <TabsTrigger value="solution3">Technical Details</TabsTrigger>
        </TabsList>

        <TabsContent value="solution1" className="mt-6">
          <ElasticsearchDisabler />
        </TabsContent>

        <TabsContent value="solution2" className="mt-6">
          <BackendConnectionFix />
        </TabsContent>

        <TabsContent value="solution3" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileCode className="h-5 w-5 text-primary" />
                  <CardTitle>Error Analysis</CardTitle>
                </div>
                <CardDescription>
                  Understanding the backend startup failure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  The backend is failing with the following error:
                </p>
                <pre className="bg-gray-800 text-gray-100 p-3 rounded text-xs overflow-x-auto">
                  {`org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'productService'...
Caused by: org.springframework.dao.DataAccessResourceFailureException: Connection refused
Caused by: java.net.ConnectException: Connection refused`}
                </pre>
                <p className="text-sm">
                  This indicates that the Spring Boot application cannot connect
                  to Elasticsearch, which is required by the ProductService.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-primary" />
                  <CardTitle>Solution Options</CardTitle>
                </div>
                <CardDescription>
                  Ways to resolve the Elasticsearch connection issue
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">
                    Option 1: Fix Elasticsearch Connection
                  </h3>
                  <p className="text-sm">
                    Ensure Elasticsearch is running and accessible from the
                    backend container. Check network settings and firewall
                    rules.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">
                    Option 2: Make Elasticsearch Optional
                  </h3>
                  <p className="text-sm">
                    Modify the Spring Boot application to make Elasticsearch
                    dependency optional, allowing the application to start
                    without it.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Option 3: Use Mock Data</h3>
                  <p className="text-sm">
                    Implement a fallback mechanism in the frontend to use mock
                    data when the backend is unavailable.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  <CardTitle>GitHub Codespace Configuration</CardTitle>
                </div>
                <CardDescription>
                  Special considerations for running in GitHub Codespaces
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  When running in GitHub Codespaces, there are some specific
                  networking considerations:
                </p>

                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <strong>Port Forwarding:</strong> Make sure the necessary
                    ports (8080, 9200, 27017) are forwarded in your Codespace.
                  </li>
                  <li>
                    <strong>Service Discovery:</strong> In Docker Compose,
                    services can reference each other by service name, but this
                    may not work as expected in all Codespace configurations.
                  </li>
                  <li>
                    <strong>Resource Constraints:</strong> Codespaces have
                    limited resources, which might affect Elasticsearch
                    performance.
                  </li>
                  <li>
                    <strong>Persistence:</strong> Data might not persist between
                    Codespace restarts unless you configure persistent volumes
                    correctly.
                  </li>
                </ul>

                <div className="bg-yellow-50 p-3 rounded border border-yellow-200 mt-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Recommendation:</strong> For development in
                    Codespaces, consider using the mock data approach in the
                    frontend and disabling the Elasticsearch dependency in the
                    backend.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BackendFixGuide;
