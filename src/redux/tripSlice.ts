import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Bus, Route, Trip } from '../interface/Interface'

const tripSlice = createSlice({
    name: 'trip',
    initialState: [] as Trip[],
    reducers: {
         setTrips: (_, action: PayloadAction<Trip[]>) => {
            return action.payload 
        },
        add: (state, action: PayloadAction<Trip>) => {
            state.unshift(action.payload)
        },
        update: (state, action: PayloadAction<Trip>) => {
            const index = state.findIndex((p) => p.id === action.payload.id);
            if (index !== -1) {
                state[index].tripCode = action.payload.tripCode
                state[index].distance = action.payload.distance
                state[index].arrivalTime = action.payload.arrivalTime
                state[index].departureTime = action.payload.departureTime
            }
        },
        updateVehicle: (state, action: PayloadAction<{id: number, vehicle: Bus}>) => {
            state.forEach((t) => {
                if (t.vehicle?.id === action.payload.id) {
                    t.vehicle = action.payload.vehicle;
                }
            })
        },
        updateRoute: (state, action: PayloadAction<{id: number, route: Route}>) => {
            const index = state.findIndex((t) => t.route.id === action.payload.id)
            if (index !== -1) {
                state[index].route = action.payload.route
            }
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

export const { setTrips, add, update, remove, updateVehicle, updateRoute } = tripSlice.actions
export default tripSlice.reducer