// hooks/useFileUpload.js
import { useState, useEffect } from 'react';

export function useFileUpload() {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  
  // 处理文件变化
  const handleFileChange = (newFile) => {
    if (newFile) {
      setFile(newFile);
      
      // 生成文件预览信息
      const preview = {
        name: newFile.name,
        size: formatFileSize(newFile.size),
        type: newFile.type,
        lastModified: new Date(newFile.lastModified).toLocaleString()
      };
      
      setFilePreview(preview);
    }
  };
  
  // 清除文件
  const clearFile = () => {
    setFile(null);
    setFilePreview(null);
  };
  
  // 格式化文件大小
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  return {
    file,
    filePreview,
    handleFileChange,
    clearFile
  };
}