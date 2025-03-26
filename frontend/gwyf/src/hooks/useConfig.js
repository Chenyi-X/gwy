// hooks/useConfig.js
import { useState, useEffect } from 'react';

// 默认配置
const defaultConfig = {
  
};


export function useConfig() {
  // 从localStorage加载保存的配置，如果没有则使用默认配置
  const [config, setConfig] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedConfig = localStorage.getItem('jobFilterConfig');
      return savedConfig ? JSON.parse(savedConfig) : defaultConfig;
    }
    return defaultConfig;
  });
  
  // 当配置变化时保存到localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jobFilterConfig', JSON.stringify(config));
    }
  }, [config]);
  
  // 更新配置的特定部分
  const updateConfig = (section, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: value
    }));
  };
  
  // 重置为默认配置
  const resetConfig = () => {
    setConfig(defaultConfig);
  };
  
  // 加载完整的配置
  const loadConfig = (newConfig) => {
    setConfig(newConfig);
  };
  
  return {
    config,
    updateConfig,
    resetConfig,
    loadConfig
  };
}