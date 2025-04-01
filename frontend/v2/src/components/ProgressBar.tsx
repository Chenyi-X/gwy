import { Check } from "lucide-react"

export function ProgressBar({ 
  step, 
  totalSteps,
  onStepClick
}: { 
  step: number
  totalSteps: number
  onStepClick?: (step: number) => void
}) {
  const progressPercentage = ((step - 1) / (totalSteps - 1)) * 100

  return (
    <div className="w-full px-4 py-8 relative">
      {/* 背景进度条 */}
      <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-gray-200 rounded-full transform -translate-y-1/2" />
      
      {/* 前景进度条 */}
      <div 
        className="absolute top-1/2 left-0 h-1.5 bg-neutral-700 rounded-full transform -translate-y-1/2 transition-all duration-300 ease-out" 
        style={{ width: `${progressPercentage}%` }}
      />

      {/* 步骤节点容器 */}
      <div className="flex justify-between relative z-10">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < step
          const isCurrent = stepNumber === step

          return (
            <div 
              key={stepNumber}
              className="flex flex-col items-center gap-2 cursor-pointer group"
              onClick={() => onStepClick?.(stepNumber)}
            >
              {/* 步骤圆圈 */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 
                  ${isCurrent ? 'bg-primary text-primary-foreground border-2 border-primary' 
                    : isCompleted ? 'bg-primary text-primary-foreground border-2 border-primary' 
                    : 'bg-background border-2 border-gray-300 text-gray-400'}`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="font-medium text-sm">{stepNumber}</span>
                )}
              </div>

              {/* 步骤文字 */}
              <span
                className={`text-sm font-medium transition-colors duration-300 
                  ${isCurrent || isCompleted ? 'text-foreground' : 'text-muted-foreground'}
                  group-hover:text-foreground`}
              >
                {getStepLabel(stepNumber)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// 根据实际步骤内容返回对应的标签
function getStepLabel(step: number): string {
  switch (step) {
    case 1: return '文件上传'
    case 2: return '城市选择'
    case 3: return '偏好设置'
    case 4: return '竞争分析'
    case 5: return '教育背景'
    case 6: return '专业选择'
    case 7: return '评分因素'
    default: return `步骤 ${step}`
  }
}