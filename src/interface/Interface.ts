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
    vehicle: Bus,
}

export interface Bus {
    id?: number,
    type: string,
    plateNumber: string,
    brand: string,
    description: string,
    typeFactor: number,
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
    ward: Ward,
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
    province: Province,
}

export interface Ward {
    id: number,
    wardCode: number,
    name: string,
    district: District,
}

export interface Route {
    id: number,
    routeCode: string,
    origin: Station,
    destination: Station,
    baseFare: number,
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

export interface Ticket {
    id: number,
    ticketCode: string,
    price: number,
    timeFrom: number, 
    timeTo: number,
    checkedIn: boolean,
    tripId: number,
    routeId: number,
    seatId: number,
    booking: Booking,
    trip?: Trip,
    vehicle?: Bus,
}

export interface Booking {
    id: number,
    bookingCode: string,
    status: string,
    quantity: number,
    totalAmount: number,
    bookedAt: number,
    expireat: number,
    timeoutMinute: number,
    customerId: string,
    tripId: number,
}