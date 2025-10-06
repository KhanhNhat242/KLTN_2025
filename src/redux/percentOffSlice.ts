import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type PercentOff as PercentOffInterface} from '../interface/Interface'

const percentOffSlice = createSlice({
    name: 'percentoff',
    initialState: [] as PercentOffInterface[],
    reducers: {
        setPercentOffs: (_, action: PayloadAction<PercentOffInterface[]>) => {
            return action.payload
        },
        add1: (state, action: PayloadAction<PercentOffInterface>) => {
            state.push(action.payload)
        },
        update1: (state, action: PayloadAction<PercentOffInterface>) => {
            const index = state.findIndex((b) => b.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
    }
})

export const { setPercentOffs, add1, update1 } = percentOffSlice.actions
export default percentOffSlice.reducer