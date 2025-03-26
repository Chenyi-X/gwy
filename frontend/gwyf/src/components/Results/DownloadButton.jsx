'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, ChevronDown, FileSpreadsheet, FileJson } from "lucide-react";

const DownloadButton = ({ results }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  
  // 下载为CSV
  const downloadCSV = () => {
    setIsDownloading(true);
    
    try {
      // 定义CSV标题行
      const headers = [
        '序号', '岗位名称', '单位名称', '城市', '区县', 
        '学历要求', '经验要求', '薪资', '总分', 
        '专业适配度', '城市竞争度', '发展度', 
        '学历匹配', '地点偏好', '应届生友好度',
        '发布日期', '来源', '链接'
      ];
      
      // 将数据转换为CSV行
      const rows = results.map((result, index) => [
        index + 1,
        result.position,
        result.company,
        result.city,
        result.district,
        result.education,
        result.experience,
        result.salary,
        result.score,
        result.matchScore,
        result.competitiveScore,
        result.developmentScore,
        result.educationScore,
        result.locationScore,
        result.freshGradScore,
        result.postDate,
        result.source,
        result.url
      ]);
      
      // 组合标题和数据行
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => {
          // 处理包含逗号的字段，用引号包裹
          if (cell && cell.toString().includes(',')) {
            return `"${cell}"`;
          }
          return cell;
        }).join(','))
      ].join('\n');
      
      // 创建Blob对象
      const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      
      // 创建下载链接并触发下载
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `岗位筛选结果_${new Date().toLocaleDateString()}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('下载CSV出错:', error);
      alert('下载失败，请重试');
    } finally {
      setIsDownloading(false);
    }
  };
  
  // 下载为JSON
  const downloadJSON = () => {
    setIsDownloading(true);
    
    try {
      // 创建Blob对象
      const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
      
      // 创建下载链接并触发下载
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `岗位筛选结果_${new Date().toLocaleDateString()}.json`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('下载JSON出错:', error);
      alert('下载失败，请重试');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          disabled={isDownloading || results.length === 0}
          className="flex items-center gap-1"
        >
          <Download className="h-4 w-4" />
          下载
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={downloadCSV} className="flex items-center gap-2">
          <FileSpreadsheet className="h-4 w-4" />
          下载为CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={downloadJSON} className="flex items-center gap-2">
          <FileJson className="h-4 w-4" />
          下载为JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DownloadButton;