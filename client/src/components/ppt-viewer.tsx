import React, { useEffect, useState } from 'react';
import { X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { AnimatedContainer } from '@/components/ui/animated-container';

interface PPTViewerProps {
  isOpen: boolean;
  onClose: () => void;
  variant: string;
}

export default function PPTViewer({ isOpen, onClose, variant }: PPTViewerProps) {
  const [loading, setLoading] = useState(true);
  
  // In a real implementation, you would use a PowerPoint viewing library
  // For this demo, we'll show a message that it would display the PowerPoint
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="max-w-5xl w-full h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-4 border-b flex flex-row justify-between items-center">
          <DialogTitle className="text-lg">
            {variant === "basic" ? "Strategic Sourcing" : "Strategic Sourcing Plus"} Example
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto p-0 relative">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Spinner size="lg" />
            </div>
          ) : (
            <AnimatedContainer animation="fadeIn" className="h-full">
              <div className="h-full flex flex-col items-center justify-center p-6 bg-gray-50">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full">
                  <div className="flex flex-col items-center mb-6">
                    <FileText className="h-16 w-16 text-primary-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Strategic Sourcing Analysis</h3>
                    <p className="text-gray-500">
                      {variant === "basic" ? "Strategic Sourcing" : "Strategic Sourcing Plus"} Example
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-6">
                    <h4 className="font-medium mb-2">Example Presentation Preview</h4>
                    <p className="text-sm text-gray-600">
                      This is a simulated PowerPoint presentation viewer. In a production environment, 
                      this would display the actual PowerPoint slides from "Strategic Sourcing Analysis Workforce Plus Updated.pptx".
                    </p>
                  </div>

                  {/* Simulated slide */}
                  <div className="aspect-[16/9] border border-gray-300 rounded-lg mb-6 bg-white flex items-center justify-center p-8">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold mb-4 text-primary-700">
                        {variant === "basic" ? "Strategic Sourcing Analysis" : "Strategic Sourcing Analysis Plus"}
                      </h3>
                      <p className="mb-4 text-lg">Comprehensive Talent Market Insights</p>
                      <div className="w-20 h-1 bg-primary-500 mx-auto mb-4"></div>
                      <p className="italic text-gray-500">Slide 1 of 24</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      File: <span className="font-medium">Strategic Sourcing Analysis Workforce Plus Updated.pptx</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Previous
                      </Button>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedContainer>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}