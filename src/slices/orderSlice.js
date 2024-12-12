import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



//Acción para obtener todas las órdenes
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async ()=> {
    const response = await axios.get(import.meta.env.VITE_REACT_APP_ROUTE_ORDEN);
    return response.data;
});

//Acción para obtener detalles de una orden
export const fetchOrderDetails = createAsyncThunk('orders/fetchOrderDetails', async (orderId)=> {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_ROUTE_ORDEN}/${orderId}`);
    return response.data;
});

//Acción para crear una nueva orden
export const createOrder = createAsyncThunk('orders/createOrder', async (orderData)=> {
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_ROUTE_ORDEN}`,orderData);
    return response.data;
});

//Acción para actualizar una orden existente
export const updateOrder = createAsyncThunk('orders/updateOrder', async ({orderId ,updatedData})=> {
    const response = await axios.put(`${import.meta.env.VITE_REACT_APP_ROUTE_ORDEN}/${orderId}`, updatedData);
    return response.data;
});

//Acción para eliminar una orden  
export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (orderId)=> {
    const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_ROUTE_ORDEN}/${orderId}`);
    return response.data;
});

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        orderDetails:null,
        status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
        error: null,
        orderCreted:false,
    },
    reducers:{
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        // Fetch Orders
        .addCase(fetchOrders.pending, (state) =>{ 
            state.status = 'loading';
        })
        .addCase(fetchOrders.fulfilled, (state, action) =>{ 
            state.status = 'succeeded';
            state.orders = action.payload
        })
        .addCase(fetchOrders.rejected, (state, action) =>{ 
            state.status = 'failed';
            state.error = action.error.message
        })
        //Fetch Order Details
        .addCase(fetchOrderDetails.pending, (state) =>{ 
            state.status = 'loading';
        })
        .addCase(fetchOrderDetails.fulfilled, (state, action) =>{ 
            state.status = 'succeeded';
            state.orders = action.payload
        })
        .addCase(fetchOrderDetails.rejected, (state, action) =>{ 
            state.status = 'failed';
            state.error = action.error.message
        })
        //Create Order
        .addCase(createOrder.pending, (state)=>{
            state.status = 'loading';
            state.orderCreted = false;
        })
        .addCase(createOrder.fulfilled, (state, action)=>{
            state.orders.push(action.payload)
            state.status = 'succeeded';
            state.orderCreted = true;
        })
        .addCase(createOrder.rejected, (state, action)=>{
            state.status = 'failed';
            state.error= action.error.message;
            state.orderCreted = false;
        })
        //Update Order
        .addCase(updateOrder.fulfilled, (state, action)=>{
            const updateOrder = action.payload;
            const index = state.orders.findIndex((order)=> order._id === updateOrder._id);
            if (index !== -1){
                state.orders[index] = updateOrder;
            }
        })
        //Delete Order
        .addCase(deleteOrder.fulfilled, (state, action)=>{
            state.orders = state.orders.filter((order) => order._id !== action.meta.arg);
        })
    }
})

export const {clearError} = orderSlice.actions;

export default orderSlice.reducer;