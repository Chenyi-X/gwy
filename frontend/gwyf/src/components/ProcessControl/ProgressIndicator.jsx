'use client'
import React from 'react';
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const ProgressIndicator = ({ progress, steps = [] }) => {
  // 默认步骤
  const defaultSteps = [
    { name: '上传文件', percentage: 10 },
    { name: '数据解析', percentage: 30 },
    { name: '匹配分析', percentage: 60 },
    { name: '生成报告', percentage: 90 },
    { name: '完成', percentage: 100 }
  ];
  
  // 使用提供的步骤或默认步骤
  const processSteps = steps.length > 0 ? steps : defaultSteps;
  
  // 确定当前步骤
  const currentStep = processSteps.findIndex(step => progress < step.percentage);
  const activeStep = currentStep === -1 ? processSteps.length - 1 : currentStep - 1;
  
  // 计算每个步骤的宽度百分比
  const stepWidth = 100 / (processSteps.length - 1);
  
  return (
    <Card className="w-full mt-4">
      <CardContent className="pt-6">
        <div className="mb-2 flex justify-between items-center">
          <span className="text-sm font-medium">处理进度</span>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
        
        <Progress value={progress} className="h-2 mb-6" />
        
        <div className="relative">
          {/* 步骤连接线 */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200"></div>
          
          {/* 步骤点 */}
          <div className="flex justify-between relative">
            {processSteps.map((step, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center relative"
                style={{ width: `${stepWidth}%` }}
              >
                <div 
                  className={`w-4 h-4 rounded-full z-10 ${
                    progress >= step.percentage 
                      ? 'bg-blue-600' 
                      : index <= activeStep + 1 
                        ? 'bg-blue-200' 
                        : 'bg-gray-200'
                  }`}
                ></div>
                <span 
                  className={`mt-2 text-xs ${
                    index <= activeStep ? 'text-blue-600 font-medium' : 'text-gray-500'
                  }`}
                >
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          {activeStep >= 0 && activeStep < processSteps.length ? (
            <span>正在{processSteps[activeStep].name}...</span>
          ) : (
            <span>处理完成</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressIndicator;