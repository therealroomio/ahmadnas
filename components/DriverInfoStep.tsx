'use client'

import { Button } from '@/components/ui/button'
import { InputField, SelectField, DatePickerField } from '@/components/shared/FormFields'
import { PlusCircle, Trash2 } from 'lucide-react'
import type { DriverInfo } from '@/types/form'

interface DriverInfoStepProps {
  data: DriverInfo[]
  onChange: (data: DriverInfo[]) => void
  errors: Record<string, string>
}

const DriverForm = ({ driver, index, updateDriver, removeDriver, errors }: {
  driver: DriverInfo;
  index: number;
  updateDriver: (index: number, updates: Partial<DriverInfo>) => void;
  removeDriver: (index: number) => void;
  errors: Record<string, string>;
}) => (
  <div className="space-y-4 p-4 border rounded-lg relative">
    <div className="absolute right-4 top-4">
      {index > 0 && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeDriver(index)}
          className="text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>

    <h3 className="font-medium">Driver {index + 1}</h3>

    <div className="grid gap-4 md:grid-cols-2">
      <InputField 
        label="Name" 
        id={`name-${index}`} 
        value={driver.name} 
        onChange={(e) => updateDriver(index, { name: e.target.value })} 
        required 
        error={errors[`drivers.${index}.name`]}
      />
      <SelectField
        label="Sex"
        id={`sex-${index}`}
        options={[
          { value: "M", label: "Male" },
          { value: "F", label: "Female" },
          { value: "X", label: "Other" },
        ]}
        value={driver.sex}
        onChange={(e) => updateDriver(index, { sex: e.target.value })}
        error={errors[`drivers.${index}.sex`]}
      />
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      <DatePickerField
        label="Date of Birth"
        value={driver.dateOfBirth}
        onChange={(date) => updateDriver(index, { dateOfBirth: date })}
        error={errors[`drivers.${index}.dateOfBirth`]}
      />
      <SelectField
        label="Marital Status"
        id={`maritalStatus-${index}`}
        options={[
          { value: "single", label: "Single" },
          { value: "married", label: "Married" },
          { value: "divorced", label: "Divorced" },
          { value: "widowed", label: "Widowed" },
        ]}
        value={driver.maritalStatus}
        onChange={(e) => updateDriver(index, { maritalStatus: e.target.value })}
        error={errors[`drivers.${index}.maritalStatus`]}
      />
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      <InputField 
        label="Driver's License #" 
        id={`licenseNumber-${index}`} 
        value={driver.licenseNumber} 
        onChange={(e) => updateDriver(index, { licenseNumber: e.target.value })} 
        required 
        error={errors[`drivers.${index}.licenseNumber`]}
      />
      <InputField 
        label="Relation to Insured" 
        id={`relationToInsured-${index}`} 
        value={driver.relationToInsured} 
        onChange={(e) => updateDriver(index, { relationToInsured: e.target.value })} 
        required 
        error={errors[`drivers.${index}.relationToInsured`]}
      />
    </div>
  </div>
)

export function DriverInfoStep({ data, onChange, errors }: DriverInfoStepProps) {
  const addDriver = () => {
    onChange([
      ...data,
      {
        name: '',
        sex: '',
        dateOfBirth: '',
        maritalStatus: '',
        relationToInsured: '',
        licenseNumber: '',
        driverTraining: '',
        dateLicensed: { g: '', g2: '', g1: '' },
      },
    ])
  }

  const removeDriver = (index: number) => {
    onChange(data.filter((_, i) => i !== index))
  }

  const updateDriver = (index: number, updates: Partial<DriverInfo>) => {
    onChange(
      data.map((driver, i) => (i === index ? { ...driver, ...updates } : driver))
    )
  }

  return (
    <div className="space-y-6">
      {data.map((driver, index) => (
        <DriverForm
          key={index}
          driver={driver}
          index={index}
          updateDriver={updateDriver}
          removeDriver={removeDriver}
          errors={errors}
        />
      ))}

      {data.length < 3 && (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={addDriver}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Another Driver
        </Button>
      )}
    </div>
  )
}

