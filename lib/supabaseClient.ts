import { createClient } from '@supabase/supabase-js'

// These are public values (safe to expose in the browser).
// The anon key only allows what your Row Level Security policies permit.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export interface LeadInput {
  name: string
  email: string
  phone?: string
  country?: string
  city?: string
  service?: string
  message: string
  source?: string
  package_id?: string | null
  package_info?: string | null
}

export async function submitLead(lead: LeadInput) {
  if (!supabase) {
    throw new Error('Form is not configured yet. Please try again later.')
  }

  const { error } = await supabase.from('leads').insert([
    {
      name: lead.name,
      email: lead.email,
      phone: lead.phone || null,
      country: lead.country || null,
      city: lead.city || null,
      service: lead.service || null,
      message: lead.message,
      source: lead.source || 'contact',
      package_id: lead.package_id || null,
      package_info: lead.package_info || null,
    },
  ])

  if (error) {
    throw new Error(error.message)
  }
}
