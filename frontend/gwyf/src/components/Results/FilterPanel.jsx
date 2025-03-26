'use client';
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, X, Filter, RefreshCw } from "lucide-react";

const FilterPanel = ({ results, filters, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || "");
  const [selectedRatings, setSelectedRatings] = useState(filters.rating || []);
  const [selectedCities, setSelectedCities] = useState(filters.cities || []);
  const [selectedEducation, setSelectedEducation] = useState(filters.educationLevel || []);
  
  // 从结果中提取唯一的城市和学历
  const uniqueCities = [...new Set(results.map(r => r.city))].sort();
  const uniqueEducation = [...new Set(results.map(r => r.education))].sort();
  
  // 当用户更改过滤条件时更新父组件
  useEffect(() => {
    onFilterChange({
      rating: selectedRatings,
      cities: selectedCities,
      educationLevel: selectedEducation,
      searchTerm
    });
  }, [selectedRatings, selectedCities, selectedEducation, searchTerm, onFilterChange]);
  
  // 处理搜索
  const handleSearch = (e) => {
    e.preventDefault();
    // 搜索已经通过useEffect处理
  };
  
  // 处理评级过滤
  const handleRatingToggle = (rating) => {
    setSelectedRatings(prev => 
      prev.includes(rating) 
        ? prev.filter(r => r !== rating) 
        : [...prev, rating]
    );
  };
  
  // 处理城市过滤
  const handleCityToggle = (city) => {
    setSelectedCities(prev => 
      prev.includes(city) 
        ? prev.filter(c => c !== city) 
        : [...prev, city]
    );
  };
  
  // 处理学历过滤
  const handleEducationToggle = (edu) => {
    setSelectedEducation(prev => 
      prev.includes(edu) 
        ? prev.filter(e => e !== edu) 
        : [...prev, edu]
    );
  };
  
  // 重置所有过滤器
  const handleReset = () => {
    setSearchTerm("");
    setSelectedRatings([]);
    setSelectedCities([]);
    setSelectedEducation([]);
  };
  
  // 检查是否有任何过滤器处于活动状态
  const hasActiveFilters = searchTerm || 
    selectedRatings.length > 0 || 
    selectedCities.length > 0 || 
    selectedEducation.length > 0;

  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-4 w-4" />
            筛选条件
          </CardTitle>
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleReset}
              className="h-8 px-2 text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3" />
              重置
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 搜索框 */}
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="搜索岗位、公司..."
            className="pl-9 pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </form>
        
        {/* 评级过滤器 */}
        <div>
          <h3 className="text-sm font-medium mb-2">评级</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="rating-excellent" 
                checked={selectedRatings.includes('excellent')}
                onCheckedChange={() => handleRatingToggle('excellent')}
              />
              <Label htmlFor="rating-excellent" className="flex items-center gap-2 cursor-pointer">
                优秀
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                  {results.filter(r => r.score >= 88).length}
                </Badge>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="rating-good" 
                checked={selectedRatings.includes('good')}
                onCheckedChange={() => handleRatingToggle('good')}
              />
              <Label htmlFor="rating-good" className="flex items-center gap-2 cursor-pointer">
                良好
                <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                  {results.filter(r => r.score >= 80 && r.score < 88).length}
                </Badge>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="rating-poor" 
                checked={selectedRatings.includes('poor')}
                onCheckedChange={() => handleRatingToggle('poor')}
              />
              <Label htmlFor="rating-poor" className="flex items-center gap-2 cursor-pointer">
                不合格
                <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
                  {results.filter(r => r.score < 80).length}
                </Badge>
              </Label>
            </div>
          </div>
        </div>
        
        {/* 城市过滤器 */}
        <div>
          <h3 className="text-sm font-medium mb-2">城市</h3>
          <div className="flex flex-wrap gap-1 mb-2">
            {selectedCities.map(city => (
              <Badge 
                key={city} 
                variant="secondary"
                className="flex items-center gap-1 pl-2 pr-1 py-1"
              >
                {city}
                <button 
                  onClick={() => handleCityToggle(city)}
                  className="ml-1 rounded-full hover:bg-gray-300 p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="max-h-40 overflow-y-auto space-y-1 pr-1">
            {uniqueCities.map(city => {
              if (selectedCities.includes(city)) return null;
              const count = results.filter(r => r.city === city).length;
              return (
                <div key={city} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`city-${city}`} 
                    checked={selectedCities.includes(city)}
                    onCheckedChange={() => handleCityToggle(city)}
                  />
                  <Label htmlFor={`city-${city}`} className="flex justify-between w-full cursor-pointer">
                    <span>{city}</span>
                    <span className="text-xs text-gray-500">{count}</span>
                  </Label>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* 学历过滤器 */}
        <div>
          <h3 className="text-sm font-medium mb-2">学历要求</h3>
          <div className="space-y-2">
            {uniqueEducation.map(edu => {
              const count = results.filter(r => r.education === edu).length;
              return (
                <div key={edu} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`edu-${edu}`} 
                    checked={selectedEducation.includes(edu)}
                    onCheckedChange={() => handleEducationToggle(edu)}
                  />
                  <Label htmlFor={`edu-${edu}`} className="flex justify-between w-full cursor-pointer">
                    <span>{edu}</span>
                    <span className="text-xs text-gray-500">{count}</span>
                  </Label>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;