import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import { generateMetadata as genMeta, generateSchemaMarkup } from '@/lib/seo'

export const metadata: Metadata = genMeta({
  title: 'Fill Growth Marketing - We Scale Brands with Strategy, Content & Performance',
  description: 'Data-driven social media & digital marketing agency offering packages and individual services to grow your brand. Expert SEO, Meta Ads, Web Development, and Graphic Design services.',
  keywords: [
    'digital marketing',
    'social media marketing',
    'SEO services',
    'Meta Ads',
    'Facebook advertising',
    'Instagram ads',
    'web development',
    'graphic design',
    'lead generation',
    'LinkedIn marketing',
    'YouTube video editing',
  ],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationSchema = generateSchemaMarkup('Organization')
  const websiteSchema = generateSchemaMarkup('WebSite')

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}

