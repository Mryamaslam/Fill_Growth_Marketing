import { readFileSync, existsSync } from 'fs'
import { neon } from '@neondatabase/serverless'

const env = readFileSync(new URL('../.env', import.meta.url), 'utf8')
const line = env.split(/\r?\n/).find((l) => l.startsWith('DATABASE_URL='))
const url = line ? line.slice('DATABASE_URL='.length).trim() : ''

if (!url) {
  console.error('FAIL: DATABASE_URL not found in .env')
  process.exit(1)
}

const leadsPath = new URL('../leads.json', import.meta.url)
if (!existsSync(leadsPath)) {
  console.log('No leads.json found, nothing to migrate.')
  process.exit(0)
}

const leads = JSON.parse(readFileSync(leadsPath, 'utf8'))
if (!Array.isArray(leads) || leads.length === 0) {
  console.log('leads.json is empty, nothing to migrate.')
  process.exit(0)
}

const sql = neon(url)

let migrated = 0
// Insert oldest first so created_at ordering stays natural.
for (const l of [...leads].reverse()) {
  // Skip if a lead with same email + created time already exists.
  const existing = await sql`
    SELECT id FROM leads WHERE email = ${l.email} AND created_at = ${l.createdAt}
  `
  if (existing.length > 0) continue

  await sql`
    INSERT INTO leads (name, email, phone, country, city, service, message, source, package_id, package_info, created_at)
    VALUES (
      ${l.name}, ${l.email}, ${l.phone ?? null}, ${l.country ?? null}, ${l.city ?? null},
      ${l.service ?? null}, ${l.message}, ${l.source || 'contact'},
      ${l.packageId ?? null}, ${l.packageInfo ?? null}, ${l.createdAt ?? new Date().toISOString()}
    )
  `
  migrated++
}

const count = await sql`SELECT COUNT(*)::int AS count FROM leads`
console.log(`DONE. Migrated ${migrated} lead(s). Total in Neon: ${count[0].count}`)
