"use client"

import { Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { FormProgress, FormNavigation } from "@/components/shared/form-components"
import { useMultiStepForm } from "@/hooks/use-multi-step-form"
import { autoInsuranceFormSchema } from "@/types/form"
import type { AutoInsuranceFormData, GeneralInfo, Driver, Vehicle, DrivingHistory } from "@/types/form"
import { Loader2 } from "lucide-react"
import dynamic from "next/dynamic"

const STEPS = [
  "General Information",
  "Driver Information",
  "Vehicle Information",
  "Driving History",
  "Submission Confirmation",
]

const GeneralInfoStep = dynamic(() => import("./steps/GeneralInfoStep").then((mod) => mod.GeneralInfoStep), {
  loading: () => <StepLoader />,
})
const DriverInfoStep = dynamic(() => import("./steps/DriverInfoStep").then((mod) => mod.DriverInfoStep), {
  loading: () => <StepLoader />,
})
const VehicleInfoStep = dynamic(() => import("./steps/VehicleInfoStep").then((mod) => mod.VehicleInfoStep), {
  loading: () => <StepLoader />,
})
const DrivingHistoryStep = dynamic(() => import("./steps/DrivingHistoryStep").then((mod) => mod.DrivingHistoryStep), {
  loading: () => <StepLoader />,
})
const ThankYouStep = dynamic(() => import("./steps/ThankYouStep").then((mod) => mod.ThankYouStep), {
  loading: () => <StepLoader />,
})

const StepLoader = () => (
  <div className="flex justify-center items-center h-64">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>
)

interface AutoInsuranceFormProps {
  onSubmit?: () => void
}

const INITIAL_FORM_DATA: AutoInsuranceFormData = {
  generalInfo: {
    insuredName: "",
    address: "",
    homePhone: "",
    mobilePhone: "",
    email: "",
  },
  drivers: [
    {
      name: "",
      sex: "",
      dateOfBirth: "",
      maritalStatus: "",
      relationToInsured: "",
      licenseNumber: "",
      driverTraining: "",
      dateLicensed: { g: "", g2: "", g1: "" },
    },
  ],
  vehicles: [
    {
      year: "",
      make: "",
      model: "",
      vin: "",
      principalDriver: "",
      use: "",
      kmsDriven: "",
      annualKms: "",
      purchaseDate: "",
      ownership: "",
      winterTires: false,
    },
  ],
  drivingHistory: {
    presentInsurer: "",
    expiryDate: "",
    yearsInsuredInCanada: "",
    insuranceCancelled: "",
    propertyInsurance: "",
    atFaultAccidents: "",
    notAtFaultAccidents: "",
    drivingConvictions: "",
    licenseSuspensions: "",
    notes: "",
  },
}

export default function AutoInsuranceForm({ onSubmit: onFormSubmit }: AutoInsuranceFormProps) {
  const {
    currentStep,
    formData,
    errors,
    isSubmitting,
    handleNext,
    handlePrevious,
    handleSubmit,
    updateFormData,
  } = useMultiStepForm({
    schema: autoInsuranceFormSchema,
    initialData: INITIAL_FORM_DATA,
    steps: STEPS,
    onSubmit: async (data) => {
      console.log("Form submitted:", data)
      onFormSubmit?.()
    },
  })

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="pt-6 px-0">
        <div className="mb-8">
          <FormProgress currentStep={currentStep} steps={STEPS} />
        </div>

        <form onSubmit={handleSubmit}>
          {currentStep === 0 && (
            <GeneralInfoStep
              data={formData.generalInfo}
              onChange={(generalInfo: GeneralInfo) => updateFormData("generalInfo", generalInfo)}
              errors={errors}
            />
          )}
          {currentStep === 1 && (
            <DriverInfoStep
              data={formData.drivers}
              onChange={(drivers: Driver[]) => updateFormData("drivers", drivers)}
              errors={errors}
            />
          )}
          {currentStep === 2 && (
            <VehicleInfoStep
              data={formData.vehicles}
              onChange={(vehicles: Vehicle[]) => updateFormData("vehicles", vehicles)}
              errors={errors}
            />
          )}
          {currentStep === 3 && (
            <DrivingHistoryStep
              data={formData.drivingHistory}
              onChange={(drivingHistory: DrivingHistory) => updateFormData("drivingHistory", drivingHistory)}
              errors={errors}
            />
          )}
          {currentStep === 4 && <ThankYouStep name={formData.generalInfo.insuredName} />}

          {currentStep < STEPS.length - 1 && (
            <div className="flex justify-between mt-6">
              <FormNavigation
                currentStep={currentStep}
                stepsLength={STEPS.length - 1}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

