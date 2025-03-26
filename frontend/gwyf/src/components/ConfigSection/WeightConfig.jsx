'use client'
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertTriangle, Info } from "lucide-react";

const WeightConfig = ({ value, onChange }) => {
  // 确保有默认值
  const defaultWeights = {
    适配度: 0.15, 
    城市竞争度: 0.23, 
    发展度: 0.25,
    应届生: 0.18,
    学历: 0.07,
    就职地: 0.12
  };
  
  const weights = value || defaultWeights;
  const [localWeights, setLocalWeights] = useState(weights);
  const [isBalancing, setIsBalancing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [adjustingWeight, setAdjustingWeight] = useState(null);
  
  // 计算总权重
  const totalWeight = Object.values(localWeights).reduce((sum, weight) => sum + parseFloat(weight), 0);
  const isBalanced = Math.abs(totalWeight - 1) < 0.01; // 允许0.01的误差
  
  useEffect(() => {
    // 当外部值改变时更新本地状态
    setLocalWeights(value || defaultWeights);
  }, [value]);
  
  const handleWeightChange = (key, newValue) => {
    // 确保权重是数字
    const numValue = parseFloat(newValue) || 0;
    
    // 更新本地权重
    const updatedWeights = {
      ...localWeights,
      [key]: numValue
    };
    
    setLocalWeights(updatedWeights);
    
    // 如果权重总和接近1，则更新父组件
    const newTotal = Object.values(updatedWeights).reduce((sum, w) => sum + parseFloat(w), 0);
    if (Math.abs(newTotal - 1) < 0.01) {
      onChange(updatedWeights);
    }
  };
  
  const handleBalanceWeights = () => {
    setIsBalancing(true);
    
    // 计算当前总和
    const currentTotal = Object.values(localWeights).reduce((sum, w) => sum + parseFloat(w), 0);
    
    if (currentTotal === 0) {
      // 如果所有权重都是0，则平均分配
      const equalWeight = 1 / Object.keys(localWeights).length;
      const balancedWeights = Object.keys(localWeights).reduce((obj, key) => {
        obj[key] = parseFloat(equalWeight.toFixed(2));
        return obj;
      }, {});
      setLocalWeights(balancedWeights);
      onChange(balancedWeights);
    } else {
      // 按比例调整所有权重
      const factor = 1 / currentTotal;
      const balancedWeights = Object.keys(localWeights).reduce((obj, key) => {
        obj[key] = parseFloat((localWeights[key] * factor).toFixed(2));
        return obj;
      }, {});
      setLocalWeights(balancedWeights);
      onChange(balancedWeights);
    }
    
    setIsBalancing(false);
  };
  
  const handleManualAdjust = (key) => {
    setAdjustingWeight(key);
    setShowAlert(true);
  };
  
  const confirmManualAdjust = (value) => {
    if (adjustingWeight) {
      const numValue = parseFloat(value) || 0;
      handleWeightChange(adjustingWeight, numValue);
    }
    setShowAlert(false);
    setAdjustingWeight(null);
  };
  
  const getPercentage = (weight) => {
    return Math.round(weight * 100);
  };
  
  const weightDescriptions = {
    适配度: "职位描述与您的专业关键词的匹配程度",
    城市竞争度: "城市竞争激烈程度的评估",
    发展度: "职位所在单位的发展潜力评估",
    应届生: "是否适合应届生的评估",
    学历: "职位学历要求与您设置的学历条件的匹配程度",
    就职地: "职位具体地点与您偏好地点的匹配程度"
  };
  
  const weightColors = {
    适配度: "bg-blue-600",
    城市竞争度: "bg-green-500",
    发展度: "bg-yellow-500",
    应届生: "bg-purple-500",
    学历: "bg-pink-500",
    就职地: "bg-orange-500"
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>评分权重设置</CardTitle>
        <CardDescription>
          调整各项因素在最终评分中的权重比例，所有权重总和必须为100%
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.keys(localWeights).map((key) => (
            <div key={key}>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    {key} 权重
                  </label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-5 w-5 p-0">
                          <Info className="h-4 w-4 text-gray-400" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">{weightDescriptions[key]}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {getPercentage(localWeights[key])}%
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6" 
                    onClick={() => handleManualAdjust(key)}
                  >
                    <span className="text-xs">✏️</span>
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Slider
                  value={[localWeights[key] * 100]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(val) => handleWeightChange(key, val[0] / 100)}
                  className="flex-1"
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-md border">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium">权重分配总览</h3>
            <div className="flex items-center gap-2">
              <span className={`text-sm ${isBalanced ? 'text-green-600' : 'text-red-600'} font-medium`}>
                总计: {Math.round(totalWeight * 100)}%
              </span>
              {!isBalanced && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleBalanceWeights}
                  disabled={isBalancing}
                >
                  自动平衡
                </Button>
              )}
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div className="flex h-2.5 rounded-full overflow-hidden">
              {Object.keys(localWeights).map((key, index) => (
                <div 
                  key={index}
                  className={`${weightColors[key]}`}
                  style={{width: `${getPercentage(localWeights[key])}%`}}
                  title={`${key}: ${getPercentage(localWeights[key])}%`}
                ></div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3">
            {Object.keys(localWeights).map((key, index) => (
              <div key={index} className="flex items-center text-xs">
                <div className={`w-3 h-3 rounded-full mr-1 ${weightColors[key]}`}></div>
                <span>{key} ({getPercentage(localWeights[key])}%)</span>
              </div>
            ))}
          </div>
          
          {!isBalanced && (
            <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-md flex items-center gap-2 text-amber-700">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs">权重总和必须为100%，请调整或点击"自动平衡"</span>
            </div>
          )}
        </div>
      </CardContent>
      
      {/* 手动调整权重的对话框 */}
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>调整 {adjustingWeight} 权重</AlertDialogTitle>
            <AlertDialogDescription>
              请输入0-100之间的百分比值。所有权重总和必须为100%。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Input 
              type="number"
              min="0"
              max="100"
              step="1"
              defaultValue={adjustingWeight ? getPercentage(localWeights[adjustingWeight]) : 0}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value >= 0 && value <= 100) {
                  e.target.value = value.toString();
                }
              }}
              className="w-full"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={(e) => {
              const input = e.target.parentElement.parentElement.querySelector('input');
              confirmManualAdjust(parseInt(input.value) / 100);
            }}>
              确认
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default WeightConfig;