import { configureStore } from "@reduxjs/toolkit";
import loginSignupReducer from "./loginSignupReducer";
import authReducer from "./authSlice"
export default configureStore({
  reducer: {
    loginSignup: loginSignupReducer,
    auth: authReducer,
  },
  devTools: true,
});
