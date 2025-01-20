import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'

export const FormProgress = ({ currentStep, steps }: { currentStep: number; steps: string[] }) => {
  const progress = ((currentStep + 1) / steps.length) * 100;
  return (
    <div>
      <Progress value={progress} className="h-2" />
      <div className="flex justify-between mt-2">
        {steps.map((step, index) => (
          <span
            key={step}
            className={`text-sm ${
              index === currentStep ? 'text-primary font-medium' : 'text-muted-foreground'
            }`}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
};

export const FormNavigation = ({ currentStep, stepsLength, onPrevious, onNext, onSubmit }: {
  currentStep: number;
  stepsLength: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}) => (
  <div className="flex justify-between w-full">
    <Button
      type="button"
      variant="outline"
      onClick={onPrevious}
      disabled={currentStep === 0}
    >
      Previous
    </Button>
    {currentStep === stepsLength - 1 ? (
      <Button type="submit" onClick={onSubmit}>Submit</Button>
    ) : (
      <Button type="button" onClick={onNext}>Next</Button>
    )}
  </div>
);

