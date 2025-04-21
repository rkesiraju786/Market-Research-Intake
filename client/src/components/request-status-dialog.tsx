import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, CheckCircle, Circle } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useState, useEffect } from "react";

// Define the possible status steps for a report request
export enum RequestStatus {
  REQUEST_IN_PROGRESS = "Request in Progress",
  REQUEST_INITIATED = "Request Initiated",
  SCOPING_IN_PROGRESS = "Scoping in Progress",
  PROJECT_EXECUTION = "Project Execution",
  REPORT_READY = "Report Ready",
  EXPERT_CALL_SCHEDULED = "Expert Call Scheduled",
  CLOSED = "Closed"
}

// Map status names to descriptions
const statusDescriptions: Record<RequestStatus, string> = {
  [RequestStatus.REQUEST_IN_PROGRESS]: "You have started filling out the intake form but have not yet submitted it.",
  [RequestStatus.REQUEST_INITIATED]: "Your intake form has been successfully submitted and officially registered.",
  [RequestStatus.SCOPING_IN_PROGRESS]: "The researcher is validating your intake form to define the project's scope and requirements.",
  [RequestStatus.PROJECT_EXECUTION]: "The researcher will begin developing your report, conducting analyses, and compiling findings.",
  [RequestStatus.REPORT_READY]: "Your report will be completed and available for online access.",
  [RequestStatus.EXPERT_CALL_SCHEDULED]: "A consultation with the Product Enablement team will be arranged to review findings and answer any questions.",
  [RequestStatus.CLOSED]: "The expert call is finished, and no further action is required. Your request is now complete!"
};

// Map status to label text for timeline
const statusLabels: Record<RequestStatus, { title: string, label?: string }> = {
  [RequestStatus.REQUEST_IN_PROGRESS]: { title: "Request in Progress" },
  [RequestStatus.REQUEST_INITIATED]: { title: "Request Initiated" },
  [RequestStatus.SCOPING_IN_PROGRESS]: { title: "Scoping in Progress", label: "Current Status" },
  [RequestStatus.PROJECT_EXECUTION]: { title: "Project Execution", label: "Upcoming Step" },
  [RequestStatus.REPORT_READY]: { title: "Report Ready" },
  [RequestStatus.EXPERT_CALL_SCHEDULED]: { title: "Expert Call Scheduled" },
  [RequestStatus.CLOSED]: { title: "Closed" }
};

// Array of all statuses in order
const allStatuses = [
  RequestStatus.REQUEST_IN_PROGRESS,
  RequestStatus.REQUEST_INITIATED,
  RequestStatus.SCOPING_IN_PROGRESS,
  RequestStatus.PROJECT_EXECUTION,
  RequestStatus.REPORT_READY,
  RequestStatus.EXPERT_CALL_SCHEDULED,
  RequestStatus.CLOSED
];

interface RequestStatusDialogProps {
  isOpen: boolean;
  onClose: () => void;
  request: {
    id: string | number;
    type: string;
    roles?: { title: string }[];
    status: string;
    createdAt: string | Date;
  };
}

export default function RequestStatusDialog({ isOpen, onClose, request }: RequestStatusDialogProps) {
  const [estimatedCompletionDate, setEstimatedCompletionDate] = useState<Date | null>(null);
  
  // Generate an estimated completion date based on the status and created date
  useEffect(() => {
    if (request?.createdAt) {
      const createdDate = new Date(request.createdAt);
      
      // Add days based on status
      const completionDate = new Date(createdDate);
      
      switch (request.status) {
        case RequestStatus.REQUEST_IN_PROGRESS:
        case RequestStatus.REQUEST_INITIATED:
          completionDate.setDate(createdDate.getDate() + 14); // 2 weeks from creation
          break;
        case RequestStatus.SCOPING_IN_PROGRESS:
          completionDate.setDate(createdDate.getDate() + 12); // 12 days from creation
          break;
        case RequestStatus.PROJECT_EXECUTION:
          completionDate.setDate(createdDate.getDate() + 7); // 1 week from creation
          break;
        case RequestStatus.REPORT_READY:
        case RequestStatus.EXPERT_CALL_SCHEDULED:
        case RequestStatus.CLOSED:
          completionDate.setDate(createdDate.getDate()); // Already complete
          break;
        default:
          completionDate.setDate(createdDate.getDate() + 14); // Default 2 weeks
      }
      
      setEstimatedCompletionDate(completionDate);
    }
  }, [request]);
  
  // Get the current status index
  const currentStatusIndex = allStatuses.findIndex(s => s === request?.status) !== -1 
    ? allStatuses.findIndex(s => s === request?.status)
    : 1; // Default to REQUEST_INITIATED if not found
  
  // Get a simple report title
  const reportTitle = request?.roles?.[0]?.title 
    ? `${request.roles[0].title} ${request.type}`
    : `${request.type} Report`;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="flex items-center justify-between flex-row">
          <DialogTitle className="text-xl text-[#130056]">
            {reportTitle} Progress
          </DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 text-[#8186B4]">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        
        <div className="py-2">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm text-[#8186B4]">
              Check the status of your report request below. You will receive an email once your report is ready!
            </p>
            {estimatedCompletionDate && (
              <div className="text-sm text-[#130056] bg-[#F8F9FE] px-3 py-1 rounded-md">
                Estimated Completion Date: {formatDate(estimatedCompletionDate)}
              </div>
            )}
          </div>
          
          {/* Timeline */}
          <div className="relative mt-8">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#CCCFFF]"></div>
            
            {/* Status items */}
            {allStatuses.map((status, index) => {
              const isCompleted = index <= currentStatusIndex;
              const isCurrent = index === currentStatusIndex;
              
              return (
                <div key={status} className="relative pl-12 pb-6">
                  {/* Status indicator */}
                  <div className="absolute left-0 -ml-1">
                    {isCompleted ? (
                      <div className="rounded-full bg-[#4600FF] h-9 w-9 flex items-center justify-center">
                        <CheckCircle className="text-white h-5 w-5" />
                      </div>
                    ) : (
                      <div className="rounded-full border-2 border-[#CCCFFF] bg-white h-9 w-9 flex items-center justify-center">
                        <Circle className="text-[#CCCFFF] h-5 w-5" />
                      </div>
                    )}
                  </div>
                  
                  {/* Status content */}
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-base font-semibold text-[#130056]">
                        {statusLabels[status].title}
                      </h3>
                      {isCurrent && statusLabels[status].label && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-[#F3F1FF] text-[#4600FF] rounded">
                          {statusLabels[status].label}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#8186B4] mt-1">
                      {statusDescriptions[status]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Contact support */}
          <div className="mt-4 flex items-center text-sm">
            <span className="text-[#8186B4] mr-2">Need assistance?</span>
            <Button variant="ghost" className="text-[#4600FF] font-medium p-0 h-auto">
              Contact Support
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}