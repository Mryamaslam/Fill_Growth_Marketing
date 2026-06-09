'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/packages', label: 'Packages' },
    { href: '/team', label: 'Team' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${
        scrolled
          ? 'bg-white/95 shadow-xl py-3'
          : 'bg-gradient-to-b from-black/20 to-transparent py-5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="flex items-center gap-2.5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/logo.png"
                alt="Fill Growth Marketing logo"
                width={44}
                height={44}
                priority
                className={`h-10 w-10 sm:h-11 sm:w-11 object-contain ${
                  scrolled ? '' : 'drop-shadow-lg'
                }`}
              />
              <span className={`text-lg font-bold hidden sm:block ${
                scrolled ? 'text-primary' : 'text-white drop-shadow-md'
              }`}>
                Fill Growth Marketing
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.span
                  className={`font-semibold text-sm transition-all relative ${
                    pathname === link.href
                      ? scrolled
                        ? 'text-secondary'
                        : 'text-white'
                      : scrolled
                      ? 'text-gray-700 hover:text-primary'
                      : 'text-gray-100 hover:text-white'
                  }`}
                  whileHover={{ y: -2 }}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.span
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                      layoutId="navbar-indicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.span>
              </Link>
            ))}
            <motion.button
              onClick={() => {
                if (pathname === '/') {
                  const contactSection = document.getElementById('contact')
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                } else {
                  window.location.href = '/#contact'
                }
              }}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-all ${
                scrolled
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl'
                  : 'bg-white text-primary hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled 
                ? 'text-primary hover:bg-gray-100' 
                : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            className={`md:hidden mt-4 pb-4 rounded-2xl ${
              scrolled 
                ? 'bg-white shadow-xl' 
                : 'bg-white/95 backdrop-blur-md shadow-2xl'
            }`}
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 space-y-2 pt-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    className={`py-3 px-4 rounded-lg font-semibold transition-colors ${
                      pathname === link.href
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'text-primary hover:bg-gray-100'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {link.label}
                  </motion.div>
                </Link>
              ))}
              <motion.button
                className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg"
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setMobileMenuOpen(false)
                  setTimeout(() => {
                    if (pathname === '/') {
                      const contactSection = document.getElementById('contact')
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }
                    } else {
                      window.location.href = '/#contact'
                    }
                  }, 100)
                }}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

