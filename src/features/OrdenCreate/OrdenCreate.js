import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    ordenCreate: false,
    activePage: JSON.parse(localStorage.getItem('activePage')) || false,
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
        setPageActive:(state) => {
            state.activePage = true
            localStorage.setItem('activePage', true)
        },
        setPageInative: (state) => {
            state.activePage = false;
            localStorage.setItem('activePage', false)
        },
    }
})

export const {toggleOrden, setOrdenActive, setOrdenInative, setPageActive, setPageInative}= isOrdenCreate.actions;
export default isOrdenCreate.reducer;