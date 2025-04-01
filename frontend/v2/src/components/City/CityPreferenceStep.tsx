'use client'
import { motion } from "framer-motion";
import { StepDiv } from "../StepDiv";

import { useFormStore } from '@/store/formStore';
import { Button } from "../ui/button";
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"



export function CityPreferenceStep() {
    const { 
        cities ,
        updateCityPreference
    } = useFormStore();

    return (
        <div className="flex flex-col items-center justify-center  text-[2rem]">

            <StepDiv currentStep={3}></StepDiv>


            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="items-center justify-center text-center"
            >
                <h2 className="mb-4">
                    你对哪个城市喜欢多一点呢？
                </h2>

                <div>
                    {cities.map((city) => {
                        return (
                            <div className="flex gap-4 mt-4">
                                <Button
                                    key={city.name}
                                    variant="outline"
                                    className="ml-2"
                                >
                                    {city.name}
                                </Button>

                                <Slider
                                    defaultValue={[city.preference]}
                                    min={0}
                                    max={100}
                                    step={1}
                                    className="flex-1"
                                    onValueChange={(val:number[]) => updateCityPreference(city.name, val[0])}
                                />

                                <Badge
                                    variant="secondary"
                                    className="ml-2"
                                >{city.preference}</Badge>

                            </div>

                        )
                    })}
                </div>

            </motion.div>


        </div>
    );
}