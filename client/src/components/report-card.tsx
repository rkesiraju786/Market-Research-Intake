import React from "react";
import { BookOpen, FileText, BarChart4, PieChart, Map, Users, Layers, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-all"
    >
      <div className="flex flex-col h-full">
        <div className="text-primary-600 mb-3">
          {getIcon()}
        </div>
        <h4 className="font-medium text-gray-900 mb-2">{title}</h4>
        <p className="text-sm text-gray-600 flex-grow">{description}</p>
        <button 
          className="mt-4 w-full px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          onClick={() => onSelect(id)}
        >
          Select
        </button>
      </div>
    </div>
  );
}