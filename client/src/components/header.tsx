import { Button } from "@/components/ui/button";
import { ClipboardList } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <ClipboardList className="h-8 w-8 text-primary" />
            <h1 className="ml-2 text-lg font-bold text-gray-900">
              Labor Market Research Portal
            </h1>
          </div>
          <div>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              Help
            </Button>
            <Button className="ml-3">Sign In</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
