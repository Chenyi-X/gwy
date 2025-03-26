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
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { X, Plus, Settings } from "lucide-react";

const ProfessionalConfig = ({ value = [], onChange }) => {
  const [newKeyword, setNewKeyword] = useState('');
  const [newWeight, setNewWeight] = useState(100);
  const [newColor, setNewColor] = useState('#3b82f6'); // 默认蓝色
  
  const suggestedKeywords = [
    '不限', '软件工程', '计算机类', '经济学类', '法学类', 
    '金融学', '会计学', '土木类', '统计学类', '电气类',
    '材料类', '理学', '社会学', '数学类', '管理学',
    '中国语言文学类', '新闻传播学', '心理学', '化学类', '文学',
    '电子信息类'
  ];

  // 将简单的关键词数组转换为包含权重和颜色的对象数组
  const normalizedValue = value.map(item => 
    typeof item === 'string' 
      ? { keyword: item, weight: 100, color: '#3b82f6' } 
      : item
  );

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !normalizedValue.some(item => item.keyword === newKeyword.trim())) {
      const newItem = {
        keyword: newKeyword.trim(),
        weight: newWeight,
        color: newColor.replace('#', '')
      };
      
      onChange([...normalizedValue, newItem]);
      setNewKeyword('');
      setNewWeight(100);
    }
  };

  const handleRemoveKeyword = (keyword) => {
    const updatedKeywords = normalizedValue.filter(item => item.keyword !== keyword);
    onChange(updatedKeywords);
  };

  const handleAddSuggestion = (suggestion) => {
    if (!normalizedValue.some(item => item.keyword === suggestion)) {
      const newItem = {
        keyword: suggestion,
        weight: 100,
        color: suggestion === '不限' ? '666666' : '3b82f6'
      };
      
      onChange([...normalizedValue, newItem]);
    }
  };
  
  const handleUpdateKeyword = (index, field, value) => {
    const updatedKeywords = [...normalizedValue];
    updatedKeywords[index] = {
      ...updatedKeywords[index],
      [field]: value
    };
    onChange(updatedKeywords);
  };

  const getColorPreview = (color) => {
    const hexColor = color.startsWith('#') ? color : `#${color}`;
    return (
      <div 
        className="w-6 h-6 rounded-full border border-gray-300" 
        style={{ backgroundColor: hexColor }}
      ></div>
    );
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>专业配置</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">
          添加与您专业相关的关键词，并设置匹配权重和高亮颜色
        </p>
        
        <div className="flex gap-2 mb-4">
          <Input
            value={newKeyword}
            onChange={e => setNewKeyword(e.target.value)}
            placeholder="输入专业关键词..."
            className="flex-1"
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">关键词权重</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Slider
                      value={[newWeight]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(val) => setNewWeight(val[0])}
                    />
                    <span className="text-sm w-8">{newWeight}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">高亮颜色</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      type="color"
                      value={newColor}
                      onChange={e => setNewColor(e.target.value)}
                      className="w-16 h-8 p-1"
                    />
                    <span className="text-sm">{newColor}</span>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button onClick={handleAddKeyword}>
            <Plus className="h-4 w-4 mr-1" />
            添加
          </Button>
        </div>
        
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">已添加关键词:</h3>
          <div className="space-y-2">
            {normalizedValue.length > 0 ? (
              normalizedValue.map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
                  <div className="flex items-center gap-1">
                    {getColorPreview(item.color)}
                    <Badge variant="outline" className="font-medium">
                      {item.keyword}
                    </Badge>
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-xs text-gray-500">权重:</span>
                    <Slider
                      value={[item.weight]}
                      min={0}
                      max={100}
                      step={1}
                      className="flex-1"
                      onValueChange={(val) => handleUpdateKeyword(index, 'weight', val[0])}
                    />
                    <span className="text-xs w-6">{item.weight}</span>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">高亮颜色</label>
                        <Input
                          type="color"
                          value={`#${item.color}`}
                          onChange={e => handleUpdateKeyword(index, 'color', e.target.value.replace('#', ''))}
                          className="w-full h-8"
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleRemoveKeyword(item.keyword)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-sm italic p-2">尚未添加关键词</div>
            )}
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">常用关键词建议:</h3>
          <div className="flex flex-wrap gap-2">
            {suggestedKeywords.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleAddSuggestion(suggestion)}
                disabled={normalizedValue.some(item => item.keyword === suggestion)}
                className={normalizedValue.some(item => item.keyword === suggestion) ? "opacity-50" : ""}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfessionalConfig;