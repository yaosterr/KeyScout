import { useState, useRef } from 'react';

export function useFileManagement(maxFileSize = 5 * 1024 * 1024) { // 5MB default max size
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (newFiles) => {
    setError(null); // Clear previous errors
    const validFiles = Array.from(newFiles).filter(file => {
      if (file.size > maxFileSize) {
        setError(`File ${file.name} is too large. Maximum size is ${maxFileSize / 1024 / 1024}MB.`);
        return false;
      }
      return true;
    });
    setUploadedFiles(prevFiles => [...prevFiles, ...validFiles]);
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleUploadMore = () => {
    fileInputRef.current.click();
  };

  return {
    uploadedFiles,
    fileInputRef,
    error,
    handleFileChange,
    handleRemoveFile,
    handleUploadMore
  };
}
