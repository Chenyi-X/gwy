'use client';
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { 
  Save, 
  FolderOpen, 
  Download, 
  Upload, 
  Trash2, 
  ChevronDown,
  Plus,
  RefreshCw,
  Copy
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  saveUserConfig, 
  getUserConfigs, 
  loadUserConfig, 
  deleteUserConfig,
  exportConfigAsJson,
  importConfigFromJson,
  getDefaultConfig
} from '../../services/api';

const ConfigManager = ({ currentConfig, onConfigLoad }) => {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);
  const [configName, setConfigName] = useState('');
  const [savedConfigs, setSavedConfigs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fileInputRef, setFileInputRef] = useState(null);
  
  // 获取已保存的配置列表
  const fetchSavedConfigs = async () => {
    try {
      setIsLoading(true);
      const configs = await getUserConfigs();
      setSavedConfigs(configs);
    } catch (error) {
      toast({
        title: "获取配置失败",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // useEffect(() => {
  //   fetchSavedConfigs();
  // }, []);
  
  // 保存当前配置
  const handleSaveConfig = async () => {
    if (!configName.trim()) {
      toast({
        title: "保存失败",
        description: "请输入配置名称",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      await saveUserConfig(configName, currentConfig);
      toast({
        title: "保存成功",
        description: `配置 "${configName}" 已保存`,
      });
      setSaveDialogOpen(false);
      setConfigName('');
      fetchSavedConfigs();
    } catch (error) {
      toast({
        title: "保存失败",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // 加载选中的配置
  const handleLoadConfig = async (configId) => {
    try {
      setIsLoading(true);
      const config = await loadUserConfig(configId);
      onConfigLoad(config);
      toast({
        title: "加载成功",
        description: `配置已加载`,
      });
      setLoadDialogOpen(false);
    } catch (error) {
      toast({
        title: "加载失败",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // 删除选中的配置
  const handleDeleteConfig = async (configId, configName) => {
    try {
      setIsLoading(true);
      await deleteUserConfig(configId);
      toast({
        title: "删除成功",
        description: `配置 "${configName}" 已删除`,
      });
      fetchSavedConfigs();
    } catch (error) {
      toast({
        title: "删除失败",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // 导出配置为JSON
  const handleExportConfig = () => {
    try {
      exportConfigAsJson(currentConfig, `job-filter-config-${new Date().toISOString().split('T')[0]}`);
      toast({
        title: "导出成功",
        description: "配置已导出为JSON文件",
      });
    } catch (error) {
      toast({
        title: "导出失败",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  
  // 导入JSON配置
  const handleImportConfig = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    try {
      setIsLoading(true);
      const config = await importConfigFromJson(file);
      onConfigLoad(config);
      toast({
        title: "导入成功",
        description: "配置已从JSON文件导入",
      });
      // 重置文件输入
      if (fileInputRef) {
        fileInputRef.value = '';
      }
    } catch (error) {
      toast({
        title: "导入失败",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // 加载默认配置
  const handleLoadDefaultConfig = async () => {
    try {
      setIsLoading(true);
      const config = await getDefaultConfig();
      onConfigLoad(config);
      toast({
        title: "加载成功",
        description: "默认配置已加载",
      });
    } catch (error) {
      toast({
        title: "加载失败",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* 配置管理下拉菜单 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <FolderOpen className="h-4 w-4" />
            配置管理
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => setSaveDialogOpen(true)} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            保存配置
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLoadDialogOpen(true)} className="flex items-center gap-2">
            <FolderOpen className="h-4 w-4" />
            加载配置
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleExportConfig} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            导出为JSON
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => fileInputRef?.click()} 
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            从JSON导入
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLoadDefaultConfig} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            重置为默认
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* 隐藏的文件输入 */}
      <input
        type="file"
        ref={ref => setFileInputRef(ref)}
        accept=".json"
        style={{ display: 'none' }}
        onChange={handleImportConfig}
      />
      
      {/* 保存配置对话框 */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>保存配置</DialogTitle>
            <DialogDescription>
              为当前配置设置一个名称并保存，以便将来使用。
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="config-name" className="mb-2 block">
              配置名称
            </Label>
            <Input
              id="config-name"
              placeholder="输入配置名称..."
              value={configName}
              onChange={(e) => setConfigName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setSaveDialogOpen(false)}
              disabled={isLoading}
            >
              取消
            </Button>
            <Button 
              onClick={handleSaveConfig}
              disabled={isLoading || !configName.trim()}
            >
              {isLoading ? '保存中...' : '保存配置'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* 加载配置对话框 */}
      <Dialog open={loadDialogOpen} onOpenChange={setLoadDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>加载配置</DialogTitle>
            <DialogDescription>
              选择一个保存的配置进行加载。
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 max-h-[60vh] overflow-y-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <p>加载中...</p>
              </div>
            ) : savedConfigs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedConfigs.map((config) => (
                  <Card key={config.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{config.name}</CardTitle>
                      <CardDescription>
                        保存于 {new Date(config.createdAt).toLocaleString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="text-sm text-gray-500">
                        {config.description || '无描述'}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>确认删除</AlertDialogTitle>
                            <AlertDialogDescription>
                              确定要删除配置 "{config.name}" 吗？此操作无法撤销。
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>取消</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteConfig(config.id, config.name)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              删除
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleLoadConfig(config.id)}
                      >
                        加载
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-center">
                <p className="text-gray-500 mb-4">暂无保存的配置</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setLoadDialogOpen(false);
                    setSaveDialogOpen(true);
                  }}
                  className="flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  创建新配置
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConfigManager;