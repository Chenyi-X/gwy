import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFormStore } from "@/store/formStore";
import { useRef } from "react";

export function MajorsStep() {
    const {
        addMajor,
        removeMajor,
        majors,
    } = useFormStore();

    const inputRef = useRef<HTMLInputElement>(null);
    
    const handAddMajor = () => {
        if (!inputRef.current?.value) return;
        const majorName : string = inputRef.current?.value;
        addMajor(majorName);
        //清空input框
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    return (
        <div className="flex flex-col justify-center items-center text-[2rem]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-center flex flex-col gap-4"
            >
                <p>你的专业关键词有哪些？</p>
                <div className="flex">
                    <Input 
                        placeholder="请输入专业关键词" 
                        type="text"
                        ref={inputRef}
                    />
                    <Button 
                        variant="outline" 
                        className="ml-2"
                        onClick={handAddMajor}
                    >
                        添加
                    </Button>
                    
                </div>

                <p className="text-[1rem] font-[FangSong]">如：计算机类，软件工程</p>
                
                <div key={majors.length}>
                    {majors.map((major) =>(
                        <Button 
                            key={major} 
                            variant="outline" 
                            className="ml-2 "
                            onClick={() => removeMajor(major)}
                        >
                            {major}
                        </Button>    
                    ))}
                </div>

            </motion.div>
        </div>    
    );
}