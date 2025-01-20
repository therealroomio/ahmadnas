"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FormProgress, FormNavigation } from "./FormComponents"
import type { FormData } from "@/types/form"
import { useToast } from "@/components/ui/use-toast"
import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"

const STEPS = [
  "General Information",
  "Driver Information",
  "Vehicle Information",
  "Driving History",
  "Submission Confirmation",
]

interface AutoInsuranceFormProps {
  onSubmit?: () => void
}

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

export default function AutoInsuranceForm({ onSubmit }: AutoInsuranceFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
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
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 0: // General Information
        if (!formData.generalInfo.insuredName.trim()) newErrors.insuredName = "Insured name is required"
        if (!formData.generalInfo.address.trim()) newErrors.address = "Address is required"
        if (!formData.generalInfo.mobilePhone.trim()) newErrors.mobilePhone = "Mobile phone is required"
        if (!formData.generalInfo.email.trim()) newErrors.email = "Email is required"
        if (!/^\S+@\S+\.\S+$/.test(formData.generalInfo.email)) newErrors.email = "Invalid email format"
        break
      case 1: // Driver Information
        formData.drivers.forEach((driver, index) => {
          if (!driver.name.trim()) newErrors[`drivers.${index}.name`] = "Driver name is required"
          if (!driver.dateOfBirth) newErrors[`drivers.${index}.dateOfBirth`] = "Date of birth is required"
          if (!driver.licenseNumber.trim()) newErrors[`drivers.${index}.licenseNumber`] = "License number is required"
          if (!driver.sex) newErrors[`drivers.${index}.sex`] = "Sex is required"
          if (!driver.maritalStatus) newErrors[`drivers.${index}.maritalStatus`] = "Marital status is required"
        })
        break
      case 2: // Vehicle Information
        formData.vehicles.forEach((vehicle, index) => {
          if (!vehicle.year) newErrors[`vehicles.${index}.year`] = "Year is required"
          if (!vehicle.make.trim()) newErrors[`vehicles.${index}.make`] = "Make is required"
          if (!vehicle.model.trim()) newErrors[`vehicles.${index}.model`] = "Model is required"
          if (!vehicle.vin.trim()) newErrors[`vehicles.${index}.vin`] = "VIN is required"
          if (!vehicle.principalDriver.trim())
            newErrors[`vehicles.${index}.principalDriver`] = "Principal driver is required"
          if (!vehicle.kmsDriven) newErrors[`vehicles.${index}.kmsDriven`] = "KMs driven is required"
          if (!vehicle.annualKms) newErrors[`vehicles.${index}.annualKms`] = "Annual KMs is required"
        })
        break
      case 3: // Driving History
        if (!formData.drivingHistory.presentInsurer.trim()) newErrors.presentInsurer = "Present insurer is required"
        if (!formData.drivingHistory.expiryDate) newErrors.expiryDate = "Expiry date is required"
        if (!formData.drivingHistory.yearsInsuredInCanada.trim())
          newErrors.yearsInsuredInCanada = "Years insured in Canada is required"
        if (!formData.drivingHistory.insuranceCancelled.trim())
          newErrors.insuranceCancelled = "Insurance cancellation information is required"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1))
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep(currentStep)) {
      try {
        console.log("Form submitted:", formData)
        toast({
          title: "Form submitted successfully",
          description: "We'll get back to you soon.",
        })
        setIsSubmitted(true)
        setCurrentStep(STEPS.length - 1) // Move to the Thank You step
        onSubmit?.()
      } catch (error) {
        console.error("Error submitting form:", error)
        toast({
          title: "Error submitting form",
          description: "Please try again later.",
          variant: "destructive",
        })
      }
    }
  }

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
              onChange={(generalInfo) => setFormData({ ...formData, generalInfo })}
              errors={errors}
            />
          )}
          {currentStep === 1 && (
            <DriverInfoStep
              data={formData.drivers}
              onChange={(drivers) => setFormData({ ...formData, drivers })}
              errors={errors}
            />
          )}
          {currentStep === 2 && (
            <VehicleInfoStep
              data={formData.vehicles}
              onChange={(vehicles) => setFormData({ ...formData, vehicles })}
              errors={errors}
            />
          )}
          {currentStep === 3 && (
            <DrivingHistoryStep
              data={formData.drivingHistory}
              onChange={(drivingHistory) => setFormData({ ...formData, drivingHistory })}
              errors={errors}
            />
          )}
          {currentStep === 4 && <ThankYouStep name={formData.generalInfo.insuredName} />}

          {!isSubmitted && (
            <div className="flex justify-between mt-6">
              <FormNavigation
                currentStep={currentStep}
                stepsLength={STEPS.length - 1} // Exclude the Thank You step from navigation
                onPrevious={handlePrevious}
                onNext={handleNext}
                onSubmit={handleSubmit}
              />
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

