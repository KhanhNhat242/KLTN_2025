import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    accessToken: string | null,
    refreshToken: string | null,
    isLogin: boolean,
}

const initialState: AuthState = {
    accessToken: null,
    refreshToken: null,
    isLogin: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload
            // localStorage.setItem('accessToken', action.payload)
        },
        setRefreshToken: (state, action: PayloadAction<string>) => {
            state.refreshToken = action.payload
            // localStorage.setItem('accessToken', action.payload)
        },
        setIsLogin: (state, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload
        },
        clearAccessToken: (state) => {
            state.accessToken = null
            // localStorage.removeItem('accessToken')
        },
}})

export const { setAccessToken, setRefreshToken, clearAccessToken, setIsLogin } = authSlice.actions
export default authSlice.reducer