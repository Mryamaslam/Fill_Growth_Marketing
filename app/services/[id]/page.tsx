import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ServiceDetail from '@/components/ServiceDetail'
import { services } from '@/data/services'
import { generateMetadata as genMeta, generateSchemaMarkup } from '@/lib/seo'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const service = services.find((s) => s.id === params.id)

  if (!service) {
    return {}
  }

  return genMeta({
    title: `${service.name} - Fill Growth Marketing`,
    description: service.description,
    keywords: [service.name, 'digital marketing', 'Fill Growth Marketing'],
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://fillgrowthmarketing.com'}/services/${service.id}`,
  })
}

export default function ServicePage({ params }: { params: { id: string } }) {
  const service = services.find((s) => s.id === params.id)

  if (!service) {
    notFound()
  }

  const serviceSchema = generateSchemaMarkup('Service', {
    name: service.name,
    description: service.description,
    serviceType: service.name,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ServiceDetail service={service} />
    </>
  )
}

