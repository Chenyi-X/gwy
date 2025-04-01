import { motion } from "framer-motion"
 
const StepDiv = ({currentStep}
    :{currentStep:number}
) => (

    <motion.h1
        key={currentStep}
        className="text-[5rem] font-bold mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
    >
        Step {currentStep}
    </motion.h1>
)

export { StepDiv } ;