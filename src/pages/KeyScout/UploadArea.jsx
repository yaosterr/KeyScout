import React, { useRef } from 'react'

export default function UploadArea({ onFileChange }) {
  const fileInputRef = useRef(null)

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const files = Array.from(event.dataTransfer.files)
    onFileChange(files)
  }

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files)
    onFileChange(files)
  }

  return (
    <div 
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4 h-[450px] cursor-pointer"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
        </svg>
        <p className="text-lg text-gray-500 mb-2">Click to upload</p>
        <p className="text-sm text-gray-400">or drag and drop files</p>
      </div>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileInputChange} 
        className="hidden" 
        multiple
      />
    </div>
  )
}
