import sgMail from '@sendgrid/mail';

// Initialize SendGrid if API key is available
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

// Fallback "email" function for when SendGrid is not available
const logEmail = (to: string, subject: string, htmlContent: string) => {
  console.log('-------------------- EMAIL NOTIFICATION --------------------');
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log('Content:');
  console.log(htmlContent);
  console.log('-----------------------------------------------------------');
  return true;
};

/**
 * Send an email using SendGrid, or fall back to console logging if no API key
 */
export const sendEmail = async (
  to: string,
  subject: string,
  htmlContent: string,
  fromEmail: string = 'notifications@talentneuron.com'
): Promise<boolean> => {
  try {
    // If no SendGrid API key, just log the email
    if (!SENDGRID_API_KEY) {
      return logEmail(to, subject, htmlContent);
    }

    // Otherwise, send via SendGrid
    const msg = {
      to,
      from: fromEmail,
      subject,
      html: htmlContent,
    };

    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    // Log the email as fallback
    return logEmail(to, subject, htmlContent);
  }
};

/**
 * Formats a confirmation email for Strategic Sourcing Plus requests
 */
export const formatStrategicSourcingPlusConfirmation = (
  roles: any[],
  locations: any[],
  additionalNotes?: string
): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #CCCFFF; border-radius: 8px;">
      <div style="background-color: #4600FF; padding: 20px; border-radius: 8px 8px 0 0; margin: -20px -20px 20px;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Strategic Sourcing Plus Request Confirmation</h1>
      </div>
      
      <p style="color: #130056; font-size: 16px; line-height: 1.5;">
        Your Strategic Sourcing Plus request has been received successfully. We will begin processing your request shortly.
      </p>
      
      <h2 style="color: #4600FF; font-size: 18px; margin-top: 30px;">Request Details</h2>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #CCCFFF; color: #8186B4; width: 40%;">Report Type:</td>
          <td style="padding: 10px; border-bottom: 1px solid #CCCFFF; color: #130056; font-weight: bold;">Strategic Sourcing Plus</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #CCCFFF; color: #8186B4;">Number of Roles:</td>
          <td style="padding: 10px; border-bottom: 1px solid #CCCFFF; color: #130056; font-weight: bold;">${roles.length}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #CCCFFF; color: #8186B4;">Number of Locations:</td>
          <td style="padding: 10px; border-bottom: 1px solid #CCCFFF; color: #130056; font-weight: bold;">${locations.length}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #CCCFFF; color: #8186B4;">Expected Delivery:</td>
          <td style="padding: 10px; border-bottom: 1px solid #CCCFFF; color: #130056; font-weight: bold;">2 weeks</td>
        </tr>
      </table>
      
      <div style="margin-top: 30px;">
        <h3 style="color: #4600FF; font-size: 16px;">Roles</h3>
        <ul style="padding-left: 20px; color: #130056;">
          ${roles.map(role => `<li style="margin-bottom: 8px;">${role.title || 'Untitled Role'}</li>`).join('')}
        </ul>
      </div>
      
      <div style="margin-top: 20px;">
        <h3 style="color: #4600FF; font-size: 16px;">Locations</h3>
        <ul style="padding-left: 20px; color: #130056;">
          ${locations.map(location => `<li style="margin-bottom: 8px;">${location.city ? location.city + ', ' : ''}${location.region}, ${location.country}</li>`).join('')}
        </ul>
      </div>
      
      ${additionalNotes ? `
      <div style="margin-top: 20px; padding: 15px; background-color: #F8F9FE; border-radius: 8px;">
        <h3 style="color: #4600FF; font-size: 16px; margin-top: 0;">Additional Notes</h3>
        <p style="color: #130056; margin-bottom: 0;">${additionalNotes}</p>
      </div>
      ` : ''}
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #CCCFFF; color: #8186B4; font-size: 14px;">
        <p>If you have any questions about your request, please contact your account manager or support team.</p>
        <p style="margin-top: 15px;">Thank you for using TalentNeuron!</p>
      </div>
    </div>
  `;
};