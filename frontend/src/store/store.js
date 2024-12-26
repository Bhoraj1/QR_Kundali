import { configureStore } from "@reduxjs/toolkit";
import SignupSlice from "./signupSlice";
import loginSlice from "./loginSlice";

const store = configureStore({
  reducer:{
    signup:SignupSlice,
    login:loginSlice,
  }
})

export default store;