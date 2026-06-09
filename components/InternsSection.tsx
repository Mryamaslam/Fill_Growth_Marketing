'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { interns, type Intern } from '@/data/interns'

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function InternPhoto({ intern }: { intern: Intern }) {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary/20 to-purple-500/20 text-2xl font-bold text-secondary">
        {getInitials(intern.name)}
      </div>
    )
  }

  return (
    <Image
      src={intern.photo}
      alt={intern.name}
      fill
      className="object-cover"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      onError={() => setImageError(true)}
    />
  )
}

function InternCard({
  intern,
  index,
  isInView,
}: {
  intern: Intern
  index: number
  isInView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-300 hover:border-secondary/40 hover:shadow-xl">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative flex flex-col items-center text-center">
          <div className="relative mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-md ring-2 ring-secondary/20 transition-all duration-300 group-hover:ring-secondary/50">
            <InternPhoto intern={intern} />
          </div>

          <span className="mb-2 inline-block rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary">
            Intern
          </span>

          <h3 className="mb-1 text-lg font-bold text-primary transition-colors group-hover:text-secondary">
            {intern.name}
          </h3>

          <p className="mb-3 text-sm font-medium text-secondary">{intern.role}</p>

          {intern.bio && (
            <p className="text-sm leading-relaxed text-text-light">{intern.bio}</p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function InternsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="border-t border-slate-200 bg-slate-50 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
            Rising Talent
          </p>
          <h2 className="mb-4 text-3xl font-bold text-primary sm:text-4xl md:text-5xl">
            Our Internees
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-text-light">
            The next generation of marketers and creators learning and growing with us
          </p>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-accent" />
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {interns.map((intern, index) => (
            <InternCard key={intern.id} index={index} intern={intern} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
