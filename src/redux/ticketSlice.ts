import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Bus, Ticket, Trip } from "../interface/Interface";

const ticketSlice = createSlice({
    name: 'ticket',
    initialState: [] as Ticket[], 
    reducers: {
        setTickets: (_, action: PayloadAction<Ticket[]>) => {
            return action.payload 
        },
        add: (state, action: PayloadAction<Ticket>) => {
            state.unshift(action.payload)
        },
        update: (state, action: PayloadAction<Ticket>) => {
            const index = state.findIndex((p) => p.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        updateTrip: (state, action: PayloadAction<{id: number, trip: Trip}>) => {
            const index = state.findIndex((t) => t.tripId === action.payload.id)
            if (index !== -1) {
                state[index].trip = action.payload.trip
            }
        },
        updateVehicle: (state, action: PayloadAction<{id: number, vehicle: Bus}>) => {
            state.forEach((t) => {
                if (t.trip?.vehicle?.id === action.payload.id && t.trip) {
                    t.trip.vehicle = action.payload.vehicle;
                }
            })
        },
        remove: (state, action: PayloadAction<number>) => {
            return state.filter(ticket => ticket.id !== action.payload)
        },
    }
})

export const { setTickets, add, update, remove, updateTrip, updateVehicle } = ticketSlice.actions
export default ticketSlice.reducer