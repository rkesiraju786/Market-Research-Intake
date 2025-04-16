import { useState } from "react";
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
  // Position styles
  const positionClasses = {
    "top-left": "top-[25%] left-[15%]",
    "top-right": "top-[15%] right-[15%]",
    "bottom-left": "bottom-[25%] left-[15%]",
    "bottom-right": "bottom-[15%] right-[18%]",
  };

  // Line styles based on position
  const lineClasses = {
    "top-left": "after:content-[''] after:absolute after:w-24 after:h-20 after:border-t-2 after:border-r-2 after:border-dashed after:border-[#CCCCFF] after:right-[-40px] after:top-10 after:rounded-tr-3xl",
    "top-right": "after:content-[''] after:absolute after:w-24 after:h-24 after:border-b-2 after:border-l-2 after:border-dashed after:border-[#CCCCFF] after:left-[-40px] after:bottom-0 after:rounded-bl-3xl",
    "bottom-left": "after:content-[''] after:absolute after:w-24 after:h-24 after:border-t-2 after:border-r-2 after:border-dashed after:border-[#CCCCFF] after:right-[-40px] after:top-0 after:rounded-tr-3xl",
    "bottom-right": "",
  };

  return (
    <div className={`absolute ${positionClasses[position]} max-w-[280px] z-10 ${lineClasses[position]}`}>
      <div className="bg-white rounded-lg border border-[#CCCCFF] shadow-sm p-4 relative">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#4600FF] text-white font-bold absolute -top-3 -left-3">
          {number}
        </div>
        <div className="mb-2 pl-3">
          <div className="text-[#130056] font-medium mb-1">Step {number}: {title}</div>
          <p className="text-sm text-[#8186B4]">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function MarketResearchLanding({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F9FC]">
      <header className="bg-white shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <img src={tnLogo} alt="TalentNeuron Logo" className="h-6" />
          </div>
        </div>
      </header>
      
      <main className="flex-grow py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
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
          
          <div className="md:w-1/2 relative min-h-[500px]">
            <AnimatedContainer animation="fadeIn" delay={300} className="relative h-full">
              {/* Center element */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 rounded-full bg-[#E6EDFF] flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#4600FF] text-white flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Step 1 */}
              <StepCard
                number="1"
                title="Define Your Problem Statement"
                description="Provide details of your problem statements and describe what goals you want to achieve."
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
            </AnimatedContainer>
          </div>
        </div>
      </main>
    </div>
  );
}