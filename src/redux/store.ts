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
import ticketSlice from './ticketSlice'
import seatListSlice from './seatListSlice'
import scheduleSlice from './scheduleSlice'
import driverSlice from './driverSlice'
import attendantSlice from './attendantSlice'
import billSlice from './billSlice'
import seatmapSlice from './seatmapSlice'

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
        tickets: ticketSlice,
        seatList: seatListSlice,
        schedule: scheduleSlice,
        driver: driverSlice,
        attendant: attendantSlice,
        bill: billSlice,
        seatmap: seatmapSlice,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

