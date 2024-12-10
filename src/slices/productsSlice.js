import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    productsCopy: [],
    productFilter: [],
    marca: [], 
    categoria: [],
    text: "",
  },
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
      state.productsCopy = action.payload;
      state.productFilter = action.payload;
    },
    updateProductsCopy: (state, action) => {
      state.productsCopy = action.payload;
    },
    sortProducts: (state, action) => {
      const sortedProducts = [...state.productsCopy].sort((a, b) => {
        return action.payload === "asc"
          ? a.precio - b.precio
          : b.precio - a.precio;
      });
      state.productsCopy = sortedProducts;
    },
    filterByCategory: (state, action) => {
      const { mar, cate } = action.payload;
      console.log(mar, cate);
      if (!mar.length || !cate.length) {
        state.productsCopy = state.allProducts;
        return;
      }

      const filteredByCategory = state.allProducts.filter((product) => {
        return mar.includes(product.marca) && cate.includes(product.categoria);
      });
      console.log(filteredByCategory);
      state.productsCopy = action.payload
        ? filteredByCategory
        : state.allProducts;
    },
    addFilter: (state, action) => {
      const { name, value } = action.payload;
      state[name].push(value);
    },
    removeFilter: (state, action) => {
      const { name, value } = action.payload;
      state[name] = state[name].filter((filterValue) => filterValue !== value);
    },
    loadMarcas: (state, action) => {
      state.marca = action.payload;
    },
    setTextFilter: (state, action) => {
      state.text = action.payload;
    },
      
    filterByText: (state, action) => {
      state.productsCopy = action.payload ? action.payload : state.allProducts
    },
  },
});

export const {
  setAllProducts,
  updateProductsCopy,
  sortProducts,
  filterByCategory,
  addFilter,
  removeFilter,
  loadMarcas,
  setTextFilter,
  filterByText,
} = productSlice.actions;
export default productSlice.reducer;
