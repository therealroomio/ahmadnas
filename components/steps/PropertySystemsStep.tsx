'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import type { PropertySystems } from "@/types/property-form"
import { FormField } from "@/components/shared/form-components"

interface PropertySystemsStepProps {
  data: PropertySystems
  onChange: (data: PropertySystems) => void
  errors: Record<string, string>
}

export function PropertySystemsStep({ data, onChange, errors }: PropertySystemsStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Roofing" error={errors.roofing} required>
          <Select value={data.roofing} onValueChange={(value) => onChange({ ...data, roofing: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select roofing type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asphalt">Asphalt Shingles</SelectItem>
              <SelectItem value="metal">Metal</SelectItem>
              <SelectItem value="slate">Slate</SelectItem>
              <SelectItem value="tile">Tile</SelectItem>
              <SelectItem value="wood">Wood Shakes</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Principal Heating" error={errors.principalHeating} required>
          <Select value={data.principalHeating} onValueChange={(value) => onChange({ ...data, principalHeating: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select heating type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="forced-air">Forced Air Gas</SelectItem>
              <SelectItem value="electric">Electric</SelectItem>
              <SelectItem value="heat-pump">Heat Pump</SelectItem>
              <SelectItem value="hot-water">Hot Water</SelectItem>
              <SelectItem value="oil">Oil</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Plumbing" error={errors.plumbing} required>
          <Select value={data.plumbing} onValueChange={(value) => onChange({ ...data, plumbing: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select plumbing type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="copper">Copper</SelectItem>
              <SelectItem value="pex">PEX</SelectItem>
              <SelectItem value="plastic">Plastic</SelectItem>
              <SelectItem value="galvanized">Galvanized</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Water Heater" error={errors.waterHeater} required>
          <Select value={data.waterHeater} onValueChange={(value) => onChange({ ...data, waterHeater: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select water heater type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gas">Gas</SelectItem>
              <SelectItem value="electric">Electric</SelectItem>
              <SelectItem value="tankless">Tankless</SelectItem>
              <SelectItem value="solar">Solar</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Wiring" error={errors.wiring} required>
          <Select value={data.wiring} onValueChange={(value) => onChange({ ...data, wiring: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select wiring type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="copper">Copper</SelectItem>
              <SelectItem value="aluminum">Aluminum</SelectItem>
              <SelectItem value="knob-tube">Knob and Tube</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Electrical Panel" error={errors.electricalPanel} required>
          <Select
            value={data.electricalPanel}
            onValueChange={(value) => onChange({ ...data, electricalPanel: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select panel type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="breaker">Circuit Breaker</SelectItem>
              <SelectItem value="fuse">Fuse Box</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Electrical Amps" error={errors.electricalAmps} required>
          <Select
            value={data.electricalAmps}
            onValueChange={(value) => onChange({ ...data, electricalAmps: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select amperage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="60">60 Amps</SelectItem>
              <SelectItem value="100">100 Amps</SelectItem>
              <SelectItem value="200">200 Amps</SelectItem>
              <SelectItem value="400">400 Amps</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Full Bathrooms" error={errors.fullBathrooms}>
          <Input
            type="number"
            min="0"
            value={data.fullBathrooms}
            onChange={(e) => onChange({ ...data, fullBathrooms: parseInt(e.target.value) || 0 })}
          />
        </FormField>
        <FormField label="Half Bathrooms" error={errors.halfBathrooms}>
          <Input
            type="number"
            min="0"
            value={data.halfBathrooms}
            onChange={(e) => onChange({ ...data, halfBathrooms: parseInt(e.target.value) || 0 })}
          />
        </FormField>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="deckSquareFootage">Deck Square Footage</Label>
          <Input
            id="deckSquareFootage"
            type="number"
            value={data.deckSquareFootage || ''}
            onChange={(e) => onChange({ ...data, deckSquareFootage: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="porchSquareFootage">Porch Square Footage</Label>
          <Input
            id="porchSquareFootage"
            type="number"
            value={data.porchSquareFootage || ''}
            onChange={(e) => onChange({ ...data, porchSquareFootage: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="updates">Updates (if house is over 25 years old)</Label>
        <Textarea
          id="updates"
          value={data.updates || ''}
          onChange={(e) => onChange({ ...data, updates: e.target.value })}
          placeholder="Describe updates to Roof, Heating, Electrical, Plumbing..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialFeatures">Special Features</Label>
        <Textarea
          id="specialFeatures"
          value={data.specialFeatures || ''}
          onChange={(e) => onChange({ ...data, specialFeatures: e.target.value })}
          placeholder="Extra kitchen, Jacuzzi tub, sauna, outbuildings..."
        />
      </div>
    </div>
  )
}

