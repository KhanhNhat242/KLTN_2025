import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SeatMap } from "../interface/Interface";

const seatmapSlice = createSlice({
    name: 'seatmap',
    initialState: [] as SeatMap[],
    reducers: {
        setSeatmap: (_, action: PayloadAction<SeatMap[]>) => {
            return action.payload 
        },
        add: (state, action: PayloadAction<SeatMap>) => {
            state.push(action.payload)
        },
    }
})

export const { setSeatmap, add } = seatmapSlice.actions
export default seatmapSlice.reducer