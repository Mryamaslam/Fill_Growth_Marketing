'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { 
  FiBarChart2, 
  FiZap, 
  FiTarget, 
  FiUsers, 
  FiDollarSign, 
  FiHeadphones 
} from 'react-icons/fi'
import { IconType } from 'react-icons'

interface Reason {
  icon: IconType
  title: string
  description: string
}

const reasons: Reason[] = [
  {
    icon: FiBarChart2,
    title: 'Data-Driven Results',
    description: 'We use analytics and metrics to make informed decisions that drive real, measurable growth for your business.',
  },
  {
    icon: FiZap,
    title: 'Fast Turnaround',
    description: 'Our efficient processes and dedicated team ensure quick delivery without compromising on quality.',
  },
  {
    icon: FiTarget,
    title: 'Proven Strategies',
    description: 'Our methods are tested and proven to work across multiple industries and business sizes.',
  },
  {
    icon: FiUsers,
    title: 'Expert Team',
    description: 'Work with experienced professionals who are passionate about helping your brand succeed.',
  },
  {
    icon: FiDollarSign,
    title: 'ROI Focused',
    description: 'Every campaign is designed to maximize your return on investment and deliver measurable results.',
  },
  {
    icon: FiHeadphones,
    title: 'Dedicated Support',
    description: 'Get personalized attention with dedicated account managers who understand your business goals.',
  },
]

export default function WhyChooseUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
            Why Choose Fill Growth Marketing?
          </h2>
          <p className="text-lg sm:text-xl text-text-light max-w-2xl mx-auto">
            We combine expertise, innovation, and dedication to deliver exceptional results for your brand
          </p>
          <div className="w-24 h-1 bg-gradient-accent mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="bg-background rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Icon */}
              <motion.div
                className="mb-6 text-secondary"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <reason.icon className="w-16 h-16" />
              </motion.div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-primary mb-4">{reason.title}</h3>

              {/* Description */}
              <p className="text-text-light leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Additional CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="bg-gradient-accent rounded-2xl p-12 shadow-xl">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied clients who have transformed their brands with our proven strategies
            </p>
            <Link href="/contact">
              <motion.button
                className="px-8 py-4 bg-white text-primary font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Today
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

