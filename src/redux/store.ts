import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import promotionsSlice from './promotionsSlice'
import busesSlice from './busSlice'
import currentSelectedSlice from './currentSelectedSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        promotions: promotionsSlice,
        buses: busesSlice,
        currentSelectedID: currentSelectedSlice,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

