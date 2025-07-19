import express, { Request, Response, NextFunction, RequestHandler } from "express";
import { Resend } from 'resend';
import { Auth } from '@vonage/auth';
import { SMS } from '@vonage/sms';


export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}

export const buildLostReportQuery = (params: any) => {
  const query: any = {};
  if (params.referance) query.referanceNo = params.referance;
  if (params.category) query.category = { $in: [params.category] };
  if (params.location) query.location = params.location;
  if (params.policeStation) query.nearestPoliceStation = params.policeStation;
  if (params.district) query.district = params.district;
  if (params.date) query.dateOfLost = new Date(params.date);
  return query;
};



const resend = new Resend(process.env.RESEND_API_KEY);

export const sendConfirmationEmail = async (
  to: string,
  reportData: any,
  reportType: 'LOST' | 'FOUND'
) => {
  try {
    const subject =
      reportType === 'FOUND'
        ? 'Found Item Report Confirmation'
        : 'Lost Item Report Confirmation';

    const greeting =
      reportType === 'FOUND'
        ? 'Thank you for reporting a found item. Below is the summary of your submission:'
        : 'Thank you for submitting your lost item report. Below is the summary of your report for your reference:';

    const emailResponse = await resend.emails.send({
      from: 'LFRS <onboarding@resend.dev>', // or verified domain
      to,
      subject,
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2d6cdf;">${subject}</h2>
        <p>Dear ${reportData.name},</p>
        <p>${greeting}</p>

        <table style="border-collapse: collapse; margin-top: 10px;">
          <tr>
            <td><strong>Reference No:</strong></td>
            <td>${reportData.referanceNo}</td>
          </tr>
          <tr>
            <td><strong>Item(s):</strong></td>
            <td>${reportData.items}</td>
          </tr>
          <tr>
            <td><strong>Category:</strong></td>
            <td>${Array.isArray(reportData.category) ? reportData.category.join(', ') : reportData.category}</td>
          </tr>
          <tr>
            <td><strong>Date:</strong></td>
            <td>${new Date(reportData.dateOfLost).toLocaleDateString()}</td>
          </tr>
          <tr>
            <td><strong>Time:</strong></td>
            <td>${reportData.timeOfLost}</td>
          </tr>
          <tr>
            <td><strong>Location:</strong></td>
            <td>${reportData.location}</td>
          </tr>
          <tr>
            <td><strong>District:</strong></td>
            <td>${reportData.district}</td>
          </tr>
          <tr>
            <td><strong>Nearest Police Station:</strong></td>
            <td>${reportData.nearestPoliceStation}</td>
          </tr>
        </table>

        ${reportData.description
          ? `<p><strong>Description:</strong> ${reportData.description}</p>`
          : ''
        }

        <p style="margin-top: 20px;">Our team will review your report and notify you of any updates.</p>

        <p>If you need to make changes or provide additional details, please contact us at <a href="mailto:support@yourdomain.com">support@yourdomain.com</a>.</p>

        <p style="margin-top: 30px;">Regards,<br/>Lost & Found Reporting System Team</p>
        <hr/>
        <p style="font-size: 12px; color: #888;">This is an automated email. Please do not reply to this message.</p>
      </div>
    `,
    });

    console.log('Email sent:', emailResponse);
  } catch (err) {
    console.error('Error sending confirmation email:', err);
  }
};


export const sendStatusUpdateEmail = async (
  to: string,
  name: string,
  referenceNo: string,
  newStatus: string
) => {
  try {
    const statusDescriptionMap: Record<string, string> = {
      LOST: 'Your item is still marked as lost.',
      FOUND: 'Good news! Your item has been found.',
      INFORMED: 'You’ve been informed about a potential match.',
      COLLECTED: 'Your item has been collected.',
      NOT_COLLECTED: 'Your item is yet to be collected.',
      REMOVED: 'Your report has been closed or removed.',
    };

    const description =
      statusDescriptionMap[newStatus.toUpperCase()] ||
      `The status of your report has been updated to "${newStatus}".`;

    const subject = `Update: Report ${referenceNo} Status Changed to ${newStatus}`;

    const emailResponse = await resend.emails.send({
      from: 'LFRS <onboarding@resend.dev>',
      to, 
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #2d6cdf;">Report Status Update</h2>
          <p>Dear ${name},</p>
          <p>We would like to inform you that the status of your lost/found item report with <strong>Reference No: ${referenceNo}</strong> has been updated.</p>
          <p><strong>New Status:</strong> ${newStatus}</p>
          <p>${description}</p>
          <p>If you have any questions, feel free to contact us at <a href="mailto:support@yourdomain.com">support@yourdomain.com</a>.</p>
          <p style="margin-top: 30px;">Regards,<br/>Lost & Found Reporting System Team</p>
          <hr/>
          <p style="font-size: 12px; color: #888;">This is an automated email. Please do not reply to this message.</p>
        </div>
      `,
    });

    console.log('Status update email sent:', emailResponse);
  } catch (err) {
    console.error('Error sending status update email:', err);
  }
};



const smsClient = new SMS(
  new Auth({
    apiKey: process.env.VONAGE_API_KEY!,
    apiSecret: process.env.VONAGE_API_SECRET!,
  })
);

export const sendSMS = async (to: string, message: string) => {
  try {
    const response = await smsClient.send({
      to,
      from: 'LFRS',
      text: message,
    });

    const msg = response.messages[0];

    if (msg.status === '0') {
      console.log('SMS sent successfully');
    } else {
      console.error(`SMS failed: ${msg.errorText}`);

    }
  } catch (err) {
    console.error('Error sending SMS:', err);
  }
};