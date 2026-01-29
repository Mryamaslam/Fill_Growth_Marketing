'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { teamMembers } from '@/data/team'

export default function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 sm:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg sm:text-xl text-text-light max-w-2xl mx-auto">
            The talented professionals behind Fill Growth Marketing
          </p>
          <div className="w-24 h-1 bg-gradient-accent mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamCard({
  member,
  index,
  isInView,
}: {
  member: typeof teamMembers[0]
  index: number
  isInView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <Link href={`/team/${member.id}`}>
        <div className="group relative bg-white rounded-2xl shadow-lg p-6 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-2xl">
          {/* Hover Gradient */}
          <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

          {/* Photo */}
          <motion.div
            className="text-8xl mb-4 text-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {member.photo}
          </motion.div>

          {/* Name */}
          <h3 className="text-xl font-bold text-primary mb-2 text-center group-hover:text-secondary transition-colors">
            {member.name}
          </h3>

          {/* Role */}
          <p className="text-text-light text-center mb-4">{member.role}</p>

          {/* Arrow Indicator */}
          <motion.div
            className="absolute bottom-4 right-4 text-secondary opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ x: -10 }}
            whileHover={{ x: 0 }}
          >
            →
          </motion.div>

          {/* Shine Effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </Link>
    </motion.div>
  )
}

