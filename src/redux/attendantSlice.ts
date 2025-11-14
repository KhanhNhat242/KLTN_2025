import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Attendant, Staff } from "../interface/Interface";

const attendantSlice = createSlice({
    name: 'attendant',
    initialState: [] as Attendant[],
    reducers: {
        setAttendants: (_, action: PayloadAction<Attendant[]>) => {
            return action.payload 
        },
        add: (state, action: PayloadAction<Attendant>) => {
            state.unshift(action.payload)
        },
        update: (state, action: PayloadAction<Attendant>) => {
            const index = state.findIndex((p) => p.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        updateStaff: (state, action: PayloadAction<{id: number, staff: Staff}>) => {
            state.forEach((d) => {
                if (d.staff.id === action.payload.id) {
                    d.staff = action.payload.staff;
                }
            })
        },
        remove: (state, action: PayloadAction<number>) => {
            const index = state.findIndex((s) => s.id === action.payload);
            if (index !== -1) {
                state[index].isDeleted = true;
                state.splice(index, 1);
            }
        },
    }
})

export const { setAttendants, add, update, remove, updateStaff } = attendantSlice.actions
export default attendantSlice.reducer