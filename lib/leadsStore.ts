import { neon } from '@neondatabase/serverless'

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

export interface LeadFilters {
  search?: string
  country?: string
  service?: string
  from?: string
  to?: string
}

const databaseUrl = process.env.DATABASE_URL

function getSql() {
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not defined. Please set it in your environment variables.')
  }
  return neon(databaseUrl)
}

let tableReady: Promise<void> | null = null

function ensureTable() {
  if (!tableReady) {
    const sql = getSql()
    tableReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS leads (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          country TEXT,
          city TEXT,
          service TEXT,
          message TEXT NOT NULL,
          source TEXT DEFAULT 'contact',
          package_id TEXT,
          package_info TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `
    })().catch((err) => {
      // Reset so a later call can retry table creation.
      tableReady = null
      throw err
    })
  }
  return tableReady
}

export async function insertLead(lead: LeadInput) {
  const sql = getSql()
  await ensureTable()

  await sql`
    INSERT INTO leads (name, email, phone, country, city, service, message, source, package_id, package_info)
    VALUES (
      ${lead.name},
      ${lead.email},
      ${lead.phone ?? null},
      ${lead.country ?? null},
      ${lead.city ?? null},
      ${lead.service ?? null},
      ${lead.message},
      ${lead.source || 'contact'},
      ${lead.packageId ?? null},
      ${lead.packageInfo ?? null}
    )
  `
}

export async function getLeads(filters: LeadFilters = {}): Promise<LeadRecord[]> {
  const sql = getSql()
  await ensureTable()

  const conditions: string[] = []
  const values: unknown[] = []

  if (filters.search) {
    values.push(`%${filters.search.toLowerCase()}%`)
    const idx = values.length
    conditions.push(
      `(LOWER(name) LIKE $${idx} OR LOWER(email) LIKE $${idx} OR LOWER(message) LIKE $${idx})`
    )
  }

  if (filters.country) {
    values.push(filters.country.toLowerCase())
    conditions.push(`LOWER(country) = $${values.length}`)
  }

  if (filters.service) {
    values.push(`%${filters.service.toLowerCase()}%`)
    conditions.push(`LOWER(service) LIKE $${values.length}`)
  }

  if (filters.from) {
    values.push(new Date(filters.from).toISOString())
    conditions.push(`created_at >= $${values.length}`)
  }

  if (filters.to) {
    values.push(new Date(filters.to).toISOString())
    conditions.push(`created_at <= $${values.length}`)
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
  const query = `
    SELECT id, name, email, phone, country, city, service, message, source,
           package_id, package_info, created_at
    FROM leads
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT 200
  `

  const rows = (await getSql().query(query, values)) as Array<Record<string, unknown>>

  return rows.map((row) => ({
    id: row.id as number,
    name: row.name as string,
    email: row.email as string,
    phone: (row.phone as string) ?? undefined,
    country: (row.country as string) ?? undefined,
    city: (row.city as string) ?? undefined,
    service: (row.service as string) ?? undefined,
    message: row.message as string,
    source: (row.source as string) ?? 'contact',
    packageId: (row.package_id as string) ?? undefined,
    packageInfo: (row.package_info as string) ?? null,
    createdAt: new Date(row.created_at as string).toISOString(),
  }))
}
