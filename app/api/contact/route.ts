import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Contact from '@/models/Contact'
import { sendEmail, generateAdminEmail, generateAutoReplyEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, message } = body

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

    // Connect to database
    await connectDB()

    // Save to database
    const contact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim(),
      service: service?.trim(),
      message: message.trim(),
    })

    await contact.save()

    // Send email to admin
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER
    if (adminEmail) {
      await sendEmail({
        to: adminEmail,
        subject: `New Contact Form Submission from ${name}`,
        html: generateAdminEmail({ name, email, phone, service, message }),
      })
    }

    // Send auto-reply to user
    await sendEmail({
      to: email,
      subject: 'Thank You for Contacting Fill Growth Marketing',
      html: generateAutoReplyEmail(name),
    })

    return NextResponse.json(
      { message: 'Contact form submitted successfully', id: contact._id },
      { status: 201 }
    )
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

// GET endpoint to retrieve contacts (for admin dashboard - add authentication in production)
export async function GET() {
  try {
    await connectDB()
    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(100)
    return NextResponse.json({ contacts }, { status: 200 })
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    )
  }
}

