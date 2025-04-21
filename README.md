# TalentNeuron Research Request Portal

A comprehensive workforce intelligence platform that delivers strategic market research insights through an intuitive, modular client intake system.

## Project Overview

This application serves as a client intake platform for requesting Labor Market Based Research Reports. Users can select between two main options:

1. **Workforce Reports** - Standardized reports with predefined formats and metrics for quick analysis
2. **Consulting Projects** - Custom-tailored research and analysis services for complex business challenges

The platform includes a scheduling feature for consultations, database storage for form submissions, and will eventually provide a client portal for accessing completed reports.

## Key Features

- **Modular Report Selection**: Intuitive tile-based navigation for selecting report types
- **Conversational AI Questionnaires**: Natural, step-by-step data collection forms
- **Strategic Sourcing Reports**: Detailed questionnaires for workforce challenges, audience analysis, timeline expectations, and additional insights
- **Database Integration**: PostgreSQL storage for all form submissions
- **Report Variant Selection**: Basic and Plus options with clear differentiation of features and pricing
- **Appointment Scheduling**: Calendar-based consultation booking system

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
2. User browses available report types
3. For Strategic Sourcing reports, user selects a variant (Basic or Plus)
4. User completes the form and submits the request

#### Consulting Projects Flow
1. User selects "Consulting Projects" from main page
2. User browses available consulting services
3. For Strategic Sourcing reports, user is immediately taken to a conversational questionnaire
4. User completes the 4-step questionnaire and submits the request

#### Consultation Scheduling Flow
1. User selects "Schedule a Consultation" 
2. User selects a date from the calendar
3. User selects an available time slot
4. User provides contact information and submits the request

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

- Client portal for accessing completed reports
- Authentication and user account management
- Report status tracking and notifications
- Integration with external calendar providers (Google Calendar, Outlook)
- Advanced filtering and search for submitted requests