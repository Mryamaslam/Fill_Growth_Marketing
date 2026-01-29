export interface SEOData {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  url?: string
  type?: string
}

export function generateMetadata(data: SEOData) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fillgrowthmarketing.com'
  const defaultImage = `${siteUrl}/og-image.jpg`

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords?.join(', ') || 'digital marketing, social media marketing, SEO, web development, graphic design',
    openGraph: {
      title: data.title,
      description: data.description,
      url: data.url || siteUrl,
      siteName: 'Fill Growth Marketing',
      images: [
        {
          url: data.ogImage || defaultImage,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
      locale: 'en_US',
      type: data.type || 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: [data.ogImage || defaultImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export function generateSchemaMarkup(type: 'Organization' | 'Service' | 'WebSite' = 'Organization', data?: any) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fillgrowthmarketing.com'

  if (type === 'Organization') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Fill Growth Marketing',
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      description: 'We Scale Brands with Strategy, Content & Performance',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-555-123-4567',
        contactType: 'Customer Service',
        email: 'hello@fillgrowthmarketing.com',
      },
      sameAs: [
        'https://www.linkedin.com/company/fill-growth-marketing',
        'https://www.facebook.com/fillgrowthmarketing',
        'https://twitter.com/fillgrowth',
      ],
    }
  }

  if (type === 'WebSite') {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Fill Growth Marketing',
      url: baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    }
  }

  if (type === 'Service' && data) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: data.name,
      description: data.description,
      provider: {
        '@type': 'Organization',
        name: 'Fill Growth Marketing',
      },
      areaServed: 'Worldwide',
      serviceType: data.serviceType || 'Digital Marketing',
    }
  }

  return null
}

