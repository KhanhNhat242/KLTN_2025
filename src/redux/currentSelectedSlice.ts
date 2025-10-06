import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CurrentSelected {
    id: number | undefined,
}

const initialState: CurrentSelected = {
    id: 0
}

const currentSelectedSlice = createSlice({
    name: 'currentSelected',
    initialState,
    reducers: {
        setCurrentID: (state, action: PayloadAction<number | undefined>) => {
            state.id = action.payload
        },
        clearCurrentID: (state) => {
            state.id = 0
        }
    }
})

export const { setCurrentID, clearCurrentID } = currentSelectedSlice.actions
export default currentSelectedSlice.reducer