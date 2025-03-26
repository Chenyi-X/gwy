'use client'
import React from 'react';
import { Button } from "@/components/ui/button";
import { Play, Loader2 } from "lucide-react";

const RunButton = ({ onClick, disabled, isProcessing, text = "开始处理" }) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || isProcessing}
      size="lg"
      className="w-full py-6 text-lg font-medium"
    >
      {isProcessing ? (
        <div className="flex items-center justify-center">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          <span>正在处理数据...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <Play className="mr-2 h-5 w-5" />
          <span>{text}</span>
        </div>
      )}
    </Button>
  );
};

export default RunButton;