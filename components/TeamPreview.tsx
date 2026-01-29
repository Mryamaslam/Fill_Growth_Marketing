'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiLinkedin, FiTwitter, FiGithub } from 'react-icons/fi'
import { teamMembers } from '@/data/team'

export default function TeamPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Show only first 4 team members on home page
  const previewMembers = teamMembers.slice(0, 4)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-background via-slate-50 to-background overflow-hidden"
    >
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.08),_transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-96 bg-[radial-gradient(circle_at_bottom,_rgba(139,92,246,0.08),_transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-12 sm:mb-16 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3 text-secondary">
            Our Team
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
            Meet The Growth Squad
          </h2>
          <p className="text-base sm:text-lg text-text-light">
            The strategists, creators, and performance experts who turn your brand vision into
            measurable growth.
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {previewMembers.map((member, index) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              whileHover={{ y: -12 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            >
              <Link href={`/team/${member.id}`}>
                <div className="group relative h-full bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 cursor-pointer overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-secondary/20 hover:border-secondary/40 transition-all duration-300">
                  {/* Gradient glow on hover */}
                  <div className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-secondary/20 via-transparent to-purple-500/20 rounded-3xl" />

                  <div className="relative flex flex-col items-center text-center">
                    {/* Photo with gradient border */}
                    <div className="relative mb-5">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-secondary via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                      <motion.div
                        className="relative rounded-full bg-gradient-to-br from-slate-100 to-slate-200 p-1 group-hover:from-secondary/10 group-hover:to-purple-500/10 transition-colors duration-300"
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <div className="rounded-full bg-white p-3">
                          <div className="text-6xl sm:text-7xl">{member.photo}</div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Name */}
                    <h3 className="text-lg sm:text-xl font-bold text-primary mb-1.5 group-hover:text-secondary transition-colors">
                      {member.name}
                    </h3>

                    {/* Role */}
                    <p className="text-sm sm:text-base text-text-light mb-4">{member.role}</p>

                    {/* Social Links (if available) */}
                    {(member.social?.linkedin || member.social?.twitter || member.social?.github) && (
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {member.social.linkedin && (
                          <a
                            href={member.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-full bg-slate-100 text-secondary hover:bg-secondary hover:text-white transition-colors"
                          >
                            <FiLinkedin className="w-4 h-4" />
                          </a>
                        )}
                        {member.social.twitter && (
                          <a
                            href={member.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-full bg-slate-100 text-secondary hover:bg-secondary hover:text-white transition-colors"
                          >
                            <FiTwitter className="w-4 h-4" />
                          </a>
                        )}
                        {member.social.github && (
                          <a
                            href={member.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-full bg-slate-100 text-secondary hover:bg-secondary hover:text-white transition-colors"
                          >
                            <FiGithub className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    )}

                    {/* View Profile CTA */}
                    <motion.div
                      className="mt-4 flex items-center gap-2 text-xs font-medium text-secondary opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ x: -5 }}
                      whileHover={{ x: 0 }}
                    >
                      <span className="uppercase tracking-wider">View Profile</span>
                      <FiArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link href="/team">
            <motion.button
              className="relative px-8 py-4 bg-gradient-to-r from-secondary to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                View All Team Members
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

