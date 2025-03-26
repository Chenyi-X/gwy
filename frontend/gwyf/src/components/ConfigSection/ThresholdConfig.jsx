'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

const ThresholdConfig = ({ value, onChange }) => {
  const [thresholds, setThresholds] = useState({
    优秀: value && value.优秀 || 88,
    良好: value && value.良好 || 80
  });
  
  useEffect(() => {
    if (value) {
      setThresholds({
        优秀: value.优秀 || 88,
        良好: value.良好 || 80
      });
    }
  }, [value]);
  
  const handleSliderChange = (name, newValue) => {
    // 确保优秀阈值始终大于良好阈值
    let updatedThresholds;
    
    if (name === '优秀') {
      updatedThresholds = {
        ...thresholds,
        [name]: Math.max(newValue[0], thresholds.良好 + 1)
      };
    } else {
      updatedThresholds = {
        ...thresholds,
        [name]: Math.min(newValue[0], thresholds.优秀 - 1)
      };
    }
    
    setThresholds(updatedThresholds);
    onChange(updatedThresholds);
  };
  
  const handleInputChange = (name, value) => {
    const numValue = parseInt(value);
    
    if (isNaN(numValue) || numValue < 0 || numValue > 100) {
      return;
    }
    
    let updatedThresholds;
    
    if (name === '优秀') {
      updatedThresholds = {
        ...thresholds,
        [name]: Math.max(numValue, thresholds.良好 + 1)
      };
    } else {
      updatedThresholds = {
        ...thresholds,
        [name]: Math.min(numValue, thresholds.优秀 - 1)
      };
    }
    
    setThresholds(updatedThresholds);
    onChange(updatedThresholds);
  };
  
  // 重置为默认值
  const handleReset = () => {
    const defaultThresholds = {
      优秀: 88,
      良好: 80
    };
    
    setThresholds(defaultThresholds);
    onChange(defaultThresholds);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">评分阈值设置</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>设置岗位评级的分数阈值。高于"优秀"阈值的岗位将被评为优秀，高于"良好"阈值但低于"优秀"阈值的岗位将被评为良好，低于"良好"阈值的岗位将被评为不合格。</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="space-y-8">
          {/* 可视化区间表示 */}
          <div className="relative h-10 mb-8">
            <div className="absolute inset-0 flex">
              <div 
                className="bg-red-100 h-full rounded-l-md flex items-center justify-center text-xs text-red-800 font-medium"
                style={{ width: `${thresholds.良好}%` }}
              >
                不合格
              </div>
              <div 
                className="bg-yellow-100 h-full flex items-center justify-center text-xs text-yellow-800 font-medium"
                style={{ width: `${thresholds.优秀 - thresholds.良好}%` }}
              >
                良好
              </div>
              <div 
                className="bg-green-100 h-full rounded-r-md flex items-center justify-center text-xs text-green-800 font-medium"
                style={{ width: `${100 - thresholds.优秀}%` }}
              >
                优秀
              </div>
            </div>
            <div className="absolute inset-0 pointer-events-none">
              <div 
                className="absolute top-full mt-1 w-px h-2 bg-black"
                style={{ left: '0%' }}
              >
                <span className="absolute top-full left-1/2 -translate-x-1/2 text-xs">0</span>
              </div>
              <div 
                className="absolute top-full mt-1 w-px h-2 bg-black"
                style={{ left: `${thresholds.良好}%` }}
              >
                <span className="absolute top-full left-1/2 -translate-x-1/2 text-xs">{thresholds.良好}</span>
              </div>
              <div 
                className="absolute top-full mt-1 w-px h-2 bg-black"
                style={{ left: `${thresholds.优秀}%` }}
              >
                <span className="absolute top-full left-1/2 -translate-x-1/2 text-xs">{thresholds.优秀}</span>
              </div>
              <div 
                className="absolute top-full mt-1 w-px h-2 bg-black"
                style={{ left: '100%' }}
              >
                <span className="absolute top-full left-1/2 -translate-x-1/2 text-xs">100</span>
              </div>
            </div>
          </div>
          
          {/* 优秀阈值设置 */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="excellent-threshold">优秀阈值</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="excellent-threshold-input"
                  type="number"
                  min={thresholds.良好 + 1}
                  max={100}
                  value={thresholds.优秀}
                  onChange={(e) => handleInputChange('优秀', e.target.value)}
                  className="w-16 h-8"
                />
                <span className="text-sm text-gray-500">分</span>
              </div>
            </div>
            <Slider
              id="excellent-threshold"
              min={0}
              max={100}
              step={1}
              value={[thresholds.优秀]}
              onValueChange={(value) => handleSliderChange('优秀', value)}
              className="[&_[role=slider]]:bg-green-600"
            />
            <p className="text-sm text-gray-500">
              分数大于等于 {thresholds.优秀} 分的岗位将被评为"优秀"
            </p>
          </div>
          
          {/* 良好阈值设置 */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="good-threshold">良好阈值</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="good-threshold-input"
                  type="number"
                  min={0}
                  max={thresholds.优秀 - 1}
                  value={thresholds.良好}
                  onChange={(e) => handleInputChange('良好', e.target.value)}
                  className="w-16 h-8"
                />
                <span className="text-sm text-gray-500">分</span>
              </div>
            </div>
            <Slider
              id="good-threshold"
              min={0}
              max={100}
              step={1}
              value={[thresholds.良好]}
              onValueChange={(value) => handleSliderChange('良好', value)}
              className="[&_[role=slider]]:bg-yellow-600"
            />
            <p className="text-sm text-gray-500">
              分数大于等于 {thresholds.良好} 分但小于 {thresholds.优秀} 分的岗位将被评为"良好"
            </p>
          </div>
          
          {/* 不合格说明 */}
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-700">
              分数小于 {thresholds.良好} 分的岗位将被评为"不合格"
            </p>
          </div>
          
          {/* 重置按钮 */}
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleReset}
            >
              重置默认值
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThresholdConfig;