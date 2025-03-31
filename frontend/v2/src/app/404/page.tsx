'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="text-2xl text-gray-600">页面未找到</p>
        <p className="text-gray-500">您访问的页面可能已被删除或不存在。</p>
        <Button asChild className="mt-6">
          <Link href="/" className="text-lg">
            返回主页
          </Link>
        </Button>
      </div>
    </div>
  );
}