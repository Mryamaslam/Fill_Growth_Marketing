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

export async function signInAdmin(email: string, password: string) {
  if (!supabase) {
    throw new Error('Database is not configured yet.')
  }
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    throw new Error(error.message)
  }
}

export async function signOutAdmin() {
  if (!supabase) return
  await supabase.auth.signOut()
}

export async function getAdminSession() {
  if (!supabase) return null
  const { data } = await supabase.auth.getSession()
  return data.session
}

export interface LeadRow extends LeadInput {
  id: number
  created_at: string
}

export interface LeadQueryFilters {
  search?: string
  country?: string
  service?: string
}

export async function fetchLeads(filters: LeadQueryFilters = {}): Promise<LeadRow[]> {
  if (!supabase) {
    throw new Error('Database is not configured yet.')
  }

  let query = supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(500)

  if (filters.country) {
    query = query.ilike('country', `%${filters.country}%`)
  }
  if (filters.service) {
    query = query.ilike('service', `%${filters.service}%`)
  }
  if (filters.search) {
    const term = `%${filters.search}%`
    query = query.or(`name.ilike.${term},email.ilike.${term},message.ilike.${term}`)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(error.message)
  }

  return (data || []) as LeadRow[]
}
