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
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    }
  }
});

export const {
  setInput,
  setErrorMessage
} = recipeSlice.actions;

export default recipeSlice.reducer;
