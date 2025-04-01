'use client'
// pages/config.tsx
import { useFormStore } from '@/store/formStore';
import { ProgressBar } from '@/components/ProgressBar';
import { FileUploadStep } from '@/components/File/FileUploadStep';
import { CitiesStep } from '@/components/City/CitiesStep';
import { CityPreferenceStep } from '@/components/City/CityPreferenceStep';
import { CompetitionStep } from '@/components/City/CompetitionStep';
import { EducationStep } from '@/components/Education/EducationStep';
import { MajorsStep } from '@/components/Education/MajorsStep';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FileButton } from '@/components/File/FileButton';
import { StepDiv } from '@/components/StepDiv';
import { ReviewButton } from '@/components/ReviewButton';
import { useRouter } from 'next/navigation'




const ConfigPage = () => {
  const {
    currentStep,
    setStep,
    nextStep,
    prevStep,
  } = useFormStore();

  const router = useRouter();

  const handleNextStep = () => {
    currentStep === 6 ? router.push('/review') : nextStep()
    
  };

  return (
    <div className='min-h-screen flex flex-col'>

      <div className='flex-grow'>
        <div className='pt-[7rem] flex flex-col items-center justify-center  text-[2rem]'>

          <StepDiv currentStep = {currentStep}></StepDiv>

          {currentStep === 1 && <FileUploadStep />}
          {currentStep === 2 && <CitiesStep />}
          {currentStep === 3 && <CityPreferenceStep />}
          {currentStep === 4 && <CompetitionStep />}
          {currentStep === 5 && <EducationStep />}
          {currentStep === 6 && <MajorsStep />}
        </div>

        {/* 按钮 */}

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex gap-4 items-center justify-center text-center m-10"
        >
          {currentStep === 1 && <FileButton></FileButton>}
          {currentStep === 6 && <ReviewButton></ReviewButton>}
          {currentStep > 1 && currentStep < 6 && (
            <div className="flex gap-4 items-center justify-center text-center">
              <Button
                onClick={prevStep}
                variant="default"
                className="shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                上一步
              </Button>

              <Button
                onClick={handleNextStep}
                variant="default"
                className="shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                下一步
              </Button>
            </div>
          )}

        </motion.div>

      </div>

      <div className='flex container mx-auto '>
        <div className='flex-grow-2'></div>
        <div className='flex-grow-1'>
          <ProgressBar
            step={currentStep}
            totalSteps={6}
            onStepClick={setStep}
          />
        </div>
        <div className='flex-grow-2'></div>

      </div>


    </div>
  )
}

export default ConfigPage;
