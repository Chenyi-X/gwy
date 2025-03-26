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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Plus, X, Map, Building, MapPin } from "lucide-react";

const LocationConfig = ({ value, onChange }) => {
  // 确保有默认值
  const { 
    target_cities = [], 
    accept_town_positions = true, 
    location_preferences = {},
    city_weights = []
  } = value || {};
  
  const [newCity, setNewCity] = useState('');
  const [newCityWeight, setNewCityWeight] = useState(70);
  const [newLocation, setNewLocation] = useState('');
  const [newLocationWeight, setNewLocationWeight] = useState(70);
  
  // 将城市权重转换为对象数组格式
  const normalizedCityWeights = Array.isArray(city_weights) ? city_weights : 
    target_cities.map(city => ({ 
      city, 
      weight: 70 
    }));
  
  // 将位置偏好转换为对象数组格式
  const normalizedLocationPrefs = Object.entries(location_preferences).map(
    ([location, weight]) => ({ location, weight: parseFloat(weight) })
  );
  
  const popularCities = [
    '北京', '上海', '广州', '深圳', '杭州', 
    '南京', '成都', '武汉', '西安', '重庆',
    '苏州', '天津', '长沙', '郑州', '青岛',
    '佛山', '云浮', '肇庆'
  ];
  
  const popularLocations = [
    '郁南', '新兴', '罗定', '端州', '鼎湖', 
    '南海', '番禺', '荔湾', '天河', '海珠'
  ];
  
  const handleAddCity = () => {
    if (newCity.trim() && !normalizedCityWeights.some(item => item.city === newCity.trim())) {
      const updatedCities = [...normalizedCityWeights, { 
        city: newCity.trim(), 
        weight: newCityWeight 
      }];
      
      onChange({
        ...value,
        city_weights: updatedCities,
        target_cities: updatedCities.map(item => item.city)
      });
      
      setNewCity('');
    }
  };

  const handleRemoveCity = (city) => {
    const updatedCities = normalizedCityWeights.filter(item => item.city !== city);
    
    onChange({
      ...value,
      city_weights: updatedCities,
      target_cities: updatedCities.map(item => item.city)
    });
  };
  
  const handleCityWeightChange = (city, weight) => {
    const updatedCities = normalizedCityWeights.map(item => 
      item.city === city ? { ...item, weight } : item
    );
    
    onChange({
      ...value,
      city_weights: updatedCities
    });
  };

  const handleAddLocation = () => {
    if (newLocation.trim() && !normalizedLocationPrefs.some(item => item.location === newLocation.trim())) {
      const updatedLocations = [...normalizedLocationPrefs, { 
        location: newLocation.trim(), 
        weight: newLocationWeight 
      }];
      
      // 转换回对象格式
      const updatedLocationPrefs = {};
      updatedLocations.forEach(item => {
        updatedLocationPrefs[item.location] = item.weight;
      });
      
      onChange({
        ...value,
        location_preferences: updatedLocationPrefs
      });
      
      setNewLocation('');
    }
  };
  
  const handleRemoveLocation = (location) => {
    const updatedLocations = normalizedLocationPrefs.filter(item => item.location !== location);
    
    // 转换回对象格式
    const updatedLocationPrefs = {};
    updatedLocations.forEach(item => {
      updatedLocationPrefs[item.location] = item.weight;
    });
    
    onChange({
      ...value,
      location_preferences: updatedLocationPrefs
    });
  };
  
  const handleLocationWeightChange = (location, weight) => {
    const updatedLocations = normalizedLocationPrefs.map(item => 
      item.location === location ? { ...item, weight } : item
    );
    
    // 转换回对象格式
    const updatedLocationPrefs = {};
    updatedLocations.forEach(item => {
      updatedLocationPrefs[item.location] = item.weight;
    });
    
    onChange({
      ...value,
      location_preferences: updatedLocationPrefs
    });
  };
  
  const handleToggleTownPositions = (checked) => {
    onChange({
      ...value,
      accept_town_positions: checked
    });
  };
  
  const handleAddPopularCity = (city) => {
    if (!normalizedCityWeights.some(item => item.city === city)) {
      const updatedCities = [...normalizedCityWeights, { 
        city, 
        weight: 70 
      }];
      
      onChange({
        ...value,
        city_weights: updatedCities,
        target_cities: updatedCities.map(item => item.city)
      });
    }
  };
  
  const handleAddPopularLocation = (location) => {
    if (!normalizedLocationPrefs.some(item => item.location === location)) {
      const updatedLocations = [...normalizedLocationPrefs, { 
        location, 
        weight: 70 
      }];
      
      // 转换回对象格式
      const updatedLocationPrefs = {};
      updatedLocations.forEach(item => {
        updatedLocationPrefs[item.location] = item.weight;
      });
      
      onChange({
        ...value,
        location_preferences: updatedLocationPrefs
      });
    }
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>地理位置偏好</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="cities">
          <TabsList className="mb-4">
            <TabsTrigger value="cities" className="flex items-center gap-1 text-red-350 hover:text-blue-700 data-[state=active]:text-blue-600 data-[state=active]:border-blue-600">
              <Map className="h-4 w-4" />
              考区城市
            </TabsTrigger>
            <TabsTrigger value="locations" className="flex items-center gap-1 text-red-400 hover:text-blue-700 data-[state=active]:text-blue-600 data-[state=active]:border-blue-600">
              <Building className="h-4 w-4" />
              就职地偏好
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="cities">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newCity}
                  onChange={e => setNewCity(e.target.value)}
                  placeholder="输入城市名称..."
                  className="flex-1"
                />
                <div className="flex items-center gap-2 w-48">
                  <span className="text-sm whitespace-nowrap">权重:</span>
                  <Slider
                    value={[newCityWeight]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(val) => setNewCityWeight(val[0])}
                    className="flex-1"
                  />
                  <span className="text-sm w-8">{newCityWeight}</span>
                </div>
                <Button onClick={handleAddCity}>
                  <Plus className="h-4 w-4 mr-1" />
                  添加
                </Button>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">已选城市及竞争的 容易 程度:</h3>
                <div className="space-y-2">
                  {normalizedCityWeights.length > 0 ? (
                    normalizedCityWeights.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
                        <Badge variant="outline" className="min-w-20 justify-center">
                          {item.city}
                        </Badge>
                        <div className="flex-1 flex items-center gap-2">
                          <span className="text-xs text-gray-500">竞争度:</span>
                          <Slider
                            value={[item.weight]}
                            min={0}
                            max={100}
                            step={1}
                            className="flex-1"
                            onValueChange={(val) => handleCityWeightChange(item.city, val[0])}
                          />
                          <span className="text-xs w-6">{item.weight}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleRemoveCity(item.city)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 text-sm italic p-2">尚未添加城市</div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">热门城市:</h3>
                <div className="flex flex-wrap gap-2">
                  {popularCities.map((city, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddPopularCity(city)}
                      disabled={normalizedCityWeights.some(item => item.city === city)}
                      className={normalizedCityWeights.some(item => item.city === city) ? "opacity-50" : ""}
                    >
                      {city}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="locations">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newLocation}
                  onChange={e => setNewLocation(e.target.value)}
                  placeholder="输入就职地(区县)名称..."
                  className="flex-1"
                />
                <div className="flex items-center gap-2 w-48">
                  <span className="text-sm whitespace-nowrap">权重:</span>
                  <Slider
                    value={[newLocationWeight]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(val) => setNewLocationWeight(val[0])}
                    className="flex-1"
                  />
                  <span className="text-sm w-8">{newLocationWeight}</span>
                </div>
                <Button onClick={handleAddLocation}>
                  <Plus className="h-4 w-4 mr-1" />
                  添加
                </Button>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">就职地偏好:</h3>
                <div className="space-y-2">
                  {normalizedLocationPrefs.length > 0 ? (
                    normalizedLocationPrefs.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
                        <Badge variant="outline" className="min-w-20 justify-center">
                          {item.location}
                        </Badge>
                        <div className="flex-1 flex items-center gap-2">
                          <span className="text-xs text-gray-500">偏好度:</span>
                          <Slider
                            value={[item.weight]}
                            min={0}
                            max={100}
                            step={1}
                            className="flex-1"
                            onValueChange={(val) => handleLocationWeightChange(item.location, val[0])}
                          />
                          <span className="text-xs w-6">{item.weight}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleRemoveLocation(item.location)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 text-sm italic p-2">尚未添加就职地偏好</div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">常见就职地:</h3>
                <div className="flex flex-wrap gap-2">
                  {popularLocations.map((location, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddPopularLocation(location)}
                      disabled={normalizedLocationPrefs.some(item => item.location === location)}
                      className={normalizedLocationPrefs.some(item => item.location === location) ? "opacity-50" : ""}
                    >
                      {location}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-4 border-t">
                <Switch
                  id="accept-town"
                  checked={accept_town_positions}
                  onCheckedChange={handleToggleTownPositions}
                />
                <label 
                  htmlFor="accept-town" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  接受乡镇职位
                </label>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LocationConfig;