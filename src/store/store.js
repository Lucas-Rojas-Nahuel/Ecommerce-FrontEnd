import { configureStore } from '@reduxjs/toolkit'
import productsSlice from '../slices/productsSlice';
import buttonModal from './../features/button/buttonModal'
import searchReducer from './../slices/searchSlice'
import cartReducer from './../slices/cartSlice'
import orderReducer from './../slices/orderSlice'
import authReducer from './../slices/authSlice'
import isOrdenCreate from './../features/OrdenCreate/OrdenCreate'

const store = configureStore({
    reducer: {
        products: productsSlice,
        btnModal: buttonModal,
        search: searchReducer,
        cart: cartReducer, 
        orders: orderReducer,
        auth: authReducer,
        isOrden: isOrdenCreate,
    },
})

store.subscribe(()=> {
    const cartState = store.getState().cart;
    localStorage.setItem('cart', JSON.stringify(cartState))
})

export default store;