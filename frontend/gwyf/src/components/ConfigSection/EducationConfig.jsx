'use client'
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EducationConfig = ({ value, onChange }) => {
  // 确保有默认值
  const { 
    education_requirements = [], 
    base_experience = "不限", 
    fresh_graduate = false,
    education_weights = []
  } = value || {};
  
  // 将教育要求转换为对象数组
  const normalizedEducation = Array.isArray(education_weights) && education_weights.length > 0 
    ? education_weights 
    : education_requirements.map(edu => ({ value: edu, weight: edu === "本科以上" ? 100 : 70 }));
  
  const educationOptions = [
    { label: '不限', value: '不限' },
    { label: '大专以上', value: '大专以上' },
    { label: '本科以上', value: '本科以上' },
    { label: '硕士以上', value: '硕士以上' },
    { label: '博士', value: '博士' }
  ];
  
  const experienceOptions = [
    '不限', '无经验', '1年以下', '2年', '3年以上'
  ];
  
  const handleEducationToggle = (edu) => {
    // 检查是否已存在
    const existingIndex = normalizedEducation.findIndex(item => item.value === edu);
    let updatedEducation;
    
    if (existingIndex >= 0) {
      // 如果存在，则移除
      updatedEducation = normalizedEducation.filter(item => item.value !== edu);
    } else {
      // 如果不存在，则添加
      const defaultWeight = edu === "本科以上" ? 100 : edu === "硕士以上" ? 90 : 70;
      updatedEducation = [...normalizedEducation, { value: edu, weight: defaultWeight }];
    }
    
    onChange({
      ...value,
      education_requirements: updatedEducation.map(item => item.value),
      education_weights: updatedEducation
    });
  };
  
  const handleEducationWeightChange = (edu, weight) => {
    const updatedEducation = normalizedEducation.map(item => 
      item.value === edu ? { ...item, weight } : item
    );
    
    onChange({
      ...value,
      education_weights: updatedEducation
    });
  };
  
  const handleExperienceChange = (exp) => {
    onChange({
      ...value,
      base_experience: exp
    });
  };
  
  const handleFreshGraduateChange = (checked) => {
    onChange({
      ...value,
      fresh_graduate: checked
    });
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>学历与经验要求</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">学历要求 (可多选)</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {educationOptions.map((edu) => (
              <Button
                key={edu.value}
                variant={normalizedEducation.some(item => item.value === edu.value) ? "default" : "outline"}
                onClick={() => handleEducationToggle(edu.value)}
                className="transition-all"
              >
                {edu.label}
              </Button>
            ))}
          </div>
          
          <div className="space-y-2 mt-4">
            {normalizedEducation.length > 0 ? (
              normalizedEducation.map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
                  <Badge variant="outline" className="min-w-24 justify-center">
                    {item.value}
                  </Badge>
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-xs text-gray-500">权重:</span>
                    <Slider
                      value={[item.weight]}
                      min={0}
                      max={100}
                      step={1}
                      className="flex-1"
                      onValueChange={(val) => handleEducationWeightChange(item.value, val[0])}
                    />
                    <span className="text-xs w-6">{item.weight}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-sm italic p-2">请选择至少一项学历要求</div>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">工作经验要求</h3>
          <Select value={base_experience} onValueChange={handleExperienceChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="选择工作经验要求" />
            </SelectTrigger>
            <SelectContent>
              {experienceOptions.map((exp) => (
                <SelectItem key={exp} value={exp}>{exp}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 mt-1">
            工作经验要求
          </p>
        </div>
        
        <div className="flex items-center space-x-2 pt-4 border-t">
          <div className="flex flex-1 items-center space-x-2">
            <Switch
              id="freshGraduate"
              checked={fresh_graduate}
              onCheckedChange={handleFreshGraduateChange}
            />
            <label htmlFor="freshGraduate" className="text-sm font-medium cursor-pointer">
              应届生岗位
            </label>
          </div>
          <Badge variant={fresh_graduate ? "success" : "secondary"} className="ml-auto">
            {fresh_graduate ? "已启用" : "已禁用"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default EducationConfig;