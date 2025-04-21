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
      <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-transparent hover:border-primary transition-all cursor-pointer" onClick={onClick}>
        <div className="p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
              <BarChart2 className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-900">Workforce Reports</h3>
              <p className="mt-1 text-gray-600">Standardized reports with comprehensive labor market data and analysis.</p>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex items-center text-sm text-gray-700">
              <Clock className="h-5 w-5 text-primary-500 mr-2" />
              Delivery Time: Up to 2 weeks
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <DollarSign className="h-5 w-5 text-primary-500 mr-2" />
              Cost Range: $X - $Y
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <Download className="h-5 w-5 text-primary-500 mr-2" />
              Self-service portal for viewing, downloading, and sharing
            </div>
          </div>
        <div className="mt-4 border-t pt-4">
          <p className="text-sm text-gray-700">
            Access comprehensive labor market insights through our self-service platform, which includes:
          </p>
          <ul className="mt-2 text-sm text-gray-700 space-y-1 pl-5 list-disc">
            <li>Standardized reports with up-to-date talent market analysis</li>
            <li>Intuitive download options for presentations and sharing</li>
            <li>On-demand access to workforce data and benchmarks</li>
          </ul>
        </div>
        </div>
        <div className="px-6 pb-6">
          <Button variant="outline" className="w-full bg-primary-50 text-primary-600 border-primary-200 hover:bg-primary-100">
            Select Workforce Reports
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-transparent hover:border-primary transition-all cursor-pointer" onClick={onClick}>
      <div className="p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 bg-secondary-100 rounded-md p-3">
            <Lightbulb className="h-6 w-6 text-secondary-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-gray-900">Consulting Projects</h3>
            <p className="mt-1 text-gray-600">Custom-tailored research and analysis for complex business challenges.</p>
          </div>
        </div>
        <div className="mt-4 space-y-3">
          <div className="flex items-center text-sm text-gray-700">
            <Clock className="h-5 w-5 text-secondary-500 mr-2" />
            Delivery Time: 2-6 weeks
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <DollarSign className="h-5 w-5 text-secondary-500 mr-2" />
            Premium pricing based on complexity
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <Users className="h-5 w-5 text-secondary-500 mr-2" />
            Includes consultation with research experts
          </div>
        </div>
        <div className="mt-4 border-t pt-4">
          <p className="text-sm text-gray-700">
            Support from an expert to explore tailored insights and proven methodologies to empower your data-driven decision making, this includes:
          </p>
          <ul className="mt-2 text-sm text-gray-700 space-y-1 pl-5 list-disc">
            <li>Scoping session to design strategic solutions to your unique challenges</li>
            <li>Full data research project</li>
            <li>Insights review session providing strategic advice</li>
          </ul>
        </div>
      </div>
      <div className="px-6 pb-6">
        <Button variant="outline" className="w-full bg-secondary-50 text-secondary-600 border-secondary-200 hover:bg-secondary-100">
          Select Consulting Projects
        </Button>
      </div>
    </div>
  );
}
