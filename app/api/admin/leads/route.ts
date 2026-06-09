import { NextRequest, NextResponse } from 'next/server'
import { getLeads } from '@/lib/leadsStore'
import { isAdminAuthenticatedRequest } from '@/lib/adminAuth'

export async function GET(request: NextRequest) {
  try {
    if (!isAdminAuthenticatedRequest(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)

    const filters = {
      search: searchParams.get('search') || undefined,
      country: searchParams.get('country') || undefined,
      service: searchParams.get('service') || undefined,
      from: searchParams.get('from') || undefined,
      to: searchParams.get('to') || undefined,
    }

    const leads = getLeads(filters)

    return NextResponse.json({ leads }, { status: 200 })
  } catch (error) {
    console.error('Error fetching leads from SQLite:', error)
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
  }
}


