"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FormProgress, FormNavigation } from "./FormComponents"
import type { PropertyInsuranceForm } from "@/types/property-form"
import { useToast } from "@/components/ui/use-toast"
import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"

const STEPS = [
  "Applicant Information",
  "Property Overview",
  "Systems & Features",
  "Insurance History",
  "Submission Confirmation",
]

interface PropertyInsuranceFormProps {
  onSubmit?: () => void
}

const ApplicantInfoStep = dynamic(() => import("./steps/ApplicantInfoStep").then((mod) => mod.ApplicantInfoStep), {
  loading: () => <StepLoader />,
})
const PropertyOverviewStep = dynamic(
  () => import("./steps/PropertyOverviewStep").then((mod) => mod.PropertyOverviewStep),
  {
    loading: () => <StepLoader />,
  },
)
const PropertySystemsStep = dynamic(
  () => import("./steps/PropertySystemsStep").then((mod) => mod.PropertySystemsStep),
  {
    loading: () => <StepLoader />,
  },
)
const InsuranceHistoryStep = dynamic(
  () => import("./steps/InsuranceHistoryStep").then((mod) => mod.InsuranceHistoryStep),
  {
    loading: () => <StepLoader />,
  },
)
const ThankYouStep = dynamic(() => import("./steps/ThankYouStep").then((mod) => mod.ThankYouStep), {
  loading: () => <StepLoader />,
})

const StepLoader = () => (
  <div className="flex justify-center items-center h-64">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>
)

export default function PropertyInsuranceForm({ onSubmit }: PropertyInsuranceFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<PropertyInsuranceForm>({
    applicantInfo: {
      name: "",
      occupation: "",
      dateOfBirth: "",
      address: "",
      homePhone: "",
      mobilePhone: "",
      email: "",
    },
    propertyOverview: {
      yearBuilt: "",
      squareFootageAboveGround: "",
      structureType: "",
      storeys: "",
      basementType: "",
      exteriorWalls: "",
      basicShape: "",
      occupancyDate: "",
    },
    propertySystems: {
      roofing: "",
      principalHeating: "",
      plumbing: "",
      waterHeater: "",
      wiring: "",
      electricalPanel: "",
      electricalAmps: "",
      fullBathrooms: 0,
      halfBathrooms: 0,
    },
    insuranceHistory: {
      presentInsurer: "",
      policyNumber: "",
      expiryDate: "",
      yearsOfContinuousCoverage: "",
      previousCancellation: false,
      waterDamageClaims: false,
      nonSmokers: true,
      creditScoreConsent: false,
    },
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 0: // Applicant Information
        if (!formData.applicantInfo.name.trim()) newErrors.name = "Name is required"
        if (!formData.applicantInfo.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
        if (!formData.applicantInfo.address.trim()) newErrors.address = "Address is required"
        if (!formData.applicantInfo.email.trim()) newErrors.email = "Email is required"
        if (!/^\S+@\S+\.\S+$/.test(formData.applicantInfo.email)) newErrors.email = "Invalid email format"
        if (!formData.applicantInfo.occupation.trim()) newErrors.occupation = "Occupation is required"
        if (!formData.applicantInfo.mobilePhone.trim()) newErrors.mobilePhone = "Mobile phone is required"
        break
      case 1: // Property Overview
        if (!formData.propertyOverview.yearBuilt) newErrors.yearBuilt = "Year built is required"
        if (!formData.propertyOverview.squareFootageAboveGround)
          newErrors.squareFootageAboveGround = "Square footage is required"
        if (!formData.propertyOverview.structureType) newErrors.structureType = "Structure type is required"
        if (!formData.propertyOverview.storeys) newErrors.storeys = "Number of storeys is required"
        if (!formData.propertyOverview.basementType) newErrors.basementType = "Basement type is required"
        if (!formData.propertyOverview.exteriorWalls) newErrors.exteriorWalls = "Exterior walls type is required"
        if (!formData.propertyOverview.occupancyDate) newErrors.occupancyDate = "Occupancy date is required"
        break
      case 2: // Property Systems
        if (!formData.propertySystems.roofing) newErrors.roofing = "Roofing type is required"
        if (!formData.propertySystems.principalHeating) newErrors.principalHeating = "Principal heating is required"
        if (!formData.propertySystems.plumbing) newErrors.plumbing = "Plumbing type is required"
        if (!formData.propertySystems.waterHeater) newErrors.waterHeater = "Water heater type is required"
        if (!formData.propertySystems.wiring) newErrors.wiring = "Wiring type is required"
        if (!formData.propertySystems.electricalPanel)
          newErrors.electricalPanel = "Electrical panel information is required"
        if (!formData.propertySystems.electricalAmps) newErrors.electricalAmps = "Electrical amps is required"
        break
      case 3: // Insurance History
        if (!formData.insuranceHistory.presentInsurer) newErrors.presentInsurer = "Present insurer is required"
        if (!formData.insuranceHistory.policyNumber) newErrors.policyNumber = "Policy number is required"
        if (!formData.insuranceHistory.expiryDate) newErrors.expiryDate = "Expiry date is required"
        if (!formData.insuranceHistory.yearsOfContinuousCoverage)
          newErrors.yearsOfContinuousCoverage = "Years of continuous coverage is required"
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
            <ApplicantInfoStep
              data={formData.applicantInfo}
              onChange={(applicantInfo) => setFormData({ ...formData, applicantInfo })}
              errors={errors}
            />
          )}
          {currentStep === 1 && (
            <PropertyOverviewStep
              data={formData.propertyOverview}
              onChange={(propertyOverview) => setFormData({ ...formData, propertyOverview })}
              errors={errors}
            />
          )}
          {currentStep === 2 && (
            <PropertySystemsStep
              data={formData.propertySystems}
              onChange={(propertySystems) => setFormData({ ...formData, propertySystems })}
              errors={errors}
            />
          )}
          {currentStep === 3 && (
            <InsuranceHistoryStep
              data={formData.insuranceHistory}
              onChange={(insuranceHistory) => setFormData({ ...formData, insuranceHistory })}
              errors={errors}
            />
          )}
          {currentStep === 4 && <ThankYouStep name={formData.applicantInfo.name} />}

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

