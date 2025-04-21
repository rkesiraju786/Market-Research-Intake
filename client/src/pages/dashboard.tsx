import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { Link } from "wouter";
import { Search, Filter, MoreHorizontal, ChevronDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { PageTransition } from "@/components/ui/page-transition";
import { formatDate } from "@/lib/utils";
import RequestStatusDialog from "@/components/request-status-dialog";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  
  // Define the response type
  interface ApiResponse<T> {
    success: boolean;
    data: T[];
  }
  
  // Fetch workforce requests
  const { data: workforceRequests, isLoading: isLoadingWorkforce } = useQuery<ApiResponse<any>>({
    queryKey: ["/api/requests/workforce"],
    refetchOnWindowFocus: false,
  });
  
  // Fetch strategic sourcing requests
  const { data: sourcingRequests, isLoading: isLoadingStrategic } = useQuery<ApiResponse<any>>({
    queryKey: ["/api/requests/strategic-sourcing"],
    refetchOnWindowFocus: false,
  });
  
  // Fetch plus requests
  const { data: plusRequests, isLoading: isLoadingPlus } = useQuery<ApiResponse<any>>({
    queryKey: ["/api/requests/strategic-sourcing-plus"],
    refetchOnWindowFocus: false,
  });
  
  // Fetch consulting requests
  const { data: consultingRequests, isLoading: isLoadingConsulting } = useQuery<ApiResponse<any>>({
    queryKey: ["/api/requests/consulting"],
    refetchOnWindowFocus: false,
  });
  
  // Fetch appointments
  const { data: appointments, isLoading: isLoadingAppointments } = useQuery<ApiResponse<any>>({
    queryKey: ["/api/appointments"],
    refetchOnWindowFocus: false,
  });
  
  const isLoading = isLoadingWorkforce || isLoadingStrategic || isLoadingPlus || isLoadingConsulting || isLoadingAppointments;
  
  // Combine all requests with proper typing
  const allRequests = [
    ...(workforceRequests?.data || []).map((req: any) => ({
      ...req,
      type: "Workforce",
      status: getRequestStatus(req),
    })),
    ...(sourcingRequests?.data || []).map((req: any) => ({
      ...req,
      type: "Strategic Sourcing",
      status: getRequestStatus(req),
    })),
    ...(plusRequests?.data || []).map((req: any) => ({
      ...req,
      type: "Strategic Sourcing Plus",
      status: getRequestStatus(req),
    })),
    ...(consultingRequests?.data || []).map((req: any) => ({
      ...req,
      type: "Consulting Project",
      status: getRequestStatus(req),
    })),
  ];
  
  // Filter requests based on search query
  const filteredRequests = allRequests.filter((req) => {
    if (!searchQuery) return true;
    
    const lowerQuery = searchQuery.toLowerCase();
    return (
      req.type.toLowerCase().includes(lowerQuery) ||
      (req.roles?.[0]?.title || "").toLowerCase().includes(lowerQuery) ||
      (req.additionalNotes || "").toLowerCase().includes(lowerQuery)
    );
  });
  
  // Sort requests by date (newest first)
  const sortedRequests = [...filteredRequests].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  
  // Determine the status of a request
  function getRequestStatus(request: any) {
    const randomStatus = Math.random();
    
    // In a real app, this would be determined by the actual status in the database
    // For demo purposes, we're assigning statuses pseudo-randomly
    if (randomStatus > 0.8) return "Completed";
    if (randomStatus > 0.6) return "Report Ready";
    if (randomStatus > 0.4) return "Expert Call Scheduled";
    if (randomStatus > 0.2) return "Scoping in Progress";
    return "Request Initiated";
  }
  
  // Get status color and icon
  function getStatusIndicator(status: string) {
    switch (status) {
      case "Completed":
        return <div className="w-2 h-2 rounded-full bg-purple-600 mr-2"></div>;
      case "Report Ready":
        return <div className="w-2 h-2 rounded-full bg-green-600 mr-2"></div>;
      case "Expert Call Scheduled":
        return <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>;
      case "Scoping in Progress":
        return <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>;
      case "Request Initiated":
        return <div className="w-2 h-2 rounded-full bg-amber-400 mr-2"></div>;
      default:
        return <div className="w-2 h-2 rounded-full bg-gray-400 mr-2"></div>;
    }
  }
  
  // Open the status dialog when a user clicks on a report row
  const openStatusDialog = (request: any) => {
    setSelectedRequest(request);
    setIsStatusDialogOpen(true);
  };
  
  return (
    <PageTransition>
      <div className="container mx-auto max-w-6xl py-8">
        <AnimatedContainer animation="fadeIn" delay={0.1}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#130056] mb-2">Workforce Report Requests</h1>
              <p className="text-[#8186B4]">
                Track and manage your submitted reports. Check the status of your requests or create a new report.
              </p>
            </div>
            <Link href="/">
              <Button className="bg-[#4600FF] hover:bg-[#130056] whitespace-nowrap">
                Create new report
              </Button>
            </Link>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4 bg-[#F8F9FE] p-1">
              <TabsTrigger value="all" className="data-[state=active]:bg-white">All Requests</TabsTrigger>
              <TabsTrigger value="workforce" className="data-[state=active]:bg-white">Workforce</TabsTrigger>
              <TabsTrigger value="strategic" className="data-[state=active]:bg-white">Strategic Sourcing</TabsTrigger>
              <TabsTrigger value="consulting" className="data-[state=active]:bg-white">Consulting</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="bg-white rounded-lg shadow-sm border border-[#CCCFFF] overflow-hidden">
                <div className="p-4 flex items-center justify-between">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8186B4] h-4 w-4" />
                    <Input
                      placeholder="Search or filter to find a specific request."
                      className="pl-10 border-[#CCCFFF] bg-[#F8F9FE]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" className="border-[#CCCFFF] text-[#8186B4] ml-2">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#F8F9FE] text-[#8186B4] text-sm">
                      <tr>
                        <th className="text-left py-3 px-4 font-medium">Report type</th>
                        <th className="text-left py-3 px-4 font-medium">
                          Date created <ChevronDown className="h-3 w-3 inline" />
                        </th>
                        <th className="text-left py-3 px-4 font-medium">
                          Requested by <ChevronDown className="h-3 w-3 inline" />
                        </th>
                        <th className="text-left py-3 px-4 font-medium">
                          Status <ChevronDown className="h-3 w-3 inline" />
                        </th>
                        <th className="text-left py-3 px-4 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading ? (
                        // Loading skeletons
                        Array.from({ length: 5 }).map((_, i) => (
                          <tr key={i} className="border-t border-[#CCCFFF]">
                            <td className="py-4 px-4"><Skeleton className="h-5 w-48" /></td>
                            <td className="py-4 px-4"><Skeleton className="h-5 w-24" /></td>
                            <td className="py-4 px-4"><Skeleton className="h-5 w-32" /></td>
                            <td className="py-4 px-4"><Skeleton className="h-5 w-36" /></td>
                            <td className="py-4 px-4"><Skeleton className="h-5 w-6" /></td>
                          </tr>
                        ))
                      ) : sortedRequests.length > 0 ? (
                        sortedRequests.map((request, index) => (
                          <tr 
                            key={index} 
                            className="border-t border-[#CCCFFF] cursor-pointer hover:bg-[#F8F9FE]"
                            onClick={() => openStatusDialog(request)}
                          >
                            <td className="py-4 px-4 font-medium text-[#130056]">
                              {request.roles?.[0]?.title || request.type}
                            </td>
                            <td className="py-4 px-4 text-[#8186B4]">
                              {formatDate(new Date(request.createdAt))}
                            </td>
                            <td className="py-4 px-4 text-[#8186B4]">
                              {request.requestedBy || "Ash Haward"}
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center">
                                {getStatusIndicator(request.status)}
                                <span className="text-[#130056]">{request.status}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="sm" className="text-[#8186B4] h-8 w-8 p-0">
                                <MoreHorizontal className="h-5 w-5" />
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr className="border-t border-[#CCCFFF]">
                          <td colSpan={5} className="py-8 text-center text-[#8186B4]">
                            No requests found. Create a new report to get started.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            {/* Other tabs would filter by type */}
            <TabsContent value="workforce" className="mt-0">
              {/* Same structure as above, but filtered for workforce reports */}
            </TabsContent>
            
            <TabsContent value="strategic" className="mt-0">
              {/* Same structure as above, but filtered for strategic sourcing */}
            </TabsContent>
            
            <TabsContent value="consulting" className="mt-0">
              {/* Same structure as above, but filtered for consulting */}
            </TabsContent>
          </Tabs>
        </AnimatedContainer>
      </div>

      {/* Status Dialog */}
      {selectedRequest && (
        <RequestStatusDialog 
          isOpen={isStatusDialogOpen}
          onClose={() => setIsStatusDialogOpen(false)}
          request={selectedRequest}
        />
      )}
    </PageTransition>
  );
}