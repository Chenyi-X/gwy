'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DataPreview from '@/components/Results/DataPreview';
import { Button } from "@/components/ui/button";
import { ChevronLeft, Download } from "lucide-react";

const ResultsPage = () => {
  const router = useRouter();
  const [previewData, setPreviewData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 获取并处理数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 获取原始文件
        const [fileRes, previewRes] = await Promise.all([
          fetch('/api/download'),
          fetch('/api/download?preview=true')
        ]);

        if (!fileRes.ok || !previewRes.ok) {
          throw new Error('数据加载失败');
        }

        // 处理预览数据
        const previewJson = await previewRes.json();
        setPreviewData(previewJson.slice(0, 5));

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 处理文件下载
  const handleDownload = async () => {
    try {
      const response = await fetch('/api/download');
      if (!response.ok) throw new Error('下载失败');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'jobs.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p className="text-red-500 mb-4">错误: {error}</p>
        <Button onClick={() => window.location.reload()}>
          重新加载
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-15 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">数据预览</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            返回
          </Button>
          <Button 
            onClick={handleDownload}
            disabled={loading}
          >
            <Download className="mr-2 h-4 w-4" />
            {loading ? '加载中...' : '下载完整数据'}
          </Button>
        </div>
      </div>

      <DataPreview 
        data={previewData}
        loading={loading}
      />
    </div>
  );
};

export default ResultsPage;