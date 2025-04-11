import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  BarChart2, 
  Clipboard, 
  ClipboardList, 
  DollarSign, 
  LineChart, 
  MapPin, 
  TrendingUp, 
  Users
} from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { standardReportTypes, ExtendedReport, HoverDetails } from "@/lib/utils";

interface ReportCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  onSelect: (id: string) => void;
}

export default function ReportCard({ id, title, description, icon, onSelect }: ReportCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "clipboard-list":
        return <ClipboardList className="h-8 w-8" />;
      case "map-pin":
        return <MapPin className="h-8 w-8" />;
      case "line-chart":
        return <LineChart className="h-8 w-8" />;
      case "dollar-sign":
        return <DollarSign className="h-8 w-8" />;
      case "users":
        return <Users className="h-8 w-8" />;
      case "clipboard":
        return <Clipboard className="h-8 w-8" />;
      case "trending-up":
        return <TrendingUp className="h-8 w-8" />;
      default:
        return <BarChart2 className="h-8 w-8" />;
    }
  };

  // Find the report details from standardReportTypes
  const reportDetails = standardReportTypes.find(report => report.id === id) as ExtendedReport | undefined;
  const hasHoverDetails = reportDetails && reportDetails.hoverDetails !== undefined;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <HoverCard openDelay={300} closeDelay={100}>
      <HoverCardTrigger asChild>
        <motion.div 
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer"
          whileHover={{ 
            y: -5, 
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            borderColor: "rgba(var(--primary-500), 0.5)"
          }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <div className="flex flex-col h-full">
            <motion.div 
              className="text-primary-600 mb-3"
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {getIcon()}
            </motion.div>
            <h4 className="font-medium text-gray-900 mb-2">{title}</h4>
            <p className="text-sm text-gray-600 flex-grow">{description}</p>
            <motion.div 
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.1 }}
            >
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
            </motion.div>
          </div>
        </motion.div>
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
