import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFormStore } from "@/store/formStore";
import { useRef } from "react";
import { StepDiv } from "../StepDiv";

export function  CitiesStep() {
    const {
        addCity,
        removeCity,
        cities
    } = useFormStore();

    const inputRef = useRef<HTMLInputElement>(null);

    const handAddCity = () => {
        if (!inputRef.current?.value) return;
        const cityName : string = inputRef.current?.value;
        addCity(cityName);
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
                <p>告诉我你感兴趣的城市或区县</p>
                <div className="flex">
                    <Input 
                        placeholder="请输入城市或区县" 
                        type="text"
                        ref={inputRef}
                    />
                    <Button 
                        variant="outline" 
                        className="ml-2"
                        onClick={handAddCity}
                    >
                        添加
                    </Button>
                </div>
                
                <div key={cities.length}>
                    {cities.map((city) =>(
                        <Button 
                            key={city.name} 
                            variant="outline" 
                            className="ml-2"
                            onClick={() => removeCity(city.name)}
                        >
                            {city.name}
                        </Button>    
                    ))}
                </div>

            </motion.div>



        </div>
    );
}