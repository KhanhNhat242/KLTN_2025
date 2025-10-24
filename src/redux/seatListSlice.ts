import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const seatListSlice = createSlice({
    name: 'seatList',
    initialState: [] as string[],
    reducers: {
        add: (state, action: PayloadAction<string>) => {
            state.push(action.payload)
        },
        remove: (state, action: PayloadAction<string>) => {
            return state.filter(item => item !== action.payload)
        },
    }
})

export const { add, remove } = seatListSlice.actions
export default seatListSlice.reducer