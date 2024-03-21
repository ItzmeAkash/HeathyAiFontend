import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    image:''
}

export const foodImageSlice = createSlice({
    name:'foodimage',
    initialState,
    reducers:{
        setImage: (state, action) => {
            state.image = action.payload;
        }
    }
})

export const {
    setImage,
} =  foodImageSlice.actions;



export default foodImageSlice.reducer