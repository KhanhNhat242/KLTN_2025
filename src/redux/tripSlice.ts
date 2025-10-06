import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Trip } from '../interface/Interface'

const tripSlice = createSlice({
    name: 'trip',
    initialState: [] as Trip[],
    reducers: {
         setTrips: (_, action: PayloadAction<Trip[]>) => {
            return action.payload 
        },
        add: (state, action: PayloadAction<Trip>) => {
            state.push(action.payload)
        },
        update: (state, action: PayloadAction<Trip>) => {
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

export const { setTrips, add, update, remove } = tripSlice.actions
export default tripSlice.reducer