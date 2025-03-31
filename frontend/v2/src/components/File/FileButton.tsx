import { useFormStore } from "@/store/formStore"
import { Button } from "../ui/button"
import { toast } from "sonner";
import { useRef } from "react";
import Link from "next/link";

const FileButton = () => {
    const {
        currentStep,
        setStep,
        nextStep,
        prevStep,
        setFileConfig,
        addCity,
        removeCity,
        updateCityCompetition,
        updateCityPreference,
        setEducation,
        addMajor,
        removeMajor,
        setIsCompleted,
        resetForm
    } = useFormStore()

    const fileInputRef = useRef<HTMLInputElement>(null); // 用于引用文件输入元素的ref

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

        const fileConfig = {
            hasFile: true,
            fileName: "file",
            file: file
        }

        setFileConfig(fileConfig);

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
                onClick={nextStep}
                variant="default"
                className="shadow-md hover:shadow-lg transition-shadow duration-300"
            >
                下一步
            </Button>

            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
            />
        </div>
    )
}

export {FileButton};