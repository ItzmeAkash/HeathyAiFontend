import {createSlice} from '@reduxjs/toolkit';


const initialState = {
  action: 'Login',
  emailLogin: '',
  emailSignup: '',
  passwordLogin: '',
  passwordSignup: '',
  firstName: '',
  lastName: '',
  confirmPassword: '',
};

const loginSignupSlice = createSlice({
    name:'loginSignup',
    initialState,
    reducers:{
        setAction(state,action){
            state.action = action.payload;
        },
        setInput(state,action){
            const { name, value } = action.payload;
            state[name] = value;
        },
    },
})

export const { setAction, setInput } = loginSignupSlice.actions;

export default loginSignupSlice.reducer;
