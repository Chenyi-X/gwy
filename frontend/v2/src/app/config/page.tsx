'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { toast } from "sonner";

export default function Page() {
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
        <div className="flex flex-col items-center justify-center min-h-screen text-[2rem]">

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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex gap-4 items-center justify-center text-center m-10"
        >    
            <div className="flex gap-4 items-center justify-center text-center">
                <Button
                    variant="default"
                    className="shadow-md hover:shadow-lg transition-shadow duration-300"
                    asChild
                >
                    <Link href="/">返回主页</Link>
                </Button>
                <Button
                    onClick={handleUploadClick}
                    variant="default"
                    className="shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                    上传
                </Button>

                <Button
                    onClick={() => console.log('下一步')}
                    variant="default"
                    className="shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                    <Link href={"/config/city"}>
                        下一步
                    </Link>
                </Button>
            </div>
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