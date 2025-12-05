import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Attendant, Staff } from "../interface/Interface";

interface AttendantUpdate {
    id: number,
    staffId: number,
    name: string,
    age: number,
    gender: string,
    phoneNumber: string,
}

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
        update: (state, action: PayloadAction<AttendantUpdate>) => {
            const index = state.findIndex((p) => p.id === action.payload.id);
            if (index !== -1) {
                state[index].staff.name = action.payload.name;
                state[index].staff.age = action.payload.age;
                state[index].staff.gender = action.payload.gender;
                state[index].staff.phoneNumber = action.payload.phoneNumber;
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