import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Message } from "../interface/Interface";

const messageSlice = createSlice({
    name: 'message',
    initialState: [] as Message[],
    reducers: {
        add: (state, action: PayloadAction<Message>) => {
            state.push(action.payload)
        },
    }
})

export const { add } = messageSlice.actions
export default messageSlice.reducer