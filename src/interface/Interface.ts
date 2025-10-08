export interface Promotion {
    id: number,
    code: string,
    description: string,
    startDate: [],
    endDate: [],
    buyNGetMS: [],
    percentOffs: [],
    usageLimit: number,
    usedCount: number
}

export interface PercentOff {
    id: number,
    percent: number,
    maxOff: number,
    minPrice: number,
}

export interface BuyNGetM {
    id: number,
    buyN: number,
    getM: number,
}

export interface PromotionLine {
    id: number,
    percent?: number,
    maxOff?: number,
    minPrice?: number,
    buyN?: number,
    getM?: number,
}

export interface Trip {
    id?: number,
    tripCode: string,
    departureTime: number,
    arrivalTime: number,
    baseFare: number,
}

export interface Bus {
    id?: number,
    type: string,
    plateNumber: string,
    brand: string,
    description: string,
}

export interface Station {
  id: number;
  addresID: number;
  name: string;
  description: string;
  active: boolean;
  address: Address | null;
  fullAddress?: string;
}

export interface Address {
  id: number;
  streetAddress: string | null;
  ward: Ward | null;
}

export interface Ward {
  id: number;
  addressID: number;
  districtID: number;
  wardCode: number;
  name: string | null;
  nameEN: string;
  fullName: string;
  fullNameEN: string;
  codeName: string;
  administrativeUnitID: number;
  district: District | null;
}

export interface District {
  id: number;
  provinceID: number;
  districtCode: number;
  name: string | null;
  nameEN: string;
  fullName: string;
  fullNameEN: string;
  codeName: string;
  administrativeUnitID: number;
  province: Province | null;
}

export interface Province {
    id: number, 
    provinceCode: number, 
    name: string | null, 
    nameEN: string, 
    fullName: string, 
    fullNameEN: string, 
    codeName: string,
    administrativeUnitID: number, 
    administrativeRegionID: number,
}

export interface StationResponse {
  content: Station[];
}
