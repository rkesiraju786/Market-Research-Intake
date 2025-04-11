import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, CheckCircle, Clipboard, Clock, DollarSign, Download } from "lucide-react";
import { standardReportTypes } from "@/lib/utils";
import ReportCard from "@/components/report-card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";

interface WorkforceReportsProps {
  onBack: () => void;
}

const formSchema = z.object({
  companyName: z.string().min(2, { message: "Company name is required" }),
  contactName: z.string().min(2, { message: "Contact name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  reportType: z.string().min(1, { message: "Please select a report type" }),
  requirements: z.string().optional(),
});

export default function WorkforceReports({ onBack }: WorkforceReportsProps) {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      reportType: "",
      requirements: "",
    },
  });

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
    setSelectedReport(id);
    form.setValue("reportType", id);
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

      <div className="bg-primary-50 rounded-lg border border-primary-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Request a Standard Report</h3>
        <p className="text-gray-600 mb-4">
          Please provide the following information to request your selected report.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="reportType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Report Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a report type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="">Select a report type</SelectItem>
                      {standardReportTypes.map((report) => (
                        <SelectItem key={report.id} value={report.id}>
                          {report.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specific Requirements or Notes</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button type="submit" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Request"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
