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

interface PropertyOverviewStepProps {
  data: PropertyOverview
  onChange: (data: PropertyOverview) => void
}

export function PropertyOverviewStep({ data, onChange }: PropertyOverviewStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="yearBuilt">Year Built</Label>
          <Input
            id="yearBuilt"
            type="number"
            value={data.yearBuilt}
            onChange={(e) => onChange({ ...data, yearBuilt: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="squareFootageAboveGround">Square Footage (Above Ground)</Label>
          <Input
            id="squareFootageAboveGround"
            type="number"
            value={data.squareFootageAboveGround}
            onChange={(e) => onChange({ ...data, squareFootageAboveGround: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="structureType">Structure Type</Label>
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
        </div>
        <div className="space-y-2">
          <Label htmlFor="storeys">Number of Storeys</Label>
          <Input
            id="storeys"
            value={data.storeys}
            onChange={(e) => onChange({ ...data, storeys: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="basementType">Basement Type</Label>
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
        </div>
        <div className="space-y-2">
          <Label htmlFor="basementSquareFootage">Basement Square Footage</Label>
          <Input
            id="basementSquareFootage"
            type="number"
            value={data.basementSquareFootage || ''}
            onChange={(e) => onChange({ ...data, basementSquareFootage: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="basementFinishedArea">Finished Area (%)</Label>
          <Input
            id="basementFinishedArea"
            type="number"
            min="0"
            max="100"
            value={data.basementFinishedArea || ''}
            onChange={(e) => onChange({ ...data, basementFinishedArea: e.target.value })}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="exteriorWalls">Exterior Walls</Label>
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
        </div>
        <div className="space-y-2">
          <Label htmlFor="basicShape">Basic Shape of House</Label>
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
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="distanceToHydrant">Distance to Hydrant (meters)</Label>
          <Input
            id="distanceToHydrant"
            type="number"
            value={data.distanceToHydrant || ''}
            onChange={(e) => onChange({ ...data, distanceToHydrant: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="distanceToFireHall">Distance to Fire Hall (km)</Label>
          <Input
            id="distanceToFireHall"
            type="number"
            value={data.distanceToFireHall || ''}
            onChange={(e) => onChange({ ...data, distanceToFireHall: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="occupancyDate">Occupancy Date</Label>
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
      </div>
    </div>
  )
}

