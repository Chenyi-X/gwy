import { useFormStore } from '@/store/formStore';
import { motion } from 'framer-motion';
import FactorBar from './FactorBar';

const WeightStep = () => {
    
    const {
        currentStep,
        setStep,
        nextStep,
        prevStep,
        setWeight,
        weight
    } = useFormStore();

    

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-4 w-full">


                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="items-center justify-center text-center"
                >
                    <h2 className="mb-4">
                        下面的<span className=' text-red-800 hover:underline'>因素</span>对你来说哪个更重要？
                    </h2>

                    <p className="mb-1 text-2xl ">
                        满分<span className='hover:underline'>100分</span>，分别给他们打个分吧！
                    </p>

                    <p className="text-[1rem] ">
                        (它们是筛选出你<span className=' text-red-800 hover:underline'>心仪</span>岗位并评分的重要依据)
                    </p>

                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="w-2/5"
                >
                    <FactorBar></FactorBar>
                </motion.div>
            </div>
        </>
    );

}

export {WeightStep};