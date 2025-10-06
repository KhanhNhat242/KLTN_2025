import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type BuyNGetM as BuyNGetMInterface} from '../interface/Interface'

const buyNGetMSlice = createSlice({
    name: 'buyngetm',
    initialState: [] as BuyNGetMInterface[],
    reducers: {
        setBuyNGetMs: (_, action: PayloadAction<BuyNGetMInterface[]>) => {
            return action.payload
        },
        add2: (state, action: PayloadAction<BuyNGetMInterface>) => {
            state.push(action.payload)
        },
        update2: (state, action: PayloadAction<BuyNGetMInterface>) => {
            const index = state.findIndex((b) => b.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
    }
})

export const { setBuyNGetMs, add2, update2 } = buyNGetMSlice.actions
export default buyNGetMSlice.reducer