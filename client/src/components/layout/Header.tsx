import { Link } from 'react-router-dom'
import { Navigation } from './Navigation'
import { Button } from '../ui/button'
interface HeaderProps {
  isAuthenticated?: boolean
  onLogout?: () => void
}

/**
 * Header component with branding, navigation, and auth buttons
 * Uses shadcn/ui Button for actions
 */
export function Header({ isAuthenticated = false, onLogout }: HeaderProps) {
  return (
    <header className='sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
      <div className='container mx-auto px-4'>
        <div className='flex h-16 items-center justify-between'>
          {/* Logo/Branding */}
          <div className='flex items-center gap-2'>
            <Link to='/' className='flex items-center gap-2'>
              <span className='text-xl font-bold text-foreground'>Cloud Gallery</span>
            </Link>
          </div>

          {/* Navigation */}
          <Navigation />

          {/* Auth Actions */}
          <div className='flex items-center gap-2'>
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
        </div>
      </div>
    </header>
  )
}

export default Header
