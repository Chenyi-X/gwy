'use client'
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} 选岗帮. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;