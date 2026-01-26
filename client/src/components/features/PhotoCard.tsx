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
 */
export function PhotoCard({ photo, onPreview, onDelete, isDeleting }: PhotoCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <Card className='group overflow-hidden transition-all hover:shadow-lg'>
      {/* Image Container */}
      <div className='relative aspect-square overflow-hidden bg-muted'>
        {/* Loading Skeleton */}
        {!imageLoaded && !imageError && <Skeleton className='absolute inset-0 w-full h-full' />}

        {/* Image */}
        {!imageError ? (
          <img
            src={photo.webUrl}
            alt={photo.title}
            className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
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

        {/* Hover Overlay */}
        <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2'>
          {onPreview && (
            <Button variant='secondary' size='icon' onClick={() => onPreview(photo)} className='h-10 w-10'>
              <Eye className='h-5 w-5' />
            </Button>
          )}
          {onDelete && (
            <Button
              variant='destructive'
              size='icon'
              onClick={() => onDelete(photo.id)}
              disabled={isDeleting}
              className='h-10 w-10'
            >
              <Trash2 className='h-5 w-5' />
            </Button>
          )}
        </div>
      </div>

      {/* Card Content */}
      <CardContent className='p-4 space-y-2'>
        <h3 className='font-semibold text-lg truncate' title={photo.title}>
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
