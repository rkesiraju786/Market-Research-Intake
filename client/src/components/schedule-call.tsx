import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";
import { formatDate, getAvailableTimes } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ScheduleCallProps {
  onBack: () => void;
}

const formSchema = z.object({
  businessNeed: z.string().min(10, { 
    message: "Please describe your business need in detail" 
  }),
  supportNeeded: z.string().min(1, { 
    message: "Please select the type of support you need" 
  }),
  keyQuestions: z.string().min(10, { 
    message: "Please list your key questions" 
  }),
  decisionsOutcomes: z.string().min(10, { 
    message: "Please describe how insights will be used" 
  }),
  timeline: z.string().optional(),
  companyName: z.string().min(2, { 
    message: "Company name is required" 
  }),
  contactName: z.string().min(2, { 
    message: "Contact name is required" 
  }),
  email: z.string().email({ 
    message: "Invalid email address" 
  }),
  phone: z.string().min(10, { 
    message: "Valid phone number is required" 
  }),
  appointmentDate: z.string().min(1, { 
    message: "Please select an appointment date" 
  }),
  appointmentTime: z.string().min(1, { 
    message: "Please select an appointment time" 
  }),
});

export default function ScheduleCall({ onBack }: ScheduleCallProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessNeed: "",
      supportNeeded: "",
      keyQuestions: "",
      decisionsOutcomes: "",
      timeline: "",
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      appointmentDate: "",
      appointmentTime: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    try {
      await apiRequest("POST", "/api/appointments", {
        ...values,
      });
      
      toast({
        title: "Appointment Scheduled",
        description: "Your consultation has been scheduled successfully.",
        variant: "default",
      });
      
      form.reset();
      setSelectedDate(null);
      setSelectedTime(null);
    } catch (error) {
      toast({
        title: "Scheduling Failed",
        description: "There was an error scheduling your consultation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const times = getAvailableTimes(date);
    setAvailableTimes(times);
    setSelectedTime(null);
    
    form.setValue("appointmentDate", date.toISOString().split('T')[0]);
    form.setValue("appointmentTime", "");
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    form.setValue("appointmentTime", time);
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const calendarDays = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendarDays.push(null);
    }
    
    // Add the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) {
        calendarDays.push({
          date,
          isAvailable: false,
        });
      } else {
        calendarDays.push({
          date,
          isAvailable: true,
        });
      }
    }
    
    return calendarDays;
  };

  const calendarDays = generateCalendarDays();

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

      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-2 border-[#CCCFFF]">
        <h2 className="text-3xl font-bold gradient-heading mb-2">Schedule a Consultation</h2>
        <p className="text-[#8186B4] mb-6">
          Not sure which report fits your needs? Our research experts can help
          identify the right solution for your business challenges.
        </p>

        <div className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="bg-[#FCFCFE] p-4 rounded-lg border border-[#CCCFFF]">
                <FormField
                  control={form.control}
                  name="businessNeed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-medium text-[#130056] mb-2">
                        Please describe your business or talent need
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Share the context that's leading to this request rather than the solution you're seeking..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="bg-[#FCFCFE] p-4 rounded-lg border border-[#CCCFFF]">
                <FormField
                  control={form.control}
                  name="supportNeeded"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-medium text-[#130056] mb-2">
                        What type of support are you seeking?
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="placeholder" disabled>Select an option</SelectItem>
                          <SelectItem value="data">Data</SelectItem>
                          <SelectItem value="insights">Insights</SelectItem>
                          <SelectItem value="consulting">Consulting support</SelectItem>
                          <SelectItem value="multiple">Multiple types of support</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="bg-[#FCFCFE] p-4 rounded-lg border border-[#CCCFFF]">
                <FormField
                  control={form.control}
                  name="keyQuestions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-medium text-[#130056] mb-2">
                        What key questions would you like us to address?
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={3}
                          placeholder="List the specific questions you'd like answered..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="bg-[#FCFCFE] p-4 rounded-lg border border-[#CCCFFF]">
                <FormField
                  control={form.control}
                  name="decisionsOutcomes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-medium text-[#130056] mb-2">
                        What decisions/outcomes will this inform?
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={3}
                          placeholder="Explain how you'll use the insights in your decision-making..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="bg-[#FCFCFE] p-4 rounded-lg border border-[#CCCFFF]">
                <FormField
                  control={form.control}
                  name="timeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-medium text-[#130056] mb-2">
                        Is there a timeline that we will need to meet?
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={2}
                          placeholder="Share any deadlines or time constraints for your project..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#130056]">Company Name</FormLabel>
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
                      <FormLabel className="text-[#130056]">Contact Name</FormLabel>
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
                      <FormLabel className="text-[#130056]">Email Address</FormLabel>
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
                      <FormLabel className="text-[#130056]">Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <p className="text-[#130056] font-medium mb-3">
                  Select a date and time for your consultation:
                </p>

                <div className="bg-white border border-[#CCCFFF] rounded-lg shadow-sm">
                  <div className="border-b border-[#CCCFFF] px-4 py-3 flex justify-between items-center bg-[#F8F9FE]">
                    <Button variant="ghost" onClick={prevMonth} size="icon" className="text-[#4600FF] hover:bg-[#CCCFFF]/20">
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <h3 className="text-lg font-medium text-[#130056]">
                      {currentMonth.toLocaleDateString("default", {
                        month: "long",
                        year: "numeric",
                      })}
                    </h3>
                    <Button variant="ghost" onClick={nextMonth} size="icon" className="text-[#4600FF] hover:bg-[#CCCFFF]/20">
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-7 gap-2 mb-2">
                      <div className="text-center text-sm font-medium text-[#8186B4]">Sun</div>
                      <div className="text-center text-sm font-medium text-[#8186B4]">Mon</div>
                      <div className="text-center text-sm font-medium text-[#8186B4]">Tue</div>
                      <div className="text-center text-sm font-medium text-[#8186B4]">Wed</div>
                      <div className="text-center text-sm font-medium text-[#8186B4]">Thu</div>
                      <div className="text-center text-sm font-medium text-[#8186B4]">Fri</div>
                      <div className="text-center text-sm font-medium text-[#8186B4]">Sat</div>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {calendarDays.map((day, index) => {
                        if (day === null) {
                          return <div key={`empty-${index}`}></div>;
                        }

                        const isSelected = selectedDate && 
                          selectedDate.getDate() === day.date.getDate() && 
                          selectedDate.getMonth() === day.date.getMonth() && 
                          selectedDate.getFullYear() === day.date.getFullYear();

                        return (
                          <div
                            key={`day-${day.date.getDate()}`}
                            className={cn(
                              "text-center py-2 rounded-md border",
                              day.isAvailable
                                ? "bg-white border-[#CCCFFF] text-[#130056] hover:border-[#4600FF] hover:bg-[#CCCFFF]/10 cursor-pointer"
                                : "opacity-50 cursor-not-allowed border-gray-200 bg-gray-50",
                              isSelected && "bg-[#CCCFFF]/30 border-[#4600FF] text-[#4600FF] font-medium"
                            )}
                            onClick={() => {
                              if (day.isAvailable) {
                                handleDateSelect(day.date);
                              }
                            }}
                          >
                            {day.date.getDate()}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {selectedDate && (
                  <div className="mt-4">
                    <p className="text-[#130056] font-medium mb-3">
                      Available time slots for{" "}
                      <span className="font-semibold text-[#4600FF]">{formatDate(selectedDate)}</span>:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {availableTimes.map((time) => (
                        <Button
                          key={time}
                          type="button"
                          variant="outline"
                          className={cn(
                            "py-2 px-3 border border-[#CCCFFF] rounded-md text-sm font-medium text-[#130056] hover:bg-[#CCCFFF]/10 hover:border-[#4600FF]",
                            selectedTime === time && "bg-[#CCCFFF]/30 border-[#4600FF] text-[#4600FF]"
                          )}
                          onClick={() => handleTimeSelect(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <FormField
                control={form.control}
                name="appointmentDate"
                render={() => <FormMessage />}
              />
              <FormField
                control={form.control}
                name="appointmentTime"
                render={() => <FormMessage />}
              />

              <div className="pt-6">
                <Button 
                  type="submit" 
                  disabled={submitting}
                  className="bg-[#4600FF] hover:bg-[#4600FF]/90 text-white font-medium px-6"
                >
                  {submitting ? "Scheduling..." : "Schedule Consultation"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
