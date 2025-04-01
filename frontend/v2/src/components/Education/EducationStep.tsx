import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useFormStore } from "@/store/formStore";
import { useState } from "react";
import { StepDiv } from "../StepDiv";
import { Education } from "@/store/formStore";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";


export function EducationStep() {
    const { 
        setEducation ,
        setIsGraduating
    } = useFormStore();


    const [buttons, setButtons] = useState([
        { id: 1, text: '大专', isClick: false ,disabled:false},
        { id: 2, text: '本科', isClick: false ,disabled:false},
        { id: 3, text: '硕士研究生', isClick: false,disabled:false  },
        { id: 4, text: '博士研究生', isClick: false ,disabled:false  },
        { id: 5, text: '其他', isClick: false,disabled:false }
      ]);
    
      const handleClick = (id : number) => {
        setButtons(buttons.map(button => 
          button.id === id 
            ? ({ ...button, isClick: !button.isClick } 
            )
            : {...button, disabled: !button.disabled}
        ));
        setEducation(buttons.find(button => button.id === id)?.text as Education);
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

                <div className="flex gap-3 mt-3 mb-3">
                    
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
                

                <div className=" flex items-center space-x-2 justify-center">
                    <div className="flex-1/2"> </div>
                    <Switch 
                        className="ml-2"
                        onCheckedChange={handleSwitchChanged}
                    ></Switch>
                    <Label htmlFor="airplane-mode">应届毕业生</Label>
                </div>
                

            </motion.div>        
        </div>

    )

}