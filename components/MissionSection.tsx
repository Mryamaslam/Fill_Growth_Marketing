'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export default function MissionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 sm:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visual side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/mission.png"
                  alt="Team collaborating on growth strategy at a laptop"
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            <p className="text-sm font-semibold tracking-[0.2em] text-secondary mb-3 uppercase">
              Our Mission
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
              Scaling Brands With Honest,
              <span className="block text-secondary">Measurable Growth</span>
            </h2>

            <p className="text-base sm:text-lg text-text-light mb-4 leading-relaxed">
              At Fill Growth Marketing, our mission is to become the plugged-in growth team for
              ambitious brands. We combine performance marketing, creative, and strategy to build
              systems that don&apos;t just look good — they consistently generate revenue and
              qualified leads.
            </p>

            <p className="text-base sm:text-lg text-text-light mb-8 leading-relaxed">
              With a transparent, data-led approach, we focus on what actually moves the needle:
              profitable campaigns, clear reporting, and constant experimentation.
            </p>

            <ul className="space-y-3 text-sm sm:text-base text-text-light">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-5 rounded-full bg-secondary" />
                <span>Innovative digital growth solutions tailored to your brand.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-5 rounded-full bg-secondary" />
                <span>Targeted audience engagement across social and paid channels.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-5 rounded-full bg-secondary" />
                <span>Conversion-focused websites, landing pages, and funnels.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-5 rounded-full bg-secondary" />
                <span>Long-term partnership mindset and proactive support.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


