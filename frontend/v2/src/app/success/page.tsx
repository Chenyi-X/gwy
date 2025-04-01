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

                <div className="text-[4rem]">已提交</div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-col items-center justify-center text-center  "
            >

                <div className="text-[3rem]">
                    点击下载即可查看经过筛选的岗位和分析结果
                </div>
            </motion.div>



            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex items-center justify-center text-center "
            >
                <div className="flex-4"></div>
                <Button className="flex-1">
                    下载
                </Button>
                <div className="flex-4"></div>
            </motion.div>

        </div>

    )
}

