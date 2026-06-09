'use client'

import { useEffect, useState } from 'react'

interface Lead {
  id: number
  createdAt: string
  name: string
  email: string
  phone?: string
  country?: string
  city?: string
  service?: string
  message: string
  source?: string
  packageId?: string
  packageInfo?: string
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [leads, setLeads] = useState<Lead[]>([])
  const [filters, setFilters] = useState({
    search: '',
    country: '',
    service: '',
  })

  const fetchLeads = async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (filters.search) params.set('search', filters.search)
      if (filters.country) params.set('country', filters.country)
      if (filters.service) params.set('service', filters.service)

      const res = await fetch(`/api/admin/leads?${params.toString()}`, {
        credentials: 'include',
      })

      if (res.status === 401) {
        setIsLoggedIn(false)
        setLeads([])
        setLoading(false)
        return
      }

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch leads')
      }

      setLeads(data.leads || [])
      setIsLoggedIn(true)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch leads')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Login failed')
      }
      setUsername('')
      setPassword('')
      await fetchLeads()
    } catch (err: any) {
      setError(err.message || 'Login failed')
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logout: true }),
      })
      setIsLoggedIn(false)
      setLeads([])
    } catch {
      // ignore
    }
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleApplyFilters = (e: React.FormEvent) => {
    e.preventDefault()
    fetchLeads()
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl">🔐</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Admin Login
            </h1>
            <p className="text-gray-500 text-sm">Enter your credentials to access the admin panel</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                placeholder="Enter password"
                required
              />
            </div>
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
            >
              Sign In
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                📊 Leads Admin Panel
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Manage and track all leads collected from your website forms
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Stats Card */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-1">Total Leads</p>
                  <p className="text-3xl font-bold">{leads.length}</p>
                </div>
                <div className="text-4xl opacity-80">📈</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium mb-1">This Month</p>
                  <p className="text-3xl font-bold">
                    {leads.filter(
                      (lead) =>
                        new Date(lead.createdAt).getMonth() === new Date().getMonth() &&
                        new Date(lead.createdAt).getFullYear() === new Date().getFullYear()
                    ).length}
                  </p>
                </div>
                <div className="text-4xl opacity-80">📅</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium mb-1">Today</p>
                  <p className="text-3xl font-bold">
                    {leads.filter(
                      (lead) =>
                        new Date(lead.createdAt).toDateString() === new Date().toDateString()
                    ).length}
                  </p>
                </div>
                <div className="text-4xl opacity-80">✨</div>
              </div>
            </div>
          </div>
        )}

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            🔍 Filter Leads
          </h2>
          <form onSubmit={handleApplyFilters} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Name, email, message..."
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
              <input
                type="text"
                name="country"
                value={filters.country}
                onChange={handleFilterChange}
                placeholder="e.g. Pakistan"
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Service</label>
              <input
                type="text"
                name="service"
                value={filters.service}
                onChange={handleFilterChange}
                placeholder="Service ID or name"
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                Apply Filters
              </button>
            </div>
          </form>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
              <p className="text-gray-600 font-medium">Loading leads...</p>
            </div>
          ) : error ? (
            <div className="p-12 text-center">
              <div className="text-5xl mb-4">⚠️</div>
              <p className="text-red-600 font-semibold text-lg">{error}</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-gray-600 font-semibold text-lg mb-2">No leads found</p>
              <p className="text-gray-500 text-sm">Try adjusting your filters or check back later</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      📅 Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      👤 Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      📧 Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      🌍 Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      🛠️ Service
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      📦 Package
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      💬 Message
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {leads.map((lead, index) => (
                    <tr
                      key={lead.id}
                      className={`hover:bg-blue-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(lead.createdAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900">{lead.name}</div>
                        {lead.phone && (
                          <div className="text-xs text-gray-500 mt-1">📞 {lead.phone}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={`mailto:${lead.email}`}
                          className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium"
                        >
                          {lead.email}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {lead.country || <span className="text-gray-400">-</span>}
                        </div>
                        {lead.city && (
                          <div className="text-xs text-gray-500 mt-1">{lead.city}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700">
                          {lead.service || <span className="text-gray-400">-</span>}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700">
                          {lead.packageInfo || lead.packageId || (
                            <span className="text-gray-400">-</span>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 max-w-xs line-clamp-3">
                          {lead.message}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}


