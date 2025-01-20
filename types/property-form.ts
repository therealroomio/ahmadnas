export interface ApplicantInfo {
  name: string;
  occupation: string;
  dateOfBirth: string;
  address: string;
  homePhone: string;
  mobilePhone: string;
  email: string;
  coApplicantName?: string;
  coApplicantOccupation?: string;
  coApplicantDateOfBirth?: string;
  relationshipToApplicant?: string;
}

export interface PropertyOverview {
  yearBuilt: string;
  squareFootageAboveGround: string;
  structureType: string;
  storeys: string;
  basementType: string;
  basementSquareFootage?: string;
  basementFinishedArea?: string;
  exteriorWalls: string;
  basicShape: string;
  distanceToHydrant?: string;
  distanceToFireHall?: string;
  occupancyDate: string;
}

export interface PropertySystems {
  roofing: string;
  principalHeating: string;
  auxiliaryHeating?: string;
  plumbing: string;
  waterHeater: string;
  sumpPump?: string;
  backFlowValve?: string;
  wiring: string;
  electricalPanel: string;
  electricalAmps: string;
  fireAlarm?: string;
  burglarAlarm?: string;
  garageType?: string;
  numberOfCars?: number;
  pool?: boolean;
  hotTub?: boolean;
  fullBathrooms: number;
  halfBathrooms: number;
  deckSquareFootage?: string;
  porchSquareFootage?: string;
  updates?: string;
  specialFeatures?: string;
}

export interface InsuranceHistory {
  presentInsurer: string;
  policyNumber: string;
  expiryDate: string;
  yearsOfContinuousCoverage: string;
  previousCancellation: boolean;
  cancellationDetails?: string;
  waterDamageClaims: boolean;
  waterDamageDetails?: string;
  mortgageInfo?: string;
  nonSmokers: boolean;
  autoInsurance?: string;
  additionalCoverages?: string;
  creditScoreConsent: boolean;
  notes?: string;
}

export interface PropertyInsuranceForm {
  applicantInfo: ApplicantInfo;
  propertyOverview: PropertyOverview;
  propertySystems: PropertySystems;
  insuranceHistory: InsuranceHistory;
}

