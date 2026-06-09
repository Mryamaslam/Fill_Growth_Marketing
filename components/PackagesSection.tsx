'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { FiCheck } from 'react-icons/fi'
import { detectCountry, formatPrice, basePrices, countryToCurrency } from '@/lib/currency'

interface PackageFeature {
  text: string
  originalText?: string
}

interface Package {
  id: string
  name: string
  basePrice: number
  badge?: string
  features: PackageFeature[]
  popular?: boolean
}

const basePackages: Package[] = [
  {
    id: 'basic',
    name: 'BASIC',
    basePrice: basePrices.basic,
    features: [
      { text: '3 Platforms' },
      { text: '2 Post Per Week' },
      { text: 'Content Calendar' },
      { text: 'Monthly Reporting' },
      { text: 'Hashtag Optimization' },
    ],
  },
  {
    id: 'standard',
    name: 'STANDARD',
    basePrice: basePrices.standard,
    badge: 'Most Popular',
    features: [
      { text: '3 Platforms' },
      { text: '4 Post Per Week' },
      { text: 'Content Calendar' },
      { text: 'Monthly Reporting' },
      { text: 'Hashtag Optimization' },
      { text: 'Engagement Follower Growth' },
      { text: 'Boost Post', originalText: 'Boost Post Rs. 10k' },
    ],
    popular: true,
  },
  {
    id: 'premium',
    name: 'PREMIUM',
    basePrice: basePrices.premium,
    features: [
      { text: '3 Platforms' },
      { text: '6 Post Per Week' },
      { text: 'Content Calendar' },
      { text: 'Monthly Reporting' },
      { text: 'Hashtag Optimization' },
      { text: 'Engagement Follower Growth' },
      { text: 'Boost Post', originalText: 'Boost Post Rs. 20k' },
      { text: 'Dedicated Ads Manager' },
    ],
  },
]

export default function PackagesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [country, setCountry] = useState<string>('Pakistan')
  const [packages, setPackages] = useState<Package[]>(basePackages)

  useEffect(() => {
    // Detect country on mount
    const detectedCountry = detectCountry()
    setCountry(detectedCountry)
    
    // Update packages with converted prices
    const updatedPackages = basePackages.map((pkg) => {
      const updatedFeatures = pkg.features.map((feature) => {
        if (feature.originalText) {
          // Convert boost post prices
          const boostAmount = pkg.id === 'standard' ? basePrices.boostPost10k : basePrices.boostPost20k
          const currency = countryToCurrency[detectedCountry] || countryToCurrency['Pakistan']
          const convertedBoost = boostAmount * currency.rateToPKR
          const boostFormatted = convertedBoost >= 1000 
            ? `${currency.symbol}${(convertedBoost / 1000).toFixed(1)}k`
            : `${currency.symbol}${Math.round(convertedBoost).toLocaleString()}`
          
          return {
            ...feature,
            text: `Boost Post ${boostFormatted}`,
          }
        }
        return feature
      })
      
      return {
        ...pkg,
        features: updatedFeatures,
      }
    })
    
    setPackages(updatedPackages)
  }, [])

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
            Choose Your Package
          </h2>
          <p className="text-lg sm:text-xl text-text-light max-w-2xl mx-auto">
            Select the perfect plan to scale your brand's growth
          </p>
          <div className="w-24 h-1 bg-gradient-accent mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {packages.map((pkg, index) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              index={index}
              isInView={isInView}
              country={country}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function PackageCard({
  pkg,
  index,
  isInView,
  country,
}: {
  pkg: Package
  index: number
  isInView: boolean
  country: string
}) {
  const isPopular = pkg.popular

  return (
    <motion.div
      className={`relative ${isPopular ? 'md:-mt-4 md:mb-4' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.6 }}
    >
      {/* Popular Badge */}
      {pkg.badge && (
        <motion.div
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.2 + 0.3, type: 'spring', stiffness: 200 }}
        >
          <span className="bg-gradient-accent text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
            {pkg.badge}
          </span>
        </motion.div>
      )}

      {/* Glow Effect for Popular Package */}
      {isPopular && (
        <motion.div
          className="absolute -inset-1 bg-gradient-accent rounded-2xl blur-xl opacity-30"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Card */}
      <motion.div
        className={`relative h-full p-8 rounded-2xl shadow-lg transition-all duration-300 ${
          isPopular
            ? 'bg-gradient-to-br from-white to-blue-50 border-2 border-secondary scale-105'
            : 'bg-white border border-gray-200'
        }`}
        whileHover={{ y: -8, scale: isPopular ? 1.08 : 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Package Name & Price */}
        <div className="text-center mb-6">
          <h3
            className={`text-2xl sm:text-3xl font-bold mb-2 ${
              isPopular ? 'bg-gradient-accent bg-clip-text text-transparent' : 'text-primary'
            }`}
          >
            {pkg.name}
          </h3>
          <p className="text-xl sm:text-2xl font-semibold text-secondary mb-2">
            {formatPrice(pkg.basePrice, country)}
          </p>
          {isPopular && (
            <motion.div
              className="w-16 h-1 bg-gradient-accent mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: 64 } : {}}
              transition={{ delay: index * 0.2 + 0.4, duration: 0.5 }}
            />
          )}
        </div>

        {/* Features List */}
        <ul className="space-y-4 mb-8">
          {pkg.features.map((feature, idx) => (
            <motion.li
              key={idx}
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2 + 0.1 * (idx + 1), duration: 0.4 }}
            >
              <FiCheck className="text-secondary mr-3 mt-1 flex-shrink-0" />
              <span className="text-text-light">{feature.text}</span>
            </motion.li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link href={`/contact?package=${pkg.id}`}>
          <motion.button
            className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
              isPopular
                ? 'bg-gradient-accent shadow-lg hover:shadow-xl'
                : 'bg-gradient-blue hover:bg-gradient-to-r hover:from-secondary hover:to-blue-600'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2 + 0.6, duration: 0.4 }}
          >
            Get This Package
          </motion.button>
        </Link>

        {/* Additional Glow for Popular on Hover */}
        {isPopular && (
          <motion.div
            className="absolute inset-0 bg-gradient-accent rounded-2xl opacity-0 pointer-events-none"
            whileHover={{ opacity: 0.1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

