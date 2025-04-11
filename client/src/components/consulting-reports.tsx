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

interface ConsultingReportsProps {
  onBack: () => void;
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    try {
      await apiRequest("POST", "/api/requests/consulting", {
        ...values,
      });
      
      toast({
        title: "Request Submitted",
        description: "Your consulting report request has been submitted successfully.",
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
    </section>
  );
}
