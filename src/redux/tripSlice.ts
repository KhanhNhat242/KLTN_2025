import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface Promotion {
    id?: number,
    code: string,
    startTime: string,
    endTime: string,
    buyNGetMS: [],
    percentOffs: [],
    usageLimit: number,
    usedCount: number
}

const promotionSlice = createSlice({
    name: 'promotions',
    initialState: [] as Promotion[],
    reducers: {
         setPromotions: (_, action: PayloadAction<Promotion[]>) => {
            return action.payload 
        },
        add: (state, action: PayloadAction<Promotion>) => {
            state.push(action.payload)
        },
        update: (state, action: PayloadAction<Promotion>) => {
            const index = state.findIndex((p) => p.code === action.payload.code);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        remove: (state, action: PayloadAction<number>) => {
            return state.filter(promo => promo.id !== action.payload)
        },
    }
})

export const selectPromotionById = (state: RootState, id: number) => state.promotions.find((promo) => promo.id === id)
export const { setPromotions, add, update, remove } = promotionSlice.actions
export default promotionSlice.reducer