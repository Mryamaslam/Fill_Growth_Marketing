import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, generateAdminEmail, generateAutoReplyEmail } from '@/lib/email'
import { insertLead } from '@/lib/leadsStore'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, country, city, service, message } = body

    // Server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Save to file-based storage for admin leads panel (PRIMARY - always save first)
    let leadSaved = false
    try {
      const packageId = body.package || undefined
      const packageInfo =
        body.packageInfo ||
        (packageId ? `Interested in package: ${packageId.toString().toUpperCase()}` : null)

      await insertLead({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim(),
        country: country?.trim(),
        city: city?.trim(),
        service: service?.trim(),
        message: message.trim(),
        source: body.source || 'contact',
        packageId,
        packageInfo,
      })
      leadSaved = true
    } catch (e) {
      console.error('Failed to insert lead:', e)
      // If lead saving fails, return error
      return NextResponse.json(
        { error: 'Failed to save your message. Please try again later.' },
        { status: 500 }
      )
    }

    // Return success immediately after saving lead (FAST RESPONSE)
    // Emails will be sent in background (non-blocking)
    const response = NextResponse.json(
      { 
        message: 'Contact form submitted successfully',
        leadSaved: true 
      }, 
      { status: 201 }
    )

    // Send emails in background (non-blocking - don't wait for them)
    // This makes the API response much faster
    const sendEmailsAsync = async () => {
      // Send email to admin (OPTIONAL - don't block if it fails)
      const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER
      if (adminEmail && process.env.SMTP_USER && process.env.SMTP_PASS) {
        try {
          const adminEmailResult = await sendEmail({
            to: adminEmail,
            subject: `New Contact Form Submission from ${name}`,
            html: generateAdminEmail({ name, email, phone, country, city, service, message }),
          })
          if (!adminEmailResult.success) {
            console.warn('Admin email failed to send, but lead was saved:', adminEmailResult.error)
          }
        } catch (emailError) {
          console.warn('Admin email error (lead was saved):', emailError)
        }
      }

      // Send auto-reply to user (OPTIONAL - don't block if it fails)
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        try {
          const autoReplyResult = await sendEmail({
            to: email,
            subject: 'Thank You for Contacting Fill Growth Marketing',
            html: generateAutoReplyEmail(name),
          })
          if (!autoReplyResult.success) {
            console.warn('Auto-reply email failed to send, but lead was saved:', autoReplyResult.error)
          }
        } catch (emailError) {
          console.warn('Auto-reply email error (lead was saved):', emailError)
        }
      }
    }

    // Start email sending in background (don't await)
    sendEmailsAsync().catch((err) => {
      console.warn('Background email sending error (lead was saved):', err)
    })

    return response
  } catch (error: any) {
    console.error('Contact form error:', error)
    
    // Handle duplicate email or validation errors
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'This email has already been submitted' },
        { status: 400 }
      )
    }

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json(
        { error: errors.join(', ') },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to submit contact form. Please try again later.' },
      { status: 500 }
    )
  }
}

