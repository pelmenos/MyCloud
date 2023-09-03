import jwt_decode from 'jwt-decode';
import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, updateToken } from "./user.actions";


export const userSlice = createSlice({
    name: 'users',
    initialState: {
        isLoading: false,
        errors: '',
        user: localStorage.getItem('AuthTokens') ? jwt_decode(JSON.parse(localStorage.getItem('AuthTokens')).access) : null,
        AuthTokens: localStorage.getItem('AuthTokens') ? JSON.parse(localStorage.getItem('AuthTokens')) : null

    },
    reducers: {
        setAuthData: (state, action) => {
            state.AuthTokens = action.payload.data
            state.user = jwt_decode(action.payload.data.access)
            localStorage.setItem('AuthTokens', JSON.stringify(action.payload.data))
        },
        clearAuthData: (state) => {
            state.AuthTokens = null
            state.user = null
            localStorage.removeItem('AuthTokens')
        },
        setError: (state, action) => {
            state.errors = action.payload
        },
        clearError: (state, action) => {
            state.errors = ''
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginUser.pending, state => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
            })

            .addCase(registerUser.pending, state => { state.isLoading = true })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.AuthTokens = action.payload.data
                state.user = jwt_decode(action.payload.data.access)
                localStorage.setItem('AuthTokens', JSON.stringify(action.payload.data))
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.errors = action.payload.response.data
                state.user = null
            })

            .addCase(updateToken.pending, state => {
                state.isLoading = true
            })
            .addCase(updateToken.fulfilled, state => {
                state.isLoading = false
            })
            .addCase(updateToken.rejected, state => {
                state.isLoading = false
            })
    }
})