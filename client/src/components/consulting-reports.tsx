import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Lightbulb, Clock, DollarSign, Users } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";
import ReportCard from "@/components/report-card";
import { standardReportTypes } from "@/lib/utils";
import ConsultingQuestionnaire, { ConsultingProjectData } from "@/components/consulting-questionnaire";
import StrategicSourcingQuestionnaire, { StrategicSourcingData } from "@/components/strategic-sourcing-questionnaire";
import StrategicSourcingDetail from "@/components/strategic-sourcing-detail";

interface ConsultingReportsProps {
  onBack: () => void;
}

enum ConsultingViewState {
  REPORTS_LIST,
  QUESTIONNAIRE,
  DETAILED_FORM,
  STRATEGIC_SOURCING_DETAIL
}

const formSchema = z.object({
  problemStatement: z.string().min(10, { message: "Please describe your problem in detail" }),
  currentSolution: z.string().min(10, { message: "Please describe your current approach" }),
  supportData: z.boolean().optional(),
  supportInsights: z.boolean().optional(),
  supportConsulting: z.boolean().optional(),
  supportOther: z.boolean().optional(),
  supportOtherText: z.string().optional(),
  keyQuestions: z.string().min(10, { message: "Please list your key questions" }),
  decisionsOutcomes: z.string().min(10, { message: "Please describe how insights will be used" }),
  timelineStart: z.string().optional(),
  timelineCompletion: z.string().optional(),
  companyName: z.string().min(2, { message: "Company name is required" }),
  contactName: z.string().min(2, { message: "Contact name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
});

export default function ConsultingReports({ onBack }: ConsultingReportsProps) {
  const [submitting, setSubmitting] = useState(false);
  const [viewState, setViewState] = useState<ConsultingViewState>(ConsultingViewState.REPORTS_LIST);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [questionnaireData, setQuestionnaireData] = useState<ConsultingProjectData | null>(null);
  
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      problemStatement: "",
      currentSolution: "",
      supportData: false,
      supportInsights: false,
      supportConsulting: false,
      supportOther: false,
      supportOtherText: "",
      keyQuestions: "",
      decisionsOutcomes: "",
      timelineStart: "",
      timelineCompletion: "",
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
    },
  });

  const watchSupportOther = form.watch("supportOther");

  const handleReportSelect = (id: string) => {
    setSelectedReportId(id);
    
    // If Strategic Sourcing is selected, go directly to the questionnaire
    if (id === "strategic-sourcing") {
      // We'll directly render the StrategicSourcingQuestionnaire component
      setViewState(ConsultingViewState.STRATEGIC_SOURCING_DETAIL);
    } else {
      // For other consulting reports, show the standard questionnaire
      setViewState(ConsultingViewState.QUESTIONNAIRE);
    }
  };

  const handleQuestionnaireComplete = (data: ConsultingProjectData) => {
    setQuestionnaireData(data);
    
    // Update form with questionnaire data
    form.setValue("problemStatement", data.problemStatement || data.primaryPurpose);
    
    // If expedited delivery, set the timeline completion date
    if (data.deadline === "expedited" && data.deadlineDate) {
      form.setValue("timelineCompletion", data.deadlineDate.toISOString().substring(0, 10));
    }
    
    setViewState(ConsultingViewState.DETAILED_FORM);
  };

  const handleQuestionnaireBack = () => {
    setViewState(ConsultingViewState.REPORTS_LIST);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    try {
      // Include the selected report type and questionnaire data in the submission
      await apiRequest("POST", "/api/requests/consulting", {
        ...values,
        reportType: selectedReportId,
        questionnaireData
      });
      
      toast({
        title: "Request Submitted",
        description: "Your consulting report request has been submitted successfully.",
        variant: "default",
      });
      
      // Reset state and form
      form.reset();
      setViewState(ConsultingViewState.REPORTS_LIST);
      setSelectedReportId(null);
      setQuestionnaireData(null);
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

  // Handle the submission of the strategic sourcing report
  const handleStrategicSourcingSubmit = (reportType: string, variant: string) => {
    // Here you can save the strategic sourcing request to the database
    toast({
      title: "Strategic Sourcing Request Submitted",
      description: `Your ${variant === 'plus' ? 'Strategic Sourcing Plus' : 'Strategic Sourcing'} request has been submitted successfully.`,
      variant: "default",
    });
    
    // Reset and return to reports list
    setViewState(ConsultingViewState.REPORTS_LIST);
    setSelectedReportId(null);
  };

  return (
    <section>
      {/* Strategic Sourcing Detail View */}
      {viewState === ConsultingViewState.STRATEGIC_SOURCING_DETAIL && selectedReportId === "strategic-sourcing" && (
        <StrategicSourcingDetail
          onBack={handleQuestionnaireBack}
          onSubmit={handleStrategicSourcingSubmit}
          source="consulting"
        />
      )}
    
      {/* Questionnaire View for other report types */}
      {viewState === ConsultingViewState.QUESTIONNAIRE && selectedReportId && (
        <ConsultingQuestionnaire
          onBack={handleQuestionnaireBack}
          onComplete={handleQuestionnaireComplete}
          reportType={standardReportTypes.find(r => r.id === selectedReportId)?.title || ""}
        />
      )}

      {/* Reports List View */}
      {viewState === ConsultingViewState.REPORTS_LIST && (
        <>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Consulting Reports</h2>
            <p className="text-gray-600 mb-4">
              Our custom-tailored research and analysis services address complex business
              challenges that require specialized expertise.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 text-secondary-600">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Tailored Solutions</h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Custom research methodologies designed for your specific challenges
                  </p>
                </div>
              </div>
              <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 text-secondary-600">
                  <Clock className="h-6 w-6" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Extended Timeline</h3>
                  <p className="mt-1 text-xs text-gray-500">
                    4-6 weeks delivery timeframe for comprehensive analysis
                  </p>
                </div>
              </div>
              <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 text-secondary-600">
                  <DollarSign className="h-6 w-6" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Premium Investment</h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Pricing based on project scope and complexity
                  </p>
                </div>
              </div>
              <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 text-secondary-600">
                  <Users className="h-6 w-6" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Expert Consultation</h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Direct access to research specialists and industry experts
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Display available report types */}
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Available Consulting Projects</h3>
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
        </>
      )}

      {/* Detailed Form View */}
      {viewState === ConsultingViewState.DETAILED_FORM && (
        <>
          <div className="mb-6">
            <Button
              variant="ghost" 
              className="inline-flex items-center text-gray-600 hover:text-gray-900"
              onClick={() => setViewState(ConsultingViewState.QUESTIONNAIRE)}
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to questionnaire
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Tell Us About Your Needs</h3>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <FormField
                      control={form.control}
                      name="problemStatement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-md font-medium text-gray-900 mb-2">
                            What problem are you trying to solve?
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              rows={4}
                              placeholder="Please describe the business or talent challenge you're seeking to address..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <FormField
                      control={form.control}
                      name="currentSolution"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-md font-medium text-gray-900 mb-2">
                            How are you addressing this challenge today?
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              rows={3}
                              placeholder="Describe your current approach or solutions..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <FormLabel className="block text-md font-medium text-gray-900 mb-2">
                      What type of support are you seeking?
                    </FormLabel>
                    <div className="mt-2 space-y-2">
                      <FormField
                        control={form.control}
                        name="supportData"
                        render={({ field }) => (
                          <FormItem className="flex items-start">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="ml-3 text-sm font-medium text-gray-700">
                              Data Analysis
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="supportInsights"
                        render={({ field }) => (
                          <FormItem className="flex items-start">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="ml-3 text-sm font-medium text-gray-700">
                              Market Insights
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="supportConsulting"
                        render={({ field }) => (
                          <FormItem className="flex items-start">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="ml-3 text-sm font-medium text-gray-700">
                              Consulting Support
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      <div className="flex items-start">
                        <FormField
                          control={form.control}
                          name="supportOther"
                          render={({ field }) => (
                            <FormItem className="flex items-start">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="ml-3 text-sm font-medium text-gray-700">
                                Other
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                      {watchSupportOther && (
                        <FormField
                          control={form.control}
                          name="supportOtherText"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="Please specify"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <FormField
                      control={form.control}
                      name="keyQuestions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-md font-medium text-gray-900 mb-2">
                            What key questions would you like us to address?
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              rows={3}
                              placeholder="List the specific questions that need answers..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <FormField
                      control={form.control}
                      name="decisionsOutcomes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-md font-medium text-gray-900 mb-2">
                            What decisions or outcomes will this inform?
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              rows={3}
                              placeholder="Describe how the insights will be used..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <FormLabel className="block text-md font-medium text-gray-900 mb-2">
                      Is there a specific timeline for delivery?
                    </FormLabel>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="timelineStart"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ideal Start Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="timelineCompletion"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Required Completion</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

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

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="bg-secondary-600 hover:bg-secondary-700"
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit Consulting Request"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </>
      )}
    </section>
  );
}