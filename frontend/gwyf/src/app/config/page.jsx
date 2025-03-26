'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner"


import { 
  Play, 
  Save, 
  FolderOpen, 
  Settings, 
  MapPin, 
  GraduationCap, 
  Award, 
  Briefcase,
  Sliders,
  User,
  BarChart
} from "lucide-react";

import LocationConfig from '../../components/ConfigSection/LocationConfig';
import EducationConfig from '../../components/ConfigSection/EducationConfig';
import CertificateConfig from '../../components/ConfigSection/CertificateConfig';
import ProfessionalConfig from '../../components/ConfigSection/ProfessionalConfig';
import WeightConfig from '../../components/ConfigSection/WeightConfig';
import ThresholdConfig from '../../components/ConfigSection/ThresholdConfig';
import PersonalConfig from '../../components/ConfigSection/ProfessionalConfig';

import ConfigManager from '../../components/ConfigSection/ConfigManager';
import UploadArea from '../../components/FileUpload/UploadArea';
import FilePreview from '../../components/FileUpload/FilePreview';
import ProgressIndicator from '../../components/ProcessControl/ProgressIndicator';
import RunButton from '../../components/ProcessControl/RunButton';

import { processJobData, getProcessProgress, getProcessResults } from '../../services/api';
import { useConfig } from '../../hooks/useConfig';
import { useFileUpload } from '../../hooks/useFileUpload';

