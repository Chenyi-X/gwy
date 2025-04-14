import { Weight } from "@/store/formStore";
import { Slider } from "../ui/slider";
import { useFormStore } from "@/store/formStore";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const FactorBar = () => {

    const { weight, setWeight } = useFormStore();

    const factors= {
        city :"就职单位所在地",
        competition : "报考岗位好竞争",
        development : "岗位发展前景好",
        graduation : "应届生岗位",
        educationlevel : "岗位限制学历水平"
    };

    const factorsArray : string[] = Object.keys(factors);

    console.log(factorsArray);

    return (
        <div className="flex flex-col gap-1 bg-neutral-50 rounded-lg p-4 shadow-md hover:scale-[1.02] transition-transform duration-200">
            {factorsArray.map((factor, index) => (
                <div key={index} className="grid grid-cols-11 gap-4 pr-5">
                    <Button key={factor} className="col-span-5 ml-2 md:col-span-3" variant="outline">
                        {factors[factor as keyof typeof factors]}
                    </Button>
                    <Slider
                        className="col-span-5 ml-2 md:col-span-7"
                        defaultValue={[weight[factor as keyof Weight]]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(val: number[]) => setWeight({ ...weight, [factor]: val[0] })}
                    ></Slider>
                    <Badge className="col-span-1 ml-2" variant="secondary">
                        {weight[factor as keyof Weight]}
                    </Badge>
                </div>

            ))}

        </div>

    )

}

export default FactorBar;