'use client'
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileSpreadsheet, 
  Eye, 
  EyeOff, 
  Download, 
  Trash2 
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const FilePreview = ({ fileData, onRemove }) => {
  const [showPreview, setShowPreview] = useState(false);
  
  // 模拟的表格数据
  const previewData = {
    headers: ['序号', '岗位名称', '单位名称', '学历要求', '工作地点', '岗位描述'],
    rows: [
      ['1', '软件工程师', '某科技有限公司', '本科', '广州市', '负责系统开发与维护...'],
      ['2', '数据分析师', '某互联网公司', '硕士', '深圳市', '负责数据挖掘与分析...'],
      ['3', '产品经理', '某科技有限公司', '本科', '北京市', '负责产品规划与设计...'],
    ]
  };
  
  if (!fileData) return null;
  
  const getFileIcon = () => {
    if (fileData.type.includes('excel') || fileData.type.includes('spreadsheet')) {
      return <FileSpreadsheet className="h-8 w-8 text-green-600" />;
    } else if (fileData.type.includes('csv')) {
      return <FileSpreadsheet className="h-8 w-8 text-blue-600" />;
    } else {
      return <FileSpreadsheet className="h-8 w-8 text-gray-600" />;
    }
  };
  
  const formatFileSize = (size) => {
    if (size < 1024) return `${size} B`;
    else if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    else return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };
  
  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>文件预览</CardTitle>
            <CardDescription>
              已上传文件的详细信息
            </CardDescription>
          </div>
          {onRemove && (
            <Button 
              variant="outline" 
              size="icon"
              onClick={onRemove}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center p-4 border rounded-md mb-4">
          <div className="mr-4">
            {getFileIcon()}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 truncate">{fileData.name}</h3>
            <div className="mt-1 flex flex-wrap gap-2 text-sm text-gray-500">
              <Badge variant="outline">{fileData.type}</Badge>
              <span>{formatFileSize(fileData.size)}</span>
              <span>上传于 {new Date().toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mb-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={togglePreview}
            className="flex items-center"
          >
            {showPreview ? (
              <>
                <EyeOff className="mr-1 h-4 w-4" />
                隐藏预览
              </>
            ) : (
              <>
                <Eye className="mr-1 h-4 w-4" />
                显示预览
              </>
            )}
          </Button>
        </div>
        
        {showPreview && (
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  {previewData.headers.map((header, index) => (
                    <TableHead key={index} className={index === 0 ? "w-16" : ""}>
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {previewData.rows.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex} className={cellIndex === 5 ? "max-w-xs truncate" : ""}>
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="p-2 text-center text-sm text-gray-500 bg-gray-50 border-t">
              显示前 3 条数据，共 {Math.floor(Math.random() * 100) + 50} 条
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-gray-500">
          文件将在处理完成后自动删除
        </div>
        <Button variant="ghost" size="sm" className="flex items-center text-blue-600">
          <Download className="mr-1 h-4 w-4" />
          下载模板
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FilePreview;