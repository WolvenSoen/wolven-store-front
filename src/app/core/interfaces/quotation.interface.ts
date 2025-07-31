export interface QuotationOrigin {
  name: string;
  company: string;
  email: string;
  phone: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  reference: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
}

export interface QuotationDestination {
  name: string;
  company: string;
  email: string;
  phone: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  reference: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
}

export interface QuotationPackage {
  content: string;
  amount: number;
  type: string;
  weight: number;
  insurance: number;
  declaredValue: number;
  weightUnit: string;
  lengthUnit: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
}

export interface Shipment {
  carrier: string;
  service: string;
  trackingNumber: string;
  trackUrl: string;
  label: string;
}

export interface Quotation {
  carrier: string;
  carrierDescription: string;
  carrierId: number;
  serviceId: number;
  service: string;
  serviceDescription: string;
  dropOff: number;
  zone: number;
  deliveryEstimate: string;
  deliveryDate: {
    date: string;
    dateDifference: number;
    timeUnit: string;
    time: string;
  };
  quantity: number;
  basePrice: number;
  extendedFare: number;
  insurance: number;
  additionalServices: number;
  additionalCharges: number;
  totalPrice: number;
  currency: string;
  customKey: boolean;
  importFee: number;
  taxes: number;
  cashOnDeliveryCommission: number;
  cashOnDeliveryAmount: number;
  customKeyCost: number;
  smsCost: number;
  whatsappCost: number;
  isMps: boolean;
  branches: any[];
  costSummary: Array<{
    quantity: number;
    basePrice: number;
    extendedFare: number;
    insurance: number;
    additionalServices: number;
    costAdditionalServices: any[];
    additionalCharges: number;
    costAdditionalCharges: any[];
    totalPrice: number;
    currency: string;
    customKey: boolean;
    cashOnDeliveryCommission: number;
    cashOnDeliveryAmount: number;
    customKeyCommission: number;
    smsCommission: number;
    securityDeposit: boolean;
    securityWeight: number;
    importFee: number;
    taxes: number;
    whatsappCommission: number;
    folio: string | null;
    calculatedDeclaredValue: number;
  }>;
  calculatedDeclaredValue: number;
}
