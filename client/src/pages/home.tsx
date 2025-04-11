import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ReportTypeCard from "@/components/report-type-card";
import WorkforceReports from "@/components/workforce-reports";
import ConsultingReports from "@/components/consulting-reports";
import ScheduleCall from "@/components/schedule-call";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

type Section = "selection" | "workforce" | "consulting" | "schedule";

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("selection");

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

              {/* Schedule Call Option */}
              <div className="mt-8 bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Calendar className="h-6 w-6 text-gray-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      Not sure which report fits your needs?
                    </h3>
                    <p className="mt-1 text-gray-500">
                      Book a call with a representative to discuss your specific requirements.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-3"
                      onClick={() => setActiveSection("schedule")}
                    >
                      Schedule a Consultation
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Workforce Reports Section */}
        {activeSection === "workforce" && (
          <WorkforceReports onBack={() => setActiveSection("selection")} />
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
