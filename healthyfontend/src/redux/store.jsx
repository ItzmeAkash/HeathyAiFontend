import { configureStore } from "@reduxjs/toolkit";
import loginSignupReducer from "./loginSignupReducer";
import authReducer from "./authSlice"
import dietReducer from "./dietRecomdSlice"
import recipeReducer from "./recipeGenerator"
export default configureStore({
  reducer: {
    loginSignup: loginSignupReducer,
    auth: authReducer,
    diet:dietReducer,
    recipe:recipeReducer,
  },
  devTools: true,
});
