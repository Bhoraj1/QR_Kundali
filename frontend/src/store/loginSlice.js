import { createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
  name: "login",
  initialState: {},
  reducers: {
    inputs:() => {
      {/* reducer is defined but doesn't modify the state or return anything
      so it is empty */}
    },
  },
});

export const LoginActions = LoginSlice.actions;
export default LoginSlice.reducer;
