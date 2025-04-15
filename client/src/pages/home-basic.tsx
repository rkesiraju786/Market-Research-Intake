import React, { useState } from 'react';
import { Link } from 'wouter';

export default function HomeBasic() {
  const [activeSection, setActiveSection] = useState<string>('main');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  // Report types data
  const workforceReports = [
    { id: 'compensation', title: 'Compensation & Benefits', description: 'Analyze compensation trends and benefits packages for specific roles.' },
    { id: 'talent-market', title: 'Talent Market Analysis', description: 'Review talent availability, skills gap analysis, and workforce trends.' },
    { id: 'strategic-sourcing', title: 'Strategic Sourcing', description: 'Identify optimal locations for expanding your workforce.' }
  ];

  const consultingReports = [
    { id: 'custom-research', title: 'Custom Research', description: 'Tailored analysis for your specific business needs.' },
    { id: 'market-analysis', title: 'Market Analysis', description: 'Comprehensive evaluation of labor market conditions.' },
    { id: 'competitive-intel', title: 'Competitive Intelligence', description: 'Insights into competitor workforce strategies.' }
  ];

  const handleSelectReportType = (type: string) => {
    setActiveSection(type);
  };

  const handleBack = () => {
    setActiveSection('main');
    setSelectedReport(null);
  };

  const handleSelectReport = (id: string) => {
    setSelectedReport(id);
    alert(`Selected report: ${id}`);
  };

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '28px', marginBottom: '24px', textAlign: 'center' }}>
        Labor Market Research Reports
      </h1>

      {/* Main Section */}
      {activeSection === 'main' && (
        <div>
          <h2 style={{ fontSize: '22px', marginBottom: '20px', textAlign: 'center' }}>
            Select Report Type
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
            gap: '20px',
            marginTop: '20px'
          }}>
            <div style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px',
              padding: '24px',
              backgroundColor: 'white'
            }}>
              <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Workforce Reports</h3>
              <p style={{ marginBottom: '20px', color: '#555' }}>
                Standardized reports with comprehensive labor market data and analysis.
              </p>
              <button
                onClick={() => handleSelectReportType('workforce')}
                style={{
                  backgroundColor: '#4a90e2',
                  color: 'white',
                  border: 'none',
                  padding: '10px 15px',
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
              backgroundColor: 'white'
            }}>
              <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Consulting Reports</h3>
              <p style={{ marginBottom: '20px', color: '#555' }}>
                Custom-tailored research and analysis for complex business challenges.
              </p>
              <button
                onClick={() => handleSelectReportType('consulting')}
                style={{
                  backgroundColor: '#4a90e2',
                  color: 'white',
                  border: 'none',
                  padding: '10px 15px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  width: '100%',
                  fontSize: '16px'
                }}
              >
                Select Consulting Reports
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Workforce Reports Section */}
      {activeSection === 'workforce' && (
        <div>
          <button 
            onClick={handleBack}
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
          
          <h2 style={{ fontSize: '22px', marginBottom: '20px' }}>
            Workforce Report Types
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '20px'
          }}>
            {workforceReports.map(report => (
              <div 
                key={report.id}
                style={{ 
                  border: '1px solid #ddd', 
                  borderRadius: '8px',
                  padding: '20px',
                  backgroundColor: 'white'
                }}
              >
                <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{report.title}</h3>
                <p style={{ marginBottom: '20px', color: '#555' }}>{report.description}</p>
                <button
                  onClick={() => handleSelectReport(report.id)}
                  style={{
                    backgroundColor: '#4a90e2',
                    color: 'white',
                    border: 'none',
                    padding: '10px 15px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  Select
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Consulting Reports Section */}
      {activeSection === 'consulting' && (
        <div>
          <button 
            onClick={handleBack}
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
          
          <h2 style={{ fontSize: '22px', marginBottom: '20px' }}>
            Consulting Report Types
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '20px'
          }}>
            {consultingReports.map(report => (
              <div 
                key={report.id}
                style={{ 
                  border: '1px solid #ddd', 
                  borderRadius: '8px',
                  padding: '20px',
                  backgroundColor: 'white'
                }}
              >
                <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{report.title}</h3>
                <p style={{ marginBottom: '20px', color: '#555' }}>{report.description}</p>
                <button
                  onClick={() => handleSelectReport(report.id)}
                  style={{
                    backgroundColor: '#4a90e2',
                    color: 'white',
                    border: 'none',
                    padding: '10px 15px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  Select
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}