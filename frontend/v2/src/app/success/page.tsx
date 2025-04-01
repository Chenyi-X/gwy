'use client'
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { toast } from "sonner";

export default function successPage() {
    useEffect (() => {
        toast("提交成功", {
            description: "解析已完成",
            action: {
                label: "OK",
                onClick: () => console.log("OK"),
            },
        });
    })
    return (
        <div className='h-screen flex flex-col justify-center gap-10'>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-col items-center justify-center text-center  "
            >

                <div className="text-[4rem] text-gray-500">已提交</div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-col items-center justify-center text-center  "
            >

                <div className="text-[2rem] hover:underline">
                    点击下载即可查看经过筛选的岗位和分析结果
                </div>
            </motion.div>



            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex items-center justify-center text-center min-h-1/5"
            >
                <div className="flex-6"></div>
                <Button 
                    onClick={() => {window.location.href = "/api/download"}}
                    className="flex-1 h-1/4 bg-secondary text-black hover:bg-neutral-800 hover:text-white  shadow">
                    下载
                </Button>
                <div className="flex-6"></div>
            </motion.div>

        </div>

    )
}

