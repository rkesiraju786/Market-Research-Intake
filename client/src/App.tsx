import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import TalentNeuronHome from "@/components/talent-neuron-home";
import MarketResearchLanding from "@/components/market-research-landing";

function TalentNeuronHomeRoute() {
  const [_, setLocation] = useLocation();
  
  return (
    <TalentNeuronHome 
      onSelectMarketResearch={() => setLocation("/market-research")} 
    />
  );
}

function MarketResearchRoute() {
  const [_, setLocation] = useLocation();
  
  return (
    <MarketResearchLanding 
      onGetStarted={() => setLocation("/market-research/request")} 
    />
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={TalentNeuronHomeRoute} />
      <Route path="/market-research" component={MarketResearchRoute} />
      <Route path="/market-research/request" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
