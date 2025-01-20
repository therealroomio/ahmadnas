'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import type { PropertySystems } from "@/types/property-form"

interface PropertySystemsStepProps {
  data: PropertySystems
  onChange: (data: PropertySystems) => void
}

export function PropertySystemsStep({ data, onChange }: PropertySystemsStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="roofing">Roofing Type</Label>
          <Select
            value={data.roofing}
            onValueChange={(value) => onChange({ ...data, roofing: value })}
          >
            <SelectTrigger id="roofing">
              <SelectValue placeholder="Select roofing type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asphalt">Asphalt Shingles</SelectItem>
              <SelectItem value="metal">Metal</SelectItem>
              <SelectItem value="tile">Tile</SelectItem>
              <SelectItem value="slate">Slate</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="principalHeating">Principal Heating</Label>
          <Select
            value={data.principalHeating}
            onValueChange={(value) => onChange({ ...data, principalHeating: value })}
          >
            <SelectTrigger id="principalHeating">
              <SelectValue placeholder="Select heating type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="forced-air-gas">Forced Air - Gas</SelectItem>
              <SelectItem value="forced-air-electric">Forced Air - Electric</SelectItem>
              <SelectItem value="hot-water">Hot Water</SelectItem>
              <SelectItem value="heat-pump">Heat Pump</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="plumbing">Plumbing Type</Label>
          <Select
            value={data.plumbing}
            onValueChange={(value) => onChange({ ...data, plumbing: value })}
          >
            <SelectTrigger id="plumbing">
              <SelectValue placeholder="Select plumbing type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="copper">Copper</SelectItem>
              <SelectItem value="pex">PEX</SelectItem>
              <SelectItem value="plastic">Plastic</SelectItem>
              <SelectItem value="mixed">Mixed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="waterHeater">Water Heater Type</Label>
          <Select
            value={data.waterHeater}
            onValueChange={(value) => onChange({ ...data, waterHeater: value })}
          >
            <SelectTrigger id="waterHeater">
              <SelectValue placeholder="Select water heater type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tank-gas">Tank - Gas</SelectItem>
              <SelectItem value="tank-electric">Tank - Electric</SelectItem>
              <SelectItem value="tankless-gas">Tankless - Gas</SelectItem>
              <SelectItem value="tankless-electric">Tankless - Electric</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="wiring">Wiring Type</Label>
          <Select
            value={data.wiring}
            onValueChange={(value) => onChange({ ...data, wiring: value })}
          >
            <SelectTrigger id="wiring">
              <SelectValue placeholder="Select wiring type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="copper">Copper</SelectItem>
              <SelectItem value="aluminum">Aluminum</SelectItem>
              <SelectItem value="mixed">Mixed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="electricalPanel">Electrical Panel</Label>
          <Input
            id="electricalPanel"
            value={data.electricalPanel}
            onChange={(e) => onChange({ ...data, electricalPanel: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="electricalAmps">Electrical Amps</Label>
          <Input
            id="electricalAmps"
            type="number"
            value={data.electricalAmps}
            onChange={(e) => onChange({ ...data, electricalAmps: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="garageType">Garage Type</Label>
          <Select
            value={data.garageType || ''}
            onValueChange={(value) => onChange({ ...data, garageType: value })}
          >
            <SelectTrigger id="garageType">
              <SelectValue placeholder="Select garage type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="attached">Attached</SelectItem>
              <SelectItem value="detached">Detached</SelectItem>
              <SelectItem value="built-in">Built-in</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="numberOfCars">Number of Cars</Label>
          <Input
            id="numberOfCars"
            type="number"
            min="0"
            value={data.numberOfCars || ''}
            onChange={(e) => onChange({ ...data, numberOfCars: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex items-center space-x-2">
          <Switch
            id="pool"
            checked={data.pool || false}
            onCheckedChange={(checked) => onChange({ ...data, pool: checked })}
          />
          <Label htmlFor="pool">Pool</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="hotTub"
            checked={data.hotTub || false}
            onCheckedChange={(checked) => onChange({ ...data, hotTub: checked })}
          />
          <Label htmlFor="hotTub">Hot Tub</Label>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullBathrooms">Full Bathrooms</Label>
          <Input
            id="fullBathrooms"
            type="number"
            min="0"
            value={data.fullBathrooms}
            onChange={(e) => onChange({ ...data, fullBathrooms: Number(e.target.value) })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="halfBathrooms">Half Bathrooms</Label>
          <Input
            id="halfBathrooms"
            type="number"
            min="0"
            value={data.halfBathrooms}
            onChange={(e) => onChange({ ...data, halfBathrooms: Number(e.target.value) })}
            required
          />
        </div>
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

