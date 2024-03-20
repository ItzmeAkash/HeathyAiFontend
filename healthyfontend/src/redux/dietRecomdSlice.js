import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    age:"",
    gender:"",
    weight:"",
    height:"",
    physicalActivity:"",
    goal:"",
    errorMessage:""
}

export const dietRecomdSlice = createSlice({
    
    name:'diet',
    initialState,
    reducers:{
        setInput(state,action){
            const {name,value} = action.payload;
            state[name] = value;
        },
        setErrorMessage(state,action){
            state.errorMessage = action.payload;
        }
    }

})


export const {
    setInput,
    setErrorMessage
  } = dietRecomdSlice.actions;
  
  export default dietRecomdSlice.reducer;