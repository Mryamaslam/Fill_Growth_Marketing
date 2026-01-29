'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import { services } from '@/data/services'
import { serviceIcons } from '@/data/serviceIcons'

export default function ServicesOverview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-slate-100 via-slate-50 to-background overflow-hidden"
    >
      {/* subtle background shapes */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-80 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(circle_at_bottom,_rgba(129,140,248,0.12),_transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-12 sm:mb-16 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3 text-secondary">
            Services
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
            Full‑Funnel Digital Growth Services
          </h2>
          <p className="text-base sm:text-lg text-text-light">
            From strategy to execution, Fill Growth Marketing plugs in as your performance team —
            across paid media, content, and conversion experience.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {services.map((service) => {
            const Icon = serviceIcons[service.id]

            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                <Link href={`/services/${service.id}`}>
                  <div className="group relative h-full rounded-2xl bg-white border border-slate-200 px-6 py-7 sm:px-7 sm:py-8 cursor-pointer overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-secondary/20 hover:border-secondary/40 transition-all duration-300">
                    {/* glow ring */}
                    <div className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-400/20 via-transparent to-indigo-500/20 rounded-2xl" />

                    <div className="relative flex flex-col gap-4">
                      {/* Icon bubble */}
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-blue-600 text-white shadow-lg shadow-secondary/30 group-hover:scale-105 transition-transform duration-300">
                        {Icon && <Icon className="w-6 h-6" />}
                      </div>

                      {/* Title & description */}
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-primary group-hover:text-secondary transition-colors">
                          {service.name}
                        </h3>
                        <p className="text-sm text-text-light leading-relaxed line-clamp-4">
                          {service.description}
                        </p>
                      </div>

                      {/* CTA row */}
                      <div className="mt-3 flex items-center justify-between text-xs">
                        <span className="font-medium uppercase tracking-[0.18em] text-text-light group-hover:text-secondary transition-colors">
                          Learn More
                        </span>
                        <motion.span
                          className="inline-flex items-center justify-center rounded-full bg-secondary/10 p-2 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors"
                          initial={{ x: 0 }}
                          whileHover={{ x: 4 }}
                        >
                          <FiArrowRight className="w-4 h-4" />
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

