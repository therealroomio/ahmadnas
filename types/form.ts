import { z } from "zod"

// General Info Schema
export const generalInfoSchema = z.object({
  insuredName: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  homePhone: z.string().optional(),
  mobilePhone: z.string().min(1, "Mobile phone is required"),
  email: z.string().email("Invalid email format"),
})

// Driver Schema
export const driverSchema = z.object({
  name: z.string().min(1, "Driver name is required"),
  sex: z.string().min(1, "Sex is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  maritalStatus: z.string().min(1, "Marital status is required"),
  relationToInsured: z.string().min(1, "Relation is required"),
  licenseNumber: z.string().min(1, "License number is required"),
  driverTraining: z.string().optional(),
  dateLicensed: z.object({
    g: z.string().optional(),
    g2: z.string().optional(),
    g1: z.string().optional(),
  }),
})

// Vehicle Schema
export const vehicleSchema = z.object({
  year: z.string().min(1, "Year is required"),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  vin: z.string().min(1, "VIN is required"),
  principalDriver: z.string().min(1, "Principal driver is required"),
  use: z.string().min(1, "Use is required"),
  kmsDriven: z.string().min(1, "KMs driven is required"),
  annualKms: z.string().min(1, "Annual KMs is required"),
  purchaseDate: z.string().optional(),
  ownership: z.string().optional(),
  winterTires: z.boolean().default(false),
})

// Driving History Schema
export const drivingHistorySchema = z.object({
  presentInsurer: z.string().min(1, "Present insurer is required"),
  expiryDate: z.string().min(1, "Expiry date is required"),
  yearsInsuredInCanada: z.string().min(1, "Years insured is required"),
  insuranceCancelled: z.string().min(1, "Insurance cancellation info is required"),
  propertyInsurance: z.string().optional(),
  atFaultAccidents: z.string().optional(),
  notAtFaultAccidents: z.string().optional(),
  drivingConvictions: z.string().optional(),
  licenseSuspensions: z.string().optional(),
  notes: z.string().optional(),
})

// Complete Auto Insurance Form Schema
export const autoInsuranceFormSchema = z.object({
  generalInfo: generalInfoSchema,
  drivers: z.array(driverSchema),
  vehicles: z.array(vehicleSchema),
  drivingHistory: drivingHistorySchema,
})

// Infer TypeScript types from Zod schemas
export type GeneralInfo = z.infer<typeof generalInfoSchema>
export type Driver = z.infer<typeof driverSchema>
export type Vehicle = z.infer<typeof vehicleSchema>
export type DrivingHistory = z.infer<typeof drivingHistorySchema>
export type AutoInsuranceFormData = z.infer<typeof autoInsuranceFormSchema>

