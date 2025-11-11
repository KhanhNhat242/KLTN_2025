import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Promotion } from '../interface/Interface';

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
            const index = state.findIndex((s) => s.id === action.payload);
            if (index !== -1) {
                state[index].isDeleted = true;
                state.splice(index, 1);
            }
        },
    }
})

export const { setPromotions, add, update, remove } = promotionSlice.actions
export default promotionSlice.reducer