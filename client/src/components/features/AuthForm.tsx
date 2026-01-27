import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2, Mail, Lock, Eye, EyeOff } from 'lucide-react'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Alert, AlertDescription } from '../ui/alert'
import { useAuth } from '../../hooks'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

// Validation schemas
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

const signupSchema = z
  .object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

type LoginFormData = z.infer<typeof loginSchema>
type SignupFormData = z.infer<typeof signupSchema>

interface AuthFormProps {
  mode: 'login' | 'signup'
}

/**
 * AuthForm component for login/signup
 * Uses react-hook-form with zod validation and shadcn/ui components
 */
export function AuthForm({ mode }: AuthFormProps) {
  const navigate = useNavigate()
  const { login, signup, isLoading, error, clearError } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const isLogin = mode === 'login'
  const schema = isLogin ? loginSchema : signupSchema

  const form = useForm<LoginFormData | SignupFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      ...(isLogin ? {} : { confirmPassword: '' })
    }
  })

  const onSubmit = async (data: LoginFormData | SignupFormData) => {
    clearError()
    setSuccessMessage(null)

    try {
      if (isLogin) {
        await login({ email: data.email, password: data.password })
        navigate('/gallery')
      } else {
        await signup({ email: data.email, password: data.password })
        setSuccessMessage('Account created successfully! Please sign in.')
        form.reset()
      }
    } catch (err) {
      // Error is handled by useAuth hook
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        {/* Error Alert */}
        {error && (
          <Alert variant='destructive'>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Success Alert */}
        {successMessage && (
          <Alert>
            <AlertDescription className='text-green-600'>{successMessage}</AlertDescription>
          </Alert>
        )}

        {/* Email Field */}
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                  <Input type='email' placeholder='you@example.com' className='pl-10' {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='••••••••'
                    className='pl-10 pr-10'
                    {...field}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
                  >
                    {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password Field (signup only) */}
        {!isLogin && (
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='••••••••'
                      className='pl-10'
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Submit Button - Prominent CTA with gradient */}
        <Button
          type='submit'
          className='w-full h-12 text-base font-semibold bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300'
          disabled={isLoading}
        >
          {isLoading && <Loader2 className='mr-2 h-5 w-5 animate-spin' />}
          {isLogin ? 'Sign In to Your Account' : 'Create Your Free Account'}
        </Button>
      </form>
    </Form>
  )
}

export default AuthForm
