import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

/**
 * Main layout wrapper component
 * Provides the structure for the entire application
 * Includes header, main content area, and footer
 */
export function Layout({ children }: LayoutProps) {
  return (
    <div className='flex flex-col min-h-screen bg-background'>
      {/* Header */}
      <header className='sticky top-0 z-50 border-b border-border'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <h1 className='text-2xl font-bold text-foreground'>☁️ Cloud Gallery</h1>
            </div>
            <nav className='flex gap-4'>
              <a href='/' className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'>
                Home
              </a>
              <a
                href='/gallery'
                className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
              >
                Gallery
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className='flex-1 container mx-auto px-4 py-8'>{children}</main>

      {/* Footer */}
      <footer className='border-t border-border bg-muted/30'>
        <div className='container mx-auto px-4 py-6'>
          <div className='flex flex-col items-center justify-center gap-4 text-center text-sm text-muted-foreground'>
            <p>&copy; 2026 Cloud Gallery. All rights reserved.</p>
            <p>Built with React, TypeScript, and TailwindCSS</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
