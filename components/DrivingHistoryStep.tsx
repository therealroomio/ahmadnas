'use client'

import { InputField, TextareaField, DatePickerField } from '@/components/shared/FormFields'
import type { DrivingHistory } from '@/types/form'

interface DrivingHistoryStepProps {
  data: DrivingHistory
  onChange: (data: DrivingHistory) => void
  errors: Record<string, string>
}

export function DrivingHistoryStep({ data, onChange, errors }: DrivingHistoryStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <InputField 
          label="Present Insurer" 
          id="presentInsurer" 
          value={data.presentInsurer} 
          onChange={(e) => onChange({ ...data, presentInsurer: e.target.value })} 
          required 
          error={errors.presentInsurer}
        />
        <DatePickerField
          label="Expiry Date"
          value={data.expiryDate}
          onChange={(date) => onChange({ ...data, expiryDate: date })}
          error={errors.expiryDate}
        />
      </div>

      <InputField 
        label="Years Continuously Insured in Canada" 
        id="yearsInsuredInCanada" 
        type="number" 
        value={data.yearsInsuredInCanada} 
        onChange={(e) => onChange({ ...data, yearsInsuredInCanada: e.target.value })} 
        required 
        error={errors.yearsInsuredInCanada}
      />

      <InputField 
        label="Has your Auto Insurance ever been cancelled or refused?" 
        id="insuranceCancelled" 
        value={data.insuranceCancelled} 
        onChange={(e) => onChange({ ...data, insuranceCancelled: e.target.value })} 
        required 
        error={errors.insuranceCancelled}
      />

      <InputField 
        label="For Discount purposes – do you also have Property Insurance? With which Insurance Company?" 
        id="propertyInsurance" 
        value={data.propertyInsurance} 
        onChange={(e) => onChange({ ...data, propertyInsurance: e.target.value })} 
        error={errors.propertyInsurance}
      />

      <TextareaField 
        label="Have you or any listed driver been in an AT FAULT accident in the past 10 years?" 
        id="atFaultAccidents" 
        value={data.atFaultAccidents} 
        onChange={(e) => onChange({ ...data, atFaultAccidents: e.target.value })} 
        required 
        error={errors.atFaultAccidents}
      />

      <TextareaField 
        label="Have you or any listed driver had a NOT AT FAULT accident or claim in the past 10 years?" 
        id="notAtFaultAccidents" 
        value={data.notAtFaultAccidents} 
        onChange={(e) => onChange({ ...data, notAtFaultAccidents: e.target.value })} 
        required 
        error={errors.notAtFaultAccidents}
      />

      <TextareaField 
        label="Have you or any listed driver had any driving convictions in the past 3 years?" 
        id="drivingConvictions" 
        value={data.drivingConvictions} 
        onChange={(e) => onChange({ ...data, drivingConvictions: e.target.value })} 
        required 
        error={errors.drivingConvictions}
      />

      <TextareaField 
        label="Notes" 
        id="notes" 
        value={data.notes} 
        onChange={(e) => onChange({ ...data, notes: e.target.value })} 
        placeholder="Any additional information..." 
        error={errors.notes}
      />
    </div>
  )
}

