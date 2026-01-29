import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-text mb-4">Service Not Found</h2>
        <p className="text-text-light mb-8 max-w-md mx-auto">
          The service you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <button className="px-8 py-4 bg-gradient-accent text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            Go Back Home
          </button>
        </Link>
      </div>
    </main>
  )
}

