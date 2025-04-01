'use client'
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useFormStore } from "@/store/formStore";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import { useState } from "react";
import { FormAPI } from "@/service/api";
import { toast } from "sonner";

export function ReviewPage() {
    const router = useRouter();
    const {
        fileConfig,
        cities,
        education,
        majors,
        isGraduating,
        isCompleted,
        weight,
        setIsCompleted,
        resetForm
    } = useFormStore();

    const handleReset = () => {
        resetForm(); // 重置表单
        router.push('/config'); // 跳转到配置页面
    };


    const handleSubmit = async () => {
        setIsCompleted(true);

        try {
            const formData = {
                fileConfig,
                cities,
                education,
                majors,
                isGraduating,
                currentStep : 6,
                isCompleted,
                weight
            };

            const response = await FormAPI.submitForm(formData);

            if (response.success) {
                toast("提交成功", {
                    action: {
                        label: "好的",
                        onClick: () => console.log("OK"),
                    },
                    description: "服务器处理中",
                });

                resetForm(); // 可选：重置表单
                router.push('/success');
            } else {
                throw new Error(response.message);
            }

        } catch (error) {
            console.error("Error submitting form:", error);
        }

        router.push('/success');
    };

    const handleEdit = () => {
        router.push('/config');
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const factors= {
        city :"就职单位所在地",
        competition : "报考岗位好竞争",
        development : "岗位发展前景好",
        graduation : "应届生岗位",
        educationlevel : "岗位限制学历水平"
    };

    const factorsArray = Object.keys(factors);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl space-y-6"
            >
                <h1 className="text-3xl font-bold text-center mt-15 mb-3">确认您的选择</h1>

                <Card className="p-6 space-y-4 shadow hover:bg-neutral-50 hover:scale-[1.01] transition-all duration-300">

                    {/* 城市选择 */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold">意向城市</h2>
                        <div className="flex flex-col gap-2">
                            {cities.map((city) => (
                                <div key = {city.name} className="flex gap-2">
                                    <Badge variant={"outline"}>
                                        {city.name} 
                                    </Badge>
                                    <Badge variant={"outline"}>
                                        喜欢程度：{city.preference} 
                                    </Badge>
                                    <Badge variant={"outline"}>
                                        竞争激烈程度：{city.competition} 
                                    </Badge>
                                </div>
                                
                            ))}
                        </div>
                    </div>

                    {/* 教育信息 */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold">教育背景</h2>
                        <p>学历: <Badge variant={"outline"}>{education}</Badge></p>
                        <div className="space-y-1">
                            <div className="flex flex-wrap gap-2 ">
                                <p className="font-medium">专业:</p>
                                {majors.map((major) => (
                                    <Badge key={major} variant={"outline"}>
                                        {major}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <p >
                            是否应届: 
                            <Badge variant={"outline"}>
                                {isGraduating ? "应届毕业生" : "否"}
                            </Badge>

                        </p>
                    </div>

                    {/* 权重分配 */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold">因素得分</h2>
                        <div className="flex flex-col gap-2 w-1/3">
                           {factorsArray.map((factor,index) => (
                            <div key={index} className="flex gap-2">
                                <Badge key={factor} variant={"outline"} className="flex-2">
                                    {factors[factor as keyof typeof factors]}
                                </Badge>
                                <Badge key={index+"s"} variant={"outline"} className="flex-1">
                                    分数: {weight[factor as keyof typeof weight]}
                                </Badge>
                            </div>
                           ))}
                        </div>
                    </div>
                </Card>


                <div className="flex justify-center gap-4 mt-8">
                    <Button
                        variant="outline"
                        onClick={() => {
                            toast("确认要重置吗？",{
                                action: {
                                    label: "确认",
                                    onClick: handleReset,
                                    
                                },

                                description: "重置后您的配置将被清空"
                            })
                        }}
                        className="w-32"
                    >
                        重新进行配置
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleEdit}
                        disabled={isSubmitting}
                        className="w-32"
                    >
                        返回修改
                    </Button>
                    <Button
                        onClick={() => {
                            toast("确认要提交吗？",{
                                action: {
                                    label: "确认",
                                    onClick: handleSubmit,

                                },

                                description: "提交后您的配置将被保存"
                            })
                        }}
                        disabled={isSubmitting}
                        className="w-32"
                    >
                        {isSubmitting ? "提交中..." : "确认提交"}
                    </Button>
                </div>                
            </motion.div>
        </div>
    );
}

export default ReviewPage;