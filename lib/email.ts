import nodemailer from 'nodemailer'

interface EmailOptions {
  to: string
  subject: string
  html: string
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: `"Fill Growth Marketing" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    })
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Email error:', error)
    return { success: false, error }
  }
}

export function generateAdminEmail(data: {
  name: string
  email: string
  phone?: string
  service?: string
  message: string
}) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #22D3EE 0%, #A855F7 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #0A2540; }
          .value { color: #64748B; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission</h2>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">Name:</span>
              <span class="value">${data.name}</span>
            </div>
            <div class="field">
              <span class="label">Email:</span>
              <span class="value">${data.email}</span>
            </div>
            ${data.phone ? `
            <div class="field">
              <span class="label">Phone:</span>
              <span class="value">${data.phone}</span>
            </div>
            ` : ''}
            ${data.service ? `
            <div class="field">
              <span class="label">Service:</span>
              <span class="value">${data.service}</span>
            </div>
            ` : ''}
            <div class="field">
              <span class="label">Message:</span>
              <div class="value" style="margin-top: 10px; padding: 10px; background: white; border-radius: 4px;">
                ${data.message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `
}

export function generateAutoReplyEmail(name: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #22D3EE 0%, #A855F7 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #2563EB 0%, #1E40AF 100%); color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Thank You for Contacting Us!</h2>
          </div>
          <div class="content">
            <p>Hi ${name},</p>
            <p>Thank you for reaching out to Fill Growth Marketing. We've received your message and our team will get back to you within 24-48 hours.</p>
            <p>In the meantime, feel free to explore our services and packages on our website.</p>
            <p>Best regards,<br>The Fill Growth Marketing Team</p>
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://fillgrowthmarketing.com'}" class="button">Visit Our Website</a>
          </div>
        </div>
      </body>
    </html>
  `
}

