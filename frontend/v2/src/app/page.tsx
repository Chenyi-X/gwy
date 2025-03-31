import Link from 'next/link';

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden font-sans">
      {/* 3D波浪背景 */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-blue-50 to-transparent opacity-70"></div>
        <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            fill="rgba(96, 165, 250, 0.05)" 
            d="M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,165.3C672,192,768,224,864,213.3C960,203,1056,149,1152,138.7C1248,128,1344,160,1392,176L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z">
          </path>
        </svg>
        <svg className="absolute top-0 left-0 w-full" style={{marginTop: '50px'}} viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            fill="rgba(124, 58, 237, 0.03)" 
            d="M0,64L48,80C96,96,192,128,288,138.7C384,149,480,139,576,122.7C672,107,768,85,864,96C960,107,1056,149,1152,165.3C1248,181,1344,171,1392,165.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z">
          </path>
        </svg>
      </div>

      {/* 英雄区域 */}
      <div className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <br className="hidden md:block" /><br className="hidden md:block" />
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 text-transparent bg-clip-text tracking-tight animate-fade-in">
            选岗帮
          </h1>
          
          <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto animate-fade-in animation-delay-200">
            还在为不知道如何选岗而烦恼吗？
            <br className="hidden md:block" /><br className="hidden md:block" />
            快来试试使用我们的选岗帮吧！
          </p>
          
          <div className="mt-10 animate-fade-in animation-delay-400">
            <Link href="/file">
              <button className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-black text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 transform hover:scale-105 active:scale-95">
                开始使用
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 inline-block" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </Link>
          </div>
          
          {/* 示例界面图像 */}
          <div className="mt-16 relative h-64 sm:h-80 md:h-96 animate-fade-in animation-delay-600">
            <div className="absolute inset-0 flex justify-center">
              <div className="relative w-full max-w-4xl h-full rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-[1.02]">
                {/* 分析界面的截图 */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-90 flex items-center justify-center">
                  <p className="text-white text-xl font-medium">
                    <img src="https://p.sda1.dev/22/69af1af32a0c8c518d8b601d60d2bd22/屏幕截图 2025-03-26 093254.png" alt="分析界面" className="w-full h-full object-cover" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 使用步骤 */}
      <div className="relative z-10 py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-on-scroll">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              <span className="block">三步完成</span>
              <span className="block mt-2 text-primary-600">职位智能分析</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              你只需要跟着我们的引导走，就能轻松获取到心仪的岗位
              <br className="hidden md:block" /><br className="hidden md:block" />
              简单高效的操作流程，让您快速获取理想职位推荐
            </p>
          </div>

          <div className="mt-16">
            <div className="relative">
              {/* 连接线 */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-primary-400 to-purple-200 transform -translate-y-1/2 hidden md:block"></div>
              
              <div className="relative grid gap-8 md:grid-cols-3">
                {/* 步骤 1 */}
                <div className="relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    1
                  </div>
                  <div className="pt-6">
                    <h3 className="text-xl font-bold text-gray-900 mt-4">上传Excel文件</h3>
                    <p className="mt-4 text-gray-600">上传包含职位信息的Excel文件，系统将自动解析和处理数据。</p>
                    
                    <div className="mt-6 flex justify-center">
                      <div className="w-16 h-16 text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 步骤 2 */}
                <div className="relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-green-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    2
                  </div>
                  <div className="pt-6">
                    <h3 className="text-xl font-bold text-gray-900 mt-4">配置筛选参数</h3>
                    <p className="mt-4 text-gray-600">设置您的专业、学历、意向城市等个人偏好，调整各项评分权重。</p>
                    
                    <div className="mt-6 flex justify-center">
                      <div className="w-16 h-16 text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 步骤 3 */}
                <div className="relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    3
                  </div>
                  <div className="pt-6">
                    <h3 className="text-xl font-bold text-gray-900 mt-4">获取分析结果</h3>
                    <p className="mt-4 text-gray-600">系统将根据您的配置筛选并评分职位，生成详细报告供下载。</p>
                    
                    <div className="mt-6 flex justify-center">
                      <div className="w-16 h-16 text-purple-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 系统特点 */}
      <div className="relative z-10 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">系统特点</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              专业的岗位分析工具，助您做出最佳职业选择
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* 特点 1 */}
            <div className="bg-white p-6 rounded-xl shadow-lg h-full border border-gray-100 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">智能筛选</h3>
              <p className="mt-3 text-gray-600">根据您的专业背景和要求自动筛选合适的职位，节省筛选时间</p>
            </div>

            {/* 特点 2 */}
            <div className="bg-white p-6 rounded-xl shadow-lg h-full border border-gray-100 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">全面评分</h3>
              <p className="mt-3 text-gray-600">多维度评估每个职位的匹配度和发展潜力，提供量化参考</p>
            </div>

            {/* 特点 3 */}
            <div className="bg-white p-6 rounded-xl shadow-lg h-full border border-gray-100 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">个性化配置</h3>
              <p className="mt-3 text-gray-600">自定义评分权重和筛选条件，满足不同求职者的个性化需求</p>
            </div>

            {/* 特点 4 */}
            <div className="bg-white p-6 rounded-xl shadow-lg h-full border border-gray-100 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">详细报告</h3>
              <p className="mt-3 text-gray-600">生成格式化的Excel报告，支持颜色标注和重点突出，便于决策</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 开始使用区域 - 修改了背景色和按钮颜色，提高对比度 */}
      <div className="relative z-10 py-16 bg-gradient-to-t from-blue-100 to-blue-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              准备好开始使用了吗？
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-white text-opacity-90">
              立即体验智能岗位分析系统，找到最适合您的职业机会
            </p>
            
            <div className="mt-8">
              <Link href="/file">
                <button className="px-8 py-4 bg-white text-primary-700 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 transform hover:scale-105 active:scale-95">
                  立即开始
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
