import { useState, useEffect } from 'react'
import { createClient } from '@blinkdotnew/sdk'
import { WindDashboard } from './components/WindDashboard'
import { Toaster } from 'sonner'

const blink = createClient({
  projectId: 'wind-data-scraper-visualizer-4ywjcoq5',
  authRequired: true
})

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-slate-900 mb-4">Wind Data Monitor</h1>
          <p className="text-slate-600 mb-6">Please sign in to access the dashboard</p>
          <button
            onClick={() => blink.auth.login()}
            className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <WindDashboard user={user} blink={blink} />
      <Toaster position="top-right" />
    </>
  )
}

export default App