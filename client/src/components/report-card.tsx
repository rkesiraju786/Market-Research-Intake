import React from "react";
import { BookOpen, FileText, BarChart4, PieChart, Map, Users, Layers, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ExtendedReport } from "@/lib/utils";

interface ReportCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  onSelect: (id: string) => void;
  reportDetails?: ExtendedReport;
}

export default function ReportCard({ 
  id, 
  title, 
  description, 
  icon, 
  onSelect,
  reportDetails
}: ReportCardProps) {
  const getIcon = () => {
    const iconProps = { className: "h-8 w-8" };
    
    switch (icon) {
      case "book":
        return <BookOpen {...iconProps} />;
      case "file":
        return <FileText {...iconProps} />;
      case "barChart":
        return <BarChart4 {...iconProps} />;
      case "pieChart":
        return <PieChart {...iconProps} />;
      case "map":
        return <Map {...iconProps} />;
      case "users":
        return <Users {...iconProps} />;
      case "layers":
        return <Layers {...iconProps} />;
      case "lineChart":
        return <LineChart {...iconProps} />;
      default:
        return <FileText {...iconProps} />;
    }
  };

  const hasHoverDetails = reportDetails && reportDetails.hoverDetails !== undefined;

  return (
    <HoverCard openDelay={300} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div 
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md hover:border-primary-300 transition-all"
          onClick={() => onSelect(id)}
        >
          <div className="flex flex-col h-full">
            <div className="text-primary-600 mb-3">
              {getIcon()}
            </div>
            <h4 className="font-medium text-gray-900 mb-2">{title}</h4>
            <p className="text-sm text-gray-600 flex-grow">{description}</p>
            <Button 
              variant="outline" 
              className="mt-4 w-full bg-primary-50 text-primary-600 border-primary-200 hover:bg-primary-100"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(id);
              }}
            >
              Select
            </Button>
          </div>
        </div>
      </HoverCardTrigger>
      
      {hasHoverDetails && reportDetails?.hoverDetails && (
        <HoverCardContent className="w-80 p-4">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">{title}</h4>
            <p className="text-sm text-gray-600">
              {reportDetails.hoverDetails.definition}
            </p>
            
            <div className="pt-2">
              <h5 className="text-xs font-medium text-gray-900 mb-1">Top Use Cases:</h5>
              <ul className="text-xs text-gray-600 space-y-1">
                {reportDetails.hoverDetails.useCases && reportDetails.hoverDetails.useCases.map((useCase, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary-600 mr-1">•</span>
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </HoverCardContent>
      )}
    </HoverCard>
  );
}