'use client'
import React, { useState, useRef } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  FileType, 
  FileSpreadsheet, 
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const UploadArea = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);
  
  const allowedTypes = [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/csv'
  ];
  
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };
  
  const validateFile = (file) => {
    // 检查文件类型
    if (!allowedTypes.includes(file.type)) {
      setError('只支持Excel和CSV文件格式');
      return false;
    }
    
    // 检查文件大小 (最大10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('文件大小不能超过10MB');
      return false;
    }
    
    setError('');
    return true;
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files[0]);
    }
  };
  
  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files.length) {
      handleFiles(files[0]);
    }
  };
  
  const handleFiles = (file) => {
    if (validateFile(file)) {
      setUploading(true);
      setUploadSuccess(false);
      
      // 模拟上传过程
      setTimeout(() => {
        setUploading(false);
        setUploadSuccess(true);
        onFileUpload(file);
      }, 1000);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  
  const getFileTypeIcon = () => {
    return <FileSpreadsheet className="h-16 w-16 text-blue-500" />;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>上传数据文件</CardTitle>
        <CardDescription>
          请上传包含岗位信息的Excel或CSV文件
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragging 
              ? 'border-blue-500 bg-blue-50' 
              : error 
                ? 'border-red-300 bg-red-50' 
                : uploadSuccess 
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-300 hover:border-gray-400'
          } transition-all duration-200 ease-in-out`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInput}
            accept=".xlsx,.xls,.csv"
            className="hidden"
          />
          
          <div className="flex flex-col items-center justify-center py-4">
            {uploadSuccess ? (
              <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
            ) : (
              <>
                {getFileTypeIcon()}
                <p className="mt-4 text-sm text-gray-600">
                  拖放文件到此处，或
                </p>
              </>
            )}
            
            <Button 
              variant={uploadSuccess ? "outline" : "default"}
              className={`mt-2 ${uploadSuccess ? 'border-green-500 text-green-600' : ''}`}
              onClick={handleButtonClick}
              disabled={uploading}
            >
              {uploading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent border-white mr-2"></div>
                  <span>上传中...</span>
                </div>
              ) : uploadSuccess ? (
                <span>文件已上传成功</span>
              ) : (
                <div className="flex items-center">
                  <Upload className="mr-2 h-4 w-4" />
                  <span>选择文件</span>
                </div>
              )}
            </Button>
            
            <p className="mt-2 text-xs text-gray-500">
              支持 .xlsx, .xls, .csv 格式，最大10MB
            </p>
          </div>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>上传失败</AlertTitle>
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-gray-500">
        <div>
          <FileType className="inline h-4 w-4 mr-1" />
          <span>确保文件包含所有必要的岗位信息字段</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UploadArea;