import React, { useState } from 'react';

export default function BasicUI() {
  const [step, setStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const Steps = [
    {
      id: 'main',
      title: 'Select Report Type',
      options: [
        { id: 'workforce', label: 'Workforce Reports' },
        { id: 'consulting', label: 'Consulting Reports' }
      ]
    },
    {
      id: 'workforce',
      title: 'Workforce Report Types',
      options: [
        { id: 'compensation', label: 'Compensation & Benefits' },
        { id: 'talent-market', label: 'Talent Market Analysis' },
        { id: 'strategic-sourcing', label: 'Strategic Sourcing' }
      ],
      backLabel: 'Back to Selection'
    },
    {
      id: 'consulting',
      title: 'Consulting Project Types',
      options: [
        { id: 'custom-research', label: 'Custom Research' },
        { id: 'market-analysis', label: 'Market Analysis' },
        { id: 'competitive-intel', label: 'Competitive Intelligence' }
      ],
      backLabel: 'Back to Selection'
    }
  ];
  
  const currentStep = Steps[step];
  
  const handleSelect = (optionId: string) => {
    setSelectedOption(optionId);
    if (step === 0) {
      if (optionId === 'workforce') {
        setStep(1);
      } else if (optionId === 'consulting') {
        setStep(2);
      }
    } else {
      alert(`Selected option: ${optionId}`);
    }
  };
  
  const handleBack = () => {
    setStep(0);
    setSelectedOption(null);
  };
  
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>
        Labor Market Research Reports
      </h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>
          {currentStep.title}
        </h2>
        
        {step > 0 && (
          <button 
            onClick={handleBack}
            style={{
              background: 'none',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '8px 16px',
              marginBottom: '16px',
              cursor: 'pointer'
            }}
          >
            {currentStep.backLabel || 'Back'}
          </button>
        )}
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '16px'
        }}>
          {currentStep.options.map(option => (
            <div 
              key={option.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '16px',
                cursor: 'pointer',
                backgroundColor: selectedOption === option.id ? '#f0f9ff' : 'white'
              }}
              onClick={() => handleSelect(option.id)}
            >
              <h3 style={{ 
                fontSize: '16px', 
                marginBottom: '8px',
                color: '#333'
              }}>
                {option.label}
              </h3>
              <p style={{ 
                fontSize: '14px', 
                color: '#666',
                marginBottom: '16px'
              }}>
                Details about {option.label}
              </p>
              <button
                style={{
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '8px 16px',
                  width: '100%',
                  cursor: 'pointer'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(option.id);
                }}
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}