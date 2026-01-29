import type { Metadata } from 'next'
import PackagesSection from '@/components/PackagesSection'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Packages - Fill Growth Marketing',
  description: 'Choose from our Basic, Premium, or Diamond packages. Select the perfect plan to scale your brand\'s growth.',
}

export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-background">
      <PackagesSection />
      <Footer />
    </main>
  )
}