export default function ConfigPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("file");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [jobId, setJobId] = useState(null);
  
  // 使用自定义Hook管理配置
  const { 
    config, 
    updateConfig, 
    resetConfig, 
    loadConfig 
  } = useConfig();
  
  // 使用自定义Hook管理文件上传
  const { 
    file, 
    filePreview, 
    handleFileChange, 
    clearFile 
  } = useFileUpload();
  
  // 处理文件上传
  const handleUpload = (uploadedFile) => {
    handleFileChange(uploadedFile);
    // 如果在文件标签页上传了文件，自动切换到配置标签页
    if (activeTab === "file") {
      setActiveTab("location");
    }
  };
  
  // 开始处理
  const handleProcess = async () => {
    if (!file) {
      toast({
        title: "请先上传文件",
        description: "需要上传Excel文件才能开始处理",
        variant: "destructive",
      });
      setActiveTab("file");
      return;
    }
    
    try {
      setIsProcessing(true);
      setProgress(0);
      
      // 发送文件和配置到后端
      const excelFile = await processJobData(file, config);

      // 直接使用File对象生成下载链接
      const url = window.URL.createObjectURL(excelFile);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', excelFile.name || 'jobs.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "处理完成",
        description: "岗位筛选报告已生成",
        variant: "success",
      });


      
      // 开始轮询进度
      // const progressInterval = setInterval(async () => {
      //   try {
      //     const progressData = await getProcessProgress(response.jobId);
      //     setProgress(progressData.progress);
          
      //     if (progressData.status === 'completed') {
      //       clearInterval(progressInterval);
      //       // 获取结果并跳转到结果页面
      //       const results = await getProcessResults(response.jobId);
      //       router.push(`/results?jobId=${response.jobId}`);
      //     } else if (progressData.status === 'failed') {
      //       clearInterval(progressInterval);
      //       throw new Error(progressData.error || '处理失败');
      //     }
      //   } catch (error) {
      //     clearInterval(progressInterval);
      //     throw error;
      //   }
      // }, 1000);
    } catch (error) {
      toast({
        title: "处理失败",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  // 配置加载回调
  const handleConfigLoad = (loadedConfig) => {
    loadConfig(loadedConfig);
    toast({
      title: "配置已加载",
      description: "已成功加载配置",
    });
  };
  
  // 检查是否可以开始处理
  const canProcess = !!file && !isProcessing;

  return (
    <div className="container mx-auto py-15 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">岗位筛选配置</h1>
        <div className="flex items-center gap-4">
          <ConfigManager 
            currentConfig={config} 
            onConfigLoad={handleConfigLoad} 
          />
          <RunButton 
            onClick={handleProcess}
            isProcessing={isProcessing}
            disabled={!canProcess}
          />
        </div>
      </div>
      
      {isProcessing && (
        <Card className="mb-8">
          <CardContent className="py-6">
            <ProgressIndicator progress={progress} />
          </CardContent>
        </Card>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-8 w-full h-auto">
          <TabsTrigger value="file" className="flex items-center gap-1 py-2">
            <Settings className="h-4 w-4" />
            <span className="hidden md:inline">文件</span>
          </TabsTrigger>
          <TabsTrigger value="location" className="flex items-center gap-1 py-2">
            <MapPin className="h-4 w-4" />
            <span className="hidden md:inline">地点</span>
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-1 py-2">
            <GraduationCap className="h-4 w-4" />
            <span className="hidden md:inline">学历</span>
          </TabsTrigger>
          <TabsTrigger value="certificate" className="flex items-center gap-1 py-2">
            <Award className="h-4 w-4" />
            <span className="hidden md:inline">证书</span>
          </TabsTrigger>
          <TabsTrigger value="professional" className="flex items-center gap-1 py-2">
            <Briefcase className="h-4 w-4" />
            <span className="hidden md:inline">专业</span>
          </TabsTrigger>
          <TabsTrigger value="personal" className="flex items-center gap-1 py-2">
            <User className="h-4 w-4" />
            <span className="hidden md:inline">个人</span>
          </TabsTrigger>
          <TabsTrigger value="weight" className="flex items-center gap-1 py-2">
            <Sliders className="h-4 w-4" />
            <span className="hidden md:inline">权重</span>
          </TabsTrigger>
          <TabsTrigger value="threshold" className="flex items-center gap-1 py-2">
            <BarChart className="h-4 w-4" />
            <span className="hidden md:inline">阈值</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="file" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">文件上传</h2>
              <p className="text-gray-500 mb-6">
                上传包含岗位信息的Excel文件，支持.xlsx和.xls格式。
              </p>
              
              {file ? (
                <FilePreview 
                  file={file} 
                  preview={filePreview}
                  onClear={clearFile}
                />
              ) : (
                <UploadArea onFileUpload={handleUpload} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="location" className="space-y-6">
          <LocationConfig 
            value={config.location} 
            onChange={(value) => updateConfig('location', value)} 
          />
        </TabsContent>
        
        <TabsContent value="education" className="space-y-6">
          <EducationConfig 
            value={config.education} 
            onChange={(value) => updateConfig('education', value)} 
          />
        </TabsContent>
        
        <TabsContent value="certificate" className="space-y-6">
          <CertificateConfig 
            value={config.certificate} 
            onChange={(value) => updateConfig('certificate', value)} 
          />
        </TabsContent>
        
        <TabsContent value="professional" className="space-y-6">
          <ProfessionalConfig 
            value={config.professional} 
            onChange={(value) => updateConfig('professional', value)} 
          />
        </TabsContent>
        
        <TabsContent value="personal" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">个人配置</h2>
                暂无
            </div>
        </TabsContent>
        
        <TabsContent value="weight" className="space-y-6">
          <WeightConfig 
            value={config.weight} 
            onChange={(value) => updateConfig('weight', value)} 
          />
        </TabsContent>
        
        <TabsContent value="threshold" className="space-y-6">
          <ThresholdConfig 
            value={config.threshold} 
            onChange={(value) => updateConfig('threshold', value)} 
          />
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-between mt-8">
        <Button 
          variant="outline" 
          onClick={() => {
            const prevTabIndex = Math.max(0, getTabIndex(activeTab) - 1);
            setActiveTab(getTabByIndex(prevTabIndex));
          }}
          disabled={getTabIndex(activeTab) === 0}
        >
          上一步
        </Button>
        
        <Button 
          onClick={() => {
            const nextTabIndex = Math.min(7, getTabIndex(activeTab) + 1);
            setActiveTab(getTabByIndex(nextTabIndex));
          }}
          disabled={getTabIndex(activeTab) === 7}
        >
          下一步
        </Button>
      </div>
    </div>
  );
}

// 辅助函数：获取标签页索引
function getTabIndex(tab) {
  const tabs = ["file", "location", "education", "certificate", "professional", "personal", "weight", "threshold"];
  return tabs.indexOf(tab);
}

// 辅助函数：根据索引获取标签页
function getTabByIndex(index) {
  const tabs = ["file", "location", "education", "certificate", "professional", "personal", "weight", "threshold"];
  return tabs[index];
}