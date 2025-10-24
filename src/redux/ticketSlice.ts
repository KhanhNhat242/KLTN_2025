import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Ticket } from "../interface/Interface";

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
        remove: (state, action: PayloadAction<number>) => {
            return state.filter(ticket => ticket.id !== action.payload)
        },
    }
})

export const { setTickets, add, update, remove } = ticketSlice.actions
export default ticketSlice.reducer