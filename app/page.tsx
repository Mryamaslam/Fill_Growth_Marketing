import HeroSection from '@/components/HeroSection'
import MissionSection from '@/components/MissionSection'
import AboutUs from '@/components/AboutUs'
import PackagesPreview from '@/components/PackagesPreview'
import ServicesOverview from '@/components/ServicesOverview'
import WhyChooseUs from '@/components/WhyChooseUs'
import TeamPreview from '@/components/TeamPreview'
import Reviews from '@/components/Reviews'
import ContactFormSection from '@/components/ContactFormSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <MissionSection />
      <AboutUs />
      <PackagesPreview />
      <ServicesOverview />
      <WhyChooseUs />
      <TeamPreview />
      <Reviews />
      <ContactFormSection />
      <Footer />
    </main>
  )
}

