import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../service/authService";

const user = localStorage.getItem('user');

const initialState = {
    user: user ? user : null,
    isError: false,
    isLoading: false,
    message: '',
    isSuccess: false
};

export const register = createAsyncThunk("auth/register", async(userData, thunkAPI) => {
    try {
        return apiService.register(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isSuccess = false
            state.message = ''
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.user = null;
            state.message = action.payload;
        })
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;