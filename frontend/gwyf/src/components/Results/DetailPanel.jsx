'use client';
import React from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetFooter
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  X, 
  ExternalLink, 
  MapPin, 
  Building, 
  Calendar, 
  GraduationCap,
  Clock,
  Briefcase,
  DollarSign,
  FileText,
  CheckCircle,
  BarChart4
} from "lucide-react";

const DetailPanel = ({ result, onClose }) => {
  if (!result) return null;
  
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
  
  // 获取分数等级
  const getScoreLevel = (score) => {
    if (score >= 90) return '极佳';
    if (score >= 80) return '优秀';
    if (score >= 70) return '良好';
    if (score >= 60) return '一般';
    return '较差';
  };
  
  // 获取分数颜色
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-green-500';
    if (score >= 70) return 'text-blue-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <Sheet open={!!result} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl md:max-w-2xl overflow-y-auto">
        <SheetHeader className="pb-4 border-b">
          <div className="flex justify-between items-start">
            <div>
              <SheetTitle className="text-xl font-bold">{result.position}</SheetTitle>
              <SheetDescription className="mt-1 text-base font-medium">
                {result.company}
              </SheetDescription>
            </div>
            <Badge className={`${getRatingColor(result.score)} text-sm`}>
              {getRatingLabel(result.score)} ({result.score}分)
            </Badge>
          </div>
        </SheetHeader>
        
        <div className="py-4 space-y-6">
          {/* 基本信息 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{result.city} · {result.district}</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-gray-500" />
              <span>{result.education}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>{result.experience}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span>{result.salary}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>发布日期: {result.postDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-gray-500" />
              <span>来源: {result.source}</span>
            </div>
          </div>
          
          {/* 分数详情 */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <BarChart4 className="h-4 w-4" />
              分数详情
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>总分</span>
                  <span className={`font-medium ${getScoreColor(result.score)}`}>
                    {result.score} ({getScoreLevel(result.score)})
                  </span>
                </div>
                <Progress value={result.score} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>专业适配度</span>
                  <span className={`font-medium ${getScoreColor(result.matchScore)}`}>
                    {result.matchScore}
                  </span>
                </div>
                <Progress value={result.matchScore} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>城市竞争度</span>
                  <span className={`font-medium ${getScoreColor(result.competitiveScore)}`}>
                    {result.competitiveScore}
                  </span>
                </div>
                <Progress value={result.competitiveScore} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>发展度</span>
                  <span className={`font-medium ${getScoreColor(result.developmentScore)}`}>
                    {result.developmentScore}
                  </span>
                </div>
                <Progress value={result.developmentScore} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>学历匹配</span>
                  <span className={`font-medium ${getScoreColor(result.educationScore)}`}>
                    {result.educationScore}
                  </span>
                </div>
                <Progress value={result.educationScore} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>地点偏好</span>
                  <span className={`font-medium ${getScoreColor(result.locationScore)}`}>
                    {result.locationScore}
                  </span>
                </div>
                <Progress value={result.locationScore} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>应届生友好度</span>
                  <span className={`font-medium ${getScoreColor(result.freshGradScore)}`}>
                    {result.freshGradScore}
                  </span>
                </div>
                <Progress value={result.freshGradScore} className="h-2" />
              </div>
            </div>
          </div>
          
          {/* 详细信息标签页 */}
          <Tabs defaultValue="description">
            <TabsList className="grid grid-cols-3 mb-2">
              <TabsTrigger value="description">岗位描述</TabsTrigger>
              <TabsTrigger value="requirements">任职要求</TabsTrigger>
              <TabsTrigger value="benefits">福利待遇</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="p-4 bg-gray-50 rounded-md">
              <div className="text-sm whitespace-pre-line">
                {result.description}
              </div>
            </TabsContent>
            
            <TabsContent value="requirements" className="p-4 bg-gray-50 rounded-md">
              <ul className="list-disc list-inside text-sm space-y-1">
                {result.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="benefits" className="p-4 bg-gray-50 rounded-md">
              <div className="flex flex-wrap gap-2">
                {result.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-1 text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
                    <CheckCircle className="h-3 w-3" />
                    {benefit}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <SheetFooter className="flex justify-between border-t pt-4">
          <Button variant="outline" onClick={onClose}>
            关闭
          </Button>
          <Button onClick={() => window.open(result.url, '_blank')} className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            查看原始岗位
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default DetailPanel;