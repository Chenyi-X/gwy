import { useFormStore } from "@/store/formStore"


import { Button } from "@/components/ui/button"
import Link from "next/link";

const ReviewButton = ( ) => {
    const {prevStep} = useFormStore();

    return (
        <div className="flex gap-4 items-center justify-center text-center">
            <Button
                onClick={prevStep}
                variant="default"
                className="shadow-md hover:shadow-lg transition-shadow duration-300"
            >
                上一步
            </Button>

            <Button
                variant="default"
                className="shadow-md hover:shadow-lg transition-shadow duration-300"
            >
                <Link href={'/review'}>完成</Link>
            </Button>

        </div>
    )    
}
export {ReviewButton};