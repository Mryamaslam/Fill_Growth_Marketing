'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { FiMail, FiPhone, FiMapPin, FiCheck } from 'react-icons/fi'
import { services } from '@/data/services'

const packageNames: Record<string, string> = {
  basic: 'BASIC Package (Rs. 20k/month)',
  standard: 'STANDARD Package (Rs. 40k/month)',
  premium: 'PREMIUM Package (Rs. 60k/month)',
}

const countries = [
  'Pakistan', 'India', 'Bangladesh', 'Sri Lanka', 'Nepal',
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Italy', 'Spain',
  'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Sweden', 'Norway', 'Denmark', 'Finland',
  'Poland', 'Portugal', 'Ireland', 'Greece', 'Czech Republic', 'Romania', 'Hungary', 'Bulgaria',
  'China', 'Japan', 'South Korea', 'Singapore', 'Malaysia', 'Thailand', 'Indonesia', 'Philippines',
  'Vietnam', 'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain', 'Oman', 'Egypt',
  'South Africa', 'Nigeria', 'Kenya', 'Brazil', 'Mexico', 'Argentina', 'Chile', 'Colombia', 'Peru',
  'New Zealand', 'Other'
]

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    service: '',
    message: '',
    package: '',
  })

  useEffect(() => {
    const packageParam = searchParams.get('package')
    if (packageParam && packageNames[packageParam]) {
      const packageName = packageNames[packageParam]
      setFormData((prev) => ({
        ...prev,
        package: packageParam,
        message: `I'm interested in the ${packageName}. Please contact me with more details.`,
      }))
    }
  }, [searchParams])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required'
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required'
    } else if (formData.city.trim().length < 2) {
      newErrors.city = 'City must be at least 2 characters'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('idle')

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      const basePath = process.env.NODE_ENV === 'production' ? '/Fill_Growth_Marketing' : ''
      // Include package info in the submission
      const submissionData = {
        ...formData,
        packageInfo: formData.package ? packageNames[formData.package] : null,
      }
      
      // Add timeout for faster user feedback (10 seconds max)
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)
      
      const response = await fetch(`${basePath}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form')
      }

      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', country: '', city: '', service: '', message: '', package: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error: any) {
      if (error.name === 'AbortError') {
        setSubmitStatus('error')
        setErrors({ submit: 'Request timed out. Please check your connection and try again.' })
      } else {
        setSubmitStatus('error')
        setErrors({ submit: error.message || 'Failed to submit form. Please try again.' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

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
            Get In Touch
          </h2>
          <p className="text-lg sm:text-xl text-text-light max-w-2xl mx-auto">
            Ready to grow your brand? Let's discuss how we can help you achieve your goals.
          </p>
          <div className="w-24 h-1 bg-gradient-accent mx-auto rounded-full mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 sm:p-12"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-primary mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </motion.div>

              {/* Country */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.55 }}
              >
                <label htmlFor="country" className="block text-sm font-medium text-primary mb-2">
                  Country *
                </label>
                <select
                  id="country"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all ${
                    errors.country ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select your country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="mt-1 text-sm text-red-500">{errors.country}</p>
                )}
              </motion.div>

              {/* City */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                <label htmlFor="city" className="block text-sm font-medium text-primary mb-2">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Your city"
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                )}
              </motion.div>

              {/* Package Selection Indicator */}
              {formData.package && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.65 }}
                  className="p-4 bg-gradient-accent bg-opacity-10 border border-secondary rounded-lg"
                >
                  <p className="text-sm font-medium text-primary mb-1">Selected Package:</p>
                  <p className="text-secondary font-semibold">{packageNames[formData.package]}</p>
                </motion.div>
              )}

              {/* Service Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
              >
                <label htmlFor="service" className="block text-sm font-medium text-primary mb-2">
                  Service
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.75 }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-all resize-none ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tell us about your project..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </motion.div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 flex items-center"
                >
                  <FiCheck className="mr-2 text-green-600" />
                  Thank you! Your message has been sent. We'll get back to you soon.
                </motion.div>
              )}
              {errors.submit && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800"
                >
                  {errors.submit}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-accent text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.85 }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            {/* Contact Information */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-8"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-primary mb-6">Contact Information</h3>
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-start">
                    <FiMail className="text-secondary mr-4 mt-1 flex-shrink-0 w-6 h-6" />
                    <div>
                      <p className="font-semibold text-primary mb-1">Email</p>
                      <a
                        href="mailto:hello@fillgrowthmarketing.com"
                        className="text-secondary hover:underline"
                      >
                        hello@fillgrowthmarketing.com
                      </a>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-start">
                    <FiPhone className="text-secondary mr-4 mt-1 flex-shrink-0 w-6 h-6" />
                    <div>
                      <p className="font-semibold text-primary mb-1">Phone</p>
                      <a href="tel:+1234567890" className="text-secondary hover:underline">
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-start">
                    <FiMapPin className="text-secondary mr-4 mt-1 flex-shrink-0 w-6 h-6" />
                    <div>
                      <p className="font-semibold text-primary mb-1">Address</p>
                      <p className="text-text-light">
                        123 Marketing Street<br />
                        Business District, City 12345
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Google Map */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.184132038576!2d-73.98811768459398!3d40.75889597932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

