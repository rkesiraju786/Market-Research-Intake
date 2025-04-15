import { Button } from "@/components/ui/button";
import { 
  BarChart2, 
  Clock, 
  DollarSign, 
  Download, 
  Lightbulb, 
  MapPin, 
  Users 
} from "lucide-react";

interface ReportTypeCardProps {
  type: "workforce" | "consulting";
  onClick: () => void;
}

export default function ReportTypeCard({ type, onClick }: ReportTypeCardProps) {
  if (type === "workforce") {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden border p-6">
        <h3 className="text-xl font-semibold text-gray-900">Workforce Reports</h3>
        <p className="mt-1 text-gray-600">Standardized reports with comprehensive labor market data and analysis.</p>
        <div className="mt-4">
          <p className="text-sm text-gray-700 mb-2">Delivery Time: Up to 2 weeks</p>
          <p className="text-sm text-gray-700 mb-2">Cost Range: $X - $Y</p>
        </div>
        <button 
          className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded"
          onClick={onClick}
        >
          Select Workforce Reports
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border p-6">
      <h3 className="text-xl font-semibold text-gray-900">Consulting Reports</h3>
      <p className="mt-1 text-gray-600">Custom-tailored research and analysis for complex business challenges.</p>
      <div className="mt-4">
        <p className="text-sm text-gray-700 mb-2">Delivery Time: 4-6 weeks</p>
        <p className="text-sm text-gray-700 mb-2">Premium pricing based on complexity</p>
      </div>
      <button 
        className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded"
        onClick={onClick}
      >
        Select Consulting Reports
      </button>
    </div>
  );
}
