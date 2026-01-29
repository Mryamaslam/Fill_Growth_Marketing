'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { FiCheck } from 'react-icons/fi'
import Footer from '@/components/Footer'
import { serviceIcons } from '@/data/serviceIcons'
import type { Service } from '@/data/services'

export default function ServiceDetail({ service }: { service: Service }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-primary via-primary to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="mb-6 text-white"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              {(() => {
                const Icon = serviceIcons[service.id]
                return Icon ? <Icon className="w-20 h-20" /> : null
              })()}
            </motion.div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              {service.name}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section ref={ref} className="py-20 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Full Description */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-primary mb-6">Service Overview</h2>
            <p className="text-lg text-text-light leading-relaxed">
              {service.fullDescription}
            </p>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-primary mb-8">Key Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-start p-4 bg-background rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  whileHover={{ x: 5, backgroundColor: '#F1F5F9' }}
                >
                  <FiCheck className="text-secondary mr-3 mt-1 flex-shrink-0 w-5 h-5" />
                  <span className="text-text-light">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tools Section */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-primary mb-8">Tools & Technologies</h2>
            <div className="flex flex-wrap gap-3">
              {service.tools.map((tool, index) => (
                <motion.span
                  key={index}
                  className="px-4 py-2 bg-gradient-accent bg-opacity-10 text-primary rounded-full font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.1, backgroundColor: '#22D3EE', color: 'white' }}
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Process Steps */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-primary mb-8">Our Process</h2>
            <div className="space-y-6">
              {service.process.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex gap-6 p-6 bg-background rounded-lg"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  whileHover={{ x: 5, backgroundColor: '#F1F5F9' }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      {step.title}
                    </h3>
                    <p className="text-text-light">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="text-center bg-gradient-accent rounded-2xl p-12 shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's discuss how {service.name} can help grow your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  className="px-8 py-4 bg-white text-primary font-semibold rounded-lg shadow-lg"
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started Today
                </motion.button>
              </Link>
              <Link href="/packages">
                <motion.button
                  className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Packages
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
