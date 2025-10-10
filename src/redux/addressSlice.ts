import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Address } from "../interface/Interface";

const addressSlice = createSlice({
    name: 'address',
    initialState: [] as Address[],
    reducers: {
        setAddresses: (_, action: PayloadAction<Address[]>) => {
            return action.payload 
        },
        add: (state, action: PayloadAction<Address>) => {
            state.push(action.payload)
        },
        update: (state, action: PayloadAction<Address>) => {
            const index = state.findIndex((p) => p.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        remove: (state, action: PayloadAction<number>) => {
            return state.filter(address => address.id !== action.payload)
        },
    }
})

export const { setAddresses, add, update, remove } = addressSlice.actions
export default addressSlice.reducer