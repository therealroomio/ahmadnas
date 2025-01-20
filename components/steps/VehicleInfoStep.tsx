'use client'

import { Button } from '@/components/ui/button'
import { InputField, SwitchField } from '@/components/shared/FormFields'
import { PlusCircle, Trash2 } from 'lucide-react'
import type { VehicleInfo } from '@/types/form'

interface VehicleInfoStepProps {
  data: VehicleInfo[]
  onChange: (data: VehicleInfo[]) => void
  errors: Record<string, string>
}

const VehicleForm = ({ vehicle, index, updateVehicle, removeVehicle, errors }: {
  vehicle: VehicleInfo;
  index: number;
  updateVehicle: (index: number, updates: Partial<VehicleInfo>) => void;
  removeVehicle: (index: number) => void;
  errors: Record<string, string>;
}) => (
  <div className="space-y-4 p-4 border rounded-lg relative">
    <div className="absolute right-4 top-4">
      {index > 0 && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeVehicle(index)}
          className="text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>

    <h3 className="font-medium">Vehicle {index + 1}</h3>

    <div className="grid gap-4 md:grid-cols-3">
      <InputField 
        label="Year" 
        id={`year-${index}`} 
        value={vehicle.year} 
        onChange={(e) => updateVehicle(index, { year: e.target.value })} 
        required 
        error={errors[`vehicles.${index}.year`]}
      />
      <InputField 
        label="Make" 
        id={`make-${index}`} 
        value={vehicle.make} 
        onChange={(e) => updateVehicle(index, { make: e.target.value })} 
        required 
        error={errors[`vehicles.${index}.make`]}
      />
      <InputField 
        label="Model" 
        id={`model-${index}`} 
        value={vehicle.model} 
        onChange={(e) => updateVehicle(index, { model: e.target.value })} 
        required 
        error={errors[`vehicles.${index}.model`]}
      />
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      <InputField 
        label="VIN" 
        id={`vin-${index}`} 
        value={vehicle.vin} 
        onChange={(e) => updateVehicle(index, { vin: e.target.value })} 
        required 
        error={errors[`vehicles.${index}.vin`]}
      />
      <InputField 
        label="Principal Driver" 
        id={`principalDriver-${index}`} 
        value={vehicle.principalDriver} 
        onChange={(e) => updateVehicle(index, { principalDriver: e.target.value })} 
        required 
        error={errors[`vehicles.${index}.principalDriver`]}
      />
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      <InputField 
        label="KMs Driven to Work" 
        id={`kmsDriven-${index}`} 
        type="number" 
        value={vehicle.kmsDriven} 
        onChange={(e) => updateVehicle(index, { kmsDriven: e.target.value })} 
        required 
        error={errors[`vehicles.${index}.kmsDriven`]}
      />
      <InputField 
        label="Annual KMs" 
        id={`annualKms-${index}`} 
        type="number" 
        value={vehicle.annualKms} 
        onChange={(e) => updateVehicle(index, { annualKms: e.target.value })} 
        required 
        error={errors[`vehicles.${index}.annualKms`]}
      />
    </div>

    <SwitchField
      label="Winter Tires Installed (November to April)"
      id={`winterTires-${index}`}
      checked={vehicle.winterTires}
      onCheckedChange={(checked) => updateVehicle(index, { winterTires: checked })}
    />
  </div>
)

export function VehicleInfoStep({ data, onChange, errors }: VehicleInfoStepProps) {
  const addVehicle = () => {
    onChange([
      ...data,
      {
        year: '',
        make: '',
        model: '',
        vin: '',
        principalDriver: '',
        use: '',
        kmsDriven: '',
        annualKms: '',
        purchaseDate: '',
        ownership: '',
        winterTires: false,
      },
    ])
  }

  const removeVehicle = (index: number) => {
    onChange(data.filter((_, i) => i !== index))
  }

  const updateVehicle = (index: number, updates: Partial<VehicleInfo>) => {
    onChange(
      data.map((vehicle, i) => (i === index ? { ...vehicle, ...updates } : vehicle))
    )
  }

  return (
    <div className="space-y-6">
      {data.map((vehicle, index) => (
        <VehicleForm
          key={index}
          vehicle={vehicle}
          index={index}
          updateVehicle={updateVehicle}
          removeVehicle={removeVehicle}
          errors={errors}
        />
      ))}

      {data.length < 3 && (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={addVehicle}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Another Vehicle
        </Button>
      )}
    </div>
  )
}

