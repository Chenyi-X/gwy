'use client'
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useFormStore } from "@/store/formStore";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"

export function ReviewPage() {
    const router = useRouter();
    const {
        fileConfig,
        cities,
        education,
        majors,
        isGraduating,
        setIsCompleted
    } = useFormStore();

    const handleSubmit = () => {
        setIsCompleted(true);
        router.push('/success');
    };

    const handleEdit = () => {
        router.push('/config');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl space-y-6"
            >
                <h1 className="text-3xl font-bold text-center mb-8">确认您的选择</h1>

                <Card className="p-6 space-y-4">
                    {/* 文件配置 */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold">简历文件</h2>
                        <p className="text-gray-600">
                            {fileConfig.hasFile
                                ? `已上传: ${fileConfig.fileName}`
                                : "未上传文件"}
                        </p>
                    </div>

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
                </Card>

                <div className="flex justify-center gap-4 mt-8">
                    <Button
                        variant="outline"
                        onClick={handleEdit}
                        className="w-32"
                    >
                        返回修改
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        className="w-32"
                    >
                        确认提交
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}

export default ReviewPage;