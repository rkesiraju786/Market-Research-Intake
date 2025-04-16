import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import TalentNeuronHome from "@/components/talent-neuron-home";
import MarketResearchLanding from "@/components/market-research-landing";

type AppScreen = "talent-home" | "market-research" | "request-form";

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("talent-home");
  
  const renderScreen = () => {
    switch (currentScreen) {
      case "talent-home":
        return (
          <TalentNeuronHome 
            onSelectMarketResearch={() => setCurrentScreen("market-research")} 
          />
        );
      case "market-research":
        return (
          <MarketResearchLanding 
            onGetStarted={() => setCurrentScreen("request-form")} 
          />
        );
      case "request-form":
        return (
          <Home 
            onBackToMarketResearch={() => setCurrentScreen("market-research")}
          />
        );
      default:
        return (
          <TalentNeuronHome 
            onSelectMarketResearch={() => setCurrentScreen("market-research")} 
          />
        );
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
