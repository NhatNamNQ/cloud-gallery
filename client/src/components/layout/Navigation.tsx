import { Home, Images } from 'lucide-react'
import { Link } from 'react-router-dom'

/**
 * Navigation component with lucide-react icons
 * Displays navigation links with icons
 */
export function Navigation() {
  return (
    <nav className='hidden md:flex items-center gap-1'>
      <Link
        to='/'
        className='flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors'
        title='Home'
      >
        <Home className='h-4 w-4' />
        <span>Home</span>
      </Link>
      <Link
        to='/gallery'
        className='flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors'
        title='Gallery'
      >
        <Images className='h-4 w-4' />
        <span>Gallery</span>
      </Link>
    </nav>
  )
}

export default Navigation
