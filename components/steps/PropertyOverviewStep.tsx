'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from 'lucide-react'
import { format } from "date-fns"
import type { PropertyOverview } from "@/types/property-form"
import { FormField } from "@/components/shared/form-components"

interface PropertyOverviewStepProps {
  data: PropertyOverview
  onChange: (data: PropertyOverview) => void
  errors: Record<string, string>
}

export function PropertyOverviewStep({ data, onChange, errors }: PropertyOverviewStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Year Built" error={errors.yearBuilt} required>
          <Input
            id="yearBuilt"
            type="number"
            value={data.yearBuilt}
            onChange={(e) => onChange({ ...data, yearBuilt: e.target.value })}
          />
        </FormField>
        <FormField label="Square Footage (Above Ground)" error={errors.squareFootageAboveGround} required>
          <Input
            id="squareFootageAboveGround"
            type="number"
            value={data.squareFootageAboveGround}
            onChange={(e) => onChange({ ...data, squareFootageAboveGround: e.target.value })}
          />
        </FormField>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Structure Type" error={errors.structureType} required>
          <Select
            value={data.structureType}
            onValueChange={(value) => onChange({ ...data, structureType: value })}
          >
            <SelectTrigger id="structureType">
              <SelectValue placeholder="Select structure type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="detached">Detached</SelectItem>
              <SelectItem value="semi-detached">Semi-Detached</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
              <SelectItem value="condo">Condominium</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Number of Storeys" error={errors.storeys} required>
          <Input
            id="storeys"
            value={data.storeys}
            onChange={(e) => onChange({ ...data, storeys: e.target.value })}
          />
        </FormField>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <FormField label="Basement Type" error={errors.basementType} required>
          <Select
            value={data.basementType}
            onValueChange={(value) => onChange({ ...data, basementType: value })}
          >
            <SelectTrigger id="basementType">
              <SelectValue placeholder="Select basement type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full">Full</SelectItem>
              <SelectItem value="partial">Partial</SelectItem>
              <SelectItem value="crawl">Crawl Space</SelectItem>
              <SelectItem value="slab">Slab</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Basement Square Footage" error={errors.basementSquareFootage}>
          <Input
            id="basementSquareFootage"
            type="number"
            value={data.basementSquareFootage || ''}
            onChange={(e) => onChange({ ...data, basementSquareFootage: e.target.value })}
          />
        </FormField>
        <FormField label="Finished Area (%)" error={errors.basementFinishedArea}>
          <Input
            id="basementFinishedArea"
            type="number"
            min="0"
            max="100"
            value={data.basementFinishedArea || ''}
            onChange={(e) => onChange({ ...data, basementFinishedArea: e.target.value })}
          />
        </FormField>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Exterior Walls" error={errors.exteriorWalls} required>
          <Select
            value={data.exteriorWalls}
            onValueChange={(value) => onChange({ ...data, exteriorWalls: value })}
          >
            <SelectTrigger id="exteriorWalls">
              <SelectValue placeholder="Select exterior type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="brick">Brick</SelectItem>
              <SelectItem value="vinyl">Vinyl Siding</SelectItem>
              <SelectItem value="wood">Wood</SelectItem>
              <SelectItem value="stucco">Stucco</SelectItem>
              <SelectItem value="stone">Stone</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Basic Shape of House" error={errors.basicShape}>
          <Select
            value={data.basicShape}
            onValueChange={(value) => onChange({ ...data, basicShape: value })}
          >
            <SelectTrigger id="basicShape">
              <SelectValue placeholder="Select house shape" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rectangular">Rectangular</SelectItem>
              <SelectItem value="l-shaped">L-Shaped</SelectItem>
              <SelectItem value="split-level">Split Level</SelectItem>
              <SelectItem value="square">Square</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Distance to Hydrant (meters)" error={errors.distanceToHydrant}>
          <Input
            id="distanceToHydrant"
            type="number"
            value={data.distanceToHydrant || ''}
            onChange={(e) => onChange({ ...data, distanceToHydrant: e.target.value })}
          />
        </FormField>
        <FormField label="Distance to Fire Hall (km)" error={errors.distanceToFireHall}>
          <Input
            id="distanceToFireHall"
            type="number"
            value={data.distanceToFireHall || ''}
            onChange={(e) => onChange({ ...data, distanceToFireHall: e.target.value })}
          />
        </FormField>
      </div>

      <FormField label="Occupancy Date" error={errors.occupancyDate} required>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full justify-start text-left font-normal ${
                !data.occupancyDate && "text-muted-foreground"
              }`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {data.occupancyDate ? (
                format(new Date(data.occupancyDate), "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={data.occupancyDate ? new Date(data.occupancyDate) : undefined}
              onSelect={(date) =>
                onChange({
                  ...data,
                  occupancyDate: date ? date.toISOString().split("T")[0] : "",
                })
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </FormField>
    </div>
  )
}

