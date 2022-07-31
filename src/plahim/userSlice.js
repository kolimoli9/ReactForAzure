import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    value: false,
};
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setTheUser: (state,action)=>{
            state.value = action.payload
        }
    }
});

export const {setTheUser} = userSlice.actions;
export const selectUser = (state)=>state.user.value;
export default userSlice.reducer;