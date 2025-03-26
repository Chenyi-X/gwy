'use client';
import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const Visualization = ({ results, stats }) => {
  const [activeTab, setActiveTab] = useState("distribution");
  
  // 城市分布数据
  const cityData = Object.entries(
    results.reduce((acc, result) => {
      acc[result.city] = (acc[result.city] || 0) + 1;
      return acc;
    }, {})
  )
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  // 学历分布数据
  const educationData = Object.entries(
    results.reduce((acc, result) => {
      acc[result.education] = (acc[result.education] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));
  
  // 评分分布数据
  const scoreRanges = [
    { range: '0-60', label: '0-60' },
    { range: '60-70', label: '60-70' },
    { range: '70-80', label: '70-80' },
    { range: '80-90', label: '80-90' },
    { range: '90-100', label: '90-100' }
  ];
  
  const scoreDistribution = scoreRanges.map(({ range, label }) => {
    const [min, max] = range.split('-').map(Number);
    const count = results.filter(r => r.score >= min && r.score < max).length;
    return { range: label, count };
  });
  
  // 各项分数平均值
  const avgScores = {
    专业适配度: results.reduce((sum, r) => sum + r.matchScore, 0) / results.length,
    城市竞争度: results.reduce((sum, r) => sum + r.competitiveScore, 0) / results.length,
    发展度: results.reduce((sum, r) => sum + r.developmentScore, 0) / results.length,
    学历匹配: results.reduce((sum, r) => sum + r.educationScore, 0) / results.length,
    地点偏好: results.reduce((sum, r) => sum + r.locationScore, 0) / results.length,
    应届生友好度: results.reduce((sum, r) => sum + r.freshGradScore, 0) / results.length,
  };
  
  const radarData = [
    {
      subject: '专业适配度',
      A: avgScores.专业适配度,
      fullMark: 100,
    },
    {
      subject: '城市竞争度',
      A: avgScores.城市竞争度,
      fullMark: 100,
    },
    {
      subject: '发展度',
      A: avgScores.发展度,
      fullMark: 100,
    },
    {
      subject: '学历匹配',
      A: avgScores.学历匹配,
      fullMark: 100,
    },
    {
      subject: '地点偏好',
      A: avgScores.地点偏好,
      fullMark: 100,
    },
    {
      subject: '应届生友好度',
      A: avgScores.应届生友好度,
      fullMark: 100,
    },
  ];
  
  // 饼图颜色
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  // 评级颜色
  const RATING_COLORS = {
    excellent: '#22c55e',
    good: '#eab308',
    poor: '#ef4444'
  };
  
  // 评级数据
  const ratingData = [
    { name: '优秀', value: stats.excellent, color: RATING_COLORS.excellent },
    { name: '良好', value: stats.good, color: RATING_COLORS.good },
    { name: '不合格', value: stats.poor, color: RATING_COLORS.poor }
  ];

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="distribution">分数分布</TabsTrigger>
          <TabsTrigger value="city">城市分布</TabsTrigger>
          <TabsTrigger value="education">学历分布</TabsTrigger>
          <TabsTrigger value="radar">雷达图</TabsTrigger>
        </TabsList>
        
        <TabsContent value="distribution" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">评分分布</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={scoreDistribution}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="岗位数量" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">评级占比</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={ratingData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {ratingData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="city">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">城市分布 (Top 10)</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={cityData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="city" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="岗位数量" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="education">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">学历要求分布</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={educationData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {educationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="radar">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">各项指标平均分</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="平均分"
                      dataKey="A"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Visualization;