import { useState, useRef, useCallback } from 'react'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'

import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Card } from '../ui/card'
import { Alert, AlertDescription } from '../ui/alert'
import { usePhotos, useAuth } from '../../hooks'
import { ALLOWED_IMAGE_TYPES, UPLOAD_SIZE_LIMIT } from '../../utils'
import { Input } from '../ui/input'

/**
 * PhotoUpload component
 * Handles photo file selection and upload with preview
 */
export function PhotoUpload() {
  const { user } = useAuth()
  const { uploadPhoto, isLoading } = usePhotos()

  const [title, setTitle] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  /**
   * Validate the selected file
   */
  const validateFile = (file: File): string | null => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return 'Please select a valid image file (JPEG, PNG, GIF, or WebP)'
    }
    if (file.size > UPLOAD_SIZE_LIMIT) {
      return `File size must be less than ${formatFileSize(UPLOAD_SIZE_LIMIT)}`
    }
    return null
  }

  /**
   * Handle file selection
   */
  const handleFileSelect = useCallback((file: File) => {
    setError(null)
    setSuccess(null)

    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    setSelectedFile(file)

    // Create preview URL
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }, [])

  /**
   * Handle input change
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  /**
   * Handle drag events
   */
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  /**
   * Handle drop
   */
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      const file = e.dataTransfer.files?.[0]
      if (file) {
        handleFileSelect(file)
      }
    },
    [handleFileSelect]
  )

  /**
   * Clear selected file
   */
  const clearFile = () => {
    setSelectedFile(null)
    setPreview(null)
    setError(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!selectedFile) {
      setError('Please select a photo to upload')
      return
    }

    if (!title.trim()) {
      setError('Please enter a title for your photo')
      return
    }

    if (!user?.id) {
      setError('You must be logged in to upload photos')
      return
    }

    try {
      await uploadPhoto(title.trim(), selectedFile, user.id)
      setSuccess('Photo uploaded successfully!')
      setTitle('')
      clearFile()
    } catch (err) {
      setError('Failed to upload photo. Please try again.')
    }
  }

  return (
    <Card className='p-6'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Error/Success Alerts */}
        {error && (
          <Alert variant='destructive'>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert>
            <AlertDescription className='text-green-600'>{success}</AlertDescription>
          </Alert>
        )}

        {/* Title Input */}
        <div className='space-y-2'>
          <Label htmlFor='title'>Photo Title</Label>
          <Input
            id='title'
            type='text'
            placeholder='Enter a title for your photo'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
          />
        </div>

        {/* File Drop Zone */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type='file'
            accept={ALLOWED_IMAGE_TYPES.join(',')}
            onChange={handleInputChange}
            className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
          />

          {preview ? (
            <div className='space-y-4'>
              <div className='relative inline-block'>
                <img src={preview} alt='Preview' className='max-h-48 max-w-full rounded-lg object-contain mx-auto' />
                <button
                  type='button'
                  onClick={(e) => {
                    e.stopPropagation()
                    clearFile()
                  }}
                  className='absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90'
                >
                  <X className='h-4 w-4' />
                </button>
              </div>
              <p className='text-sm text-muted-foreground'>
                {selectedFile?.name} ({formatFileSize(selectedFile?.size || 0)})
              </p>
            </div>
          ) : (
            <div className='space-y-4'>
              <div className='flex justify-center'>
                <div className='rounded-full bg-muted p-4'>
                  <ImageIcon className='h-8 w-8 text-muted-foreground' />
                </div>
              </div>
              <div>
                <p className='text-sm font-medium'>Drag and drop your photo here</p>
                <p className='text-xs text-muted-foreground mt-1'>
                  or click to browse (max {formatFileSize(UPLOAD_SIZE_LIMIT)})
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <Button type='submit' className='w-full' disabled={isLoading || !selectedFile || !title}>
          {isLoading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Uploading...
            </>
          ) : (
            <>
              <Upload className='mr-2 h-4 w-4' />
              Upload Photo
            </>
          )}
        </Button>
      </form>
    </Card>
  )
}

export default PhotoUpload
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}
