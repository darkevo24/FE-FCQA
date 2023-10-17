import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface UserType {
    username: string;
    firstName: string;
    lastName: string;
}

export type RootState = {
    users: UserType[];
};

const initialState: UserType[] = [];

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(addUser.fulfilled, (state, action) => {
            return [...state, action.payload];
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            const index = state.findIndex((user) => user.username === action.payload.username);
            if (index !== -1) {
                state[index] = action.payload;
            }
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            return state.filter((user) => user.username !== action.payload);
        });
    },
});

// Step 1: Create async thunks to handle API requests

const BASE_URL = 'http://localhost:5000/api/users';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
});

export const addUser = createAsyncThunk('users/addUser', async (data: UserType) => {
    const response = await axios.post(BASE_URL, data);
    window.location.reload();
    return response.data;
});

export const updateUser = createAsyncThunk('users/updateUser', async (data: UserType) => {
    const response = await axios.put(`${BASE_URL}/${data.username}`, {
        firstName: data.firstName,
        lastName: data.lastName,
    });
    window.location.reload();
    return response.data;
});


export const deleteUser = createAsyncThunk('users/deleteUser', async (username: string) => {
    await axios.delete(`${BASE_URL}/${username}`);
    window.location.reload();
    return username;
});

// Step 2: Update your reducer

const userReducer = userSlice.reducer;

// Step 3: Create a store and add the async thunks

const store = configureStore({
    reducer: {
        users: userReducer,
    },
});

export type AppDispatch = typeof store.dispatch;

// Automatically fetch the initial data when the app starts
store.dispatch(fetchUsers());

export default store;
