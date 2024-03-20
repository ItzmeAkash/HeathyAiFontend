import { configureStore } from "@reduxjs/toolkit";
import loginSignupReducer from "./loginSignupReducer";
import authReducer from "./authSlice"
import dietReducer from "./dietRecomdSlice"

export default configureStore({
  reducer: {
    loginSignup: loginSignupReducer,
    auth: authReducer,
    diet:dietReducer,
  },
  devTools: true,
});
