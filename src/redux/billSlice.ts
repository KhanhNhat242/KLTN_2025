import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Bill, Trip } from "../interface/Interface";

const billSlice = createSlice({
    name: 'bill',
    initialState: [] as Bill[],
    reducers: {
        setBills: (_, action: PayloadAction<Bill[]>) => {
            return action.payload 
        },
        updateTrip: (state, action: PayloadAction<{id: number, trip: Trip}>) => {
            state.forEach((bill) => {
                if (bill.tripId === action.payload.id) {
                    bill.trip = action.payload.trip;
                }
            })
        },
    }
})

export const { setBills, updateTrip } = billSlice.actions
export default billSlice.reducer