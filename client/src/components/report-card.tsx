import { Button } from "@/components/ui/button";
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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex flex-col h-full">
        <div className="text-primary-600 mb-3">
          {getIcon()}
        </div>
        <h4 className="font-medium text-gray-900 mb-2">{title}</h4>
        <p className="text-sm text-gray-600 flex-grow">{description}</p>
        <Button 
          variant="outline" 
          className="mt-4 w-full bg-primary-50 text-primary-600 border-primary-200 hover:bg-primary-100"
          onClick={() => onSelect(id)}
        >
          Select
        </Button>
      </div>
    </div>
  );
}
