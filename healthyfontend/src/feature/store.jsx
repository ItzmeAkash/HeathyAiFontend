import { configureStore } from "@reduxjs/toolkit";
import loginSignupReducer from "./loginSignupReducer";
import authReducer from "./authSlice"
import dietReducer from "./dietRecomdSlice"
import recipeReducer from "./recipeGenerator"
import foodImageReducer from "./foodImageSlice";


export default configureStore({
  reducer: {
    loginSignup: loginSignupReducer,
    auth: authReducer,
    diet:dietReducer,
    recipe:recipeReducer,
    image:foodImageReducer,
  },
  devTools: true,
});
