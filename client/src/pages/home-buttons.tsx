import React, { useState } from 'react';
import { standardReportTypes, type ExtendedReport } from '@/lib/utils';

const blue = '#4285f4';
const gray = '#f1f1f1';

export default function HomeButtons() {
  // Sections: main selection, workforce reports, consulting, strategic sourcing detail, schedule
  const [activeSection, setActiveSection] = useState('selection');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // For consulting questionnaire
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [consultingData, setConsultingData] = useState({
    problemStatement: '',
    primaryPurpose: '',
    talentType: '',
    deadline: '',
    deadlineDate: null as Date | null,
  });
  
  // Consulting project questions
  const consultingQuestions = [
    {
      question: "What problem are you trying to solve?",
      field: "problemStatement",
      type: "textarea"
    },
    {
      question: "What is the primary purpose of this project?",
      field: "primaryPurpose",
      type: "select",
      options: ["Strategy development", "Competitive analysis", "Cost reduction", "Market entry", "Other"]
    },
    {
      question: "What type of talent are you focusing on?",
      field: "talentType",
      type: "select",
      options: ["Technical", "Executive", "Sales", "Operations", "All types"]
    },
    {
      question: "When do you need this completed?",
      field: "deadline",
      type: "select",
      options: ["Within 2 weeks (rush)", "Within 1 month", "Within 3 months", "No specific deadline"]
    }
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
      alert('Consulting questionnaire completed! Data: ' + JSON.stringify(consultingData));
      setActiveSection('consulting');
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
  };
  
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };
  
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    alert(`Appointment scheduled for ${selectedDate?.toDateString()} at ${time}`);
    setActiveSection('selection');
  };
  
  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
    }}>
      <h1 style={{
        fontSize: '28px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '24px',
        color: '#333'
      }}>
        Labor Market Research Reports
      </h1>
      
      {/* Main Selection Screen */}
      {activeSection === 'selection' && (
        <div>
          <h2 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>
            Select Report Type
          </h2>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '24px',
              backgroundColor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Workforce Reports</h3>
              <p style={{ marginBottom: '20px', color: '#666' }}>
                Standardized reports with comprehensive labor market data and analysis. 
                Delivery within 2 weeks at standard pricing.
              </p>
              <button 
                onClick={() => setActiveSection('workforce')}
                style={{
                  backgroundColor: blue,
                  color: 'white',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  width: '100%',
                  fontSize: '16px'
                }}
              >
                Select Workforce Reports
              </button>
            </div>
            
            <div style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '24px',
              backgroundColor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Consulting Projects</h3>
              <p style={{ marginBottom: '20px', color: '#666' }}>
                Custom-tailored research and analysis for complex business challenges. 
                Delivery within 4-6 weeks with premium pricing.
              </p>
              <button 
                onClick={() => setActiveSection('consulting')}
                style={{
                  backgroundColor: blue,
                  color: 'white',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  width: '100%',
                  fontSize: '16px'
                }}
              >
                Select Consulting Projects
              </button>
            </div>
          </div>
          
          {/* Schedule Call Option */}
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            marginTop: '30px'
          }}>
            <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>
              Not sure which report fits your needs?
            </h3>
            <p style={{ marginBottom: '15px', color: '#666' }}>
              Book a call with a representative to discuss your specific requirements.
            </p>
            <button 
              onClick={() => setActiveSection('schedule')}
              style={{
                backgroundColor: 'transparent',
                color: '#333',
                border: '1px solid #ccc',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Schedule a Consultation
            </button>
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
              padding: '8px 16px',
              borderRadius: '4px',
              marginBottom: '20px',
              cursor: 'pointer'
            }}
          >
            ← Back to Selection
          </button>
          
          <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>
            Workforce Report Types
          </h2>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '20px'
          }}>
            {standardReportTypes.map(report => (
              <div 
                key={report.id}
                style={{ 
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '20px',
                  backgroundColor: 'white',
                  position: 'relative',
                  boxShadow: selectedReport === report.id ? '0 0 0 2px #4285f4' : 'none'
                }}
              >
                <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{report.title}</h3>
                <p style={{ marginBottom: '20px', color: '#666' }}>{report.description}</p>
                
                {report.hoverDetails && (
                  <div style={{ 
                    marginBottom: '15px',
                    padding: '15px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '6px',
                    border: '1px solid #eee'
                  }}>
                    <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>What is this?</h4>
                    <p style={{ fontSize: '14px', marginBottom: '10px' }}>{report.hoverDetails.definition}</p>
                    
                    <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>Common Use Cases:</h4>
                    <ul style={{ 
                      paddingLeft: '20px',
                      marginBottom: '5px'
                    }}>
                      {report.hoverDetails.useCases.map((useCase, i) => (
                        <li key={i} style={{ 
                          fontSize: '14px',
                          marginBottom: '5px'
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
                    backgroundColor: blue,
                    color: 'white',
                    border: 'none',
                    padding: '10px 15px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  Select Report
                </button>
              </div>
            ))}
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
              padding: '8px 16px',
              borderRadius: '4px',
              marginBottom: '20px',
              cursor: 'pointer'
            }}
          >
            ← Back to Reports
          </button>
          
          <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>
            Strategic Sourcing Report Options
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '30px',
            marginBottom: '40px'
          }}>
            <div style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '24px',
              backgroundColor: 'white',
              boxShadow: selectedVariant === 'basic' ? '0 0 0 2px #4285f4' : 'none'
            }}>
              <h3 style={{ fontSize: '20px', marginBottom: '15px' }}>Strategic Sourcing</h3>
              <p style={{ marginBottom: '15px', color: '#666' }}>
                A foundational talent market analysis that provides key metrics on talent availability, competition, and costs.
              </p>
              
              <h4 style={{ fontSize: '16px', marginTop: '20px', marginBottom: '10px' }}>Benefits:</h4>
              <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
                <li>Identify potential talent pools</li>
                <li>Understand talent supply vs. demand dynamics</li>
                <li>Make data-driven recruiting decisions</li>
              </ul>
              
              <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>Report Contents:</h4>
              <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
                <li>Talent Supply</li>
                <li>Talent Demand</li>
                <li>Talent Supply-Demand Ratio</li>
                <li>Talent Cost (Median)</li>
                <li>Top Competitors Housing and Hiring Talent</li>
                <li>Top Titles</li>
                <li>Top Skills</li>
              </ul>
              
              <button
                onClick={() => handleStrategicSourcingSubmit('strategic-sourcing', 'basic')}
                style={{
                  backgroundColor: blue,
                  color: 'white',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  width: '100%',
                  fontSize: '16px',
                  marginTop: '15px'
                }}
              >
                Select Basic Version
              </button>
            </div>
            
            <div style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '24px',
              backgroundColor: 'white',
              boxShadow: selectedVariant === 'plus' ? '0 0 0 2px #4285f4' : 'none'
            }}>
              <h3 style={{ fontSize: '20px', marginBottom: '15px' }}>Strategic Sourcing Plus</h3>
              <p style={{ marginBottom: '15px', color: '#666' }}>
                An advanced talent market analysis with expanded metrics and deeper insights into talent demographics and costs.
              </p>
              
              <h4 style={{ fontSize: '16px', marginTop: '20px', marginBottom: '10px' }}>Benefits:</h4>
              <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
                <li>All benefits of the basic version</li>
                <li>More granular cost analysis</li>
                <li>Diversity insights for inclusive hiring</li>
                <li>Alternative location recommendations</li>
              </ul>
              
              <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>Report Contents:</h4>
              <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
                <li>Everything in Basic version</li>
                <li>Alternate Location Identification</li>
                <li>Talent Supply by Experience</li>
                <li>Talent Cost by Percentile (25th, 50th, 90th)</li>
                <li>Talent Demand by Experience</li>
                <li>Talent Supply by Industry</li>
                <li>Diversity</li>
              </ul>
              
              <button
                onClick={() => handleStrategicSourcingSubmit('strategic-sourcing', 'plus')}
                style={{
                  backgroundColor: blue,
                  color: 'white',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  width: '100%',
                  fontSize: '16px',
                  marginTop: '15px'
                }}
              >
                Select Plus Version
              </button>
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
              padding: '8px 16px',
              borderRadius: '4px',
              marginBottom: '20px',
              cursor: 'pointer'
            }}
          >
            ← Back to Selection
          </button>
          
          <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>
            Consulting Project Types
          </h2>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '20px'
          }}>
            <div style={{ 
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: 'white'
            }}>
              <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Custom Research</h3>
              <p style={{ marginBottom: '20px', color: '#666' }}>
                Tailored analysis for your specific business needs and challenges.
              </p>
              <button
                onClick={() => handleConsultingSelect('custom-research')}
                style={{
                  backgroundColor: blue,
                  color: 'white',
                  border: 'none',
                  padding: '10px 15px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Select Project
              </button>
            </div>
            
            <div style={{ 
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: 'white'
            }}>
              <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Market Analysis</h3>
              <p style={{ marginBottom: '20px', color: '#666' }}>
                Comprehensive evaluation of labor market conditions and trends.
              </p>
              <button
                onClick={() => handleConsultingSelect('market-analysis')}
                style={{
                  backgroundColor: blue,
                  color: 'white',
                  border: 'none',
                  padding: '10px 15px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Select Project
              </button>
            </div>
            
            <div style={{ 
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: 'white'
            }}>
              <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Competitive Intelligence</h3>
              <p style={{ marginBottom: '20px', color: '#666' }}>
                Insights into competitor workforce strategies and talent acquisition.
              </p>
              <button
                onClick={() => handleConsultingSelect('competitive-intel')}
                style={{
                  backgroundColor: blue,
                  color: 'white',
                  border: 'none',
                  padding: '10px 15px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Select Project
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Consulting Questionnaire */}
      {activeSection === 'consulting-questionnaire' && (
        <div>
          <button 
            onClick={() => setActiveSection('consulting')}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #ccc',
              padding: '8px 16px',
              borderRadius: '4px',
              marginBottom: '20px',
              cursor: 'pointer'
            }}
          >
            ← Back to Consulting Projects
          </button>
          
          <h2 style={{ fontSize: '24px', marginBottom: '30px' }}>
            Project Requirements Questionnaire
          </h2>
          
          <div style={{
            maxWidth: '700px',
            margin: '0 auto',
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>
                {currentQuestion + 1}. {consultingQuestions[currentQuestion].question}
              </h3>
              
              {consultingQuestions[currentQuestion].type === 'textarea' && (
                <textarea
                  value={consultingData[consultingQuestions[currentQuestion].field as keyof typeof consultingData] as string}
                  onChange={(e) => handleConsultingInputChange(consultingQuestions[currentQuestion].field, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    minHeight: '120px',
                    fontSize: '16px'
                  }}
                  placeholder="Please provide a detailed description..."
                />
              )}
              
              {consultingQuestions[currentQuestion].type === 'select' && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  {consultingQuestions[currentQuestion].options?.map((option, i) => (
                    <div 
                      key={i}
                      style={{
                        padding: '12px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        backgroundColor: 
                          consultingData[consultingQuestions[currentQuestion].field as keyof typeof consultingData] === option
                            ? '#e6f0ff'
                            : 'white',
                        borderColor:
                          consultingData[consultingQuestions[currentQuestion].field as keyof typeof consultingData] === option
                            ? '#4285f4'
                            : '#ccc'
                      }}
                      onClick={() => handleConsultingInputChange(consultingQuestions[currentQuestion].field, option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '30px'
            }}>
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                style={{
                  backgroundColor: currentQuestion === 0 ? '#f1f1f1' : 'white',
                  color: currentQuestion === 0 ? '#999' : '#333',
                  border: '1px solid #ccc',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                Previous
              </button>
              
              <button
                onClick={nextQuestion}
                style={{
                  backgroundColor: blue,
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {currentQuestion < consultingQuestions.length - 1 ? 'Next' : 'Submit'}
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
              padding: '8px 16px',
              borderRadius: '4px',
              marginBottom: '20px',
              cursor: 'pointer'
            }}
          >
            ← Back to Selection
          </button>
          
          <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>
            Schedule a Consultation
          </h2>
          
          <div style={{ 
            maxWidth: '800px',
            margin: '0 auto',
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>
              Select a Date and Time
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px'
            }}>
              <div>
                <h4 style={{ marginBottom: '15px' }}>Available Dates</h4>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '10px'
                }}>
                  {[...Array(6)].map((_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() + i + 1);
                    return (
                      <div
                        key={i}
                        style={{
                          padding: '10px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          backgroundColor: 
                            selectedDate && selectedDate.toDateString() === date.toDateString()
                              ? '#e6f0ff'
                              : 'white',
                          borderColor:
                            selectedDate && selectedDate.toDateString() === date.toDateString()
                              ? '#4285f4'
                              : '#ccc'
                        }}
                        onClick={() => handleDateSelect(date)}
                      >
                        {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '15px' }}>Available Times</h4>
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
                          padding: '10px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          backgroundColor: selectedTime === time ? '#e6f0ff' : 'white',
                          borderColor: selectedTime === time ? '#4285f4' : '#ccc'
                        }}
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </div>
                    ))
                  ) : (
                    <p style={{ gridColumn: '1 / span 2', color: '#666' }}>Please select a date first</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}