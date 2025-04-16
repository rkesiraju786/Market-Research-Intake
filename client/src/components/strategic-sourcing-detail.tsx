import { useState } from "react";
import { ArrowLeft, CheckCircle, Clock, DollarSign, Download, ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { standardReportTypes } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import PPTViewer from "@/components/ppt-viewer";
import { AnimatedContainer } from "@/components/ui/animated-container";

interface StrategicSourcingDetailProps {
  onBack: () => void;
  onSubmit: (reportType: string, variant: string) => void;
}

export default function StrategicSourcingDetail({ onBack, onSubmit }: StrategicSourcingDetailProps) {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [isPPTViewerOpen, setIsPPTViewerOpen] = useState(false);
  const [currentPPTVariant, setCurrentPPTVariant] = useState<string>("basic");
  const { toast } = useToast();
  
  // Get the strategic sourcing report details
  const reportDetails = standardReportTypes.find(report => report.id === "strategic-sourcing");

  if (!reportDetails || !reportDetails.variants) {
    return <div>Report details not found</div>;
  }

  const { basic, plus } = reportDetails.variants;

  const handleViewExample = (variant: string) => {
    setCurrentPPTVariant(variant);
    setIsPPTViewerOpen(true);
    
    toast({
      title: "Loading Example",
      description: `Viewing ${variant === "basic" ? "Strategic Sourcing" : "Strategic Sourcing Plus"} example file`,
    });
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
        <AnimatedContainer animation="fadeIn">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Strategic Sourcing Reports</h2>
          <p className="text-gray-600 mb-4 max-w-3xl">
            {reportDetails.hoverDetails?.definition || "A comprehensive analysis of talent supply, demand, salary, and diversity data to help organizations make informed decisions."}
          </p>

          <div className="bg-primary-50 rounded-lg p-4 border border-primary-100 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Available Variants</h3>
            <p className="text-sm text-gray-600">
              Select the appropriate report variant based on your recruitment needs and data requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* We're using grid cells with equal heights, and specific styling to ensure alignment */}
            <div className="flex flex-col h-full">
              <Card className={`border flex flex-col h-full ${selectedVariant === "basic" ? "border-primary-500 ring-2 ring-primary-200" : "border-gray-200"}`}>
                <CardHeader className="pb-3">
                  <CardTitle>{basic.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {basic.definition}
                  </CardDescription>
                </CardHeader>
                {/* Cost and Timeline Banner */}
                <div className="mx-6 -mt-1 mb-3 bg-primary-50 rounded-md p-3 border border-primary-100">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-primary-500 mr-1" />
                      <span className="text-sm font-medium">50 credits</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-primary-500 mr-1" />
                      <span className="text-sm font-medium">2 weeks</span>
                    </div>
                  </div>
                </div>
                <CardContent className="flex-1">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-3 h-[20px]">Key Benefits</h4>
                      <ul className="text-sm space-y-2">
                        {basic.benefits.map((benefit: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-3 h-[20px]">Top Use Cases</h4>
                      <ul className="text-sm space-y-2">
                        {basic.useCases.map((useCase: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <span>{useCase}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-3 h-[20px]">Report Contents</h4>
                      <ul className="text-sm space-y-2">
                        {/* Common contents that appear in both versions */}
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Talent Supply</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Talent Demand</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Talent Supply-Demand Ratio</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Talent Cost (Median)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Top Competitors Housing and Hiring Talent</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Top Titles</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Top Skills</span>
                        </li>
                        
                        {/* Plus-only features with X mark to show not included */}
                        <li className="flex items-start opacity-50">
                          <X className="h-4 w-4 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Alternate Location Identification</span>
                        </li>
                        <li className="flex items-start opacity-50">
                          <X className="h-4 w-4 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Talent Supply by Experience</span>
                        </li>
                        <li className="flex items-start opacity-50">
                          <X className="h-4 w-4 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Talent Cost by Percentile (25th, 50th, 90th)</span>
                        </li>
                        <li className="flex items-start opacity-50">
                          <X className="h-4 w-4 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Diversity</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                {/* Using mt-auto to push the footer to the bottom */}
                <CardFooter className="flex flex-col space-y-2 mt-auto pt-4 border-t">
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
            </div>

            {/* Plus Version Card */}
            <div className="flex flex-col h-full">
              <Card className={`border flex flex-col h-full ${selectedVariant === "plus" ? "border-primary-500 ring-2 ring-primary-200" : "border-gray-200"}`}>
                <CardHeader className="pb-3">
                  <CardTitle>{plus.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {plus.definition}
                  </CardDescription>
                </CardHeader>
                {/* Cost and Timeline Banner */}
                <div className="mx-6 -mt-1 mb-3 bg-primary-50 rounded-md p-3 border border-primary-100">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-primary-500 mr-1" />
                      <span className="text-sm font-medium">75 credits</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-primary-500 mr-1" />
                      <span className="text-sm font-medium">2 weeks</span>
                    </div>
                  </div>
                </div>
                <CardContent className="flex-1">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-3 h-[20px]">Key Benefits</h4>
                      <ul className="text-sm space-y-2">
                        {plus.benefits.map((benefit: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-3 h-[20px]">Top Use Cases</h4>
                      <ul className="text-sm space-y-2">
                        {plus.useCases.map((useCase: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="text-primary-500 mr-2">•</span>
                            <span>{useCase}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-3 h-[20px]">Report Contents</h4>
                      <ul className="text-sm space-y-2">
                        {/* Basic features included in Plus */}
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Talent Supply</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Talent Demand</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Talent Supply-Demand Ratio</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Talent Cost (Median)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Top Competitors Housing and Hiring Talent</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Top Titles</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Top Skills</span>
                        </li>
                        
                        {/* Plus-only features with additional checkmarks */}
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="font-semibold">Alternate Location Identification</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="font-semibold">Talent Supply by Experience</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="font-semibold">Talent Cost by Percentile (25th, 50th, 90th)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="font-semibold">Diversity</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                {/* Using mt-auto to push the footer to the bottom and ensure alignment with the other card */}
                <CardFooter className="flex flex-col space-y-2 mt-auto pt-4 border-t">
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
        </AnimatedContainer>
      </div>

      {/* PowerPoint Viewer Modal */}
      <PPTViewer 
        isOpen={isPPTViewerOpen} 
        onClose={() => setIsPPTViewerOpen(false)} 
        variant={currentPPTVariant} 
      />
    </div>
  );
}