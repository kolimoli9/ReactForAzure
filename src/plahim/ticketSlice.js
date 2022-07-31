import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    value: []
};
export const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers:{
        setTickets: (state,action)=>{
            state.value = action.payload
        }
    }
});

export const { setTickets } = ticketsSlice.actions;
export const selectTickets = (state)=>state.tickets.value;
export default ticketsSlice.reducer;