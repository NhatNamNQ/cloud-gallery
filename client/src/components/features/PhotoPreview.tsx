import { Download, Trash2, X, Calendar, User } from 'lucide-react'

import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog'
import type { Photo } from '../../types'

interface PhotoPreviewProps {
  photo: Photo | null
  onClose: () => void
  onDelete?: (id: string) => void
  isDeleting?: boolean
}

/**
 * PhotoPreview component
 * Modal dialog for viewing photo details
 */
export function PhotoPreview({ photo, onClose, onDelete, isDeleting }: PhotoPreviewProps) {
  if (!photo) return null

  /**
   * Handle download
   */
  const handleDownload = async () => {
    try {
      const response = await fetch(photo.webUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${photo.title}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to download image:', error)
    }
  }

  return (
    <Dialog open={!!photo} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='max-w-4xl max-h-[90vh] overflow-hidden p-0'>
        {/* Header */}
        <DialogHeader className='p-4 pb-0'>
          <DialogTitle className='text-xl'>{photo.title}</DialogTitle>
          <DialogDescription className='flex items-center gap-4 text-sm'>
            <span className='flex items-center gap-1'>
              <Calendar className='h-4 w-4' />
              {new Date(photo.createdAt).toLocaleDateString()}
            </span>
            {photo.user && (
              <span className='flex items-center gap-1'>
                <User className='h-4 w-4' />
                {photo.user.email}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        {/* Image */}
        <div className='relative flex-1 overflow-auto p-4'>
          <img
            src={photo.webUrl}
            alt={photo.title}
            className='w-full h-auto max-h-[60vh] object-contain rounded-lg mx-auto'
          />
        </div>

        {/* Actions */}
        <div className='flex items-center justify-between p-4 pt-0 border-t mt-4'>
          <div className='flex items-center gap-2'>
            <Button variant='outline' size='sm' onClick={handleDownload}>
              <Download className='h-4 w-4 mr-2' />
              Download
            </Button>
            {onDelete && (
              <Button variant='destructive' size='sm' onClick={() => onDelete(photo.id)} disabled={isDeleting}>
                <Trash2 className='h-4 w-4 mr-2' />
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            )}
          </div>
          <Button variant='ghost' size='sm' onClick={onClose}>
            <X className='h-4 w-4 mr-2' />
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PhotoPreview
