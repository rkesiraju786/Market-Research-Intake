import { Button } from "@/components/ui/button";
import tnLogo from "@assets/TN.png";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img 
                src={tnLogo} 
                alt="TalentNeuron Logo" 
                className="h-12" 
              />
            </a>
          </div>
          <div>
            <Button variant="ghost" className="text-[#8186B4] hover:text-[#4600FF] hover:bg-[#CCCFFF]/20">
              Help
            </Button>
            <Button className="ml-3 bg-[#4600FF] hover:bg-[#4600FF]/90 text-white">Log Out</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
