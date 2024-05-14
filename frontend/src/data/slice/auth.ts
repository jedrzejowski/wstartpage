import {createSlice} from '@reduxjs/toolkit';
import {apiSlice} from './apiSlice.ts';

export interface UserDataT {
  display_name: string;
  username: string;
}

interface AuthStateT {
  currentUser: UserDataT | null;
  credentials: {
    username: string;
    password: string;
  } | null;
}

const initialState: AuthStateT = {
  currentUser: null,
  credentials: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addMatcher(apiSlice.endpoints.login.matchFulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.credentials = action.meta.arg.originalArgs;
    })

});
