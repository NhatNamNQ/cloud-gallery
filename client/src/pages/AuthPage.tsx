import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { AuthForm } from '../components/features/AuthForm'
import { Images } from 'lucide-react'

/**
 * AuthPage component
 * Displays login/signup forms with tab navigation
 */
export function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')

  return (
    <div className='min-h-[calc(100vh-12rem)] flex items-center justify-center py-12'>
      {/* Background decoration */}
      <div className='absolute inset-0 -z-10 bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/10 dark:via-purple-950/10 dark:to-pink-950/10' />

      <div className='w-full max-w-md space-y-6'>
        {/* Logo & Title */}
        <div className='text-center space-y-3'>
          <div className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500 to-purple-600 shadow-lg'>
            <Images className='h-8 w-8 text-white' />
          </div>
          <div>
            <h1 className='text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              Cloud Gallery
            </h1>
            <p className='text-muted-foreground mt-2'>Welcome back! Please enter your details.</p>
          </div>
        </div>

        {/* Auth Card with Tabs */}
        <Card className='shadow-xl border-2'>
          <CardHeader className='space-y-1 pb-6'>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'signup')}>
              <TabsList className='grid w-full grid-cols-2 h-12'>
                <TabsTrigger value='login' className='text-base'>
                  Login
                </TabsTrigger>
                <TabsTrigger value='signup' className='text-base'>
                  Sign Up
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>

          <CardContent className='pb-8'>
            <Tabs value={activeTab}>
              <TabsContent value='login' className='mt-0 space-y-4'>
                <div className='space-y-2 mb-6'>
                  <CardTitle className='text-2xl'>Welcome back</CardTitle>
                  <CardDescription className='text-base'>
                    Enter your email and password to access your gallery
                  </CardDescription>
                </div>
                <AuthForm mode='login' />
              </TabsContent>

              <TabsContent value='signup' className='mt-0 space-y-4'>
                <div className='space-y-2 mb-6'>
                  <CardTitle className='text-2xl'>Create an account</CardTitle>
                  <CardDescription className='text-base'>
                    Get started with your free cloud gallery today
                  </CardDescription>
                </div>
                <AuthForm mode='signup' />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer text */}
        <p className='text-center text-sm text-muted-foreground'>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}

export default AuthPage
