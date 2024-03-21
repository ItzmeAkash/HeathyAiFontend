import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipe: ""
};

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    setInput(state, action) {
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value
      };
    },
   
  }
});

export const {
  setInput,
  
} = recipeSlice.actions;

export default recipeSlice.reducer;
