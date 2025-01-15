// Type definitions for the Lease Agreement Data

// Document URL type
type TDocumentURL = {
  url: string;
  name: string;
  _id: string;
};

// Rent Slot type
export type TRentSlot = {
  leaseId: string;
  dueDate: string; // ISO date string
  amount: number; // Rent amount in USD
  paymentStatus: "Pending" | "Paid"; // Status of payment
  _id: string;
  __v: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

// Apartment Building Info
type TBuilding = {
  _id: string;
  buildingName: string;
  telephone: string;
  address: string;
  parkingSlots: number;
  chargePerExtraParkingSlotInUSD: number;
  __v: number;
};

// Apartment type
type TApartment = {
  _id: string;
  buildingId: TBuilding;
  telephone: string;
  description: string;
  identification: string; // Apartment identifier
  class: string; // Apartment class (e.g., "Luxury", "Standard")
  status: string; // Apartment status (e.g., "Occupied")
  images: {
    url: string;
    alt: string;
    isDefault: boolean;
  }[];
};

// Chief Occupant type
type TChiefOccupant = {
  _id: string;
  apartmentId: {
    _id: string;
    buildingId: string;
    telephone: string;
    description: string;
    identification: string; // Apartment identifier
    class: string; // Apartment class (e.g., "Luxury", "Standard")
    status: string; // Apartment status (e.g., "Occupied")
    images: {
      url: string;
      alt: string;
      isDefault: boolean;
    }[];
  };
  image: string; // URL to profile image
  fullName: string; // Name of the occupant
  contactNumber: string;
  email: string;
  password: string; // Hashed password
  status: "Active" | "Inactive"; // Occupant's status
  __v: number;
};

// Dependant type
type TDependant = {
  _id: string;
  chiefOccupantId: string;
  fullName: string;
  image: string; // URL to profile image
  relationship: string; // Relationship to chief occupant (e.g., "Spouse", "Daughter")
  contactNumber: string;
  email: string;
  dateOfBirth: string; // ISO date string
};

// Lease type
type TLease = {
  apartmentId: string;
  chiefOccupantId: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  rentAmountInUSD: number;
  paymentSchedule: string; // Payment frequency (e.g., "Monthly")
  status: string; // Lease status (e.g., "Active")
  securityDepositInUSD: number;
  termsAndConditions: string; // HTML string
  documentURLs: TDocumentURL[];
  _id: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};

// Main Lease Agreement Data type
export type TLeaseAgreementData = {
  lease: TLease;
  rentSlots: TRentSlot[];
  apartment: TApartment;
  chiefOccupant: TChiefOccupant;
  dependants: TDependant[];
  parkingSlotCharges: number; // Additional parking charges in USD
  parkingSlotNumbers: string[]; // List of parking slot identifiers
};
