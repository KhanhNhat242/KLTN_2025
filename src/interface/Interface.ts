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

export interface SeatMapImg {
  id: number
  bucket: string
  objectKey: string
  contentType: string
  size: number
  createdAt: string
  updatedAt: string
  isDeleted: boolean
  deletedAt: string
  deletedBy: string
}

export interface SeatMap {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  isDeleted: boolean
  deletedAt: string
  deletedBy: string
  seatMapImg: SeatMapImg
}

export interface Station {
    id: number,
    addresID: number, 
    name: string , 
    description: string, 
    active: boolean,
}

export interface Address {
    id: number,
    streetAddress: string,
    wardID: number,
}

export interface Ward {
    id: number,
    districtID: number, 
    wardCode: number, 
    name: string, 
    nameEN: string, 
    fullName: string, 
    fullNameEN: string, 
    codeName: string,
    administrativeUnitID: number,
}

export interface District {
    id: number, 
    provinceID: number, 
    districtCode: number, 
    name: string, 
    nameEN: string, 
    fullName: string, 
    fullNameEN: string, 
    codeName: string,
    administrativeUnitID: number,
}

export interface Province {
    id: number, 
    provinceCode: number, 
    name: string, 
    nameEN: string, 
    fullName: string, 
    fullNameEN: string, 
    codeName: string,
    administrativeUnitID: number, 
    administrativeRegionID: number,
}
