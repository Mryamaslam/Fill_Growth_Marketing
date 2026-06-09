// Currency conversion utility
// Base currency: PKR (Pakistani Rupee)

export interface CurrencyInfo {
  code: string
  symbol: string
  name: string
  rateToPKR: number // Exchange rate from PKR to this currency
}

// Country to Currency mapping
export const countryToCurrency: Record<string, CurrencyInfo> = {
  // South Asia
  'Pakistan': { code: 'PKR', symbol: 'Rs.', name: 'Pakistani Rupee', rateToPKR: 1 },
  'India': { code: 'INR', symbol: '₹', name: 'Indian Rupee', rateToPKR: 0.34 },
  'Bangladesh': { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', rateToPKR: 0.34 },
  'Sri Lanka': { code: 'LKR', symbol: 'Rs.', name: 'Sri Lankan Rupee', rateToPKR: 0.12 },
  'Nepal': { code: 'NPR', symbol: 'Rs.', name: 'Nepalese Rupee', rateToPKR: 0.34 },
  
  // North America
  'United States': { code: 'USD', symbol: '$', name: 'US Dollar', rateToPKR: 0.0036 },
  'Canada': { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rateToPKR: 0.0049 },
  'Mexico': { code: 'MXN', symbol: '$', name: 'Mexican Peso', rateToPKR: 0.061 },
  
  // Europe
  'United Kingdom': { code: 'GBP', symbol: '£', name: 'British Pound', rateToPKR: 0.0028 },
  'Germany': { code: 'EUR', symbol: '€', name: 'Euro', rateToPKR: 0.0033 },
  'France': { code: 'EUR', symbol: '€', name: 'Euro', rateToPKR: 0.0033 },
  'Italy': { code: 'EUR', symbol: '€', name: 'Euro', rateToPKR: 0.0033 },
  'Spain': { code: 'EUR', symbol: '€', name: 'Euro', rateToPKR: 0.0033 },
  'Netherlands': { code: 'EUR', symbol: '€', name: 'Euro', rateToPKR: 0.0033 },
  'Belgium': { code: 'EUR', symbol: '€', name: 'Euro', rateToPKR: 0.0033 },
  'Switzerland': { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', rateToPKR: 0.0032 },
  'Austria': { code: 'EUR', symbol: '€', name: 'Euro', rateToPKR: 0.0033 },
  'Sweden': { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', rateToPKR: 0.037 },
  'Norway': { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', rateToPKR: 0.038 },
  'Denmark': { code: 'DKK', symbol: 'kr', name: 'Danish Krone', rateToPKR: 0.025 },
  'Finland': { code: 'EUR', symbol: '€', name: 'Euro', rateToPKR: 0.0033 },
  'Poland': { code: 'PLN', symbol: 'zł', name: 'Polish Zloty', rateToPKR: 0.014 },
  'Portugal': { code: 'EUR', symbol: '€', name: 'Euro', rateToPKR: 0.0033 },
  'Ireland': { code: 'EUR', symbol: '€', name: 'Euro', rateToPKR: 0.0033 },
  'Greece': { code: 'EUR', symbol: '€', name: 'Euro', rateToPKR: 0.0033 },
  'Czech Republic': { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna', rateToPKR: 0.082 },
  'Romania': { code: 'RON', symbol: 'lei', name: 'Romanian Leu', rateToPKR: 0.016 },
  'Hungary': { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint', rateToPKR: 1.3 },
  'Bulgaria': { code: 'BGN', symbol: 'лв', name: 'Bulgarian Lev', rateToPKR: 0.0065 },
  
  // Asia Pacific
  'China': { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', rateToPKR: 0.026 },
  'Japan': { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rateToPKR: 0.54 },
  'South Korea': { code: 'KRW', symbol: '₩', name: 'South Korean Won', rateToPKR: 4.8 },
  'Singapore': { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rateToPKR: 0.0048 },
  'Malaysia': { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', rateToPKR: 0.017 },
  'Thailand': { code: 'THB', symbol: '฿', name: 'Thai Baht', rateToPKR: 0.13 },
  'Indonesia': { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', rateToPKR: 56 },
  'Philippines': { code: 'PHP', symbol: '₱', name: 'Philippine Peso', rateToPKR: 0.20 },
  'Vietnam': { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', rateToPKR: 88 },
  'Australia': { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rateToPKR: 0.0054 },
  'New Zealand': { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', rateToPKR: 0.0059 },
  
  // Middle East
  'United Arab Emirates': { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', rateToPKR: 0.013 },
  'Saudi Arabia': { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', rateToPKR: 0.013 },
  'Qatar': { code: 'QAR', symbol: '﷼', name: 'Qatari Riyal', rateToPKR: 0.013 },
  'Kuwait': { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar', rateToPKR: 0.0011 },
  'Bahrain': { code: 'BHD', symbol: '.د.ب', name: 'Bahraini Dinar', rateToPKR: 0.0014 },
  'Oman': { code: 'OMR', symbol: '﷼', name: 'Omani Rial', rateToPKR: 0.0014 },
  'Egypt': { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound', rateToPKR: 0.17 },
  
  // Africa
  'South Africa': { code: 'ZAR', symbol: 'R', name: 'South African Rand', rateToPKR: 0.066 },
  'Nigeria': { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', rateToPKR: 5.8 },
  'Kenya': { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', rateToPKR: 0.47 },
  
  // South America
  'Brazil': { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', rateToPKR: 0.018 },
  'Argentina': { code: 'ARS', symbol: '$', name: 'Argentine Peso', rateToPKR: 0.31 },
  'Chile': { code: 'CLP', symbol: '$', name: 'Chilean Peso', rateToPKR: 3.4 },
  'Colombia': { code: 'COP', symbol: '$', name: 'Colombian Peso', rateToPKR: 14 },
  'Peru': { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol', rateToPKR: 0.013 },
  
  // Default fallback
  'Other': { code: 'USD', symbol: '$', name: 'US Dollar', rateToPKR: 0.0036 },
}

// Base prices in PKR
export const basePrices = {
  basic: 20000,
  standard: 40000,
  premium: 60000,
  boostPost10k: 10000,
  boostPost20k: 20000,
}

// Detect country from browser locale or use default
export function detectCountry(): string {
  if (typeof window === 'undefined') return 'Pakistan'

  // If user has explicitly chosen a country before, respect that
  try {
    const storedCountry = window.localStorage.getItem('fgm_country')
    if (storedCountry && countryToCurrency[storedCountry]) {
      return storedCountry
    }
  } catch {
    // ignore storage errors
  }

  // Try to detect from timezone first (helps users in Pakistan with US locale)
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (timeZone === 'Asia/Karachi') {
      return 'Pakistan'
    }
  } catch {
    // ignore timezone errors
  }
  
  // Try to get country from browser locale
  const locale = navigator.language || navigator.languages?.[0] || 'en-US'
  const countryCode = locale.split('-')[1]?.toUpperCase()
  
  // Map country codes to country names
  const countryCodeMap: Record<string, string> = {
    'PK': 'Pakistan',
    'IN': 'India',
    'BD': 'Bangladesh',
    'LK': 'Sri Lanka',
    'NP': 'Nepal',
    'US': 'United States',
    'GB': 'United Kingdom',
    'CA': 'Canada',
    'AU': 'Australia',
    'DE': 'Germany',
    'FR': 'France',
    'IT': 'Italy',
    'ES': 'Spain',
    'NL': 'Netherlands',
    'BE': 'Belgium',
    'CH': 'Switzerland',
    'AT': 'Austria',
    'SE': 'Sweden',
    'NO': 'Norway',
    'DK': 'Denmark',
    'FI': 'Finland',
    'PL': 'Poland',
    'PT': 'Portugal',
    'IE': 'Ireland',
    'GR': 'Greece',
    'CN': 'China',
    'JP': 'Japan',
    'KR': 'South Korea',
    'SG': 'Singapore',
    'MY': 'Malaysia',
    'TH': 'Thailand',
    'ID': 'Indonesia',
    'PH': 'Philippines',
    'VN': 'Vietnam',
    'NZ': 'New Zealand',
    'AE': 'United Arab Emirates',
    'SA': 'Saudi Arabia',
    'QA': 'Qatar',
    'KW': 'Kuwait',
    'BH': 'Bahrain',
    'OM': 'Oman',
    'EG': 'Egypt',
    'ZA': 'South Africa',
    'NG': 'Nigeria',
    'KE': 'Kenya',
    'BR': 'Brazil',
    'AR': 'Argentina',
    'CL': 'Chile',
    'CO': 'Colombia',
    'PE': 'Peru',
    'MX': 'Mexico',
  }
  
  const country = countryCode ? countryCodeMap[countryCode] : null
  return country || 'Pakistan' // Default to Pakistan
}

// Convert PKR amount to target currency
export function convertCurrency(amountPKR: number, country: string): { amount: number; formatted: string; currency: CurrencyInfo } {
  const currency = countryToCurrency[country] || countryToCurrency['Pakistan']
  const convertedAmount = amountPKR * currency.rateToPKR
  
  // Format the amount
  let formatted: string
  if (convertedAmount >= 1000) {
    formatted = `${currency.symbol}${(convertedAmount / 1000).toFixed(1)}k`
  } else if (convertedAmount >= 1) {
    formatted = `${currency.symbol}${Math.round(convertedAmount).toLocaleString()}`
  } else {
    formatted = `${currency.symbol}${convertedAmount.toFixed(2)}`
  }
  
  return {
    amount: convertedAmount,
    formatted: formatted + '/month',
    currency,
  }
}

// Format price with currency
export function formatPrice(amountPKR: number, country: string): string {
  const { formatted } = convertCurrency(amountPKR, country)
  return formatted
}

