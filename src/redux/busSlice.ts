import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface Bus {
    id?: number,
    type: string,
    plateNumber: string,
    brand: string,
    descripttion: string,
}

const promotionSlice = createSlice({
    name: 'buses',
    initialState: [] as Bus[],
    reducers: {
        setBuses: (_, action: PayloadAction<Bus[]>) => {
            return action.payload 
        },
        add: (state, action: PayloadAction<Bus>) => {
            state.push(action.payload)
        },
        // update: (state, action: PayloadAction<Promotion>) => {
        //     const index = state.findIndex((p) => p.code === action.payload.code);
        //     if (index !== -1) {
        //         state[index] = action.payload;
        //     }
        // },
        remove: (state, action: PayloadAction<number>) => {
            return state.filter(promo => promo.id !== action.payload)
        },
    }
})

export const { setBuses, add, remove } = promotionSlice.actions
export default promotionSlice.reducer