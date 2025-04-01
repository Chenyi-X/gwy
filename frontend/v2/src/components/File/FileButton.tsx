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
                onClick={nextStep}
                variant="default"
                className="shadow-md hover:shadow-lg transition-shadow duration-300"
            >
                下一步
            </Button>

            
        </div>
    )
}

export {FileButton};