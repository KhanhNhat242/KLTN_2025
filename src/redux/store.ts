import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import promotionsSlice from './promotionsSlice'
import busesSlice from './busSlice'
import currentSelectedSlice from './currentSelectedSlice'
import buyNGetMSlice from './buyNGetMSlice'
import percentOffSlice from './percentOffSlice'
import tripsSlice from './tripSlice'
import stationSlice from './stationSlice'
import addressSlice from './addressSlice'
import routeSlice from './routeSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        promotions: promotionsSlice,
        buses: busesSlice,
        currentSelectedID: currentSelectedSlice,
        buyNgetMs: buyNGetMSlice,
        percentOffS: percentOffSlice, 
        trips: tripsSlice,
        stations: stationSlice,
        addresses: addressSlice,
        routes: routeSlice,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

