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
          className="inline-flex items-center text-[#8186B4] hover:text-[#4600FF] hover:bg-[#CCCFFF]/20"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to selection
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-2 border-[#CCCFFF]">
        <h2 className="text-3xl font-bold gradient-heading mb-2">Workforce Reports</h2>
        <p className="text-[#8186B4] mb-4">
          Our standardized reports provide comprehensive labor market data and
          analysis to help you make informed workforce decisions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-start p-4 bg-[#F8F9FE] rounded-lg border border-[#CCCFFF]">
            <div className="flex-shrink-0 text-[#4600FF]">
              <Clipboard className="h-6 w-6" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-[#130056]">Standardized Format</h3>
              <p className="mt-1 text-xs text-[#8186B4]">
                Pre-defined metrics and analysis formats for consistent reporting
              </p>
            </div>
          </div>
          <div className="flex items-start p-4 bg-[#F8F9FE] rounded-lg border border-[#CCCFFF]">
            <div className="flex-shrink-0 text-[#4600FF]">
              <Clock className="h-6 w-6" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-[#130056]">Quick Turnaround</h3>
              <p className="mt-1 text-xs text-[#8186B4]">
                Reports delivered within 2 weeks of request submission
              </p>
            </div>
          </div>
          <div className="flex items-start p-4 bg-[#F8F9FE] rounded-lg border border-[#CCCFFF]">
            <div className="flex-shrink-0 text-[#4600FF]">
              <DollarSign className="h-6 w-6" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-[#130056]">Cost-Effective</h3>
              <p className="mt-1 text-xs text-[#8186B4]">
                Predictable pricing based on report type
              </p>
            </div>
          </div>
          <div className="flex items-start p-4 bg-[#F8F9FE] rounded-lg border border-[#CCCFFF]">
            <div className="flex-shrink-0 text-[#4600FF]">
              <Download className="h-6 w-6" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-[#130056]">Self-Service Access</h3>
              <p className="mt-1 text-xs text-[#8186B4]">
                View, download, and share reports through our portal
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-[#130056] mb-4">Available Report Types</h3>
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
      <div className="bg-[#F8F9FE] rounded-lg border border-[#CCCFFF] shadow-sm p-6 mt-8">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Calendar className="h-6 w-6 text-[#4600FF]" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-[#130056]">
              Not sure which report fits your needs?
            </h3>
            <p className="mt-1 text-[#8186B4]">
              Book a call with a representative to discuss your specific requirements.
            </p>
            <Button
              className="mt-3 bg-[#4600FF] hover:bg-[#4600FF]/90 text-white"
              onClick={() => {
                // Navigate to the scheduling section
                if (typeof onBack === 'function') {
                  // First go back to selection
                  onBack();
                  
                  // Then use setTimeout to allow the state to update before trying
                  // to navigate to the schedule section
                  setTimeout(() => {
                    // Since we don't have direct access to setActiveSection,
                    // we'll use a custom event
                    const navigateEvent = new CustomEvent('navigate', {
                      detail: { section: 'schedule' }
                    });
                    window.dispatchEvent(navigateEvent);
                  }, 50);
                }
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
