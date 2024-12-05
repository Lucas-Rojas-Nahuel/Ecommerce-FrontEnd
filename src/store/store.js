import { configureStore } from '@reduxjs/toolkit'
import productsSlice from '../slices/productsSlice';
import buttonSlice from './getHola';
import buttonModal from './../features/button/buttonModal'
 

const store = configureStore({
    reducer: {
        products: productsSlice,
        button: buttonSlice,
        btnModal: buttonModal,
         
    },
})

export default store;