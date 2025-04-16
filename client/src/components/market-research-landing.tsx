import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { AnimatedContainer } from "@/components/ui/animated-container";
import tnLogo from "@assets/TN.png";

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  icon: React.ReactNode;
}

function StepCard({ number, title, description, position, icon }: StepCardProps) {
  // Position styles based on the Market Research landing Page.png
  const positionClasses = {
    "top-left": "left-[513px] top-[230px]",
    "top-right": "right-[140px] top-[160px]",
    "bottom-left": "left-[580px] bottom-[110px]",
    "bottom-right": "right-[140px] bottom-[220px]",
  };

  const containerClasses: Record<string, string> = {
    "1": "border-l-4 border-l-[#FF4219]",
    "2": "border-l-4 border-l-[#4600FF]",
    "3": "border-l-4 border-l-[#00B2FF]",
    "4": "border-l-4 border-l-[#4600FF]",
  };

  const circleClasses: Record<string, string> = {
    "1": "bg-[#FF4219]",
    "2": "bg-[#4600FF]",
    "3": "bg-[#00B2FF]",
    "4": "bg-[#4600FF]",
  };

  return (
    <div className={`absolute ${positionClasses[position]} max-w-[280px] z-10`}>
      <div className={`bg-white rounded-lg shadow-sm p-4 relative ${containerClasses[number]}`}>
        <div className={`w-7 h-7 flex items-center justify-center rounded-full ${circleClasses[number]} text-white font-bold absolute -left-3.5 top-3`}>
          {number}
        </div>
        <div className="mb-2 pl-3">
          <div className="text-[#130056] font-medium mb-1">Step {number}: {title}</div>
          <p className="text-xs text-[#8186B4]">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function MarketResearchLanding({ onGetStarted }: { onGetStarted: () => void }) {
  const [_, setLocation] = useLocation();
  
  return (
    <div className="flex flex-col min-h-screen bg-[#F0F3FC]">
      <header className="bg-white shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <img src={tnLogo} alt="TalentNeuron Logo" className="h-6" />
            <span className="ml-2 text-[#130056] font-bold">talentneuron</span>
          </div>
        </div>
      </header>
      
      <main className="flex-grow py-8 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="md:w-1/2 mb-8">
            <AnimatedContainer animation="fadeInLeft" delay={100}>
              <h1 className="text-4xl font-bold text-[#130056] mb-4">
                Request Custom Reports Tailored to Your Needs—In Just a Few Simple Steps.
              </h1>
              <p className="text-[#8186B4] mb-8">
                Follow these steps to generate a report that aligns with your specific requirements.
              </p>
              <Button 
                className="bg-[#4600FF] hover:bg-[#4600FF]/90 text-white px-6 py-2"
                onClick={onGetStarted}
              >
                Get Started
              </Button>
            </AnimatedContainer>
          </div>
          
          {/* Steps visualization - based on Market Research landing Page.png */}
          <div className="relative h-[500px] w-full">
            {/* Curved dotted path */}
            <div className="absolute w-full h-full">
              <svg width="100%" height="100%" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute">
                <path d="M520 240 C600 240, 650 160, 730 160 C810 160, 840 300, 730 350 C620 400, 580 350, 520 370" 
                      stroke="#4600FF" strokeWidth="2" strokeDasharray="5 5" fill="none"/>
              </svg>
            </div>

            {/* Report icon in center */}
            <div className="absolute left-[675px] top-[260px]">
              <div className="w-16 h-16 flex items-center justify-center">
                <div className="bg-[#4600FF] w-14 h-16 rounded text-white flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Step 1 */}
            <StepCard
              number="1"
              title="Define Your Problem Statement"
              description="Provide details of your problem statement and describe what goals you want to achieve with your report."
              position="top-left"
              icon={<></>}
            />
            
            {/* Step 2 */}
            <StepCard
              number="2"
              title="Choose Your Report Type"
              description="View report examples and select the type that best fits your specific needs."
              position="top-right"
              icon={<></>}
            />
            
            {/* Step 3 */}
            <StepCard
              number="3"
              title="Upload The Data"
              description="Upload the necessary data or inputs to personalize your report and get more accurate insights."
              position="bottom-right"
              icon={<></>}
            />
            
            {/* Step 4 */}
            <StepCard
              number="4"
              title="Get Notified"
              description="We'll notify you as soon as your report is ready for viewing and download."
              position="bottom-left"
              icon={<></>}
            />
          </div>
        </div>
      </main>
    </div>
  );
}