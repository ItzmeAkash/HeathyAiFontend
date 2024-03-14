import { configureStore } from '@reduxjs/toolkit';
import loginSignupReducer from './loginSignupReducer';

export default configureStore({
    reducer: {
        loginSignup: loginSignupReducer,    
       
    },
    devTools:true
});
