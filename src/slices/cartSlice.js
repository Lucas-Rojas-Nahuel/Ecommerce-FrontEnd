import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: [] ,
    reducers: {
        addCart: (state, action)=>{
            const product = action.payload
            if(product){
                const existedProduct = state.find(item => item.id === product.id)
                if(!existedProduct){
                    state.push({...product, quantity: 1})
                }else{
                    existedProduct.quantity += 1;
                }   
            }
            
        },
        removeFromCart: (state, action)=>{
            const productId = action.payload
            return state.filter(item => item.id !== productId)
        },
        updateQuantity:(state, action)=>{
            const {id, quantity} = action.payload
            const product = state.find((item)=> item.id === id)
            if(product){
                product.quantity = quantity
            }
        },
        clearCart:()=>{
            return [];
        }
    }
})

export const  {addCart, removeFromCart, updateQuantity, clearCart} = cartSlice.actions;
export default cartSlice.reducer