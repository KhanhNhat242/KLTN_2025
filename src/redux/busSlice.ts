import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Bus } from '../interface/Interface'

const busSlice = createSlice({
    name: 'bus',
    initialState: [] as Bus[],
    reducers: {
        setBuses: (_, action: PayloadAction<Bus[]>) => {
            return action.payload 
        },
        add: (state, action: PayloadAction<Bus>) => {
            state.push(action.payload)
        },
        update: (state, action: PayloadAction<Bus>) => {
            const index = state.findIndex((p) => p.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        remove: (state, action: PayloadAction<number>) => {
            return state.filter(promo => promo.id !== action.payload)
        },
    }
})

export const { setBuses, add, update, remove } = busSlice.actions
export default busSlice.reducer