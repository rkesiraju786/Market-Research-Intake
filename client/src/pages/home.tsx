import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ReportTypeCard from "@/components/report-type-card";
import WorkforceReports from "@/components/workforce-reports";
import ConsultingReports from "@/components/consulting-reports";
import ScheduleCall from "@/components/schedule-call";
import StrategicSourcingDetail from "@/components/strategic-sourcing-detail";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

type Section = "selection" | "workforce" | "consulting" | "schedule" | "strategic-sourcing-detail";

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("selection");
  const [selectedReportType, setSelectedReportType] = useState<string | null>(null);
  const [selectedReportVariant, setSelectedReportVariant] = useState<string | null>(null);

  const handleWorkforceReportSelect = (reportId: string) => {
    if (reportId === "strategic-sourcing") {
      setActiveSection("strategic-sourcing-detail");
    } else {
      // For other reports, just set the selected report type
      setSelectedReportType(reportId);
    }
  };

  const handleStrategicSourcingSubmit = (reportType: string, variant: string) => {
    // Set the selected report type and variant, then go back to the workforce reports page
    setSelectedReportType(reportType);
    setSelectedReportVariant(variant);
    setActiveSection("workforce");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Intro Section */}
        {activeSection === "selection" && (
          <>
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Request Labor Market Research Reports
              </h2>
              <p className="text-gray-600 max-w-3xl">
                Select the type of report you need to gain valuable insights into
                labor market trends, competitive analysis, and workforce strategies.
              </p>
            </section>

            {/* Selection Section */}
            <section className="mb-12">
              <div className="grid md:grid-cols-2 gap-6">
                <ReportTypeCard
                  type="workforce"
                  onClick={() => setActiveSection("workforce")}
                />
                <ReportTypeCard
                  type="consulting"
                  onClick={() => setActiveSection("consulting")}
                />
              </div>

              <div className="mt-8">
                <Button 
                  onClick={() => setActiveSection("schedule")}
                  className="flex items-center gap-2 bg-[#4600FF] hover:bg-[#4600FF]/90 text-white"
                >
                  <Calendar className="h-4 w-4" />
                  Schedule a Consultation
                </Button>
              </div>
            </section>
          </>
        )}

        {/* Workforce Reports Section */}
        {activeSection === "workforce" && (
          <WorkforceReports 
            onBack={() => setActiveSection("selection")} 
            onReportSelect={handleWorkforceReportSelect}
            selectedReport={selectedReportType}
            selectedVariant={selectedReportVariant}
          />
        )}

        {/* Strategic Sourcing Detail Section */}
        {activeSection === "strategic-sourcing-detail" && (
          <StrategicSourcingDetail 
            onBack={() => setActiveSection("workforce")}
            onSubmit={handleStrategicSourcingSubmit}
          />
        )}

        {/* Consulting Reports Section */}
        {activeSection === "consulting" && (
          <ConsultingReports onBack={() => setActiveSection("selection")} />
        )}

        {/* Schedule Call Section */}
        {activeSection === "schedule" && (
          <ScheduleCall onBack={() => setActiveSection("selection")} />
        )}
      </main>
      <Footer />
    </div>
  );
}
