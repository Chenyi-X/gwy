// src/services/api.ts

import { FormState } from '@/store/formStore';

// 定义提交表单的响应类型
interface SubmitFormResponse {
  success: boolean;
  message: string;
  data?: any;
}

// 定义要提交到后端的数据结构
interface SubmitFormData {
  education: string;
  majors: string[];
  isGraduating: boolean;
  cities: {
    name: string;
    preference: number;
    competition: number;
  }[];
}

export class FormAPI {
  private static BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

  static async submitForm(formData: FormState): Promise<SubmitFormResponse> {
    try {
      // 处理文件上传（如果有文件）
      let fileUploadResponse = null;
      if (formData.fileConfig.hasFile && formData.fileConfig.file) {
        const formDataFile = new FormData();
        formDataFile.append('file', formData.fileConfig.file);
        
        const fileResponse = await fetch(`${this.BASE_URL}/upload`, {
          method: 'POST',
          body: formDataFile,
        });

        if (!fileResponse.ok) {
          throw new Error('文件上传失败');
        }

        fileUploadResponse = await fileResponse.json();
      }

      // 准备提交的数据
      const submitData: SubmitFormData = {
        education: formData.education,
        majors: formData.majors,
        isGraduating: formData.isGraduating,
        cities: formData.cities.map(city => ({
          name: city.name,
          preference: city.preference,
          competition: city.competition,
        })),
      };

      // 提交表单数据
      const response = await fetch(`${this.BASE_URL}/submit-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...submitData,
          fileId: fileUploadResponse?.fileId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        message: '提交成功',
        data,
      };

    } catch (error) {
      console.error('Form submission error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : '提交失败，请稍后重试',
      };
    }
  }
}