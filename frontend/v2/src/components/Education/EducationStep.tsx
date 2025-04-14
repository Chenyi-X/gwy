import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useFormStore } from "@/store/formStore";
import { useEffect, useState } from "react";
import { Education } from "@/store/formStore";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";


export function EducationStep() {
    const {
        setEducation,
        setIsGraduating,
        isGraduating,
        education
    } = useFormStore();



    const [buttons, setButtons] = useState([
        { id: 1, text: '大专', isClick: false, disabled: false },
        { id: 2, text: '本科', isClick: false, disabled: false },
        { id: 3, text: '硕士研究生', isClick: false, disabled: false },
        { id: 4, text: '博士研究生', isClick: false, disabled: false },
        { id: 5, text: '其他', isClick: false, disabled: false }
    ]);

    buttons.map((button) => {
        if (education === "空") {
            return;
        } else if (education === button.text) {
            button.isClick = true;
            button.disabled = false;
        } else{
            button.isClick = false;
            button.disabled = true;
        }
    })

    const handleClick = (id: number) => {
        // 找到当前点击的按钮
        const clickedButton = buttons.find(button => button.id === id);
        
        // 如果按钮已经被选中，则取消选中并启用所有按钮
        if (clickedButton && clickedButton.isClick) {
            const newButtons = buttons.map(button => ({
                ...button,
                isClick: false,
                disabled: false
            }));
            setButtons(newButtons);
            setEducation('空' as Education); // 清除选择
        } 
        // 如果按钮未被选中，则选中它并禁用其他按钮
        else {
            const newButtons = buttons.map(button => ({
                ...button,
                isClick: button.id === id,
                disabled: button.id !== id
            }));
            setButtons(newButtons);
            
            if (clickedButton) {
                setEducation(clickedButton.text as Education);
            }
        }
    };

    const handleSwitchChanged = (isChecked: boolean) => {
        setIsGraduating(isChecked);
    };

    return (
        <div className="flex flex-col justify-center items-center text-[2rem] " >

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-center flex flex-col gap-4"
            >
                <p>您的学历是？</p>

                <div className="flex gap-3 mt-3 mb-3 flex-wrap items-center justify-center">

                    {buttons.map((button) => (
                        <Button
                            key={button.id}
                            onClick={() => handleClick(button.id)}
                            variant={button.isClick ? 'default' : 'outline'}
                            disabled={button.disabled}
                        >
                            {button.text}
                        </Button>
                    ))}

                </div>


                <div className=" flex items-center space-x-2 justify-center pr-2">
                    <div className="flex-1/2"> </div>
                    <Switch
                        className="ml-2"
                        checked={isGraduating}
                        onCheckedChange={handleSwitchChanged}
                    ></Switch>
                    <Label htmlFor="airplane-mode">应届毕业生</Label>
                </div>


            </motion.div>
        </div>

    )

}