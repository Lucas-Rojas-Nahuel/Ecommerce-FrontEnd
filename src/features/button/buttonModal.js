import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isActive:false,
    isRegisterView:true,
}

const buttonModal = createSlice({
    name:'buttonModal',
    initialState,
    reducers: {
        toggleButton: (state) => {
            state.isActive = !state.isActive;
        },
        setButtonActive: (state) => {
            state.isActive = true;
        },
        setButtonInactive: (state) => {
            state.isActive = false;
        },
        toggleRegistry: (state) => {
            state.isRegisterView = !state.isRegisterView;
        },
        setRegistryActive: (state) => {
            state.isRegisterView = true;
        },
        setRegistryInactive: (state) => {
            state.isRegisterView = false; 
        }

    }
})

export const {toggleButton, setButtonActive, setButtonInactive, toggleRegistry, setRegistryActive, setRegistryInactive} = buttonModal.actions;
export default buttonModal.reducer;