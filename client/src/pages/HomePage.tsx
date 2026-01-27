import { useNavigate } from 'react-router-dom'
import { Shield, Zap, Cloud, Share2, Lock, Sparkles, Image as ImageIcon, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { useAuth } from '../hooks'

/**
 * HomePage component
 * Landing page with hero section and feature highlights
 */
export function HomePage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  return (
    <div className='space-y-20 pb-12'>
      {/* Hero Section - Asymmetric Layout */}
      <section className='relative overflow-hidden'>
        {/* Background Gradient */}
        <div className='absolute inset-0 -z-10 bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20' />
        <div className='absolute inset-0 -z-10 bg-grid-slate-100 mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-grid-slate-800' />

        <div className='container mx-auto px-4 py-16 md:py-24'>
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            {/* Left: Content */}
            <div className='space-y-8'>
              <Badge variant='secondary' className='w-fit'>
                <Sparkles className='h-3 w-3 mr-1' />
                Secure Cloud Storage
              </Badge>

              <div className='space-y-6'>
                <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold leading-tight'>
                  Your Photos,
                  <span className='block bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>
                    Beautifully Stored
                  </span>
                </h1>
                <p className='text-xl md:text-2xl text-muted-foreground max-w-xl'>
                  Upload, organize, and share your memories with enterprise-grade security and lightning-fast
                  performance.
                </p>
              </div>

              <div className='flex flex-col sm:flex-row gap-4 pt-4'>
                {isAuthenticated ? (
                  <>
                    <Button size='lg' className='text-lg h-14 px-8' asChild>
                      <a href='/gallery'>
                        View Gallery
                        <ArrowRight className='ml-2 h-5 w-5' />
                      </a>
                    </Button>
                    <Button variant='outline' size='lg' className='text-lg h-14 px-8' asChild>
                      <a href='/gallery'>
                        <ImageIcon className='mr-2 h-5 w-5' />
                        Upload Photos
                      </a>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size='lg' className='text-lg h-14 px-8' onClick={() => navigate('/auth')}>
                      Get Started Free
                      <ArrowRight className='ml-2 h-5 w-5' />
                    </Button>
                    <Button variant='outline' size='lg' className='text-lg h-14 px-8' onClick={() => navigate('/auth')}>
                      Sign In
                    </Button>
                  </>
                )}
              </div>

              {/* Trust Indicators */}
              <div className='flex flex-wrap items-center gap-6 pt-4 text-sm text-muted-foreground'>
                <div className='flex items-center gap-2'>
                  <Shield className='h-4 w-4 text-green-600' />
                  <span>End-to-end encrypted</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Zap className='h-4 w-4 text-yellow-600' />
                  <span>Lightning fast</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Cloud className='h-4 w-4 text-blue-600' />
                  <span>99.9% uptime</span>
                </div>
              </div>
            </div>

            {/* Right: Visual Element (Placeholder for image/illustration) */}
            <div className='relative lg:order-last'>
              <div className='relative aspect-square max-w-lg mx-auto'>
                {/* Decorative Elements */}
                <div className='absolute inset-0 bg-linear-to-br from-blue-400/20 to-purple-600/20 rounded-3xl rotate-6 blur-2xl' />
                <div className='absolute inset-0 bg-linear-to-tl from-pink-400/20 to-blue-600/20 rounded-3xl -rotate-6 blur-2xl' />

                {/* Main Visual */}
                <div className='relative bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-1 shadow-2xl'>
                  <div className='bg-background rounded-3xl p-8 h-full flex items-center justify-center'>
                    <div className='text-center space-y-4'>
                      <div className='w-32 h-32 mx-auto bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center'>
                        <ImageIcon className='h-16 w-16 text-white' />
                      </div>
                      <p className='text-muted-foreground'>Your photo gallery visualization</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Bento Grid */}
      <section className='container mx-auto px-4'>
        <div className='text-center space-y-4 mb-12'>
          <h2 className='text-4xl md:text-5xl font-bold'>Why Choose Cloud Gallery?</h2>
          <p className='text-muted-foreground text-xl max-w-2xl mx-auto'>
            Everything you need to manage and share your photos, built with modern technology
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* Feature 1 - Large */}
          <Card className='md:col-span-2 lg:col-span-2 hover:shadow-xl transition-shadow group'>
            <CardContent className='p-8 md:p-10'>
              <div className='flex flex-col md:flex-row items-start gap-6'>
                <div className='p-4 rounded-2xl bg-linear-to-br from-blue-500 to-blue-600 group-hover:scale-110 transition-transform'>
                  <Shield className='h-8 w-8 text-white' />
                </div>
                <div className='space-y-3 flex-1'>
                  <h3 className='text-2xl font-bold'>Enterprise-Grade Security</h3>
                  <p className='text-muted-foreground text-lg'>
                    Your photos are encrypted at rest and in transit. We use AWS S3 with industry-leading security
                    standards to protect your memories.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature 2 */}
          <Card className='hover:shadow-xl transition-shadow group'>
            <CardContent className='p-8'>
              <div className='space-y-4'>
                <div className='p-4 rounded-2xl bg-linear-to-br from-purple-500 to-purple-600 w-fit group-hover:scale-110 transition-transform'>
                  <Zap className='h-8 w-8 text-white' />
                </div>
                <div className='space-y-2'>
                  <h3 className='text-xl font-bold'>Lightning Fast</h3>
                  <p className='text-muted-foreground'>
                    Optimized CDN delivery ensures your photos load instantly, anywhere in the world.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature 3 */}
          <Card className='hover:shadow-xl transition-shadow group'>
            <CardContent className='p-8'>
              <div className='space-y-4'>
                <div className='p-4 rounded-2xl bg-linear-to-br from-pink-500 to-pink-600 w-fit group-hover:scale-110 transition-transform'>
                  <Share2 className='h-8 w-8 text-white' />
                </div>
                <div className='space-y-2'>
                  <h3 className='text-xl font-bold'>Easy Sharing</h3>
                  <p className='text-muted-foreground'>
                    Share your photos with friends and family with just a few clicks. Control who sees what.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature 4 - Wide */}
          <Card className='md:col-span-2 hover:shadow-xl transition-shadow group'>
            <CardContent className='p-8 md:p-10'>
              <div className='flex flex-col md:flex-row items-start gap-6'>
                <div className='p-4 rounded-2xl bg-linear-to-br from-green-500 to-green-600 group-hover:scale-110 transition-transform'>
                  <Lock className='h-8 w-8 text-white' />
                </div>
                <div className='space-y-3 flex-1'>
                  <h3 className='text-2xl font-bold'>Private by Default</h3>
                  <p className='text-muted-foreground text-lg'>
                    Your photos are private unless you choose to share them. We never access or use your photos without
                    permission.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className='container mx-auto px-4'>
        <div className='relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 p-1'>
          <div className='bg-background rounded-3xl'>
            <div className='bg-linear-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl p-12 md:p-16 text-center space-y-8'>
              <div className='space-y-4'>
                <h2 className='text-4xl md:text-5xl font-bold'>Ready to get started?</h2>
                <p className='text-muted-foreground text-xl max-w-2xl mx-auto'>
                  Join thousands of users storing and sharing their memories securely in the cloud.
                </p>
              </div>
              {!isAuthenticated && (
                <Button size='lg' className='text-lg h-14 px-8' onClick={() => navigate('/auth')}>
                  Create Your Free Account
                  <ArrowRight className='ml-2 h-5 w-5' />
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
