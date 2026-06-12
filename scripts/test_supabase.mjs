import { readFileSync } from 'fs'
import { createClient } from '@supabase/supabase-js'

const env = readFileSync(new URL('../.env', import.meta.url), 'utf8')
const get = (k) => {
  const line = env.split(/\r?\n/).find((l) => l.startsWith(k + '='))
  return line ? line.slice(k.length + 1).trim() : ''
}

const supabase = createClient(get('NEXT_PUBLIC_SUPABASE_URL'), get('NEXT_PUBLIC_SUPABASE_ANON_KEY'))
await supabase.from('leads').delete().eq('email', 'supatest@example.com')
console.log('Test lead removed.')
