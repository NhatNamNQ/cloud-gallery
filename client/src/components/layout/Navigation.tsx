import { Home, Images, LogOut } from 'lucide-react'

/**
 * Navigation component with lucide-react icons
 * Displays navigation links with icons
 */
export function Navigation() {
  return (
    <nav className='hidden md:flex items-center gap-1'>
      <a
        href='/'
        className='flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors'
        title='Home'
      >
        <Home className='h-4 w-4' />
        <span>Home</span>
      </a>

      <a
        href='/gallery'
        className='flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors'
        title='Gallery'
      >
        <Images className='h-4 w-4' />
        <span>Gallery</span>
      </a>
    </nav>
  )
}

export default Navigation
