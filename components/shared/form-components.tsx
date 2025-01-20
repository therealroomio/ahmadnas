import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface FormProgressProps {
  currentStep: number
  steps: string[]
}

export function FormProgress({ currentStep, steps }: FormProgressProps) {
  const progress = Math.round(((currentStep + 1) / steps.length) * 100)

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Step {currentStep + 1} of {steps.length}</span>
        <span>{steps[currentStep]}</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}

interface FormNavigationProps {
  currentStep: number
  stepsLength: number
  onPrevious: () => void
  onNext: () => void
  onSubmit: (e: React.FormEvent) => void
  isSubmitting?: boolean
}

export function FormNavigation({
  currentStep,
  stepsLength,
  onPrevious,
  onNext,
  onSubmit,
  isSubmitting = false,
}: FormNavigationProps) {
  return (
    <div className="flex justify-between w-full">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 0 || isSubmitting}
        className={cn(currentStep === 0 && "invisible")}
      >
        Previous
      </Button>
      {currentStep < stepsLength - 1 ? (
        <Button type="button" onClick={onNext} disabled={isSubmitting}>
          Next
        </Button>
      ) : (
        <Button type="submit" onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      )}
    </div>
  )
}

interface FormFieldProps {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}

export function FormField({ label, error, required = false, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        <label className="text-sm font-medium">{label}</label>
        {required && <span className="text-destructive">*</span>}
      </div>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}

interface FormSectionProps {
  title?: string
  description?: string
  children: React.ReactNode
}

export function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <div className="space-y-4">
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      <div className="space-y-4">{children}</div>
    </div>
  )
} 