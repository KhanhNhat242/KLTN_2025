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
    departureTime: number | string,
    arrivalTime: number | string,
    distance: number,
    route: Route,
    baseFare?: number,
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
    name: string , 
    description: string, 
    active: boolean,
    address: Address,
    streetAddress?: string,
}

export interface Address {
    id: number,
    streetAddress: string,
}

export interface Province {
    id: number,
    provinceCode: number,
    name: string,
}

export interface District {
    id: number,
    districtCode: number,
    name: string,
}

export interface Ward {
    id: number,
    wardCode: number,
    name: string,
}

export interface Route {
    id: number,
    routeCode: string,
    origin: Station,
    destination: Station,
}

export interface Staff {
    id: number,
    name: string,
    age: number,
    gender: string,
    phoneNumber: string,
    status: string,
}
export interface Driver {
    id: number,
    licenseClass: string,
    yearsExperience: number,
    staff: Staff,
}

export interface Attendant {
    id: number,
    staff: Staff,
}