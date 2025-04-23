# Workforce Intelligence Platform | Labor Market Research | TalentNeuron

A comprehensive workforce intelligence platform that delivers strategic labor market research insights through an advanced, user-friendly client intake system. This tool helps talent acquisition specialists, HR professionals, and business leaders make data-driven workforce decisions.

[![Labor Market Research](https://img.shields.io/badge/Labor%20Market-Research-4600FF)](https://github.com/yourusername/workforce-intelligence-platform)
[![Workforce Analytics](https://img.shields.io/badge/Workforce-Analytics-130056)](https://github.com/yourusername/workforce-intelligence-platform)
[![Talent Acquisition](https://img.shields.io/badge/Talent-Acquisition-FF4219)](https://github.com/yourusername/workforce-intelligence-platform)
[![HR Technology](https://img.shields.io/badge/HR-Technology-8186B4)](https://github.com/yourusername/workforce-intelligence-platform)

## Project Overview

This application serves as a client intake platform for requesting Labor Market Based Research Reports. Users can select between two main options:

1. **Workforce Reports** - Standardized reports with predefined formats and metrics for quick analysis
2. **Consulting Projects** - Custom-tailored research and analysis services for complex business challenges

The platform includes a scheduling feature for consultations, database storage for form submissions, and will eventually provide a client portal for accessing completed reports.

## Key Features

- **Intuitive Dashboard & Status Tracking**: Monitor all submitted requests with real-time status updates and progress tracking
- **Modular Report Selection**: User-friendly tile-based navigation for selecting labor market report types
- **Conversational AI Questionnaires**: Natural, step-by-step data collection forms designed for HR professionals
- **Strategic Sourcing Reports**: Comprehensive questionnaires for talent acquisition, workforce challenges, audience analysis, and timeline expectations
- **Advanced Role-Location Analysis**: Detailed mapping of talent requirements across multiple geographies
- **Database Integration**: Secure PostgreSQL storage for all form submissions and client data
- **Report Variant Selection**: Basic and Plus options with transparent pricing and feature comparison.
- **Talent Market Insight Consultation**: Calendar-based scheduling system for expert consultation sessions.

## Technical Details

### Tech Stack
- **Frontend**: React/TypeScript with Framer Motion animations
- **UI Components**: ShadCN UI with custom styling
- **Database**: PostgreSQL with Drizzle ORM
- **Backend**: Express.js API endpoints
- **Styling**: Tailwind CSS with theme customization

### Project Structure
- `/client`: Frontend React application
  - `/src/components`: Reusable UI components
  - `/src/pages`: Main application pages
  - `/src/lib`: Utility functions and global state
- `/server`: Express.js backend
  - `/routes.ts`: API endpoint definitions
  - `/storage.ts`: Database access layer
- `/shared`: Code shared between frontend and backend
  - `/schema.ts`: Database schema definitions

### User Flows

#### Workforce Reports Flow
1. User selects "Workforce Reports" from main page
2. User browses available labor market report types with detailed descriptions and pricing
3. For Strategic Sourcing reports, user selects a variant (Basic or Plus) with clear feature differentiation
4. User completes the detailed form with role-location pairs, challenge descriptions, and timeline requirements
5. User receives a confirmation with request status and next steps information

#### Consulting Projects Flow
1. User selects "Consulting Projects" from main page
2. User browses available talent consulting services with project descriptions
3. For Strategic Sourcing projects, user completes an intuitive conversational questionnaire
4. The questionnaire captures business problems, talent needs, and project deadlines
5. User submits the request and receives a confirmation with expected delivery timeline

#### Request Dashboard Flow
1. User navigates to the dashboard to view all submitted requests
2. Dashboard displays requests with status indicators (initiated, in progress, ready)
3. User can filter requests by type (workforce, consulting) and status
4. User clicks on a specific request to view detailed status information
5. Status dialog shows a visual timeline of the request progress with estimated completion dates

#### Consultation Scheduling Flow
1. User selects "Schedule a Consultation" with a talent market expert
2. Interactive calendar allows selection of preferred consultation dates
3. Available time slots are dynamically displayed based on expert availability
4. User provides contact information and consultation topic details
5. Confirmation is sent with calendar integration options (Google Calendar, Outlook)

## Design Elements

The application uses a consistent design language with the following brand colors:
- Electric Burple (#4600FF)
- Neuron Navy (#130056)
- Synapse Silver (#8186B4)
- Luminous Lavender (#CCCFFF)
- Impulse Orange (#FF4219)
- Peach (#FFC7BA)

## Database Models

- **User**: Basic user information and authentication
- **WorkforceRequest**: Stores standard workforce report requests
- **ConsultingRequest**: Stores consulting project requests
- **StrategicSourcingRequest**: Stores detailed strategic sourcing questionnaire data
- **Appointment**: Stores consultation scheduling information

## Future Development

- **Client Portal**: Secure digital workspace for accessing completed labor market reports and analytics
- **Authentication System**: Enterprise-grade user authentication and role-based permissions
- **Advanced Notifications**: Email and SMS alerts for report status changes and delivery
- **Calendar Integration**: Seamless scheduling with Google Calendar, Microsoft Outlook, and Apple Calendar
- **Advanced Analytics Dashboard**: Interactive visualizations of workforce trends and talent market insights
- **Mobile Responsiveness**: Enhanced interface optimized for smartphone and tablet access
- **AI-Powered Recommendations**: Intelligent suggestions based on previous report requests and market trends
- **Multi-language Support**: Localization for global talent acquisition teams

## Use Cases

### For Talent Acquisition Leaders
- Understand competitive compensation benchmarks across multiple regions
- Identify emerging skills and credentials in target talent pools
- Evaluate talent supply/demand ratios for critical roles
- Develop data-driven recruitment strategies based on market intelligence

### For HR Business Partners
- Support workforce planning with accurate labor market data
- Guide hiring managers with realistic talent availability expectations
- Inform leadership about talent landscape challenges and opportunities
- Analyze competitor talent strategies and movements

#### For Organizational Development Teams
- Design upskilling initiatives based on skill gap analysis
- Create career pathways aligned with market trends
- Support diversity and inclusion strategies with demographic insights
- Develop succession plans informed by external talent availability

## Keywords and SEO

talent acquisition, workforce analytics, labor market intelligence, strategic sourcing, talent market research, HR technology, workforce planning, talent pool analysis, compensation benchmarking, skills analysis, talent supply and demand, recruitment strategy, hiring analytics, talent data, HR dashboard, workforce intelligence platform, Intake Forms, Research Reports, MarketIntel Reports
