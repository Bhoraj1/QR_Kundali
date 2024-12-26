import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const SignupSlice = createSlice({
  name: "signup",
  initialState: {
    username: "",
    email: "",
    password: "",
    isAuthenticated:false
  },
  reducers: {
    SignupInputs: (state, action) => {
      //you are updating these fields in the current state with the new value provided in action.payload
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.password = action.payload.password;
      console.log(state, action);
    },
    checkAuthentication: (state) => {
      // Check if the authentication token exists in cookies
      const token = Cookies.get("token");  
      if (token) {
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
      }
    },
  } 
});

export const {SignupInputs,checkAuthentication} = SignupSlice.actions;
export default SignupSlice.reducer;
