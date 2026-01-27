import { useState } from 'react'
import { Trash2, Eye, Calendar, User } from 'lucide-react'

import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import { CardContent } from '../ui/card'
import { Card } from '../ui/card'
import type { Photo } from '../../types'
interface PhotoCardProps {
  photo: Photo
  onPreview?: (photo: Photo) => void
  onDelete?: (id: string) => void
  isDeleting?: boolean
}

/**
 * PhotoCard component
 * Displays a single photo with title, date, and action buttons
 * Features improved hover effects and backdrop blur
 */
export function PhotoCard({ photo, onPreview, onDelete, isDeleting }: PhotoCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <Card className='group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1'>
      {/* Image Container */}
      <div className='relative aspect-square overflow-hidden bg-muted'>
        {/* Loading Skeleton */}
        {!imageLoaded && !imageError && <Skeleton className='absolute inset-0 w-full h-full' />}

        {/* Image */}
        {!imageError ? (
          <img
            src={photo.webUrl}
            alt={photo.title}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading='lazy'
          />
        ) : (
          <div className='absolute inset-0 flex items-center justify-center bg-muted'>
            <p className='text-sm text-muted-foreground'>Failed to load image</p>
          </div>
        )}

        {/* Enhanced Hover Overlay with Backdrop Blur */}
        <div className='absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4'>
          <div className='flex items-center gap-2 backdrop-blur-md bg-white/10 rounded-full px-3 py-2 border border-white/20'>
            {onPreview && (
              <Button
                variant='ghost'
                size='icon'
                onClick={() => onPreview(photo)}
                className='h-9 w-9 hover:bg-white/20 text-white'
                title='Preview'
              >
                <Eye className='h-4 w-4' />
              </Button>
            )}
            {onDelete && (
              <Button
                variant='ghost'
                size='icon'
                onClick={() => onDelete(photo.id)}
                disabled={isDeleting}
                className='h-9 w-9 hover:bg-red-500/80 text-white'
                title='Delete'
              >
                <Trash2 className='h-4 w-4' />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <CardContent className='p-4 space-y-2'>
        <h3 className='font-semibold text-lg truncate group-hover:text-primary transition-colors' title={photo.title}>
          {photo.title}
        </h3>

        <div className='flex items-center gap-4 text-sm text-muted-foreground'>
          <div className='flex items-center gap-1'>
            <Calendar className='h-3.5 w-3.5' />
            <span>{new Date(photo.createdAt).toLocaleDateString()}</span>
          </div>

          {photo.user && (
            <div className='flex items-center gap-1'>
              <User className='h-3.5 w-3.5' />
              <span className='truncate max-w-25' title={photo.user.email}>
                {photo.user.email}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * PhotoCard Skeleton for loading state
 */
export function PhotoCardSkeleton() {
  return (
    <Card className='overflow-hidden'>
      <Skeleton className='aspect-square w-full' />
      <CardContent className='p-4 space-y-2'>
        <Skeleton className='h-6 w-3/4' />
        <Skeleton className='h-4 w-1/2' />
      </CardContent>
    </Card>
  )
}

export default PhotoCard
