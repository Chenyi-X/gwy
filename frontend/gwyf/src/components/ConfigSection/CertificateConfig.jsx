'use client'
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Search } from "lucide-react";

const CertificateConfig = ({ value = [], onChange }) => {
  const [newCertificate, setNewCertificate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const suggestedCerts = [
    '女', '男', '计算机二级', '法律职业资格证', '教师资格证',
    '医师资格证', '建筑师证', '律师证', '心理咨询师', '人力资源管理师',
    '证券从业资格', '基金从业资格',
     '法律职业资格', '会计证', '中共党员'
  ];
  
  // 根据搜索过滤建议证书
  const filteredSuggestions = searchQuery
    ? suggestedCerts.filter(cert => 
        cert.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !value.includes(cert)
      )
    : suggestedCerts.filter(cert => !value.includes(cert));

  const handleAddCertificate = () => {
    if (newCertificate.trim() && !value.includes(newCertificate.trim())) {
      const updatedCerts = [...value, newCertificate.trim()];
      onChange(updatedCerts);
      setNewCertificate('');
    }
  };

  const handleRemoveCertificate = (cert) => {
    const updatedCerts = value.filter(c => c !== cert);
    onChange(updatedCerts);
  };

  const handleAddSuggestion = (suggestion) => {
    if (!value.includes(suggestion)) {
      const updatedCerts = [...value, suggestion];
      onChange(updatedCerts);
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCertificate();
    }
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>其它要求!!排除!!列表</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">
          添加您不具备的，系统将自动排除需要这些职位
        </p>
        
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Input
              value={newCertificate}
              onChange={e => setNewCertificate(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入需要排除的要求"
              className="pr-8"
            />
          </div>
          <Button onClick={handleAddCertificate}>
            <Plus className="h-4 w-4 mr-1" />
            添加
          </Button>
        </div>
        
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">已排除:</h3>
          <div className="flex flex-wrap gap-2">
            {value.length > 0 ? (
              value.map((cert, index) => (
                <Badge 
                  key={index} 
                  variant="destructive"
                  className="flex items-center gap-1 px-3 py-1.5"
                >
                  {cert}
                  <button
                    type="button"
                    className="ml-1 text-xs hover:bg-red-700 rounded-full p-0.5"
                    onClick={() => handleRemoveCertificate(cert)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))
            ) : (
              <div className="text-gray-500 text-sm italic p-2">尚未排除任何</div>
            )}
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">常见:</h3>
            <div className="relative w-48">
              <Input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="搜索..."
                className="pl-8 py-1 h-8 text-sm"
              />
              <Search className="absolute left-2 top-1.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((cert, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddSuggestion(cert)}
                  className="text-gray-700 hover:text-gray-900"
                >
                  {cert}
                </Button>
              ))
            ) : (
              <div className="text-gray-500 text-sm italic p-2">
                {searchQuery ? "没有找到匹配的证书" : "没有更多可添加的证书"}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificateConfig;