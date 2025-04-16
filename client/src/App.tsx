import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import tnLogo from "@assets/TN.png";

// Simple navigation system
type AppScreen = "home" | "market-research" | "request-form";

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("home");
  
  // Home Screen
  const HomeScreen = () => {
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
          <h2 className="text-xl font-medium text-[#130056] mb-6">Your modules</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Just showing the Market Research card for simplicity */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden p-6">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <div className="flex items-center justify-center w-10 h-10 text-[#4600FF]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-[#130056] mb-2">Market Research</h3>
                <p className="text-[#8186B4] text-sm mb-4 flex-grow">
                  Request custom labor market research reports tailored to your needs.
                </p>
                
                <div className="mt-auto">
                  <div className="flex items-center justify-between mt-4">
                    <Button 
                      variant="outline" 
                      className="ml-auto border-[#CCCFFF] text-[#4600FF] hover:bg-[#CCCFFF]/10 hover:border-[#4600FF]"
                      onClick={() => setCurrentScreen("market-research")}
                    >
                      Open module
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  };

  // Market Research Landing Page
  const MarketResearchPage = () => {
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
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl font-bold text-[#130056] mb-4">
                Request Custom Reports Tailored to Your Needs—In Just a Few Simple Steps.
              </h1>
              <p className="text-[#8186B4] mb-8">
                Follow these steps to generate a report that aligns with your specific requirements.
              </p>
              <Button 
                className="bg-[#4600FF] hover:bg-[#4600FF]/90 text-white px-6 py-2"
                onClick={() => setCurrentScreen("request-form")}
              >
                Get Started
              </Button>
            </div>
            
            <div className="md:w-1/2 relative h-[500px]">
              {/* Central elements and step cards */}
              <div className="absolute inset-0 bg-[#E6EDFF]/50 rounded-3xl overflow-hidden">
                {/* Step 1 */}
                <div className="absolute left-12 top-52 max-w-[240px] z-10">
                  <div className="bg-white rounded-lg shadow-sm p-4 relative border-l-4 border-l-[#FF4219]">
                    <div className="w-7 h-7 flex items-center justify-center rounded-full bg-[#FF4219] text-white font-bold absolute -left-3.5 top-3">
                      1
                    </div>
                    <div className="mb-2 pl-3">
                      <div className="text-[#130056] font-medium mb-1">Step 1: Define Your Problem Statement</div>
                      <p className="text-xs text-[#8186B4]">Provide details of your problem statement and describe what goals you want to achieve.</p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="absolute right-12 top-24 max-w-[240px] z-10">
                  <div className="bg-white rounded-lg shadow-sm p-4 relative border-l-4 border-l-[#4600FF]">
                    <div className="w-7 h-7 flex items-center justify-center rounded-full bg-[#4600FF] text-white font-bold absolute -left-3.5 top-3">
                      2
                    </div>
                    <div className="mb-2 pl-3">
                      <div className="text-[#130056] font-medium mb-1">Step 2: Choose Your Report Type</div>
                      <p className="text-xs text-[#8186B4]">View report examples and select the type that best fits your specific needs.</p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="absolute right-20 bottom-32 max-w-[240px] z-10">
                  <div className="bg-white rounded-lg shadow-sm p-4 relative border-l-4 border-l-[#00B2FF]">
                    <div className="w-7 h-7 flex items-center justify-center rounded-full bg-[#00B2FF] text-white font-bold absolute -left-3.5 top-3">
                      3
                    </div>
                    <div className="mb-2 pl-3">
                      <div className="text-[#130056] font-medium mb-1">Step 3: Upload The Data</div>
                      <p className="text-xs text-[#8186B4]">Upload the necessary data or inputs to personalize your report and get more accurate insights.</p>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="absolute left-20 bottom-20 max-w-[240px] z-10">
                  <div className="bg-white rounded-lg shadow-sm p-4 relative border-l-4 border-l-[#4600FF]">
                    <div className="w-7 h-7 flex items-center justify-center rounded-full bg-[#4600FF] text-white font-bold absolute -left-3.5 top-3">
                      4
                    </div>
                    <div className="mb-2 pl-3">
                      <div className="text-[#130056] font-medium mb-1">Step 4: Get Notified</div>
                      <p className="text-xs text-[#8186B4]">We'll notify you as soon as your report is ready for viewing and download.</p>
                    </div>
                  </div>
                </div>

                {/* Report icon in the center */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-20 bg-[#4600FF] rounded text-white flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                </div>

                {/* Curved dotted lines connecting steps */}
                <svg width="100%" height="100%" viewBox="0 0 600 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute">
                  <path d="M200 250 C280 250, 350 150, 450 150 C550 150, 550 300, 450 350 C350 400, 280 350, 200 300" 
                        stroke="#4600FF" strokeWidth="2" strokeDasharray="5 5" fill="none"/>
                </svg>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  };

  // Request Form Page
  const RequestFormPage = () => {
    return (
      <div className="flex flex-col min-h-screen">
        <header className="bg-white shadow-sm py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center">
              <img src={tnLogo} alt="TalentNeuron Logo" className="h-8" />
              <h1 className="ml-2 text-[#130056] font-bold">TalentNeuron<sup>®</sup></h1>
            </div>
          </div>
        </header>
        
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back button for Market Research flow */}
          <div className="mb-6">
            <Button
              variant="ghost"
              className="inline-flex items-center text-[#8186B4] hover:text-[#4600FF] hover:bg-[#CCCFFF]/20"
              onClick={() => setCurrentScreen("market-research")}
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to Market Research
            </Button>
          </div>
        
          <section className="mb-10">
            <h2 className="text-3xl font-bold gradient-heading mb-4">
              Request Labor Market Research Reports
            </h2>
            <p className="text-[#8186B4] max-w-3xl">
              Select the type of report you need to gain valuable insights into
              labor market trends, competitive analysis, and workforce strategies.
            </p>
          </section>

          <section className="mb-12">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Sample report type cards */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Workforce Reports</h3>
                <p className="text-[#8186B4] mb-4">Get insights about workforce trends and data.</p>
                <Button variant="outline">Select</Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Consulting Projects</h3>
                <p className="text-[#8186B4] mb-4">Get personalized consulting for your organization.</p>
                <Button variant="outline">Select</Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  };

  // Render the appropriate screen
  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen />;
      case "market-research":
        return <MarketResearchPage />;
      case "request-form":
        return <RequestFormPage />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      {renderScreen()}
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
