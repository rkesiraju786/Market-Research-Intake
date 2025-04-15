import React, { useState } from 'react';
import { standardReportTypes, type ExtendedReport } from '@/lib/utils';

const blue = '#4285f4';
const gray = '#f1f1f1';
const gradientPrimary = 'linear-gradient(135deg, #4285f4, #0052cc)';

export default function HomeButtons() {
  // Sections: main selection, workforce reports, consulting, strategic sourcing detail, schedule
  const [activeSection, setActiveSection] = useState('selection');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // For hovering details in Workforce reports
  const [hoveredReport, setHoveredReport] = useState<string | null>(null);
  
  // For consulting questionnaire
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [consultingData, setConsultingData] = useState({
    problemStatement: '',
    primaryPurpose: '',
    talentType: '',
    deadline: '',
    deadlineDate: null as Date | null,
  });
  
  // Consulting project questions as specified in the prompt
  const consultingQuestions = [
    {
      question: "What problem are you trying to solve?",
      field: "problemStatement",
      type: "textarea"
    },
    {
      question: "What is the primary purpose of this study?",
      field: "primaryPurpose",
      type: "select",
      options: ["Attract / Retain talent", "Location Strategy / Competitor Analysis", "Employer Branding", "Diversity"]
    },
    {
      question: "What kind of talent are you looking for?",
      field: "talentType",
      type: "select",
      options: ["Professional Roles", "Front-line roles", "Senior Roles", "Highly niche Roles"]
    },
    {
      question: "Do you have a deadline for this consulting project?",
      field: "deadline",
      type: "select",
      options: ["Delivery in 4-6 weeks", "Expedited delivery (Have a hard deadline)"]
    }
  ];
  
  // Schedule call questions
  const scheduleQuestions = [
    "Please describe the business or talent need or challenge you are seeking to address (please share the context that's leading to this request vs the solution you're seeking).",
    "What type of support are you seeking? E.g., data, insights, consulting support?",
    "What are the key questions you would like us to address as part of that solution?",
    "What are the decisions/outcomes this will inform?",
    "Is there a timeline that we will need to meet when delivering our solution?"
  ];
  
  const handleConsultingInputChange = (field: string, value: string) => {
    setConsultingData({
      ...consultingData,
      [field]: value
    });
  };
  
  const nextQuestion = () => {
    if (currentQuestion < consultingQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Questionnaire completed, save data
      if (consultingData.deadline === "Expedited delivery (Have a hard deadline)") {
        // Show date picker for expedited delivery
        setActiveSection('consulting-deadline');
      } else {
        alert('Consulting questionnaire completed! Data: ' + JSON.stringify(consultingData));
        setActiveSection('consulting');
      }
    }
  };
  
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const handleWorkforceReportSelect = (reportId: string) => {
    if (reportId === "strategic-sourcing") {
      setSelectedReport(reportId);
      setActiveSection("strategic-sourcing-detail");
    } else {
      setSelectedReport(reportId);
      alert(`Selected report: ${reportId}`);
    }
  };
  
  const handleStrategicSourcingSubmit = (reportType: string, variant: string) => {
    setSelectedReport(reportType);
    setSelectedVariant(variant);
    alert(`Selected Strategic Sourcing ${variant} variant`);
    setActiveSection("workforce");
  };
  
  const handleConsultingSelect = (reportId: string) => {
    setSelectedReport(reportId);
    setActiveSection("consulting-questionnaire");
    setCurrentQuestion(0);
    setConsultingData({
      problemStatement: '',
      primaryPurpose: '',
      talentType: '',
      deadline: '',
      deadlineDate: null
    });
  };
  
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };
  
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    alert(`Appointment scheduled for ${selectedDate?.toDateString()} at ${time}`);
    setActiveSection('selection');
  };
  
  const handleDeadlineDateSelect = (date: Date) => {
    setConsultingData({
      ...consultingData,
      deadlineDate: date
    });
    alert(`Consulting project request submitted with deadline: ${date.toDateString()}`);
    setActiveSection('consulting');
  };
  
  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f9f9f9'
    }}>
      <h1 style={{
        fontSize: '32px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '24px',
        background: gradientPrimary,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        Labor Market Research Reports
      </h1>
      
      {/* Main Selection Screen */}
      {activeSection === 'selection' && (
        <div>
          <h2 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center', color: '#333' }}>
            Request Labor Market Research Reports
          </h2>
          
          <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666', maxWidth: '700px', margin: '0 auto' }}>
            Select the type of report you need to gain valuable insights into labor market trends, 
            competitive analysis, and workforce strategies.
          </p>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '25px',
            marginBottom: '40px'
          }}>
            <div style={{
              border: '1px solid #ddd',
              borderRadius: '12px',
              padding: '30px',
              backgroundColor: 'white',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}>
              <h3 style={{ fontSize: '22px', marginBottom: '15px', color: '#333' }}>Workforce Reports</h3>
              <p style={{ marginBottom: '20px', color: '#666', lineHeight: '1.6' }}>
                Standardized reports with comprehensive labor market data and analysis. 
                <br /><br />
                <strong>Delivery:</strong> Within 2 weeks
                <br />
                <strong>Cost Range:</strong> $X - $Y
                <br />
                <strong>Access:</strong> Self-service portal where you can view, download, and share reports.
              </p>
              <button 
                onClick={() => setActiveSection('workforce')}
                style={{
                  background: gradientPrimary,
                  color: 'white',
                  border: 'none',
                  padding: '14px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  width: '100%',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 10px rgba(66, 133, 244, 0.3)'
                }}
              >
                Select Workforce Reports
              </button>
            </div>
            
            <div style={{
              border: '1px solid #ddd',
              borderRadius: '12px',
              padding: '30px',
              backgroundColor: 'white',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}>
              <h3 style={{ fontSize: '22px', marginBottom: '15px', color: '#333' }}>Consulting Projects</h3>
              <p style={{ marginBottom: '20px', color: '#666', lineHeight: '1.6' }}>
                Custom-tailored research and analysis for complex business challenges.
                <br /><br />
                <strong>Delivery:</strong> 4-6 weeks (may be longer for complex projects)
                <br />
                <strong>Cost:</strong> Premium pricing based on complexity
                <br />
                <strong>Service:</strong> Includes consulting support for implementation
              </p>
              <button 
                onClick={() => setActiveSection('consulting')}
                style={{
                  background: gradientPrimary,
                  color: 'white',
                  border: 'none',
                  padding: '14px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  width: '100%',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 10px rgba(66, 133, 244, 0.3)'
                }}
              >
                Select Consulting Projects
              </button>
            </div>
          </div>
          
          {/* Schedule Call Option */}
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '12px',
            border: '1px solid #ddd',
            marginTop: '30px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'flex-start',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <div style={{
              backgroundColor: '#EBF2FF',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '15px',
              flexShrink: 0
            }}>
              <span style={{ fontSize: '20px', color: blue }}>📅</span>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#333' }}>
                Not sure which report fits your needs?
              </h3>
              <p style={{ marginBottom: '15px', color: '#666', lineHeight: '1.5' }}>
                Book a call with a representative to discuss your specific requirements.
              </p>
              <button 
                onClick={() => setActiveSection('schedule')}
                style={{
                  backgroundColor: 'transparent',
                  color: blue,
                  border: '1px solid ' + blue,
                  padding: '12px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                Schedule a Consultation
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Workforce Reports Section */}
      {activeSection === 'workforce' && (
        <div>
          <button 
            onClick={() => setActiveSection('selection')}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #ccc',
              padding: '10px 16px',
              borderRadius: '6px',
              marginBottom: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px'
            }}
          >
            <span style={{ marginRight: '5px' }}>←</span> Back to Selection
          </button>
          
          <h2 style={{ fontSize: '28px', marginBottom: '20px', color: '#333' }}>
            Workforce Report Types
          </h2>
          
          <p style={{ marginBottom: '30px', color: '#666', maxWidth: '800px' }}>
            These standardized reports provide comprehensive labor market data and analysis. 
            Delivery within 2 weeks at standard pricing. Hover over each report for more details.
          </p>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '25px'
          }}>
            {standardReportTypes.map(report => (
              <div 
                key={report.id}
                style={{ 
                  border: '1px solid #ddd',
                  borderRadius: '12px',
                  padding: '25px',
                  backgroundColor: 'white',
                  position: 'relative',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={() => setHoveredReport(report.id)}
                onMouseLeave={() => setHoveredReport(null)}
              >
                <h3 style={{ fontSize: '20px', marginBottom: '12px', color: '#333' }}>{report.title}</h3>
                <p style={{ marginBottom: '25px', color: '#666', lineHeight: '1.5' }}>{report.description}</p>
                
                {hoveredReport === report.id && report.hoverDetails && (
                  <div style={{ 
                    marginBottom: '20px',
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    border: '1px solid #eee',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                  }}>
                    <h4 style={{ fontSize: '16px', marginBottom: '10px', color: '#333' }}>What is this?</h4>
                    <p style={{ fontSize: '14px', marginBottom: '15px', color: '#555', lineHeight: '1.5' }}>
                      {report.hoverDetails.definition}
                    </p>
                    
                    <h4 style={{ fontSize: '16px', marginBottom: '10px', color: '#333' }}>Common Use Cases:</h4>
                    <ul style={{ 
                      paddingLeft: '20px',
                      marginBottom: '5px'
                    }}>
                      {report.hoverDetails.useCases.map((useCase, i) => (
                        <li key={i} style={{ 
                          fontSize: '14px',
                          marginBottom: '8px',
                          color: '#555',
                          lineHeight: '1.4'
                        }}>
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <button
                  onClick={() => handleWorkforceReportSelect(report.id)}
                  style={{
                    background: gradientPrimary,
                    color: 'white',
                    border: 'none',
                    padding: '12px 15px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    width: '100%',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 10px rgba(66, 133, 244, 0.2)'
                  }}
                >
                  Select This Report
                </button>
              </div>
            ))}
          </div>
          
          {/* Schedule Call Option - Appearing on workforce page too as per requirements */}
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '12px',
            border: '1px solid #ddd',
            marginTop: '40px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            maxWidth: '800px',
            margin: '40px auto'
          }}>
            <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#333', textAlign: 'center' }}>
              Need help deciding which report is right for you?
            </h3>
            <p style={{ marginBottom: '20px', color: '#666', textAlign: 'center' }}>
              Schedule a consultation with our research experts to discuss your specific needs.
            </p>
            <div style={{ textAlign: 'center' }}>
              <button 
                onClick={() => setActiveSection('schedule')}
                style={{
                  background: gradientPrimary,
                  color: 'white',
                  border: 'none',
                  padding: '12px 25px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 10px rgba(66, 133, 244, 0.3)'
                }}
              >
                Schedule a Consultation
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Strategic Sourcing Detail */}
      {activeSection === 'strategic-sourcing-detail' && (
        <div>
          <button 
            onClick={() => setActiveSection('workforce')}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #ccc',
              padding: '10px 16px',
              borderRadius: '6px',
              marginBottom: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px'
            }}
          >
            <span style={{ marginRight: '5px' }}>←</span> Back to Reports
          </button>
          
          <h2 style={{ fontSize: '28px', marginBottom: '15px', color: '#333' }}>
            Strategic Sourcing Report Options
          </h2>
          
          <p style={{ marginBottom: '30px', color: '#666', maxWidth: '800px' }}>
            Compare our Strategic Sourcing report options to find the one that best fits your needs.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
            gap: '30px',
            marginBottom: '40px'
          }}>
            <div style={{
              border: '1px solid #ddd',
              borderRadius: '12px',
              padding: '30px',
              backgroundColor: 'white',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}>
              <h3 style={{ fontSize: '24px', marginBottom: '15px', color: '#333' }}>Strategic Sourcing</h3>
              <p style={{ marginBottom: '20px', color: '#666', lineHeight: '1.6' }}>
                A foundational talent market analysis that provides key metrics on talent availability, competition, and costs.
              </p>
              
              <h4 style={{ fontSize: '18px', marginTop: '25px', marginBottom: '12px', color: '#444', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Benefits:</h4>
              <ul style={{ paddingLeft: '20px', marginBottom: '25px' }}>
                <li style={{ marginBottom: '8px', color: '#555' }}>Identify potential talent pools</li>
                <li style={{ marginBottom: '8px', color: '#555' }}>Understand talent supply vs. demand dynamics</li>
                <li style={{ marginBottom: '8px', color: '#555' }}>Make data-driven recruiting decisions</li>
              </ul>
              
              <h4 style={{ fontSize: '18px', marginBottom: '12px', color: '#444', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Use Cases:</h4>
              <ul style={{ paddingLeft: '20px', marginBottom: '25px' }}>
                <li style={{ marginBottom: '8px', color: '#555' }}>Planning recruitment campaigns</li>
                <li style={{ marginBottom: '8px', color: '#555' }}>Justifying budget allocations</li>
                <li style={{ marginBottom: '8px', color: '#555' }}>Identifying hiring challenges</li>
              </ul>
              
              <h4 style={{ fontSize: '18px', marginBottom: '12px', color: '#444', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Report Contents:</h4>
              <ul style={{ paddingLeft: '20px', marginBottom: '25px' }}>
                <li style={{ marginBottom: '8px', color: '#555' }}>Talent Supply</li>
                <li style={{ marginBottom: '8px', color: '#555' }}>Talent Demand</li>
                <li style={{ marginBottom: '8px', color: '#555' }}>Talent Supply-Demand Ratio</li>
                <li style={{ marginBottom: '8px', color: '#555' }}>Talent Cost (Median)</li>
                <li style={{ marginBottom: '8px', color: '#555' }}>Top Competitors Housing and Hiring Talent</li>
                <li style={{ marginBottom: '8px', color: '#555' }}>Top Titles</li>
                <li style={{ marginBottom: '8px', color: '#555' }}>Top Skills</li>
              </ul>
              
              <div style={{ display: 'flex', gap: '15px', marginTop: '25px' }}>
                <button
                  onClick={() => alert('Viewing example report')}
                  style={{
                    backgroundColor: 'white',
                    color: blue,
                    border: '1px solid ' + blue,
                    padding: '12px 0',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    width: '40%',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  View Example
                </button>
                
                <button
                  onClick={() => handleStrategicSourcingSubmit('strategic-sourcing', 'basic')}
                  style={{
                    background: gradientPrimary,
                    color: 'white',
                    border: 'none',
                    padding: '12px 0',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    width: '60%',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 10px rgba(66, 133, 244, 0.3)'
                  }}
                >
                  Select This Report
                </button>
              </div>
            </div>
            
            <div style={{
              border: '1px solid ' + blue,
              borderRadius: '12px',
              padding: '30px',
              backgroundColor: 'white',
              boxShadow: '0 4px 20px rgba(66, 133, 244, 0.15)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}>
              <h3 style={{ fontSize: '24px', marginBottom: '15px', color: '#333' }}>Strategic Sourcing Plus</h3>
              <p style={{ marginBottom: '20px', color: '#666', lineHeight: '1.6' }}>
                An advanced talent market analysis with expanded metrics and deeper insights into talent demographics and costs.
              </p>
              
              <h4 style={{ fontSize: '18px', marginTop: '25px', marginBottom: '12px', color: '#444', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Benefits:</h4>
              <ul style={{ paddingLeft: '20px', marginBottom: '25px' }}>
                <li style={{ marginBottom: '8px', color: '#555' }}><strong>All benefits of the basic version</strong></li>
                <li style={{ marginBottom: '8px', color: '#555' }}>More granular cost analysis</li>
                <li style={{ marginBottom: '8px', color: '#555' }}>Diversity insights for inclusive hiring</li>
                <li style={{ marginBottom: '8px', color: '#555' }}>Alternative location recommendations</li>
              </ul>
              
              <h4 style={{ fontSize: '18px', marginBottom: '12px', color: '#444', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Use Cases:</h4>
              <ul style={{ paddingLeft: '20px', marginBottom: '25px' }}>
                <li style={{ marginBottom: '8px', color: '#555' }}>DEI initiative planning</li>
                <li style={{ marginBottom: '8px', color: '#555' }}>Cross-market talent strategy</li>
                <li style={{ marginBottom: '8px', color: '#555' }}>Detailed compensation structuring</li>
                <li style={{ marginBottom: '8px', color: '#555' }}>Experience-based recruiting plans</li>
              </ul>
              
              <h4 style={{ fontSize: '18px', marginBottom: '12px', color: '#444', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>Report Contents:</h4>
              <ul style={{ paddingLeft: '20px', marginBottom: '25px' }}>
                <li style={{ marginBottom: '8px', color: '#555' }}><strong>Everything in Basic version, plus:</strong></li>
                <li style={{ marginBottom: '8px', color: '#555' }}>Alternate Location Identification</li>
                <li style={{ marginBottom: '8px', color: '#555' }}>Talent Supply by Experience</li>
                <li style={{ marginBottom: '8px', color: '#555' }}>Talent Cost by Percentile (25th, 50th, 90th)</li>
                <li style={{ marginBottom: '8px', color: '#555' }}>Talent Demand by Experience (TN covered countries only)</li>
                <li style={{ marginBottom: '8px', color: '#555' }}>Talent Supply by Industry</li>
                <li style={{ marginBottom: '8px', color: '#555' }}>Diversity</li>
              </ul>
              
              <div style={{ display: 'flex', gap: '15px', marginTop: '25px' }}>
                <button
                  onClick={() => alert('Viewing example report')}
                  style={{
                    backgroundColor: 'white',
                    color: blue,
                    border: '1px solid ' + blue,
                    padding: '12px 0',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    width: '40%',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  View Example
                </button>
                
                <button
                  onClick={() => handleStrategicSourcingSubmit('strategic-sourcing', 'plus')}
                  style={{
                    background: gradientPrimary,
                    color: 'white',
                    border: 'none',
                    padding: '12px 0',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    width: '60%',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 10px rgba(66, 133, 244, 0.3)'
                  }}
                >
                  Select This Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Consulting Reports Section */}
      {activeSection === 'consulting' && (
        <div>
          <button 
            onClick={() => setActiveSection('selection')}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #ccc',
              padding: '10px 16px',
              borderRadius: '6px',
              marginBottom: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px'
            }}
          >
            <span style={{ marginRight: '5px' }}>←</span> Back to Selection
          </button>
          
          <h2 style={{ fontSize: '28px', marginBottom: '15px', color: '#333' }}>
            Consulting Project Types
          </h2>
          
          <p style={{ marginBottom: '30px', color: '#666', maxWidth: '800px' }}>
            Custom tailored research takes 4-6 weeks on average and includes complex parameters 
            not included in standard reports. These projects often include consulting services 
            and are priced at a premium based on complexity.
          </p>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '25px'
          }}>
            <div style={{ 
              border: '1px solid #ddd',
              borderRadius: '12px',
              padding: '25px',
              backgroundColor: 'white',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}>
              <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#333' }}>Custom Research</h3>
              <p style={{ marginBottom: '20px', color: '#666', lineHeight: '1.6' }}>
                Tailored analysis for your specific business needs and challenges that don't fit 
                into standard report templates.
              </p>
              <button
                onClick={() => handleConsultingSelect('custom-research')}
                style={{
                  background: gradientPrimary,
                  color: 'white',
                  border: 'none',
                  padding: '12px 15px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  width: '100%',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 10px rgba(66, 133, 244, 0.3)'
                }}
              >
                Start Questionnaire
              </button>
            </div>
            
            <div style={{ 
              border: '1px solid #ddd',
              borderRadius: '12px',
              padding: '25px',
              backgroundColor: 'white',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}>
              <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#333' }}>Market Analysis</h3>
              <p style={{ marginBottom: '20px', color: '#666', lineHeight: '1.6' }}>
                Comprehensive evaluation of labor market conditions and trends with customized 
                focus areas based on your business objectives.
              </p>
              <button
                onClick={() => handleConsultingSelect('market-analysis')}
                style={{
                  background: gradientPrimary,
                  color: 'white',
                  border: 'none',
                  padding: '12px 15px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  width: '100%',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 10px rgba(66, 133, 244, 0.3)'
                }}
              >
                Start Questionnaire
              </button>
            </div>
            
            <div style={{ 
              border: '1px solid #ddd',
              borderRadius: '12px',
              padding: '25px',
              backgroundColor: 'white',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}>
              <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#333' }}>Competitive Intelligence</h3>
              <p style={{ marginBottom: '20px', color: '#666', lineHeight: '1.6' }}>
                In-depth insights into competitor workforce strategies, recruitment patterns, 
                and talent acquisition methods to gain competitive advantage.
              </p>
              <button
                onClick={() => handleConsultingSelect('competitive-intel')}
                style={{
                  background: gradientPrimary,
                  color: 'white',
                  border: 'none',
                  padding: '12px 15px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  width: '100%',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 10px rgba(66, 133, 244, 0.3)'
                }}
              >
                Start Questionnaire
              </button>
            </div>
          </div>
          
          {/* Schedule Call Option - Also on consulting page */}
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '12px',
            border: '1px solid #ddd',
            marginTop: '40px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            maxWidth: '800px',
            margin: '40px auto'
          }}>
            <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#333', textAlign: 'center' }}>
              Want to discuss your consulting needs in detail?
            </h3>
            <p style={{ marginBottom: '20px', color: '#666', textAlign: 'center' }}>
              Schedule a consultation with our research consultants to discuss your specific requirements.
            </p>
            <div style={{ textAlign: 'center' }}>
              <button 
                onClick={() => setActiveSection('schedule')}
                style={{
                  background: gradientPrimary,
                  color: 'white',
                  border: 'none',
                  padding: '12px 25px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 10px rgba(66, 133, 244, 0.3)'
                }}
              >
                Schedule a Consultation
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Consulting Questionnaire - AI-driven conversation */}
      {activeSection === 'consulting-questionnaire' && (
        <div>
          <button 
            onClick={() => setActiveSection('consulting')}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #ccc',
              padding: '10px 16px',
              borderRadius: '6px',
              marginBottom: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px'
            }}
          >
            <span style={{ marginRight: '5px' }}>←</span> Back to Consulting Projects
          </button>
          
          <h2 style={{ fontSize: '28px', marginBottom: '15px', color: '#333', textAlign: 'center' }}>
            Tell Us About Your Project
          </h2>
          
          <div style={{
            maxWidth: '700px',
            margin: '0 auto',
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.07)'
          }}>
            <div 
              style={{ 
                marginBottom: '30px',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                opacity: 1,
                transform: 'translateY(0)'
              }}
            >
              <div style={{
                display: 'flex',
                marginBottom: '15px',
              }}>
                <div style={{
                  backgroundColor: '#EBF2FF',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15px',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '20px', color: blue }}>💼</span>
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#333' }}>
                    {currentQuestion + 1}. {consultingQuestions[currentQuestion].question}
                  </h3>
                </div>
              </div>
              
              {consultingQuestions[currentQuestion].type === 'textarea' && (
                <textarea
                  value={consultingData[consultingQuestions[currentQuestion].field as keyof typeof consultingData] as string}
                  onChange={(e) => handleConsultingInputChange(consultingQuestions[currentQuestion].field, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '15px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    minHeight: '150px',
                    fontSize: '16px',
                    marginTop: '10px',
                    marginBottom: '10px'
                  }}
                  placeholder="Please provide a detailed description of the problem you're trying to solve..."
                />
              )}
              
              {consultingQuestions[currentQuestion].type === 'select' && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginTop: '10px',
                  marginBottom: '10px'
                }}>
                  <div style={{ marginBottom: '10px', color: '#666' }}>
                    Choose an option or <button 
                      onClick={() => setConsultingData({
                        ...consultingData,
                        [consultingQuestions[currentQuestion].field]: ''
                      })}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: blue,
                        cursor: 'pointer',
                        padding: 0,
                        textDecoration: 'underline',
                        fontSize: '14px'
                      }}
                    >type your own answer</button>
                  </div>
                  
                  {consultingQuestions[currentQuestion].options?.map((option, i) => (
                    <div 
                      key={i}
                      style={{
                        padding: '15px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        backgroundColor: 
                          consultingData[consultingQuestions[currentQuestion].field as keyof typeof consultingData] === option
                            ? '#EBF2FF'
                            : 'white',
                        borderColor:
                          consultingData[consultingQuestions[currentQuestion].field as keyof typeof consultingData] === option
                            ? blue
                            : '#ddd',
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => handleConsultingInputChange(consultingQuestions[currentQuestion].field, option)}
                    >
                      {option}
                    </div>
                  ))}
                  
                  {(!consultingData[consultingQuestions[currentQuestion].field as keyof typeof consultingData] ||
                   !consultingQuestions[currentQuestion].options?.includes(
                      consultingData[consultingQuestions[currentQuestion].field as keyof typeof consultingData] as string
                   )) && (
                    <textarea
                      value={consultingData[consultingQuestions[currentQuestion].field as keyof typeof consultingData] as string}
                      onChange={(e) => handleConsultingInputChange(consultingQuestions[currentQuestion].field, e.target.value)}
                      style={{
                        width: '100%',
                        padding: '15px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        minHeight: '100px',
                        fontSize: '16px'
                      }}
                      placeholder="Or type your own answer here..."
                    />
                  )}
                </div>
              )}
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '30px',
              borderTop: '1px solid #eee',
              paddingTop: '20px'
            }}>
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                style={{
                  backgroundColor: currentQuestion === 0 ? '#f1f1f1' : 'white',
                  color: currentQuestion === 0 ? '#999' : '#333',
                  border: '1px solid #ccc',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
                  fontSize: '16px'
                }}
              >
                Previous
              </button>
              
              <button
                onClick={nextQuestion}
                style={{
                  background: gradientPrimary,
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 10px rgba(66, 133, 244, 0.3)'
                }}
              >
                {currentQuestion < consultingQuestions.length - 1 ? 'Next' : 'Submit'}
              </button>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '30px',
            }}>
              <button
                onClick={() => setActiveSection('schedule')}
                style={{
                  backgroundColor: 'transparent',
                  color: blue,
                  border: '1px solid ' + blue,
                  padding: '10px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Prefer to discuss over a call? Schedule a consultation
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Consulting Deadline Picker */}
      {activeSection === 'consulting-deadline' && (
        <div>
          <button 
            onClick={() => setActiveSection('consulting-questionnaire')}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #ccc',
              padding: '10px 16px',
              borderRadius: '6px',
              marginBottom: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px'
            }}
          >
            <span style={{ marginRight: '5px' }}>←</span> Back to Questionnaire
          </button>
          
          <h2 style={{ fontSize: '28px', marginBottom: '15px', color: '#333', textAlign: 'center' }}>
            Select Your Deadline
          </h2>
          
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.07)'
          }}>
            <p style={{ marginBottom: '25px', color: '#666', textAlign: 'center' }}>
              Please select a deadline date for your expedited consulting project. 
              <br /><br />
              <strong>Note:</strong> There will be an additional fee for expedited delivery.
            </p>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '15px',
              marginBottom: '30px'
            }}>
              {[...Array(12)].map((_, i) => {
                const date = new Date();
                date.setDate(date.getDate() + i + 1);
                return (
                  <div
                    key={i}
                    style={{
                      padding: '15px 10px',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      backgroundColor: 
                        selectedDate && selectedDate.toDateString() === date.toDateString()
                          ? '#EBF2FF'
                          : 'white',
                      borderColor:
                        selectedDate && selectedDate.toDateString() === date.toDateString()
                          ? blue
                          : '#ccc',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => handleDateSelect(date)}
                  >
                    <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                      {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <div style={{ fontSize: '12px', color: '#777', marginTop: '5px' }}>
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button
                onClick={() => selectedDate && handleDeadlineDateSelect(selectedDate)}
                disabled={!selectedDate}
                style={{
                  background: selectedDate ? gradientPrimary : '#f1f1f1',
                  color: selectedDate ? 'white' : '#999',
                  border: 'none',
                  padding: '12px 30px',
                  borderRadius: '6px',
                  cursor: selectedDate ? 'pointer' : 'not-allowed',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  boxShadow: selectedDate ? '0 4px 10px rgba(66, 133, 244, 0.3)' : 'none'
                }}
              >
                Confirm Deadline
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Schedule Call Section */}
      {activeSection === 'schedule' && (
        <div>
          <button 
            onClick={() => setActiveSection('selection')}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #ccc',
              padding: '10px 16px',
              borderRadius: '6px',
              marginBottom: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px'
            }}
          >
            <span style={{ marginRight: '5px' }}>←</span> Back to Selection
          </button>
          
          <h2 style={{ fontSize: '28px', marginBottom: '15px', color: '#333', textAlign: 'center' }}>
            Schedule a Consultation
          </h2>
          
          <div style={{ 
            maxWidth: '800px',
            margin: '0 auto 40px',
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.07)'
          }}>
            <h3 style={{ fontSize: '20px', marginBottom: '20px', color: '#333' }}>
              Tell us about your needs
            </h3>
            
            {scheduleQuestions.map((question, index) => (
              <div key={index} style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontSize: '16px', fontWeight: 'bold', color: '#444' }}>
                  {index + 1}. {question}
                </label>
                <textarea
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    minHeight: '100px',
                    fontSize: '16px'
                  }}
                  placeholder="Your answer..."
                />
              </div>
            ))}
          </div>
          
          <div style={{ 
            maxWidth: '800px',
            margin: '0 auto',
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.07)'
          }}>
            <h3 style={{ fontSize: '22px', marginBottom: '25px', color: '#333', textAlign: 'center' }}>
              Select a Date and Time for Your Consultation
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '30px'
            }}>
              <div>
                <h4 style={{ marginBottom: '15px', fontSize: '18px', color: '#444' }}>Available Dates</h4>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '10px'
                }}>
                  {[...Array(9)].map((_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() + i + 1);
                    return (
                      <div
                        key={i}
                        style={{
                          padding: '12px 10px',
                          border: '1px solid #ccc',
                          borderRadius: '8px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          backgroundColor: 
                            selectedDate && selectedDate.toDateString() === date.toDateString()
                              ? '#EBF2FF'
                              : 'white',
                          borderColor:
                            selectedDate && selectedDate.toDateString() === date.toDateString()
                              ? blue
                              : '#ccc',
                          transition: 'all 0.2s ease'
                        }}
                        onClick={() => handleDateSelect(date)}
                      >
                        <div style={{ fontWeight: 'bold' }}>
                          {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <div style={{ fontSize: '12px', color: '#777', marginTop: '5px' }}>
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '15px', fontSize: '18px', color: '#444' }}>Available Times</h4>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '10px'
                }}>
                  {selectedDate ? (
                    ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"].map((time, i) => (
                      <div
                        key={i}
                        style={{
                          padding: '15px',
                          border: '1px solid #ccc',
                          borderRadius: '8px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          backgroundColor: selectedTime === time ? '#EBF2FF' : 'white',
                          borderColor: selectedTime === time ? blue : '#ccc',
                          transition: 'all 0.2s ease'
                        }}
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </div>
                    ))
                  ) : (
                    <p style={{ gridColumn: '1 / span 2', color: '#666', padding: '20px 0', textAlign: 'center' }}>
                      Please select a date first to view available time slots
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <button
                onClick={() => selectedDate && selectedTime ? handleTimeSelect(selectedTime) : null}
                disabled={!selectedDate || !selectedTime}
                style={{
                  background: (selectedDate && selectedTime) ? gradientPrimary : '#f1f1f1',
                  color: (selectedDate && selectedTime) ? 'white' : '#999',
                  border: 'none',
                  padding: '12px 30px',
                  borderRadius: '6px',
                  cursor: (selectedDate && selectedTime) ? 'pointer' : 'not-allowed',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  boxShadow: (selectedDate && selectedTime) ? '0 4px 10px rgba(66, 133, 244, 0.3)' : 'none'
                }}
              >
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}