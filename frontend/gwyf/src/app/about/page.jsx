export default function About() {
    return (
      <div className="min-h-screen bg-gray-50 py-15 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* 页面标题 */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              数据分析处理系统
            </h1>
            <p className="text-xl text-gray-600">需求分析与设计方案</p>
          </div>
  
          {/* 功能需求部分 */}
          <Section title="核心功能">
            <div className="grid md:grid-cols-2 gap-8">
              <FeatureCard
                icon="📥"
                title="数据输入"
                items={['Excel文件上传',  '多格式支持']}
              />
              <FeatureCard
                icon="⚙️"
                title="智能配置"
                items={[
                  '专业关键词过滤',
                  '多维度条件设置',
                  '权重分配系统'
                ]}
              />
              <FeatureCard
                icon="🔍"
                title="数据处理"
                items={[
                  '实时数据过滤',
                  '多维度评分算法',
                  '个性化配置'
                ]}
              />
              <FeatureCard
                icon="📊"
                title="结果输出"
                items={[
                  'Excel报告生成',
                  '可视化图表展示'
                ]}
              />
            </div>
          </Section>
  
          {/* 技术架构部分 */}
          <Section title="技术架构">
            <div className="space-y-8">
              <TechStack
                title="前端架构"
                items={[
                  'Next.js (React Framework)',
                  'Tailwind CSS (样式系统)',
                  'React-Table (数据表格)',
                  'Chart.js (数据可视化)'
                ]}
                color="bg-blue-100"
              />
              
              <TechStack
                title="后端架构"
                items={[
                  'FastAPI (Python REST API)',
                  'Pandas (数据处理)',
                  'Openpyxl (Excel处理)',
                  'Docker (容器化部署)'
                ]}
                color="bg-purple-100"
              />
            </div>
          </Section>
  
          {/* 系统流程部分 */}
          <Section title="数据处理流程">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                <ProcessStep
                  step="1"
                  title="数据上传"
                  description="用户上传原始Excel文件并预览数据"
                />
                <ProcessStep
                  step="2"
                  title="条件配置"
                  description="设置筛选条件与评分权重参数"
                />
                <ProcessStep
                  step="3"
                  title="智能处理"
                  description="系统自动过滤、评分并排序数据"
                />
                <ProcessStep
                  step="4"
                  title="结果输出"
                  description="导出处理后的Excel文件并可视化展示"
                />
              </div>
            </div>
          </Section>
        </div>
      </div>
    )
  }
  
  // 可复用组件部分
  function Section({ title, children }) {
    return (
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 border-l-4 border-blue-500 pl-4">
          {title}
        </h2>
        {children}
      </section>
    )
  }
  
  function FeatureCard({ icon, title, items }) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item} className="flex items-center text-gray-600">
              <span className="mr-2">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  
  function TechStack({ title, items, color }) {
    return (
      <div className={`p-6 rounded-lg ${color}`}>
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="flex flex-wrap gap-3">
          {items.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    )
  }
  
  function ProcessStep({ step, title, description }) {
    return (
      <div className="flex items-start space-x-4 bg-white p-4 rounded-lg border-l-4 border-blue-500">
        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
          {step}
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{title}</h4>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    )
}