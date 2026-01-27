import { useState } from 'react'
import { ChevronLeft, ChevronRight, Images } from 'lucide-react'

import { PhotoPreview } from './PhotoPreview'
import { usePhotos } from '../../hooks'
import type { Photo } from '../../types'
import PhotoCard, { PhotoCardSkeleton } from './PhotoCard'
import { Button } from '../ui/button'

interface PhotoGalleryProps {
  isLoading?: boolean
}

/**
 * PhotoGallery component
 * Displays photos in a responsive grid with pagination
 */
export function PhotoGallery({ isLoading: externalLoading }: PhotoGalleryProps) {
  const {
    paginatedPhotos,
    photos,
    isLoading,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    setCurrentPage,
    deletePhoto
  } = usePhotos()

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const loading = externalLoading || isLoading

  /**
   * Handle photo preview
   */
  const handlePreview = (photo: Photo) => {
    setSelectedPhoto(photo)
  }

  /**
   * Close preview modal
   */
  const handleClosePreview = () => {
    setSelectedPhoto(null)
  }

  /**
   * Handle photo deletion
   */
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this photo?')) {
      setDeletingId(id)
      try {
        await deletePhoto(id)
        if (selectedPhoto?.id === id) {
          setSelectedPhoto(null)
        }
      } catch (err) {
        console.error('Failed to delete photo:', err)
      } finally {
        setDeletingId(null)
      }
    }
  }

  // Loading State
  if (loading) {
    return (
      <div className='space-y-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {Array.from({ length: 8 }).map((_, index) => (
            <PhotoCardSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  // Empty State
  if (photos.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-16 text-center'>
        <div className='rounded-full bg-muted p-6 mb-4'>
          <Images className='h-12 w-12 text-muted-foreground' />
        </div>
        <h3 className='text-xl font-semibold mb-2'>No photos yet</h3>
        <p className='text-muted-foreground max-w-sm'>Upload your first photo to get started with your gallery.</p>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {/* Photo Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {paginatedPhotos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onPreview={handlePreview}
            onDelete={handleDelete}
            isDeleting={deletingId === photo.id}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex items-center justify-center gap-4 pt-4'>
          <Button variant='outline' size='icon' onClick={prevPage} disabled={currentPage === 1}>
            <ChevronLeft className='h-4 w-4' />
          </Button>

          <div className='flex items-center gap-2'>
            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1
              // Show limited page numbers
              if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size='sm'
                    onClick={() => setCurrentPage(page)}
                    className='min-w-10'
                  >
                    {page}
                  </Button>
                )
              }
              // Show ellipsis
              if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <span key={page} className='text-muted-foreground'>
                    ...
                  </span>
                )
              }
              return null
            })}
          </div>

          <Button variant='outline' size='icon' onClick={nextPage} disabled={currentPage === totalPages}>
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      )}

      {/* Photo count */}
      <div className='text-center text-sm text-muted-foreground'>
        Showing {paginatedPhotos.length} of {photos.length} photos
      </div>

      {/* Preview Modal */}
      <PhotoPreview
        photo={selectedPhoto}
        onClose={handleClosePreview}
        onDelete={handleDelete}
        isDeleting={deletingId === selectedPhoto?.id}
      />
    </div>
  )
}

export default PhotoGallery
