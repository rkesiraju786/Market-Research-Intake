import { useState } from "react";
import { ArrowLeft, CheckCircle, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { standardReportTypes } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface StrategicSourcingDetailProps {
  onBack: () => void;
  onSubmit: (reportType: string, variant: string) => void;
}

export default function StrategicSourcingDetail({ onBack, onSubmit }: StrategicSourcingDetailProps) {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Get the strategic sourcing report details
  const reportDetails = standardReportTypes.find(report => report.id === "strategic-sourcing");

  if (!reportDetails || !reportDetails.variants) {
    return <div>Report details not found</div>;
  }

  const { basic, plus } = reportDetails.variants;

  const handleViewExample = (variant: string) => {
    const url = variant === "basic" ? basic.sampleReportUrl : plus.sampleReportUrl;
    
    // In a real application, this would open the sample report
    toast({
      title: "Sample Report",
      description: `Viewing ${variant === "basic" ? "Strategic Sourcing" : "Strategic Sourcing Plus"} sample report`,
    });
    
    // This would typically open in a new tab or download the file
    console.log(`Opening sample report: ${url}`);
  };

  const handleSelectReport = (variant: string) => {
    setSelectedVariant(variant);
    onSubmit("strategic-sourcing", variant);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <Button
          variant="ghost"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to report selection
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Strategic Sourcing Reports</h2>
        <p className="text-gray-600 mb-4 max-w-3xl">
          {reportDetails.hoverDetails.definition}
        </p>

        <div className="bg-primary-50 rounded-lg p-4 border border-primary-100 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Available Variants</h3>
          <p className="text-sm text-gray-600">
            Select the appropriate report variant based on your recruitment needs and data requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Basic Version Card */}
          <Card className={`border ${selectedVariant === "basic" ? "border-primary-500 ring-2 ring-primary-200" : "border-gray-200"}`}>
            <CardHeader className="pb-3">
              <CardTitle>{basic.title}</CardTitle>
              <CardDescription className="mt-2">
                {basic.definition}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Key Benefits</h4>
                  <ul className="text-sm space-y-1">
                    {basic.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Top Use Cases</h4>
                  <ul className="text-sm space-y-1">
                    {basic.useCases.map((useCase, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-500 mr-2">•</span>
                        <span>{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Report Contents</h4>
                  <ul className="text-sm space-y-1">
                    {basic.contents.map((content, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-500 mr-2">•</span>
                        <span>{content}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => handleViewExample("basic")}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Example
              </Button>
              <Button 
                className="w-full"
                onClick={() => handleSelectReport("basic")}
              >
                <Download className="h-4 w-4 mr-2" />
                Select This Report
              </Button>
            </CardFooter>
          </Card>

          {/* Plus Version Card */}
          <Card className={`border ${selectedVariant === "plus" ? "border-primary-500 ring-2 ring-primary-200" : "border-gray-200"}`}>
            <CardHeader className="pb-3">
              <CardTitle>{plus.title}</CardTitle>
              <CardDescription className="mt-2">
                {plus.definition}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Key Benefits</h4>
                  <ul className="text-sm space-y-1">
                    {plus.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Top Use Cases</h4>
                  <ul className="text-sm space-y-1">
                    {plus.useCases.map((useCase, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-500 mr-2">•</span>
                        <span>{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Report Contents</h4>
                  <ul className="text-sm space-y-1">
                    {plus.contents.map((content, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-500 mr-2">•</span>
                        <span>{content}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => handleViewExample("plus")}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Example
              </Button>
              <Button 
                className="w-full"
                onClick={() => handleSelectReport("plus")}
              >
                <Download className="h-4 w-4 mr-2" />
                Select This Report
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}