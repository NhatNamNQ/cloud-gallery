import { Github, Mail, Heart } from 'lucide-react'

/**
 * Footer component with links and copyright
 * Provides app info and useful links
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='border-t border-border bg-muted/30 py-12'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
          {/* Brand Section */}
          <div className='flex flex-col gap-3'>
            <div className='flex items-center gap-2'>
              <span className='text-2xl'>☁️</span>
              <span className='font-bold text-lg'>Cloud Gallery</span>
            </div>
            <p className='text-sm text-muted-foreground'>
              Beautiful cloud-based photo gallery for sharing and organizing your memories.
            </p>
          </div>

          {/* Links Section */}
          <div className='flex flex-col gap-3'>
            <h3 className='font-semibold text-sm'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <a href='/' className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
                  Home
                </a>
              </li>
              <li>
                <a href='/gallery' className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
                  Gallery
                </a>
              </li>
              <li>
                <a href='/auth' className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
                  Sign In
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className='flex flex-col gap-3'>
            <h3 className='font-semibold text-sm'>Connect</h3>
            <div className='flex gap-3'>
              <a
                href='mailto:contact@cloudgallery.app'
                className='text-muted-foreground hover:text-foreground transition-colors'
                title='Email'
              >
                <Mail className='h-5 w-5' />
              </a>
              <a
                href='https://github.com'
                className='text-muted-foreground hover:text-foreground transition-colors'
                title='GitHub'
              >
                <Github className='h-5 w-5' />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className='border-t border-border pt-8'>
          {/* Copyright */}
          <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
            <p className='text-sm text-muted-foreground'>&copy; {currentYear} Cloud Gallery. All rights reserved.</p>
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              Made with <Heart className='h-4 w-4 text-red-500' /> by developers
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
