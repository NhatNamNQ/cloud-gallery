import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'

import { Footer, Header } from './components/layout'
import { HomePage } from './pages'
import { useAuth } from './hooks'

/**
 * Root App component with routing
 * Sets up React Router with layout components (Header, Footer)
 * Initializes auth state on app load
 */
function App() {
  const { isAuthenticated, initializeAuth, logout } = useAuth()

  // Initialize auth state from localStorage on app load
  useEffect(() => {
    initializeAuth()
  }, [])

  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
        {/* Header */}
        <Header isAuthenticated={isAuthenticated} onLogout={logout} />

        {/* Main Content */}
        <main className='flex-1'>
          <div className='container mx-auto px-4 py-8'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/auth/*' element={<div>Auth Page Placeholder</div>} />
              {/* Additional routes to be added */}
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  )
}

export default App
