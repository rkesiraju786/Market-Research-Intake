import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import tnLogo from "@assets/TN.png";

interface ModuleCardProps {
  icon: string;
  title: string;
  description: string;
  previousPlan?: string;
  onClick: () => void;
}

function ModuleCard({ icon, title, description, previousPlan, onClick }: ModuleCardProps) {
  return (
    <AnimatedContainer 
      animation="fadeInUp" 
      className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
    >
      <div className="p-6">
        <div className="flex flex-col h-full">
          <div className="mb-4">
            <div className="flex items-center justify-center w-10 h-10 text-[#4600FF]">
              {icon === "talent" && (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              )}
              {icon === "hiring" && (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <path d="M11 8a3 3 0 0 1 0 6"></path>
                </svg>
              )}
              {icon === "skills" && (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </svg>
              )}
              {icon === "competitor" && (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              )}
              {icon === "location" && (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              )}
              {icon === "employee" && (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              )}
              {icon === "research" && (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              )}
            </div>
          </div>
          <h3 className="text-lg font-medium text-[#130056] mb-2">{title}</h3>
          <p className="text-[#8186B4] text-sm mb-4 flex-grow">{description}</p>
          
          <div className="mt-auto">
            <div className="flex items-center justify-between mt-4">
              {previousPlan && (
                <div className="text-xs text-[#8186B4]">
                  Previously<br />
                  {previousPlan}
                </div>
              )}
              <Button 
                variant="outline" 
                className="ml-auto border-[#CCCFFF] text-[#4600FF] hover:bg-[#CCCFFF]/10 hover:border-[#4600FF]"
                onClick={onClick}
              >
                Open module
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
}

export default function TalentNeuronHome({ onSelectMarketResearch }: { onSelectMarketResearch: () => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F9FC]">
      <header className="bg-white shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <img src={tnLogo} alt="TalentNeuron Logo" className="h-8" />
            <h1 className="ml-2 text-[#130056] font-bold">TalentNeuron<sup>®</sup></h1>
          </div>
        </div>
      </header>
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 max-w-3xl mx-auto">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search TalentNeuron data (e.g. supply, salary, skills)"
              className="bg-white pr-10 border-gray-300 rounded-md shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="mb-8 max-w-6xl mx-auto bg-[#E6EDFF] rounded-lg px-4 py-3 flex items-center">
          <div className="mr-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded uppercase font-bold">
            New
          </div>
          <div className="flex-1">
            <span className="font-semibold text-[#130056]">TalentNeuron Training - </span>
            <span className="text-[#130056]">TalentNeuron's self-guided, go-at-your-own-pace platform courses — featuring informative sessions and helpful articles — are designed to help you master the tool's powerful capabilities and achieve your goals. </span>
            <a href="#" className="text-[#4600FF] font-medium ml-1 hover:underline">Register Here</a>
          </div>
        </div>
        
        <h2 className="text-xl font-medium text-[#130056] mb-6">Your modules</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ModuleCard
            icon="talent"
            title="Talent Snapshots"
            description="Explore how demand for talent is changing over time."
            previousPlan="Plan - Talent"
            onClick={() => {}}
          />
          
          <ModuleCard
            icon="hiring"
            title="Hiring Analysis"
            description="Analyze talent supply, demand, cost and competition data."
            previousPlan="Recruit"
            onClick={() => {}}
          />
          
          <ModuleCard
            icon="skills"
            title="Skills Analysis"
            description="Understand current and future skills and evolving trends."
            previousPlan="Plan - Skills"
            onClick={() => {}}
          />
          
          <ModuleCard
            icon="competitor"
            title="Competitor Analysis"
            description="Monitor competitive labor market activity."
            previousPlan="Plan - Competition"
            onClick={() => {}}
          />
          
          <ModuleCard
            icon="location"
            title="Location Analysis"
            description="Examine location implications based on talent trends."
            previousPlan="Plan - Locations"
            onClick={() => {}}
          />
          
          <ModuleCard
            icon="employee"
            title="Employee Value Proposition"
            description="Benchmark EVP data and monitor employee sentiment."
            previousPlan=""
            onClick={() => {}}
          />
          
          <ModuleCard
            icon="research"
            title="Market Research"
            description="Request custom labor market research reports tailored to your needs."
            previousPlan=""
            onClick={onSelectMarketResearch}
          />
        </div>
      </main>
    </div>
  );
}