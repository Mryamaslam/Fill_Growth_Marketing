import fs from 'fs'
import path from 'path'

export interface LeadInput {
  name: string
  email: string
  phone?: string
  country?: string
  city?: string
  service?: string
  message: string
  source?: string
  packageId?: string
  packageInfo?: string | null
}

export interface LeadRecord extends LeadInput {
  id: number
  createdAt: string
}

const leadsFilePath = path.join(process.cwd(), 'leads.json')

function ensureFile() {
  if (!fs.existsSync(leadsFilePath)) {
    fs.writeFileSync(leadsFilePath, '[]', 'utf8')
  }
}

function readAllLeads(): LeadRecord[] {
  ensureFile()
  try {
    const raw = fs.readFileSync(leadsFilePath, 'utf8')
    const data = JSON.parse(raw)
    if (Array.isArray(data)) {
      return data as LeadRecord[]
    }
    return []
  } catch {
    return []
  }
}

function writeAllLeads(leads: LeadRecord[]) {
  fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2), 'utf8')
}

export function insertLead(lead: LeadInput) {
  const leads = readAllLeads()
  const nextId = leads.length ? leads[0].id + 1 : 1
  const record: LeadRecord = {
    ...lead,
    id: nextId,
    createdAt: new Date().toISOString(),
    source: lead.source || 'contact',
    packageInfo: lead.packageInfo ?? null,
  }
  leads.unshift(record)
  writeAllLeads(leads)
}

export interface LeadFilters {
  search?: string
  country?: string
  service?: string
  from?: string
  to?: string
}

export function getLeads(filters: LeadFilters = {}) {
  let leads = readAllLeads()

  if (filters.search) {
    const term = filters.search.toLowerCase()
    leads = leads.filter(
      (l) =>
        l.name.toLowerCase().includes(term) ||
        l.email.toLowerCase().includes(term) ||
        l.message.toLowerCase().includes(term)
    )
  }

  if (filters.country) {
    leads = leads.filter((l) => (l.country || '').toLowerCase() === filters.country!.toLowerCase())
  }

  if (filters.service) {
    leads = leads.filter((l) => (l.service || '').toLowerCase().includes(filters.service!.toLowerCase()))
  }

  if (filters.from) {
    const fromDate = new Date(filters.from)
    leads = leads.filter((l) => new Date(l.createdAt) >= fromDate)
  }

  if (filters.to) {
    const toDate = new Date(filters.to)
    leads = leads.filter((l) => new Date(l.createdAt) <= toDate)
  }

  return leads.slice(0, 200)
}


