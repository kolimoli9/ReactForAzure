import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    value: [],
    flight: null,
    showFlights:[],
};
export const flightsSlice = createSlice({
    name: 'flights',
    initialState,
    reducers:{
        setFlights: (state,action)=>{
            state.value = action.payload
        },
        setChosenFlight: (state,action)=>{
            state.flight = action.payload
        },
        setShowFlights: (state,action)=>{
            state.showFlights = action.payload
        },
    }
});

export const {setFlights, setChosenFlight, setShowFlights} = flightsSlice.actions;
export const selectFlights = (state)=>state.flights.value;
export const selectChosenFlight = (state)=>state.flights.flight;
export const selectShowFlights = (state)=>state.flights.showFlights;
export default flightsSlice.reducer;