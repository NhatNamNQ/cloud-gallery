import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { useAuth } from '../hooks'

/**
 * HomePage component
 * Landing page with hero section and feature highlights
 */
export function HomePage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  return (
    <div className='space-y-12'>
      {/* Hero Section */}
      <section className='space-y-6 py-12 text-center'>
        <div className='space-y-4'>
          <h1 className='text-5xl md:text-6xl font-bold bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent'>
            Cloud Gallery
          </h1>
          <p className='text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto'>
            Beautiful, secure cloud storage for your photos. Share your memories with the world.
          </p>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 justify-center pt-4'>
          {isAuthenticated ? (
            <>
              <Button size='lg' asChild>
                <a href='/gallery'>View Gallery</a>
              </Button>
              <Button variant='outline' size='lg' asChild>
                <a href='/gallery'>Upload Photos</a>
              </Button>
            </>
          ) : (
            <>
              <Button size='lg' onClick={() => navigate('/auth')}>
                Get Started
              </Button>
              <Button variant='outline' size='lg' onClick={() => navigate('/auth')}>
                Sign In
              </Button>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className='space-y-8'>
        <div className='text-center space-y-2'>
          <h2 className='text-3xl md:text-4xl font-bold'>Why Choose Cloud Gallery?</h2>
          <p className='text-muted-foreground text-lg'>Everything you need to manage and share your photos</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className='bg-linear-to-r from-blue-500/10 to-purple-600/10 rounded-lg p-8 md:p-12 text-center space-y-6'>
        <div className='space-y-3'>
          <h2 className='text-3xl md:text-4xl font-bold'>Ready to get started?</h2>
          <p className='text-muted-foreground text-lg'>
            Join thousands of users storing and sharing their memories securely.
          </p>
        </div>
        {!isAuthenticated && (
          <Button size='lg' onClick={() => navigate('/auth')}>
            Create Your Free Account
          </Button>
        )}
      </section>
    </div>
  )
}

export default HomePage
