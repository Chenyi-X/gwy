// services/api.js

/**
 * 发送配置和文件到后端进行处理
 * @param {File} file - 上传的Excel文件
 * @param {Object} config - 筛选配置
 * @returns {Promise} - 处理结果
 */
export async function processJobData(file, config) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('config', JSON.stringify(config));
    
    const response = await fetch('/api/process', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`处理失败: ${response.status}`);
    }
    
    const blob = await response.blob();

    console.log('blob.type:', blob.type);  // 添加日志

    const expectedMimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    if (blob.type !== expectedMimeType) {
      throw new Error(`无效的MIME类型: ${blob.type}`);
    }

    const excelFile = new File([blob], '岗位筛选报告.xlsx', { type: blob.type });

    return excelFile;


  } catch (error) {
    console.error('API错误:', error);
    throw error;
  }
}

/**
 * 获取处理结果
 * @param {string} jobId - 处理任务ID
 * @returns {Promise} - 处理结果
 */
export async function getProcessResults(jobId) {
  try {
    const response = await fetch(`http://localhost:8000/api/results/${jobId}`);
    
    if (!response.ok) {
      throw new Error(`获取结果失败: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API错误:', error);
    throw error;
  }
}

/**
 * 获取处理进度
 * @param {string} jobId - 处理任务ID
 * @returns {Promise} - 处理进度
 */
export async function getProcessProgress(jobId) {
  try {
    const response = await fetch(`http://localhost:8000/api/progress/${jobId}`);
    
    if (!response.ok) {
      throw new Error(`获取进度失败: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API错误:', error);
    throw error;
  }
}

/**
 * 保存用户配置
 * @param {string} configName - 配置名称
 * @param {Object} config - 配置对象
 * @returns {Promise} - 保存结果
 */
export async function saveUserConfig(configName, config) {
  try {
    const response = await fetch('http://localhost:8000/api/config/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: configName,
        config
      }),
    });
    
    if (!response.ok) {
      throw new Error(`保存配置失败: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API错误:', error);
    throw error;
  }
}

/**
 * 获取用户保存的配置列表
 * @returns {Promise} - 配置列表
 */
export async function getUserConfigs() {
  try {
    const response = await fetch('http://localhost:8000/api/config/list');
    
    if (!response.ok) {
      throw new Error(`获取配置列表失败: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API错误:', error);
    throw error;
  }
}

/**
 * 加载指定配置
 * @param {string} configId - 配置ID
 * @returns {Promise} - 配置对象
 */
export async function loadUserConfig(configId) {
  try {
    const response = await fetch(`http://localhost:8000/api/config/${configId}`);
    
    if (!response.ok) {
      throw new Error(`加载配置失败: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API错误:', error);
    throw error;
  }
}

/**
 * 删除指定配置
 * @param {string} configId - 配置ID
 * @returns {Promise} - 删除结果
 */
export async function deleteUserConfig(configId) {
  try {
    const response = await fetch(`http://localhost:8000/api/config/${configId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`删除配置失败: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API错误:', error);
    throw error;
  }
}

/**
 * 获取系统支持的城市列表
 * @returns {Promise} - 城市列表
 */
export async function getSupportedCities() {
  try {
    const response = await fetch('http://localhost:8000/api/cities');
    
    if (!response.ok) {
      throw new Error(`获取城市列表失败: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API错误:', error);
    throw error;
  }
}

/**
 * 获取系统支持的证书列表
 * @returns {Promise} - 证书列表
 */
export async function getSupportedCertificates() {
  try {
    const response = await fetch('http://localhost:8000/api/certificates');
    
    if (!response.ok) {
      throw new Error(`获取证书列表失败: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API错误:', error);
    throw error;
  }
}

/**
 * 获取系统支持的专业列表
 * @returns {Promise} - 专业列表
 */
export async function getSupportedMajors() {
  try {
    const response = await fetch('http://localhost:8000/api/majors');
    
    if (!response.ok) {
      throw new Error(`获取专业列表失败: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API错误:', error);
    throw error;
  }
}

/**
 * 获取系统默认配置
 * @returns {Promise} - 默认配置
 */
export async function getDefaultConfig() {
  try {
    const response = await fetch('/api/config/default');
    
    if (!response.ok) {
      throw new Error(`获取默认配置失败: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API错误:', error);
    throw error;
  }
}

/**
 * 导出配置为JSON文件
 * @param {Object} config - 配置对象
 * @param {string} filename - 文件名
 */
export function exportConfigAsJson(config, filename = 'job-filter-config') {
  try {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = `${filename}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('导出配置失败:', error);
    throw error;
  }
}

/**
 * 从JSON文件导入配置
 * @param {File} file - JSON配置文件
 * @returns {Promise} - 配置对象
 */
export function importConfigFromJson(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const config = JSON.parse(event.target.result);
        resolve(config);
      } catch (error) {
        reject(new Error('无效的配置文件格式'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('读取文件失败'));
    };
    
    reader.readAsText(file);
  });
}

