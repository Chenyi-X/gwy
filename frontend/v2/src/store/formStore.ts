// src/store/useFormStore.ts

import { set } from 'react-hook-form';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// 类型定义
export type Education = '大专' | '本科' | '硕士研究生' | '博士研究生' | '其他' | '空';

export interface City {
  name: string;
  preference: number; // 喜好权重 1 - 100
  competition: number; // 竞争烈度 1 - 100
}

export interface FormState {
  currentStep: number;
  fileConfig: {
    hasFile: boolean;
    file?: File;
    fileName?: string;
  };
  cities: City[];
  education: Education;
  majors: string[];
  isGraduating: boolean;
  isCompleted: boolean;
}

interface FormActions {
  // 步骤控制
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  
  // 文件配置
  setFileConfig: (config: FormState['fileConfig']) => void;
  
  // 城市相关
  addCity: (cityName: string) => void;
  removeCity: (cityName: string) => void;
  updateCityPreference: (cityName: string, preference: number) => void;
  updateCityCompetition: (cityName: string, competition: number) => void;
  
  // 教育和专业
  setEducation: (education: Education) => void;
  addMajor: (major: string) => void;
  removeMajor: (major: string) => void;
  setIsGraduating: (isGraduating: boolean) => void;
  
  // 表单状态
  setIsCompleted: (isCompleted: boolean) => void;
  
  // 重置
  resetForm: () => void;
}

type FormStore = FormState & FormActions;

// 初始状态
const initialState: FormState = {
  currentStep: 1,
  fileConfig: {
    hasFile: false,
  },
  cities: [],
  education: '空',
  majors: [],
  isGraduating: false,
  isCompleted: false,
};

export const useFormStore = create<FormStore>()(
  devtools(
    persist(
      (set) => ({
        // 初始状态
        ...initialState,

        // 步骤控制
        nextStep: () =>
          set((state) => ({
            currentStep: Math.min(state.currentStep + 1, 6),
          })),

        prevStep: () =>
          set((state) => ({
            currentStep: Math.max(state.currentStep - 1, 1),
          })),

        setStep: (step) =>
          set(() => ({
            currentStep: step,
          })),

        // 文件配置
        setFileConfig: (config) =>
          set(() => ({
            fileConfig: config,
          })),

        // 城市相关
        addCity: (cityName) =>
          set((state) => ({
            // 确保城市名称唯一
            cities: state.cities.some((city) => city.name === cityName)? state.cities : [
             ...state.cities,
              { name: cityName, preference: 50, competition: 50 }, 
            ]
            
          })),

        removeCity: (cityName) =>
          set((state) => ({
            cities: state.cities.filter((city) => city.name !== cityName),
          })),

        updateCityPreference: (cityName, preference) =>
          set((state) => ({
            cities: state.cities.map((city) =>
              city.name === cityName ? { ...city, preference } : city
            ),
          })),

        updateCityCompetition: (cityName, competition) =>
          set((state) => ({
            cities: state.cities.map((city) =>
              city.name === cityName ? { ...city, competition } : city
            ),
          })),

        // 教育和专业
        setEducation: (education) =>
          set(() => ({
            education,
          })),

        setIsGraduating: (isGraduating) =>
          set(() => ({
            isGraduating,
          })),  

        addMajor: (major) =>
          set((state) => ({
            majors: [...state.majors, major],
          })),

        removeMajor: (major) =>
          set((state) => ({
            majors: state.majors.filter((m) => m !== major),
          })),

        // 表单状态
        setIsCompleted: (isCompleted) =>
          set(() => ({
            isCompleted,
          })),

        // 重置表单
        resetForm: () =>
          set(() => ({
            ...initialState,
          })),
      }),
      {
        name: 'form-storage', // localStorage 的 key
        partialize: (state) => ({
          // 持久化时排除 file 对象
          ...state,
          fileConfig: {
            hasFile: state.fileConfig.hasFile,
            fileName: state.fileConfig.fileName,
          },
        }),
      }
    )
  )
);

// 选择器
export const selectCurrentStep = (state: FormStore) => state.currentStep;
export const selectFileConfig = (state: FormStore) => state.fileConfig;
export const selectCities = (state: FormStore) => state.cities;
export const selectEducation = (state: FormStore) => state.education;
export const selectMajors = (state: FormStore) => state.majors;
export const selectIsCompleted = (state: FormStore) => state.isCompleted;
