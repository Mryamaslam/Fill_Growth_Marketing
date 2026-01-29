import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A2540',
          dark: '#0A2540',
        },
        secondary: {
          DEFAULT: '#2563EB',
          light: '#3B82F6',
        },
        accent: {
          cyan: '#22D3EE',
          purple: '#A855F7',
        },
        background: '#F8FAFC',
        text: {
          DEFAULT: '#0F172A',
          light: '#64748B',
        },
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #22D3EE 0%, #A855F7 100%)',
        'gradient-blue': 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'text-drop': 'textDrop 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        textDrop: {
          '0%': { transform: 'translateY(-50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config

