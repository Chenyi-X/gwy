import { motion } from "framer-motion"
 
const Step = () => (

    <motion.h1
        className="text-[5rem] font-bold mb-15"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
    >
        Step
    </motion.h1>
)

export { Step } ;