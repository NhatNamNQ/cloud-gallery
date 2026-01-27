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
      <div className='flex flex-col items-center justify-center py-20 text-center'>
        <div className='relative mb-8'>
          {/* Decorative background */}
          <div className='absolute inset-0 bg-linear-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl' />
          {/* Icon container */}
          <div className='relative rounded-full bg-linear-to-br from-blue-500/10 to-purple-600/10 p-8 border-2 border-dashed border-muted-foreground/20'>
            <Images className='h-16 w-16 text-muted-foreground' />
          </div>
        </div>
        <h3 className='text-2xl font-bold mb-3'>No photos yet</h3>
        <p className='text-muted-foreground text-lg max-w-md mb-6'>
          Start building your gallery by uploading your first photo. Your memories are waiting to be stored securely.
        </p>
        <div className='flex flex-wrap gap-3 justify-center text-sm text-muted-foreground'>
          <div className='flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50'>
            <span className='w-2 h-2 rounded-full bg-green-500' />
            <span>Secure storage</span>
          </div>
          <div className='flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50'>
            <span className='w-2 h-2 rounded-full bg-blue-500' />
            <span>Fast uploads</span>
          </div>
          <div className='flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50'>
            <span className='w-2 h-2 rounded-full bg-purple-500' />
            <span>Easy sharing</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-8'>
      {/* Photo Grid with stagger animation */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {paginatedPhotos.map((photo, index) => (
          <div
            key={photo.id}
            style={{
              animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`
            }}
          >
            <PhotoCard
              photo={photo}
              onPreview={handlePreview}
              onDelete={handleDelete}
              isDeleting={deletingId === photo.id}
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex flex-col items-center gap-4 pt-4'>
          <div className='flex items-center gap-3'>
            <Button variant='outline' size='icon' onClick={prevPage} disabled={currentPage === 1} className='h-10 w-10'>
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
                      className='min-w-10 h-10'
                    >
                      {page}
                    </Button>
                  )
                }
                // Show ellipsis
                if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <span key={page} className='text-muted-foreground px-2'>
                      ...
                    </span>
                  )
                }
                return null
              })}
            </div>

            <Button
              variant='outline'
              size='icon'
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className='h-10 w-10'
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>

          {/* Photo count */}
          <div className='text-sm text-muted-foreground'>
            Page {currentPage} of {totalPages} • {photos.length} photo{photos.length !== 1 ? 's' : ''} total
          </div>
        </div>
      )}

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
