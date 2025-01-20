'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from 'lucide-react'
import { format } from "date-fns"
import type { InsuranceHistory } from "@/types/property-form"
import { FormField } from "@/components/shared/form-components"

interface InsuranceHistoryStepProps {
  data: InsuranceHistory
  onChange: (data: InsuranceHistory) => void
  errors: Record<string, string>
}

const SwitchField = ({ label, id, checked, onCheckedChange }: { label: string; id: string; checked: boolean; onCheckedChange: (checked: boolean) => void }) => (
  <div className="flex items-center space-x-2">
    <Switch
      id={id}
      checked={checked}
      onCheckedChange={onCheckedChange}
    />
    <Label htmlFor={id}>{label}</Label>
  </div>
);


export function InsuranceHistoryStep({ data, onChange, errors }: InsuranceHistoryStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Present Insurer" error={errors.presentInsurer} required>
          <Input
            id="presentInsurer"
            value={data.presentInsurer}
            onChange={(e) => onChange({ ...data, presentInsurer: e.target.value })}
          />
        </FormField>
        <FormField label="Policy Number" error={errors.policyNumber} required>
          <Input
            id="policyNumber"
            value={data.policyNumber}
            onChange={(e) => onChange({ ...data, policyNumber: e.target.value })}
          />
        </FormField>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Expiry Date" error={errors.expiryDate} required>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal ${
                  !data.expiryDate && "text-muted-foreground"
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.expiryDate ? format(new Date(data.expiryDate), "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={data.expiryDate ? new Date(data.expiryDate) : undefined}
                onSelect={(date) =>
                  onChange({
                    ...data,
                    expiryDate: date ? date.toISOString().split("T")[0] : "",
                  })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </FormField>
        <FormField label="Years of Continuous Coverage" error={errors.yearsOfContinuousCoverage} required>
          <Input
            id="yearsOfContinuousCoverage"
            type="number"
            min="0"
            value={data.yearsOfContinuousCoverage}
            onChange={(e) => onChange({ ...data, yearsOfContinuousCoverage: e.target.value })}
          />
        </FormField>
      </div>

      <div className="space-y-4">
        <FormField label="Previous Cancellation" error={errors.previousCancellation}>
          <div className="flex items-center space-x-2">
            <Switch
              id="previousCancellation"
              checked={data.previousCancellation}
              onCheckedChange={(checked) => onChange({ ...data, previousCancellation: checked })}
            />
            <span className="text-sm text-muted-foreground">Has your insurance ever been cancelled?</span>
          </div>
        </FormField>
        {data.previousCancellation && (
          <FormField label="Cancellation Details" error={errors.cancellationDetails}>
            <Textarea
              id="cancellationDetails"
              value={data.cancellationDetails || ''}
              onChange={(e) => onChange({ ...data, cancellationDetails: e.target.value })}
              placeholder="Please indicate when and why"
            />
          </FormField>
        )}
      </div>

      <div className="space-y-4">
        <FormField label="Water Damage Claims" error={errors.waterDamageClaims}>
          <div className="flex items-center space-x-2">
            <Switch
              id="waterDamageClaims"
              checked={data.waterDamageClaims}
              onCheckedChange={(checked) => onChange({ ...data, waterDamageClaims: checked })}
            />
            <span className="text-sm text-muted-foreground">Any water damage claims in the past 5 years?</span>
          </div>
        </FormField>
        {data.waterDamageClaims && (
          <FormField label="Water Damage Details" error={errors.waterDamageDetails}>
            <Textarea
              id="waterDamageDetails"
              value={data.waterDamageDetails || ''}
              onChange={(e) => onChange({ ...data, waterDamageDetails: e.target.value })}
              placeholder="Please indicate when and describe"
            />
          </FormField>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="mortgageInfo">Mortgage or Line of Credit Information</Label>
        <Input
          id="mortgageInfo"
          value={data.mortgageInfo || ''}
          onChange={(e) => onChange({ ...data, mortgageInfo: e.target.value })}
          placeholder="If Yes, name & address"
        />
      </div>

      <FormField label="Non-Smokers" error={errors.nonSmokers}>
        <div className="flex items-center space-x-2">
          <Switch
            id="nonSmokers"
            checked={data.nonSmokers}
            onCheckedChange={(checked) => onChange({ ...data, nonSmokers: checked })}
          />
          <span className="text-sm text-muted-foreground">Are all residents non-smokers?</span>
        </div>
      </FormField>

      <div className="space-y-2">
        <Label htmlFor="autoInsurance">Auto Insurance Information</Label>
        <Input
          id="autoInsurance"
          value={data.autoInsurance || ''}
          onChange={(e) => onChange({ ...data, autoInsurance: e.target.value })}
          placeholder="For multi-policy discount, do you have Auto Insurance? If Yes, insurer name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalCoverages">Additional Coverages Required</Label>
        <Textarea
          id="additionalCoverages"
          value={data.additionalCoverages || ''}
          onChange={(e) => onChange({ ...data, additionalCoverages: e.target.value })}
          placeholder="Such as jewellery, watercraft, home business extension"
        />
      </div>

      <FormField label="Credit Score Consent" error={errors.creditScoreConsent}>
        <div className="flex items-center space-x-2">
          <Switch
            id="creditScoreConsent"
            checked={data.creditScoreConsent}
            onCheckedChange={(checked) => onChange({ ...data, creditScoreConsent: checked })}
          />
          <span className="text-sm text-muted-foreground">Consent to credit score check?</span>
        </div>
      </FormField>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          value={data.notes || ''}
          onChange={(e) => onChange({ ...data, notes: e.target.value })}
          placeholder="Any additional information..."
        />
      </div>
    </div>
  )
}

