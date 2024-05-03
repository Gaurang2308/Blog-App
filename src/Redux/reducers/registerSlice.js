import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "register",
  initialState: { users: [] },
  reducers: {
    registerUser: (state, action) => {
      state.users.push(action.payload);
    },
  },
});

// this is for dispatch
export const { registerUser } = registerSlice.actions;

// this is for configureStore
export default registerSlice.reducer;
