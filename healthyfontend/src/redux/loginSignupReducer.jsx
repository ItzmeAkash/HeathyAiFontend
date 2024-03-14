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
  signupErrorMessage:{
    firstName:'',
    lastName:'', 
    emailSignup:'',
    passwordSignup:'',
    confirmPassword:''
  },
  loginErrorMessage:{
    emailLogin:'',
    passwordLogin:''

  },
  isAuthenticated : false,
  token: null
};

// Registeraion Slice 
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
        setSignupErrorMessage:(state,action) =>{
            state.signupErrorMessage = action.payload;
        },
        setLoginErrorMessage:(state,action) =>{
            state.loginErrorMessage = action.payload
        },
        setToken(state, action){
          state.token =  action.payload;
          state.isAuthenticated = true;

        },
        logout(state){
          state.token = null;
          state.isAuthenticated = false;
        }
       
    },
});

export const { setAction, setInput, setSignupErrorMessage, setLoginErrorMessage,
                setToken,
                logout
              } = loginSignupSlice.actions;

export default loginSignupSlice.reducer;