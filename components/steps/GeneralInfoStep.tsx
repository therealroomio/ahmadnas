'use client'

import { InputField } from "@/components/shared/FormFields"
import type { GeneralInfo } from "@/types/form"

interface GeneralInfoStepProps {
  data: GeneralInfo
  onChange: (data: GeneralInfo) => void
  errors: Record<string, string>
}

export function GeneralInfoStep({ data, onChange, errors }: GeneralInfoStepProps) {
  return (
    <div className="space-y-4">
      <InputField 
        label="Insured Name" 
        id="insuredName" 
        value={data.insuredName} 
        onChange={(e) => onChange({ ...data, insuredName: e.target.value })} 
        required 
        error={errors.insuredName}
      />
      <InputField 
        label="Address" 
        id="address" 
        value={data.address} 
        onChange={(e) => onChange({ ...data, address: e.target.value })} 
        required 
        error={errors.address}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <InputField 
          label="Home Phone" 
          id="homePhone" 
          type="tel" 
          value={data.homePhone} 
          onChange={(e) => onChange({ ...data, homePhone: e.target.value })} 
          error={errors.homePhone}
        />
        <InputField 
          label="Mobile Phone" 
          id="mobilePhone" 
          type="tel" 
          value={data.mobilePhone} 
          onChange={(e) => onChange({ ...data, mobilePhone: e.target.value })} 
          required 
          error={errors.mobilePhone}
        />
      </div>
      <InputField 
        label="Email" 
        id="email" 
        type="email" 
        value={data.email} 
        onChange={(e) => onChange({ ...data, email: e.target.value })} 
        required 
        error={errors.email}
      />
    </div>
  )
}

