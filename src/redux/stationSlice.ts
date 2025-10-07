import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Station } from "../interface/Interface";

const stationSlice = createSlice({
    name: 'station',
    initialState: [] as Station[],
    reducers: {
        setStations: (_, action: PayloadAction<Station[]>) => {
            return action.payload 
        },
        add: (state, action: PayloadAction<Station>) => {
            state.push(action.payload)
        },
        update: (state, action: PayloadAction<Station>) => {
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

export const { setStations, add, update, remove } = stationSlice.actions
export default stationSlice.reducer