import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Route } from "../interface/Interface";

const routeSlice = createSlice({
    name: 'route',
    initialState: [] as Route[],
    reducers: { 
        setRoutes: (_, action: PayloadAction<Route[]>) => {
            return action.payload 
        },
        add: (state, action: PayloadAction<Route>) => {
            state.unshift(action.payload)
        },
        update: (state, action: PayloadAction<Route>) => {
            const index = state.findIndex((r) => r.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        remove: (state, action: PayloadAction<number>) => {
            return state.filter(route => route.id !== action.payload)
        },
    }
})

export const { setRoutes, add, update, remove } = routeSlice.actions
export default routeSlice.reducer