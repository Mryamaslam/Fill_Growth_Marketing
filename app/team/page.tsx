import type { Metadata } from 'next'
import TeamSection from '@/components/TeamSection'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Our Team - Fill Growth Marketing',
  description: 'Meet the talented team behind Fill Growth Marketing. Expert designers, developers, and marketers dedicated to growing your brand.',
}

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-background">
      <TeamSection />
      <Footer />
    </main>
  )
}

