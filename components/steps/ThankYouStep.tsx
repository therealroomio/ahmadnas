import { CheckCircle } from 'lucide-react'

interface ThankYouStepProps {
  name: string
}

export function ThankYouStep({ name }: ThankYouStepProps) {
  return (
    <div className="text-center space-y-4">
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
      <h2 className="text-2xl font-bold">Thank You, {name}!</h2>
      <p className="text-lg">Your application has been successfully submitted.</p>
      <p>We will review your information and get back to you shortly.</p>
    </div>
  )
}

