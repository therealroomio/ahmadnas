import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from 'lucide-react'
import { format } from "date-fns"

export const InputField = ({ label, id, error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string, error?: string }) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input 
      id={id} 
      aria-invalid={error ? "true" : "false"}
      aria-describedby={error ? `${id}-error` : undefined}
      {...props} 
    />
    {error && <p id={`${id}-error`} className="text-sm text-red-500">{error}</p>}
  </div>
)

export const TextareaField = ({ label, id, error, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string, error?: string }) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Textarea 
      id={id} 
      aria-invalid={error ? "true" : "false"}
      aria-describedby={error ? `${id}-error` : undefined}
      {...props} 
    />
    {error && <p id={`${id}-error`} className="text-sm text-red-500">{error}</p>}
  </div>
)

export const SwitchField = ({ label, id, checked, onCheckedChange }: { label: string; id: string; checked: boolean; onCheckedChange: (checked: boolean) => void }) => (
  <div className="flex items-center space-x-2">
    <Switch
      id={id}
      checked={checked}
      onCheckedChange={onCheckedChange}
    />
    <Label htmlFor={id}>{label}</Label>
  </div>
)

export const SelectField = ({ label, id, options, error, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string, options: { value: string, label: string }[], error?: string }) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Select {...props}>
      <SelectTrigger 
        id={id}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
      >
        <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
    {error && <p id={`${id}-error`} className="text-sm text-red-500">{error}</p>}
  </div>
)

export const DatePickerField = ({ label, value, onChange, error }: { label: string; value: string; onChange: (date: string) => void; error?: string }) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-full justify-start text-left font-normal ${
            !value && "text-muted-foreground"
          }`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${label}-error` : undefined}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(new Date(value), 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value ? new Date(value) : undefined}
          onSelect={(date) => onChange(date ? date.toISOString().split('T')[0] : '')}
          initialFocus
        />
      </PopoverContent>
    </Popover>
    {error && <p id={`${label}-error`} className="text-sm text-red-500">{error}</p>}
  </div>
)

