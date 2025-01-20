"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FormProgress, FormNavigation } from "@/components/shared/form-components"
import { useMultiStepForm } from "@/hooks/use-multi-step-form"
import { propertyInsuranceFormSchema } from "@/types/property-form"
import type { PropertyInsuranceFormData, ApplicantInfo, PropertyOverview, PropertySystems, InsuranceHistory } from "@/types/property-form"
import { Loader2 } from "lucide-react"
import dynamic from "next/dynamic"

const STEPS = [
  "Applicant Information",
  "Property Overview",
  "Systems & Features",
  "Insurance History",
  "Submission Confirmation",
]

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

interface PropertyInsuranceFormProps {
  onSubmit?: () => void
}

const INITIAL_FORM_DATA: PropertyInsuranceFormData = {
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
    basementSquareFootage: "",
    basementFinishedArea: "",
    exteriorWalls: "",
    basicShape: "",
    distanceToHydrant: "",
    distanceToFireHall: "",
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
    deckSquareFootage: "",
    porchSquareFootage: "",
    updates: "",
    specialFeatures: "",
  },
  insuranceHistory: {
    presentInsurer: "",
    policyNumber: "",
    expiryDate: "",
    yearsOfContinuousCoverage: "",
    previousCancellation: false,
    cancellationDetails: "",
    waterDamageClaims: false,
    waterDamageDetails: "",
    mortgageInfo: "",
    nonSmokers: true,
    autoInsurance: "",
    additionalCoverages: "",
    creditScoreConsent: false,
    notes: "",
  },
}

export default function PropertyInsuranceForm({ onSubmit: onFormSubmit }: PropertyInsuranceFormProps) {
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
    schema: propertyInsuranceFormSchema,
    initialData: INITIAL_FORM_DATA,
    steps: STEPS,
    onSubmit: async (data) => {
      console.log("Form submitted:", data)
      onFormSubmit?.()
    },
  })

  // Filter errors for each step
  const getStepErrors = (prefix: string) => {
    return Object.entries(errors).reduce((acc, [key, value]) => {
      if (key.startsWith(prefix)) {
        acc[key.replace(`${prefix}.`, "")] = value
      }
      return acc
    }, {} as Record<string, string>)
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
              onChange={(applicantInfo: ApplicantInfo) => updateFormData("applicantInfo", applicantInfo)}
              errors={getStepErrors("applicantInfo")}
            />
          )}
          {currentStep === 1 && (
            <PropertyOverviewStep
              data={formData.propertyOverview}
              onChange={(propertyOverview: PropertyOverview) => updateFormData("propertyOverview", propertyOverview)}
              errors={getStepErrors("propertyOverview")}
            />
          )}
          {currentStep === 2 && (
            <PropertySystemsStep
              data={formData.propertySystems}
              onChange={(propertySystems: PropertySystems) => updateFormData("propertySystems", propertySystems)}
              errors={getStepErrors("propertySystems")}
            />
          )}
          {currentStep === 3 && (
            <InsuranceHistoryStep
              data={formData.insuranceHistory}
              onChange={(insuranceHistory: InsuranceHistory) => updateFormData("insuranceHistory", insuranceHistory)}
              errors={getStepErrors("insuranceHistory")}
            />
          )}
          {currentStep === 4 && <ThankYouStep name={formData.applicantInfo.name} />}

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

