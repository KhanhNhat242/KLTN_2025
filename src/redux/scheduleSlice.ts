import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Schedule } from "../interface/Interface";

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState: [] as Schedule[],
    reducers: {
        setSchedules: (_, action: PayloadAction<Schedule[]>) => {
            return action.payload 
        },
        add: (state, action: PayloadAction<Schedule>) => {
            state.unshift(action.payload)
        },
        update: (state, action: PayloadAction<Schedule>) => {
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

export const { setSchedules, add, update, remove } = scheduleSlice.actions
export default scheduleSlice.reducer