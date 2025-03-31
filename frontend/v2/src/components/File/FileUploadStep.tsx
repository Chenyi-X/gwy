'use client'
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { toast } from "sonner";

export function FileUploadStep() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.size > 10 * 1024 * 1024) { // 10MB
            toast("文件上传失败", {
                description: "文件必须小于10MB",
                action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
            },
        })
        return;
        }

        setSelectedFile(file);

        toast("文件上传成功", {
            description: "文件已缓存",
            action: {
                label: "OK",
            onClick: () => console.log("Undo"),
            },
        });
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
    <>
        <div className="flex flex-col items-center justify-center  text-[2rem]">

        <motion.h1
            className="text-[5rem] font-bold mb-15"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
        >
          Step 1
        </motion.h1>


        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="items-center justify-center text-center"
        >
            <h2 className="mb-4">
                选择你的数据来源
            </h2>

            <p className="mb-4">
                是否选择自己上传excel文件？
            </p>

            <p className="mb-4">
                否则直接点击下一步,
            </p>

            <p className="mb-4">
                系统将应用广东省2025年公务员考试职务表。
            </p>
        </motion.div>
        
          {/* 隐藏的文件输入 */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
            />
      </div>
    </>
  );
}