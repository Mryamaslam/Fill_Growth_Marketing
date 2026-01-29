import type { Metadata } from 'next'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Contact Us - Fill Growth Marketing',
  description: 'Get in touch with Fill Growth Marketing. We\'re here to help grow your brand with data-driven marketing strategies.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <ContactSection />
      <Footer />
    </main>
  )
}

