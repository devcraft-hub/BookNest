import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  role: "user",
};

const authSlice = createSlice({

  name: "auth",

  initialState,

  reducers: {

    login(state, action) {

      state.isLoggedIn = true;

      state.role = action.payload.role;
    },

    logout(state) {

      state.isLoggedIn = false;

      state.role = "user";
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;