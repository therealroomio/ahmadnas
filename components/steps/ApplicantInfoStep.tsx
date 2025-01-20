'use client'

import { InputField, DatePickerField } from "@/components/shared/FormFields"
import type { ApplicantInfo } from "@/types/property-form"

interface ApplicantInfoStepProps {
  data: ApplicantInfo
  onChange: (data: ApplicantInfo) => void
  errors: Record<string, string>
}

export function ApplicantInfoStep({ data, onChange, errors }: ApplicantInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <InputField 
          label="Name" 
          id="name" 
          value={data.name} 
          onChange={(e) => onChange({ ...data, name: e.target.value })} 
          required 
          error={errors.name}
        />
        <InputField 
          label="Occupation" 
          id="occupation" 
          value={data.occupation} 
          onChange={(e) => onChange({ ...data, occupation: e.target.value })} 
          required 
          error={errors.occupation}
        />
      </div>

      <DatePickerField
        label="Date of Birth"
        value={data.dateOfBirth}
        onChange={(date) => onChange({ ...data, dateOfBirth: date })}
        error={errors.dateOfBirth}
      />

      <InputField 
        label="Address" 
        id="address" 
        value={data.address} 
        onChange={(e) => onChange({ ...data, address: e.target.value })} 
        required 
        error={errors.address}
      />

      <div className="grid gap-4 md:grid-cols-3">
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

      <div className="border-t pt-6 mt-6">
        <h3 className="text-lg font-medium mb-4">Co-Applicant Information (Optional)</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <InputField 
            label="Co-Applicant's Name" 
            id="coApplicantName" 
            value={data.coApplicantName || ''} 
            onChange={(e) => onChange({ ...data, coApplicantName: e.target.value })} 
            error={errors.coApplicantName}
          />
          <InputField 
            label="Co-Applicant's Occupation" 
            id="coApplicantOccupation" 
            value={data.coApplicantOccupation || ''} 
            onChange={(e) => onChange({ ...data, coApplicantOccupation: e.target.value })} 
            error={errors.coApplicantOccupation}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <DatePickerField
            label="Co-Applicant's Date of Birth"
            value={data.coApplicantDateOfBirth || ''}
            onChange={(date) => onChange({ ...data, coApplicantDateOfBirth: date })}
            error={errors.coApplicantDateOfBirth}
          />
          <InputField 
            label="Relationship to Applicant" 
            id="relationshipToApplicant" 
            value={data.relationshipToApplicant || ''} 
            onChange={(e) => onChange({ ...data, relationshipToApplicant: e.target.value })} 
            error={errors.relationshipToApplicant}
          />
        </div>
      </div>
    </div>
  )
}

