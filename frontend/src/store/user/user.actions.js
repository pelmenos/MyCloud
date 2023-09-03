import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../../utils/Constants'


export const loginUser = createAsyncThunk('user/login',
    async (data, thunkApi) => {
        try {
            const response = await axios.post(API_URL + 'token/', data)
            return response
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const registerUser = createAsyncThunk('user/register',
    async (data, thunkApi) => {
        try {
            const response = await axios.post(API_URL + 'register/', data)
            return response
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const updateToken = createAsyncThunk('user/updateToken',
    async (data, thunkApi) => {
        try {
            const response = await axios.post(API_URL + 'token/refresh/', { 'refresh': data?.refresh })
            return response
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)