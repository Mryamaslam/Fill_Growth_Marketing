'use client'

import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { FiStar, FiMessageCircle, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface Review {
  id: number
  name: string
  company: string
  role: string
  rating: number
  comment: string
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    company: 'TechStart Inc.',
    role: 'Digital Marketing Manager',
    rating: 5,
    comment:
      'Fill Growth Marketing transformed our online presence. Their Meta Ads and content strategy took us from testing campaigns to a predictable acquisition machine.',
  },
  {
    id: 2,
    name: 'Rodger Afflback',
    company: 'CircaChannel',
    role: 'Head of Performance',
    rating: 5,
    comment:
      'The team understood our brand vision from day one. Their integrated paid and organic strategy made our message cohesive across every channel and every touchpoint.',
  },
  {
    id: 3,
    name: 'Rebecca Lawson',
    company: 'Northline Studio',
    role: 'Founder & Creative Director',
    rating: 5,
    comment:
      'From launch funnels to always-on campaigns, they treat our brand like their own. Reporting is clear, decisions are data-led, and results are consistently strong.',
  },
  {
    id: 4,
    name: 'Daniel Carter',
    company: 'VistaSupply',
    role: 'E‑commerce Lead',
    rating: 5,
    comment:
      'Our paid social was stuck. Fill Growth Marketing rebuilt our creative and audiences, turning a flat channel into one of our highest ROI investments.',
  },
  {
    id: 5,
    name: 'Ayesha Khan',
    company: 'Nimbus Cloud',
    role: 'VP Growth',
    rating: 5,
    comment:
      'They plug in like an internal growth squad — from experimentation roadmap to weekly standups. We finally have a partner that understands B2B SaaS economics.',
  },
]

export default function Reviews() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [startIndex, setStartIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)

  const visibleReviews = [0, 1, 2].map((offset) => {
    const index = (startIndex + offset) % reviews.length
    return reviews[index]
  })

  const handleNext = () => {
    setDirection(1)
    setStartIndex((prev) => (prev + 1) % reviews.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setStartIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  // Auto-advance every few seconds (pauses when section not in view)
  useEffect(() => {
    if (!isInView) return

    const timer = setTimeout(() => {
      setDirection(1)
      setStartIndex((prev) => (prev + 1) % reviews.length)
    }, 6000) // 6 seconds

    return () => clearTimeout(timer)
  }, [startIndex, isInView])

  return (
    <section ref={ref} className="py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-slate-50 via-white to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-10 sm:mb-12 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold tracking-[0.3em] text-secondary uppercase mb-3">
            Testimonial
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
            Words From Our Customers
          </h2>
          <p className="text-base sm:text-lg text-text-light">
            Brands across SaaS, e‑commerce, and services partner with Fill Growth Marketing to scale
            predictable revenue and long‑term loyalty.
          </p>
        </motion.div>

        {/* Reviews Row (3 at a time, sliding by 1) with side arrows */}
        <div className="relative mt-4">
          {/* Left arrow (desktop) */}
          <button
            type="button"
            onClick={handlePrev}
            className="hidden md:flex absolute -left-10 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-primary shadow-sm hover:border-secondary hover:text-secondary transition-colors"
            aria-label="Previous testimonials"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>

          {/* Right arrow (desktop) */}
          <button
            type="button"
            onClick={handleNext}
            className="hidden md:flex absolute -right-10 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-primary shadow-sm hover:border-secondary hover:text-secondary transition-colors"
            aria-label="Next testimonials"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>

          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={startIndex}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10"
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              variants={{
                enter: (dir: 1 | -1) => ({
                  x: dir > 0 ? 80 : -80,
                  opacity: 0,
                }),
                center: {
                  x: 0,
                  opacity: 1,
                },
                exit: (dir: 1 | -1) => ({
                  x: dir > 0 ? -80 : 80,
                  opacity: 0,
                }),
              }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
            >
              {visibleReviews.map((review, index) => {
                const isFeatured = index === 1

                return (
                  <motion.article
                    key={review.id}
                    className={`relative rounded-3xl bg-white border border-slate-100 shadow-lg shadow-slate-200/60 px-6 py-8 sm:px-8 sm:py-10 flex flex-col justify-between ${
                      isFeatured ? 'lg:-mt-4 lg:mb-4 lg:shadow-xl lg:shadow-secondary/20' : ''
                    }`}
                    whileHover={{ y: -6, boxShadow: '0 25px 50px -12px rgba(15,23,42,0.15)' }}
                  >
                    {/* Quote Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-full bg-gradient-accent text-white flex items-center justify-center text-xl shadow-md">
                          <FiMessageCircle />
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-semibold text-primary">
                            {review.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-text-light">
                            {review.role} · {review.company}
                          </p>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1 text-secondary">
                        {[...Array(review.rating)].map((_, i) => (
                          <FiStar key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>

                    {/* Comment */}
                    <p className="text-sm sm:text-base text-text-light leading-relaxed">
                      “{review.comment}”
                    </p>
                  </motion.article>
                )
              })}
            </motion.div>
          </AnimatePresence>

          {/* Mobile arrows under cards */}
          <div className="mt-6 flex justify-center gap-4 md:hidden">
            <button
              type="button"
              onClick={handlePrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-primary shadow-sm hover:border-secondary hover:text-secondary transition-colors"
              aria-label="Previous testimonials"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-primary shadow-sm hover:border-secondary hover:text-secondary transition-colors"
              aria-label="Next testimonials"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

