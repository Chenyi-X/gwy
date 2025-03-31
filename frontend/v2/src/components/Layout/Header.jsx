'use client'
import React from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  // 改进的滚动监听逻辑，实现顶栏收起效果
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 函数组件中useEffect无法访问最新的state，需要使用ref
  const menuRef = React.useRef(null);
  const buttonRef = React.useRef(null);

  // 处理点击事件
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) && 
        buttonRef.current && 
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 处理按钮点击
  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'translate-y-0 opacity-100' 
        : 'translate-y-2 opacity-100'
    }`}>
      <div className="container mx-auto px-4 py-1">
        <div className={`flex justify-between items-center rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300 px-4 ${
          isScrolled
            ? 'h-12 bg-white/85'
            : 'h-14 bg-white/70'
        }`}>
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <svg className={`transition-all duration-500 ${
                isScrolled ? 'h-6 w-6' : 'h-8 w-8'
              } text-primary-500`} viewBox="0 0 32 32">
                <path fill="currentColor" d="M16 2.5l11.5 7v10L16 27.5 4.5 19.5v-10L16 2.5z" 
                  className="transition-all duration-500 opacity-90 hover:opacity-100"/>
              </svg>
              <span className={`font-semibold transition-all duration-500 ${
                isScrolled ? 'text-lg' : 'text-xl'
              } text-gray-700`}>选岗帮</span>
            </Link>
          </div>
          
          {/* 彻底修复的导航菜单 */}
          <div className="relative">
            <button 
              ref={buttonRef}
              onClick={handleButtonClick}
              className="p-1.5 rounded-lg transition-all duration-300 hover:bg-gray-100">
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5" 
                     viewBox="0 0 24 24" 
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                     style={{ 
                       transform: isOpen ? 'rotate(-90deg)' : 'rotate(0deg)',
                       transition: 'transform 0.3s ease-in-out' 
                     }}>
                  {/* 倒三角图标 */}
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </div>
            </button>

            {/* 使用绝对定位+z-index确保菜单不会被遮挡 */}
            <div 
              ref={menuRef}
              className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl overflow-hidden z-50
                          transition-all duration-300 origin-top-right
                          ${isOpen ? 'block' : 'hidden'}`}
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <div className="bg-white/95 backdrop-blur-sm border border-gray-100 rounded-lg">
                <Link href="/" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  首页
                </Link>
                <Link href="/config" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  配置
                </Link>
                <Link href="/results" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  结果
                </Link>
                <Link href="/about" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  关于
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;