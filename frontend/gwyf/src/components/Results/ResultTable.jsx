'use client';
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ChevronDown, 
  ChevronUp, 
  ArrowUpDown, 
  ExternalLink, 
  Eye
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const ResultTable = ({ results, loading, onRowClick }) => {
  const [sortConfig, setSortConfig] = useState({
    key: 'score',
    direction: 'desc'
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // 处理排序
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  // 排序结果
  const sortedResults = [...results].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
  
  // 分页
  const totalPages = Math.ceil(sortedResults.length / pageSize);
  const paginatedResults = sortedResults.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
  
  // 处理页面变化
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  
  // 处理页面大小变化
  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setPage(1); // 重置到第一页
  };
  
  // 获取评级颜色
  const getRatingColor = (score) => {
    if (score >= 88) return 'bg-green-100 text-green-800';
    if (score >= 80) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };
  
  // 获取评级标签
  const getRatingLabel = (score) => {
    if (score >= 88) return '优秀';
    if (score >= 80) return '良好';
    return '不合格';
  };
  
  // 渲染排序图标
  const renderSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? (
        <ChevronUp className="h-4 w-4" />
      ) : (
        <ChevronDown className="h-4 w-4" />
      );
    }
    return <ArrowUpDown className="h-4 w-4" />;
  };
  
  // 渲染加载骨架
  const renderSkeletons = () => {
    return Array(5).fill().map((_, index) => (
      <TableRow key={index}>
        <TableCell><Skeleton className="h-6 w-6" /></TableCell>
        <TableCell><Skeleton className="h-6 w-24" /></TableCell>
        <TableCell><Skeleton className="h-6 w-32" /></TableCell>
        <TableCell><Skeleton className="h-6 w-20" /></TableCell>
        <TableCell><Skeleton className="h-6 w-20" /></TableCell>
        <TableCell><Skeleton className="h-6 w-16" /></TableCell>
        <TableCell><Skeleton className="h-6 w-16" /></TableCell>
        <TableCell><Skeleton className="h-6 w-24" /></TableCell>
      </TableRow>
    ));
  };

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">序号</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('position')}>
                <div className="flex items-center">
                  岗位名称
                  {renderSortIcon('position')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('company')}>
                <div className="flex items-center">
                  单位名称
                  {renderSortIcon('company')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('city')}>
                <div className="flex items-center">
                  城市
                  {renderSortIcon('city')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('education')}>
                <div className="flex items-center">
                  学历要求
                  {renderSortIcon('education')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('score')}>
                <div className="flex items-center">
                  总分
                  {renderSortIcon('score')}
                </div>
              </TableHead>
              <TableHead>评级</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              renderSkeletons()
            ) : paginatedResults.length > 0 ? (
              paginatedResults.map((result, index) => (
                <TableRow 
                  key={result.id} 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => onRowClick(result)}
                >
                  <TableCell className="font-medium">
                    {(page - 1) * pageSize + index + 1}
                  </TableCell>
                  <TableCell>{result.position}</TableCell>
                  <TableCell className="max-w-[200px] truncate" title={result.company}>
                    {result.company}
                  </TableCell>
                  <TableCell>{result.city}</TableCell>
                  <TableCell>{result.education}</TableCell>
                  <TableCell className="font-medium">{result.score}</TableCell>
                  <TableCell>
                    <Badge className={getRatingColor(result.score)}>
                      {getRatingLabel(result.score)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRowClick(result);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(result.url, '_blank');
                        }}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  没有找到符合条件的岗位
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* 分页控制 */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-gray-500">
            每页显示
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 w-16">
                {pageSize}
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {[10, 20, 30, 50, 100].map(size => (
                <DropdownMenuItem 
                  key={size} 
                  onClick={() => handlePageSizeChange(size)}
                >
                  {size}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <p className="text-sm text-gray-500">
            条记录，共 {results.length} 条
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(1)}
            disabled={page === 1}
          >
            首页
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            上一页
          </Button>
          <div className="flex items-center gap-1">
            <Input
              type="number"
              min={1}
              max={totalPages}
              value={page}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value >= 1 && value <= totalPages) {
                  handlePageChange(value);
                }
              }}
              className="h-8 w-12 text-center"
            />
            <span className="text-sm text-gray-500">/ {totalPages}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            下一页
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(totalPages)}
            disabled={page === totalPages}
          >
            末页
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultTable;