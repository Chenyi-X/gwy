'use client'
import { motion } from "framer-motion";
import { StepDiv } from "../StepDiv";

import { useFormStore } from '@/store/formStore';
import { Button } from "../ui/button";
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"



export function CompetitionStep() {
    const { 
        cities ,
        updateCityCompetition
    } = useFormStore();

    return (
        <div className="flex flex-col items-center justify-center  text-[2rem]">




            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="items-center justify-center text-center"
            >
                <h2>
                    你觉得哪个城市的竞争更激烈？
                </h2>

                <div className=" mt-10">
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

                                    defaultValue={[city.competition]}
                                    min={0}
                                    max={100}
                                    step={1}
                                    className="flex-1"
                                    onValueChange={(val:number[]) => updateCityCompetition(city.name, val[0])}
                                />

                                <Badge
                                    variant="secondary"
                                    className="ml-2"
                                >{city.competition}</Badge>

                            </div>

                        )
                    })}
                </div>

            </motion.div>


        </div>
    );
}