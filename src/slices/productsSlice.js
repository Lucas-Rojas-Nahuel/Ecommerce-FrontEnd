import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    getProduct: (state, action) => {
      return action.payload
    },
    
  },
});



export const { getProduct} = productSlice.actions;
export default productSlice.reducer;

