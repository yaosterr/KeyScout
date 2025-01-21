import React from 'react'
import { useNavigate } from 'react-router-dom'
import FileList from './FileList'
import UploadArea from './UploadArea'
import RightSideDesign from '../../components/RightSideDesign'
import { useDesign } from '../../context/DesignContext'
import { useFileManagement } from '../../hooks/useFileManagement'

export default function UploadPage() {
  const { currentDesign, designs } = useDesign();
  const navigate = useNavigate()
  const {
    uploadedFiles,
    fileInputRef,
    error,
    handleFileChange,
    handleRemoveFile,
    handleUploadMore
  } = useFileManagement(10 * 1024 * 1024); // 10MB max file size

  const handleContinue = () => {
    navigate('/keyscout/final')
  }

  return (
    <div className={`h-screen overflow-hidden transition-colors duration-1000 ${designs[currentDesign].bgColor}`}>
      <div className="flex h-full items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-[1600px] h-[92vh]">
          <div className="flex flex-col md:flex-row h-full">
            {/* Left side - Upload content */}
            <div className="p-4 sm:p-6 md:p-8 md:w-[45%] flex flex-col justify-start sm:justify-center items-center font-inria relative">
                <div className="w-full max-w-md mt-8 sm:mt-0">
                <h1 className="text-3xl font-bold mb-2">Upload your files</h1>
                <p className="text-gray-600 mb-8">Fill up your time capsule</p>
                
                {error && <p className="text-red-500 mb-4">{error}</p>}
                
                {uploadedFiles.length > 0 ? (
                  <FileList files={uploadedFiles} onRemove={handleRemoveFile} />
                ) : (
                  <UploadArea onFileChange={handleFileChange} />
                )}
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={(e) => handleFileChange(e.target.files)} 
                  className="hidden" 
                  multiple
                />
                
                {/* Buttons */}
                {uploadedFiles.length > 0 ? (
                  <div className="flex justify-between mt-4">
                    <button 
                      className="w-[48%] bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded transition-colors duration-200"
                      onClick={handleUploadMore}
                    >
                      Upload more
                    </button>
                    <button 
                      className="w-[48%] bg-[#73A468] hover:bg-[#7ACC7E] text-white py-3 rounded transition-colors duration-200"
                      onClick={handleContinue}
                    >
                      Continue
                    </button>
                  </div>
                ) : (
                  <button 
                    className="w-full bg-[#73A468] hover:bg-[#7ACC7E] text-white py-3 rounded transition-colors duration-200 mt-4"
                    onClick={handleUploadMore}
                  >
                    Click to upload
                  </button>
                )}
              </div>
            </div>

            {/* Right side */}
            <RightSideDesign />
          </div>
        </div>
      </div>
    </div>
  )
}
