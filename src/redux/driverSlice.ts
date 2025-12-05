import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Driver, Staff } from "../interface/Interface";

interface DriverUpdate {
    id: number,
    licenseClass: string,
    yearsExperience: number,
    staffId: number,
    name: string,
    age: number,
    gender: string,
    phoneNumber: string,
}

const driverSlice = createSlice({
    name: 'driver',
    initialState: [] as Driver[],
    reducers: {
        setDrivers: (_, action: PayloadAction<Driver[]>) => {
            return action.payload 
        },
        add: (state, action: PayloadAction<Driver>) => {
            state.unshift(action.payload)
        },
        update: (state, action: PayloadAction<DriverUpdate>) => {
            const index = state.findIndex((p) => p.id === action.payload.id);
            if (index !== -1) {
                state[index].licenseClass = action.payload.licenseClass;
                state[index].yearsExperience = action.payload.yearsExperience;
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

export const { setDrivers, add, update, remove, updateStaff } = driverSlice.actions
export default driverSlice.reducer