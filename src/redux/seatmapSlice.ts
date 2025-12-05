import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Seat } from "../interface/Interface";

const seatmapSlice = createSlice({
    name: 'seatmap',
    initialState: [] as Seat[],
    reducers: {
        setSeatmap: (_, action: PayloadAction<Seat[]>) => {
            return action.payload 
        },
    }
})

export const { setSeatmap } = seatmapSlice.actions
export default seatmapSlice.reducer