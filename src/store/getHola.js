import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isActive:false,
}

const buttonSlice = createSlice({
    name: 'getHola',
    initialState,
    reducers:{
        toggleButton: (state) => {
            state.isActive = !state.isActive; // Cambia el estado entre activo e inactivo
          },
          setButtonActive: (state) => {
            state.isActive = true; // Activa el botón
          },
          setButtonInactive: (state) => {
            state.isActive = false; // Desactiva el botón
          },
    }
  })

  export const {toggleButton, setButtonActive, setButtonInactive}= buttonSlice.actions;
  export default buttonSlice.reducer;