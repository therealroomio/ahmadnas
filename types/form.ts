export interface GeneralInfo {
  insuredName: string;
  address: string;
  homePhone: string;
  mobilePhone: string;
  email: string;
}

export interface DriverInfo {
  name: string;
  sex: string;
  dateOfBirth: string;
  maritalStatus: string;
  relationToInsured: string;
  licenseNumber: string;
  driverTraining: string;
  dateLicensed: {
    g: string;
    g2: string;
    g1: string;
  };
}

export interface VehicleInfo {
  year: string;
  make: string;
  model: string;
  vin: string;
  principalDriver: string;
  use: string;
  kmsDriven: string;
  annualKms: string;
  purchaseDate: string;
  ownership: string;
  winterTires: boolean;
}

export interface DrivingHistory {
  presentInsurer: string;
  expiryDate: string;
  yearsInsuredInCanada: string;
  insuranceCancelled: string;
  propertyInsurance: string;
  atFaultAccidents: string;
  notAtFaultAccidents: string;
  drivingConvictions: string;
  licenseSuspensions: string;
  notes: string;
}

export interface FormData {
  generalInfo: GeneralInfo;
  drivers: DriverInfo[];
  vehicles: VehicleInfo[];
  drivingHistory: DrivingHistory;
}

