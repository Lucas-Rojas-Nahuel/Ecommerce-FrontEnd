import { configureStore } from '@reduxjs/toolkit'
import productsSlice from '../slices/productsSlice';
import buttonSlice from './getHola';
import buttonModal from './../features/button/buttonModal'
import searchReducer from './../slices/searchSlice'
import cartReducer from './../slices/cartSlice'

const store = configureStore({
    reducer: {
        products: productsSlice,
        button: buttonSlice,
        btnModal: buttonModal,
        search: searchReducer,
        cart: cartReducer, 
    },
})

export default store;