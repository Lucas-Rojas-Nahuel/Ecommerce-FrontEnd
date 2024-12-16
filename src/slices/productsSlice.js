import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [], // Todos los productos originales
    productsCopy: [], // Productos filtrados o ordenados
    marca: [], // Filtros seleccionados para marcas
    categoria: [], // Filtros seleccionados para categorías
    text: "", // Filtro por texto (búsqueda)
  },
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
      state.productsCopy = action.payload; // Inicialmente, todos los productos están en la copia
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

      // Si no hay filtros aplicados, muestra todos los productos
      if (!mar.length && !cate.length) {
        state.productsCopy = state.allProducts;
        return;
      }

      // Filtrado flexible
      const filteredProducts = state.allProducts.filter((product) => {
        const matchesCategory = cate.length
          ? cate.includes(product.categoria)
          : true;
        const matchesBrand = mar.length ? mar.includes(product.marca) : true;
        return matchesCategory && matchesBrand;
      });

      state.productsCopy = filteredProducts;
    },

    addFilter: (state, action) => {
      const { name, value } = action.payload;
      state[name].push(value); // Agrega un filtro a la lista correspondiente
    },

    removeFilter: (state, action) => {
      const { name, value } = action.payload;
      state[name] = state[name].filter((filterValue) => filterValue !== value); // Elimina el filtro seleccionado
    },

    setTextFilter: (state, action) => {
      state.text = action.payload; // Actualiza el texto de búsqueda
    },

    filterByText: (state) => {
      // Filtrado por texto (nombre del producto)
      if (state.text.trim() === "") {
        state.productsCopy = state.allProducts; // Si no hay texto, muestra todos los productos
        return;
      }

      const filteredProducts = state.allProducts.filter((product) =>
        product.nombre.toLowerCase().includes(state.text.toLowerCase())
      );
      state.productsCopy = filteredProducts;
    },

    clearFilters: (state) => {
      state.marca = [];
      state.categoria = [];
      state.text = "";
      state.productsCopy = state.allProducts; // Reinicia todos los filtros
    },
  },
});

export const {
  setAllProducts,
  sortProducts,
  filterByCategory,
  addFilter,
  removeFilter,
  setTextFilter,
  filterByText,
  clearFilters,
} = productSlice.actions;

export default productSlice.reducer;
