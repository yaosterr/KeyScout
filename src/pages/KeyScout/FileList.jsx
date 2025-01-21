import React from 'react'
import { PictureIcon } from '../../components/Icons/PictureIcon'
import { PdfIcon } from '../../components/Icons/PdfIcon'
import { RemoveIcon } from '../../components/Icons/RemoveIcon'

export default function FileList({ files, onRemove }) {
  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase()
    if (['png', 'jpg', 'jpeg', 'gif'].includes(extension)) {
      return <PictureIcon />
    } else if (extension === 'pdf') {
      return <PdfIcon />
    } else {
      // May want to create a default icon component for other file types later
      return '📎'
    }
  }

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4 h-[450px] overflow-y-auto">
      {files.map((file, index) => (
        <div key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg mb-2">
          <div className="flex items-center">
            <span className="mr-2">{getFileIcon(file.name)}</span>
            <span className="truncate max-w-[200px]">{file.name}</span>
          </div>
          <button 
            onClick={() => onRemove(index)} 
            className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-200 transition-colors duration-200"
          >
            <RemoveIcon />
          </button>
        </div>
      ))}
    </div>
  )
}
