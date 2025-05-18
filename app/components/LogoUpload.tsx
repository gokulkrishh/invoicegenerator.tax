'use client'

import { ChangeEvent, useState, useEffect } from 'react'
import { toast } from 'sonner'

interface LogoUploadProps {
  defaultValue?: string
  onChangeCallback: (value: string | undefined) => void
}

export default function LogoUpload({ defaultValue, onChangeCallback }: LogoUploadProps) {
  const [previewSrc, setPreviewSrc] = useState<string | undefined>(defaultValue)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  
  useEffect(() => {
    setPreviewSrc(defaultValue)
  }, [defaultValue])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      toast.error('Please upload a PNG or JPG file', { duration: 3000, className: 'rounded-lg' })
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('File size should be less than 2MB', { duration: 3000, className: 'rounded-lg' })
      return
    }

    setIsLoading(true)
    const reader = new FileReader()
    reader.onload = (event) => {
      const base64String = event.target?.result as string
      setPreviewSrc(base64String)
      onChangeCallback(base64String)
      setIsLoading(false)
    }
    reader.onerror = () => {
      toast.error('Failed to read the file. Please try again.', { duration: 3000, className: 'rounded-lg' })
      setIsLoading(false)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveLogo = () => {
    setPreviewSrc(undefined)
    onChangeCallback(undefined)
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Logo (optional)</label>
      
      <div className="flex flex-col gap-3">
        {previewSrc && (
          <div className="relative inline-block">
            <img 
              src={previewSrc} 
              alt="Logo Preview" 
              className="max-h-24 max-w-48 rounded-lg border border-gray-200" 
            />
            <button
              type="button"
              onClick={handleRemoveLogo}
              className="absolute -top-2 -right-2 rounded-full bg-red-500 p-2 text-white hover:bg-red-600"
              aria-label="Remove logo"
              title="Remove logo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <label 
            className={`cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
          >
            {isLoading ? 'Uploading...' : previewSrc ? 'Change Logo' : 'Upload Logo'}
            <input
              type="file"
              className="hidden"
              accept="image/png,image/jpeg"
              onChange={handleFileChange}
              disabled={isLoading}
            />
          </label>
          {!previewSrc && !isLoading && (
            <p className="text-xs text-gray-500">Recommended: PNG or JPG, max 2MB</p>
          )}
        </div>
      </div>
    </div>
  )
}