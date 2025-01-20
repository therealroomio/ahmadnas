import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { z } from "zod"

interface UseMultiStepFormProps<T extends z.ZodType> {
  schema: T
  onSubmit: (data: z.infer<T>) => Promise<void> | void
  initialData: z.infer<T>
  steps: string[]
  validateStep?: (step: number, data: z.infer<T>) => boolean
}

export function useMultiStepForm<T extends z.ZodType>({
  schema,
  onSubmit,
  initialData,
  steps,
  validateStep,
}: UseMultiStepFormProps<T>) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<z.infer<T>>(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleNext = () => {
    const isValid = validateStep ? validateStep(currentStep, formData) : true
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate entire form data against schema
      const validatedData = schema.parse(formData)
      
      // Call onSubmit with validated data
      await onSubmit(validatedData)
      
      // Show success toast
      toast({
        title: "Form submitted successfully",
        description: "We'll get back to you soon.",
      })
      
      // Move to last step (usually thank you step)
      setCurrentStep(steps.length - 1)
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod validation errors to our error format
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          const path = err.path.join(".")
          newErrors[path] = err.message
        })
        setErrors(newErrors)
      }
      
      // Show error toast
      toast({
        title: "Error submitting form",
        description: "Please check the form for errors and try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateFormData = <K extends keyof z.infer<T>>(
    field: K,
    value: z.infer<T>[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Clear error for the updated field
    if (errors[field as string]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field as string]
        return newErrors
      })
    }
  }

  return {
    currentStep,
    formData,
    errors,
    isSubmitting,
    handleNext,
    handlePrevious,
    handleSubmit,
    updateFormData,
  }
} 