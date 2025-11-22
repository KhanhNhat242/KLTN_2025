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
        reset: (state) => {
            state.length = 0
        }
    }
})

export const { add, remove, reset } = seatListSlice.actions
export default seatListSlice.reducer