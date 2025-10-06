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