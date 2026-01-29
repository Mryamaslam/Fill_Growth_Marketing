'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { FiTrendingUp, FiZap, FiDollarSign } from 'react-icons/fi'

interface StatProps {
  value: number
  suffix?: string
  label: string
  delay: number
}

function AnimatedStat({ value, suffix = '', label, delay }: StatProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
    >
      <motion.div
        className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-accent bg-clip-text text-transparent mb-2"
        initial={{ scale: 0.8 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: delay + 0.2, type: 'spring', stiffness: 200 }}
      >
        {count}{suffix}
      </motion.div>
      <p className="text-text-light text-lg sm:text-xl">{label}</p>
    </motion.div>
  )
}

export default function AboutUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 sm:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white shadow-xl shadow-primary/5 border border-slate-100 px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
            {/* Left: heading + narrative + pillars */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-semibold tracking-[0.25em] text-secondary uppercase mb-3">
                About Us
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 leading-tight">
                About Fill Growth Marketing
              </h2>
              <div className="h-1 w-24 bg-gradient-accent rounded-full mb-6" />

              <p className="text-base sm:text-lg text-text-light leading-relaxed mb-4 max-w-2xl">
                At <span className="font-semibold text-primary">Fill Growth Marketing</span>, we
                partner with ambitious brands to build predictable, scalable growth engines. Our
                team blends performance marketing, creative strategy, and deep analytics to deliver
                campaigns that don&apos;t just look good — they move real business metrics.
              </p>
              <p className="text-base sm:text-lg text-text-light leading-relaxed mb-8 max-w-2xl">
                From acquisition to retention, we obsess over the full funnel: audience insights,
                messaging, landing experiences, and lifetime value. Every decision is backed by
                data, tested in market, and refined continuously.
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                <motion.div
                  className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 sm:p-5 hover:border-secondary hover:bg-white transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="mb-3 text-secondary">
                    <FiTrendingUp className="w-7 h-7" />
                  </div>
                  <h3 className="text-sm font-semibold text-primary mb-1">Growth First</h3>
                  <p className="text-xs sm:text-sm text-text-light">
                    Full-funnel strategies designed to compound revenue month over month.
                  </p>
                </motion.div>

                <motion.div
                  className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 sm:p-5 hover:border-secondary hover:bg-white transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.25, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="mb-3 text-secondary">
                    <FiZap className="w-7 h-7" />
                  </div>
                  <h3 className="text-sm font-semibold text-primary mb-1">Performance Obsessed</h3>
                  <p className="text-xs sm:text-sm text-text-light">
                    Constant testing, creative iteration, and optimization to hit your KPIs.
                  </p>
                </motion.div>

                <motion.div
                  className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 sm:p-5 hover:border-secondary hover:bg-white transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.35, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="mb-3 text-secondary">
                    <FiDollarSign className="w-7 h-7" />
                  </div>
                  <h3 className="text-sm font-semibold text-primary mb-1">ROI Focused</h3>
                  <p className="text-xs sm:text-sm text-text-light">
                    Every channel and tactic is measured against real return on ad spend.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: stats panel */}
            <motion.div
              className="rounded-3xl bg-gradient-to-br from-primary to-secondary px-6 py-8 sm:px-8 sm:py-10 text-white shadow-lg shadow-primary/40"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-white/70">
                By the numbers
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold mb-6">
                A growth partner trusted by ambitious teams.
              </h3>

              <div className="grid grid-cols-1 gap-6">
                <AnimatedStat value={500} suffix="+" label="Clients Served" delay={0.1} />
                <AnimatedStat value={2000} suffix="+" label="Campaigns Shipped" delay={0.2} />
                <AnimatedStat value={50} suffix="+" label="Industries Supported" delay={0.3} />
              </div>

              <p className="mt-6 text-sm text-white/80 leading-relaxed">
                From fast-moving startups to established enterprises, we plug in as an extension of
                your team — aligning on strategy, reporting transparently, and owning the results.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

