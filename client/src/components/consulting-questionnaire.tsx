import { useState } from "react";
import { ArrowLeft, Calendar, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { Spinner } from "@/components/ui/spinner";
import { Pulse } from "@/components/ui/pulse";
import { cn } from "@/lib/utils";

interface ConsultingQuestionnaireProps {
  onBack: () => void;
  onComplete: (data: ConsultingProjectData) => void;
  reportType: string;
}

export interface ConsultingProjectData {
  problemStatement: string;
  primaryPurpose: string;
  talentType: string;
  deadline: string;
  deadlineDate?: Date;
}

export default function ConsultingQuestionnaire({ 
  onBack, 
  onComplete,
  reportType
}: ConsultingQuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<ConsultingProjectData>({
    problemStatement: "",
    primaryPurpose: "",
    talentType: "",
    deadline: ""
  });
  const [inputMethod, setInputMethod] = useState<"text" | "choice">("text");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { toast } = useToast();

  const handleTextInputChange = (value: string) => {
    setData({ ...data, problemStatement: value });
  };

  const handlePurposeSelect = (value: string) => {
    setData({ ...data, primaryPurpose: value });
    goToNextStep();
  };

  const handleTalentTypeSelect = (value: string) => {
    setData({ ...data, talentType: value });
    goToNextStep();
  };

  const handleDeadlineSelect = (value: string) => {
    setData({ ...data, deadline: value });
    
    if (value === "expedited") {
      // If expedited, go to date selection
      goToNextStep();
    } else {
      // If standard, skip date selection and complete
      handleComplete();
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      setData({ ...data, deadlineDate: date });
    }
  };

  const goToNextStep = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  const handleComplete = () => {
    if (
      data.problemStatement && 
      data.primaryPurpose && 
      data.talentType && 
      data.deadline
    ) {
      setIsSubmitting(true);
      
      // Simulate a short delay to show loading state
      setTimeout(() => {
        onComplete(data);
        setIsSubmitting(false);
      }, 800);
    } else {
      toast({
        title: "Missing Information",
        description: "Please complete all required fields.",
        variant: "destructive"
      });
    }
  };

  const handleSubmitFinalForm = () => {
    handleComplete();
  };

  const toggleInputMethod = () => {
    setInputMethod(prev => prev === "text" ? "choice" : "text");
  };

  // Animation variants
  const variants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="max-w-3xl mx-auto">
      <AnimatedContainer animation="fadeInDown" delay={0.1} className="mb-6">
        <Button
          variant="ghost"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to selection
        </Button>
      </AnimatedContainer>

      <AnimatedContainer animation="fadeInUp" delay={0.2}>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              {reportType} Consulting Project 
              {currentStep === 3 && data.deadline === "expedited" && (
                <Pulse color="warning" size="sm" className="ml-2" />
              )}
            </CardTitle>
            <CardDescription>
              Let's work together to understand your specific needs for this consulting project.
            </CardDescription>
          </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between mb-4">
              {[...Array(data.deadline === "expedited" ? 5 : 4)].map((_, index) => (
                <div 
                  key={index} 
                  className={`flex items-center ${index > 0 ? 'ml-2' : ''}`}
                >
                  <div 
                    className={`rounded-full w-8 h-8 flex items-center justify-center ${
                      index === currentStep 
                        ? 'bg-primary text-white' 
                        : index < currentStep 
                          ? 'bg-primary-200 text-primary-800' 
                          : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < (data.deadline === "expedited" ? 4 : 3) && (
                    <div 
                      className={`h-1 w-16 ${
                        index < currentStep ? 'bg-primary-200' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* Step 1: Problem Statement */}
              {currentStep === 0 && (
                <motion.div
                  key="step1"
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">What problem are you trying to solve?</h3>
                    <p className="text-sm text-gray-500">
                      Please describe the challenge or opportunity you're facing.
                    </p>
                    
                    <div className="flex justify-end mb-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={toggleInputMethod}
                        className="text-xs"
                      >
                        Switch to {inputMethod === "text" ? "Multiple Choice" : "Text Input"}
                      </Button>
                    </div>

                    {inputMethod === "text" ? (
                      <div className="space-y-2">
                        <Textarea 
                          placeholder="Describe your problem or goal..."
                          className="min-h-[100px]"
                          value={data.problemStatement}
                          onChange={(e) => handleTextInputChange(e.target.value)}
                        />
                        <Button 
                          onClick={goToNextStep} 
                          disabled={!data.problemStatement.trim()}
                          className="mt-2"
                        >
                          Continue <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium">What is the primary purpose of this study?</h4>
                        <RadioGroup 
                          className="space-y-2"
                          value={data.primaryPurpose}
                          onValueChange={handlePurposeSelect}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="attract-retain" id="attract-retain" />
                            <Label htmlFor="attract-retain">Attract / Retain talent</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="location-competitor" id="location-competitor" />
                            <Label htmlFor="location-competitor">Location Strategy / Competitor Analysis</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="employer-branding" id="employer-branding" />
                            <Label htmlFor="employer-branding">Employer Branding</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="diversity" id="diversity" />
                            <Label htmlFor="diversity">Diversity</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Talent Type */}
              {currentStep === 1 && (
                <motion.div
                  key="step2"
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">What kind of talent are you looking for?</h3>
                    <p className="text-sm text-gray-500">
                      Select the type of roles you're focusing on.
                    </p>
                    
                    <RadioGroup 
                      className="space-y-3 mt-4"
                      value={data.talentType}
                      onValueChange={handleTalentTypeSelect}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="professional" id="professional" />
                        <Label htmlFor="professional">Professional Roles</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="frontline" id="frontline" />
                        <Label htmlFor="frontline">Front-line Roles</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="senior" id="senior" />
                        <Label htmlFor="senior">Senior Roles</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="niche" id="niche" />
                        <Label htmlFor="niche">Highly Niche Roles</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Deadline */}
              {currentStep === 2 && (
                <motion.div
                  key="step3"
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Do you have a deadline for this consulting project?</h3>
                    <p className="text-sm text-gray-500">
                      Let us know your timeframe requirements.
                    </p>
                    
                    <RadioGroup 
                      className="space-y-3 mt-4"
                      value={data.deadline}
                      onValueChange={handleDeadlineSelect}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard">Delivery in 4-6 weeks (Standard)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="expedited" id="expedited" />
                        <Label htmlFor="expedited">Expedited delivery (Hard deadline)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Date Selection (only for expedited) */}
              {currentStep === 3 && data.deadline === "expedited" && (
                <motion.div
                  key="step4"
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Select your deadline date</h3>
                    <p className="text-sm text-gray-500">
                      Please note that expedited delivery will incur additional costs.
                    </p>
                    
                    <div className="flex flex-col items-center mt-4">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Select a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={date}
                            onSelect={handleDateSelect}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                      
                      <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mt-4 text-sm text-amber-800">
                        <p className="font-medium">Expedited Service Fee</p>
                        <p>An additional fee will be applied for expedited delivery requests.</p>
                      </div>
                      
                      <Button 
                        onClick={handleSubmitFinalForm} 
                        disabled={!date}
                        className="mt-4"
                      >
                        Continue <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-gray-100 pt-4">
          {/* Schedule Call Option */}
          <div className="flex items-start mt-4 border-t border-gray-100 pt-4 w-full">
            <div className="flex-shrink-0">
              <Calendar className="h-5 w-5 text-gray-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">
                Need help determining your requirements?
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Schedule a consultation call with one of our experts.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => {
                  toast({
                    title: "Schedule Consultation",
                    description: "Redirecting to scheduling page...",
                  });
                }}
              >
                <Clock className="h-3 w-3 mr-1" />
                Schedule a Consultation
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
      </AnimatedContainer>
    </div>
  );
}