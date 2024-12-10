import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    ordenCreate: false,
}

const isOrdenCreate = createSlice({
    name:'isOrdenCreate',
    initialState,
    reducers:{
        toggleOrden: (state) => {
            state.ordenCreate = !state.ordenCreate
        },
        setOrdenActive:(state) => {
            state.ordenCreate = true
        },
        setOrdenInative: (state) => {
            state.ordenCreate = false;
        },
    }
})

export const {toggleOrden, setOrdenActive, setOrdenInative}= isOrdenCreate.actions;
export default isOrdenCreate.reducer;