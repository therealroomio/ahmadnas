import { z } from "zod"

// Applicant Info Schema
export const applicantInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  occupation: z.string().min(1, "Occupation is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  address: z.string().min(1, "Address is required"),
  homePhone: z.string().optional(),
  mobilePhone: z.string().min(1, "Mobile phone is required"),
  email: z.string().email("Invalid email format"),
})

// Property Overview Schema
export const propertyOverviewSchema = z.object({
  yearBuilt: z.string().min(1, "Year built is required"),
  squareFootageAboveGround: z.string().min(1, "Square footage is required"),
  structureType: z.string().min(1, "Structure type is required"),
  storeys: z.string().min(1, "Number of storeys is required"),
  basementType: z.string().min(1, "Basement type is required"),
  basementSquareFootage: z.string().optional(),
  basementFinishedArea: z.string().optional(),
  exteriorWalls: z.string().min(1, "Exterior walls type is required"),
  basicShape: z.string().optional(),
  distanceToHydrant: z.string().optional(),
  distanceToFireHall: z.string().optional(),
  occupancyDate: z.string().min(1, "Occupancy date is required"),
})

// Property Systems Schema
export const propertySystemsSchema = z.object({
  roofing: z.string().min(1, "Roofing type is required"),
  principalHeating: z.string().min(1, "Principal heating is required"),
  plumbing: z.string().min(1, "Plumbing type is required"),
  waterHeater: z.string().min(1, "Water heater type is required"),
  wiring: z.string().min(1, "Wiring type is required"),
  electricalPanel: z.string().min(1, "Electrical panel is required"),
  electricalAmps: z.string().min(1, "Electrical amps is required"),
  fullBathrooms: z.number().min(0),
  halfBathrooms: z.number().min(0),
  deckSquareFootage: z.string().optional(),
  porchSquareFootage: z.string().optional(),
  updates: z.string().optional(),
  specialFeatures: z.string().optional(),
})

// Insurance History Schema
export const insuranceHistorySchema = z.object({
  presentInsurer: z.string().min(1, "Present insurer is required"),
  policyNumber: z.string().min(1, "Policy number is required"),
  expiryDate: z.string().min(1, "Expiry date is required"),
  yearsOfContinuousCoverage: z.string().min(1, "Years of coverage is required"),
  previousCancellation: z.boolean(),
  cancellationDetails: z.string().optional(),
  waterDamageClaims: z.boolean(),
  waterDamageDetails: z.string().optional(),
  mortgageInfo: z.string().optional(),
  nonSmokers: z.boolean(),
  autoInsurance: z.string().optional(),
  additionalCoverages: z.string().optional(),
  creditScoreConsent: z.boolean(),
  notes: z.string().optional(),
})

// Complete Property Insurance Form Schema
export const propertyInsuranceFormSchema = z.object({
  applicantInfo: applicantInfoSchema,
  propertyOverview: propertyOverviewSchema,
  propertySystems: propertySystemsSchema,
  insuranceHistory: insuranceHistorySchema,
})

// Infer TypeScript types from Zod schemas
export type ApplicantInfo = z.infer<typeof applicantInfoSchema>
export type PropertyOverview = z.infer<typeof propertyOverviewSchema>
export type PropertySystems = z.infer<typeof propertySystemsSchema>
export type InsuranceHistory = z.infer<typeof insuranceHistorySchema>
export type PropertyInsuranceFormData = z.infer<typeof propertyInsuranceFormSchema>

