import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Calendar, CheckCircle, Clipboard, Clock, DollarSign, Download } from "lucide-react";
import { standardReportTypes } from "@/lib/utils";
import ReportCard from "@/components/report-card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";

interface WorkforceReportsProps {
  onBack: () => void;
  onReportSelect?: (reportId: string) => void;
  selectedReport?: string | null;
  selectedVariant?: string | null;
}

const formSchema = z.object({
  companyName: z.string().min(2, { message: "Company name is required" }),
  contactName: z.string().min(2, { message: "Contact name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  reportType: z.string().min(1, { message: "Please select a report type" }),
  requirements: z.string().optional(),
});

export default function WorkforceReports({ 
  onBack, 
  onReportSelect, 
  selectedReport: propSelectedReport, 
  selectedVariant 
}: WorkforceReportsProps) {
  // Use either the prop selectedReport or local state
  const [localSelectedReport, setLocalSelectedReport] = useState<string | null>(null);
  const selectedReport = propSelectedReport || localSelectedReport;
  
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      reportType: selectedReport || "",
      requirements: "",
    },
  });

  // Update form when selectedReport or selectedVariant changes
  useEffect(() => {
    if (selectedReport) {
      form.setValue("reportType", selectedReport);
      
      // If there's a specific variant selected, add it to requirements
      if (selectedVariant) {
        form.setValue("requirements", 
          `Selected variant: ${selectedVariant}\n${form.getValues("requirements") || ""}`
        );
      }
    }
  }, [form, selectedReport, selectedVariant]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    try {
      await apiRequest("POST", "/api/requests/workforce", {
        ...values,
      });
      
      toast({
        title: "Request Submitted",
        description: "Your workforce report request has been submitted successfully.",
        variant: "default",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReportSelect = (id: string) => {
    // If we have an external handler, use that
    if (onReportSelect) {
      onReportSelect(id);
    } else {
      // Otherwise use local state
      setLocalSelectedReport(id);
      form.setValue("reportType", id);
    }
  };

  return (
    <section>
      <div className="mb-6">
        <Button
          variant="ghost"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to selection
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Workforce Reports</h2>
        <p className="text-gray-600 mb-4">
          Our standardized reports provide comprehensive labor market data and
          analysis to help you make informed workforce decisions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 text-primary-600">
              <Clipboard className="h-6 w-6" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">Standardized Format</h3>
              <p className="mt-1 text-xs text-gray-500">
                Pre-defined metrics and analysis formats for consistent reporting
              </p>
            </div>
          </div>
          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 text-primary-600">
              <Clock className="h-6 w-6" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">Quick Turnaround</h3>
              <p className="mt-1 text-xs text-gray-500">
                Reports delivered within 2 weeks of request submission
              </p>
            </div>
          </div>
          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 text-primary-600">
              <DollarSign className="h-6 w-6" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">Cost-Effective</h3>
              <p className="mt-1 text-xs text-gray-500">
                Predictable pricing based on report type
              </p>
            </div>
          </div>
          <div className="flex items-start p-4 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 text-primary-600">
              <Download className="h-6 w-6" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">Self-Service Access</h3>
              <p className="mt-1 text-xs text-gray-500">
                View, download, and share reports through our portal
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-4">Available Report Types</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {standardReportTypes.map((report) => (
          <ReportCard
            key={report.id}
            id={report.id}
            title={report.title}
            description={report.description}
            icon={report.icon}
            onSelect={handleReportSelect}
          />
        ))}
      </div>

      {/* Schedule Call Option - Moved to bottom */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 mt-8">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Calendar className="h-6 w-6 text-gray-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-900">
              Not sure which report fits your needs?
            </h3>
            <p className="mt-1 text-gray-500">
              Book a call with a representative to discuss your specific requirements.
            </p>
            <Button
              variant="outline"
              className="mt-3"
              onClick={() => {
                // Use the useToast hook to show a message
                toast({
                  title: "Schedule Consultation",
                  description: "Redirecting to scheduling page...",
                });
                
                // You might want to handle this differently based on your navigation flow
                // For example, navigate to the scheduling page
              }}
            >
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
