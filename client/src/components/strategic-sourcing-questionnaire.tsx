import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface StrategicSourcingQuestionnaireProps {
  onBack: () => void;
  onComplete: (data: StrategicSourcingData) => void;
}

export interface StrategicSourcingData {
  challenges: string[];
  challengeDetails: string;
  audience: string[];
  audienceDetails: string;
  timeline: "standard" | "expedited";
  deadline?: Date;
  deadlineReason?: string;
  additionalInsights: string[];
  insightDetails: string;
}

type QuestionStep = {
  title: string;
  description?: string;
}

const steps: QuestionStep[] = [
  { 
    title: "What workforce challenge or strategic question would you like us to help address?",
  },
  { 
    title: "Who is the primary audience for this report?",
  },
  { 
    title: "What are your timeline expectations for this project?",
  },
  { 
    title: "What additional insights would you like included beyond our standard workforce reports?",
  }
];

export default function StrategicSourcingQuestionnaire({ 
  onBack, 
  onComplete 
}: StrategicSourcingQuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<StrategicSourcingData>({
    challenges: [],
    challengeDetails: "",
    audience: [],
    audienceDetails: "",
    timeline: "standard",
    additionalInsights: [],
    insightDetails: ""
  });
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [deadlineReason, setDeadlineReason] = useState("");
  const { toast } = useToast();

  const challengeOptions = [
    { id: "talent-attraction", label: "Talent attraction or sourcing" },
    { id: "skills-gap", label: "Skills gap analysis" },
    { id: "compensation", label: "Compensation or salary benchmarking" },
    { id: "diversity", label: "Diversity and inclusion insights" },
    { id: "supply-demand", label: "Workforce supply and demand" },
    { id: "location", label: "Location strategy / expansion" },
    { id: "competitor", label: "Competitor hiring trends" },
    { id: "other", label: "Other (please specify below)" }
  ];

  const audienceOptions = [
    { id: "chro", label: "CHRO / VP of HR" },
    { id: "talent-acquisition", label: "Talent Acquisition / Recruiting Leadership" },
    { id: "workforce-planning", label: "Strategic Workforce Planning team" },
    { id: "executive", label: "Executive Leadership (CEO, COO, etc.)" },
    { id: "people-analytics", label: "People Analytics / HRBPs" },
    { id: "other", label: "Other (please specify below)" }
  ];

  const insightOptions = [
    { id: "salary", label: "Custom salary breakdowns" },
    { id: "diversity", label: "Gender / Ethnic diversity analysis" },
    { id: "competitor", label: "Competitor talent movement" },
    { id: "education", label: "Educational background and credential trends" },
    { id: "regional", label: "Regional or city-level granularity" },
    { id: "skills", label: "Custom role or skill deep dives" },
    { id: "other", label: "Other (please specify below)" }
  ];

  const goToNextStep = () => {
    if (currentStep === 0 && data.challenges.length === 0) {
      toast({
        title: "Selection Required",
        description: "Please select at least one challenge.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === 1 && data.audience.length === 0) {
      toast({
        title: "Selection Required",
        description: "Please select at least one audience.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === 2 && data.timeline === "expedited" && !date) {
      toast({
        title: "Date Required",
        description: "Please select a deadline date.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === 2 && data.timeline === "expedited" && !deadlineReason) {
      toast({
        title: "Details Required",
        description: "Please provide details about your deadline.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === steps.length - 1) {
      if (data.additionalInsights.length === 0) {
        toast({
          title: "Selection Required",
          description: "Please select at least one additional insight.",
          variant: "destructive",
        });
        return;
      }
      
      // Prepare final data
      const finalData = {
        ...data,
        deadline: date,
        deadlineReason: deadlineReason
      };
      
      onComplete(finalData);
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    if (currentStep === 0) {
      onBack();
      return;
    }
    setCurrentStep(currentStep - 1);
  };

  const handleChallengeToggle = (challengeId: string, checked: boolean) => {
    setData({
      ...data,
      challenges: checked 
        ? [...data.challenges, challengeId] 
        : data.challenges.filter(id => id !== challengeId)
    });
  };

  const handleAudienceToggle = (audienceId: string, checked: boolean) => {
    setData({
      ...data,
      audience: checked 
        ? [...data.audience, audienceId] 
        : data.audience.filter(id => id !== audienceId)
    });
  };

  const handleInsightToggle = (insightId: string, checked: boolean) => {
    setData({
      ...data,
      additionalInsights: checked 
        ? [...data.additionalInsights, insightId] 
        : data.additionalInsights.filter(id => id !== insightId)
    });
  };

  const handleTimelineChange = (timeline: "standard" | "expedited") => {
    setData({
      ...data,
      timeline
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <Button
          variant="ghost" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
          onClick={goToPreviousStep}
        >
          Back
        </Button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Strategic Sourcing Questionnaire</h3>
        <div className="text-sm text-gray-500">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>

      <div className="mb-8">
        {currentStep === 0 && (
          <AnimatedContainer animation="fadeIn">
            <h4 className="text-lg font-medium text-gray-800 mb-4">
              {steps[currentStep].title}
            </h4>
            <div className="space-y-3 mb-6">
              {challengeOptions.map((option) => (
                <div key={option.id} className="flex items-start">
                  <Checkbox 
                    id={`challenge-${option.id}`}
                    checked={data.challenges.includes(option.id)}
                    onCheckedChange={(checked) => 
                      handleChallengeToggle(option.id, checked === true)
                    }
                  />
                  <label 
                    htmlFor={`challenge-${option.id}`}
                    className="ml-3 text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Please elaborate on the challenge or key question:
              </label>
              <Textarea
                value={data.challengeDetails}
                onChange={(e) => setData({...data, challengeDetails: e.target.value})}
                placeholder="Describe your challenge in detail..."
                className="h-32"
              />
            </div>
          </AnimatedContainer>
        )}

        {currentStep === 1 && (
          <AnimatedContainer animation="fadeIn">
            <h4 className="text-lg font-medium text-gray-800 mb-4">
              {steps[currentStep].title}
            </h4>
            <div className="space-y-3 mb-6">
              {audienceOptions.map((option) => (
                <div key={option.id} className="flex items-start">
                  <Checkbox 
                    id={`audience-${option.id}`}
                    checked={data.audience.includes(option.id)}
                    onCheckedChange={(checked) => 
                      handleAudienceToggle(option.id, checked === true)
                    }
                  />
                  <label 
                    htmlFor={`audience-${option.id}`}
                    className="ml-3 text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How will they use this report in decision-making?
              </label>
              <Textarea
                value={data.audienceDetails}
                onChange={(e) => setData({...data, audienceDetails: e.target.value})}
                placeholder="Explain how this report will inform decisions..."
                className="h-32"
              />
            </div>
          </AnimatedContainer>
        )}

        {currentStep === 2 && (
          <AnimatedContainer animation="fadeIn">
            <h4 className="text-lg font-medium text-gray-800 mb-4">
              {steps[currentStep].title}
            </h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-start">
                <Checkbox 
                  id="timeline-standard"
                  checked={data.timeline === "standard"}
                  onCheckedChange={(checked) => {
                    if (checked) handleTimelineChange("standard");
                  }}
                />
                <label 
                  htmlFor="timeline-standard"
                  className="ml-3 text-sm font-medium text-gray-700 cursor-pointer"
                >
                  2-6 weeks (Standard)
                </label>
              </div>
              <div className="flex items-start">
                <Checkbox 
                  id="timeline-expedited"
                  checked={data.timeline === "expedited"}
                  onCheckedChange={(checked) => {
                    if (checked) handleTimelineChange("expedited");
                  }}
                />
                <label 
                  htmlFor="timeline-expedited"
                  className="ml-3 text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Expedited Delivery (Hard Deadline)
                </label>
              </div>
            </div>

            {data.timeline === "expedited" && (
              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
                <div className="flex items-start mb-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    Please note that expedited delivery will incur additional costs based on the timeline.
                  </p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select your deadline:
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal border-gray-300"
                      >
                        {date ? format(date, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Do you have a specific deadline or event this needs to align with?
                  </label>
                  <Textarea
                    value={deadlineReason}
                    onChange={(e) => setDeadlineReason(e.target.value)}
                    placeholder="E.g., Board meeting on 5/15, Q3 planning session..."
                    className="h-20"
                  />
                </div>
              </div>
            )}
          </AnimatedContainer>
        )}

        {currentStep === 3 && (
          <AnimatedContainer animation="fadeIn">
            <h4 className="text-lg font-medium text-gray-800 mb-4">
              {steps[currentStep].title}
            </h4>
            <div className="space-y-3 mb-6">
              {insightOptions.map((option) => (
                <div key={option.id} className="flex items-start">
                  <Checkbox 
                    id={`insight-${option.id}`}
                    checked={data.additionalInsights.includes(option.id)}
                    onCheckedChange={(checked) => 
                      handleInsightToggle(option.id, checked === true)
                    }
                  />
                  <label 
                    htmlFor={`insight-${option.id}`}
                    className="ml-3 text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional notes or specific asks:
              </label>
              <Textarea
                value={data.insightDetails}
                onChange={(e) => setData({...data, insightDetails: e.target.value})}
                placeholder="Any additional details about what you'd like to see in the report..."
                className="h-32"
              />
            </div>
          </AnimatedContainer>
        )}
      </div>

      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={goToPreviousStep}
        >
          Previous
        </Button>
        <Button 
          onClick={goToNextStep}
        >
          {currentStep === steps.length - 1 ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
}