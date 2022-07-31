import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    value: null,
    tickets:[],
};
export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers:{
        setCustomer: (state,action)=>{
            state.value = action.payload
        },
        setCustomerTickets: (state,action)=>{
            state.tickets = action.payload
        },
        
    }
});

export const { setCustomer,setCustomerTickets } = customerSlice.actions;
export const selectCustomer = (state)=>state.customer.value;
export const selectCustomerTickets = (state)=>state.customer.tickets;
export default customerSlice.reducer;