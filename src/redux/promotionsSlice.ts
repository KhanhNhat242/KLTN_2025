import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface Promotion {
    id?: number,
    code: string,
    description: string,
    startDate: string,
    endDate: string,
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
            state.unshift(action.payload)
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

export const { setPromotions, add, update, remove } = promotionSlice.actions
export default promotionSlice.reducer