import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Moon, Sun, Home, Images } from 'lucide-react'
import { Navigation } from './Navigation'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '../ui/sheet'

interface HeaderProps {
  isAuthenticated?: boolean
  onLogout?: () => void
}

/**
 * Header component with branding, navigation, and auth buttons
 * Features mobile navigation sheet and dark mode toggle
 */
export function Header({ isAuthenticated = false, onLogout }: HeaderProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initialTheme = stored || systemPreference
    setTheme(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <header className='sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
      <div className='container mx-auto px-4'>
        <div className='flex h-16 items-center justify-between'>
          {/* Logo/Branding */}
          <div className='flex items-center gap-4'>
            <Link to='/' className='flex items-center gap-2'>
              <div className='h-8 w-8 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
                <Images className='h-5 w-5 text-white' />
              </div>
              <span className='text-xl font-bold bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent'>
                Cloud Gallery
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <Navigation />

          {/* Actions: Dark Mode + Auth */}
          <div className='flex items-center gap-2'>
            {/* Dark Mode Toggle */}
            <Button
              variant='ghost'
              size='icon'
              onClick={toggleTheme}
              className='hidden sm:inline-flex'
              aria-label='Toggle theme'
            >
              {theme === 'light' ? <Moon className='h-5 w-5' /> : <Sun className='h-5 w-5' />}
            </Button>

            {/* Desktop Auth Actions */}
            <div className='hidden md:flex items-center gap-2'>
              {isAuthenticated ? (
                <Button variant='ghost' size='sm' onClick={onLogout}>
                  Logout
                </Button>
              ) : (
                <>
                  <Button variant='ghost' size='sm' asChild>
                    <Link to='/auth'>Login</Link>
                  </Button>
                  <Button size='sm' asChild>
                    <Link to='/auth'>Sign Up</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon' className='md:hidden'>
                  <Menu className='h-5 w-5' />
                  <span className='sr-only'>Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side='right' className='w-75 sm:w-87.5'>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className='flex flex-col gap-4 mt-8'>
                  {/* Mobile Navigation Links */}
                  <SheetClose asChild>
                    <Link
                      to='/'
                      className='flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium hover:bg-accent transition-colors'
                    >
                      <Home className='h-5 w-5' />
                      <span>Home</span>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      to='/gallery'
                      className='flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium hover:bg-accent transition-colors'
                    >
                      <Images className='h-5 w-5' />
                      <span>Gallery</span>
                    </Link>
                  </SheetClose>

                  <div className='border-t border-border my-2' />

                  {/* Theme Toggle in Mobile */}
                  <button
                    onClick={toggleTheme}
                    className='flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium hover:bg-accent transition-colors text-left'
                  >
                    {theme === 'light' ? <Moon className='h-5 w-5' /> : <Sun className='h-5 w-5' />}
                    <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                  </button>

                  <div className='border-t border-border my-2' />

                  {/* Mobile Auth Actions */}
                  {isAuthenticated ? (
                    <Button variant='ghost' className='justify-start px-4' onClick={onLogout}>
                      Logout
                    </Button>
                  ) : (
                    <div className='flex flex-col gap-2 px-2'>
                      <SheetClose asChild>
                        <Button variant='ghost' asChild>
                          <Link to='/auth'>Login</Link>
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button asChild>
                          <Link to='/auth'>Sign Up</Link>
                        </Button>
                      </SheetClose>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
