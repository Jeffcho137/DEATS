import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toggle: null,
}

export const socketSlice = createSlice({
    name: "socketSlice",
    initialState: {initialState}, 
    reducers: {
        setToggle: (state, action) => {
            state.toggle = action.payload;
        },
    }
})

export const selectToggle = (state) => state.socketSlice.toggle
export const { setToggle } = socketSlice.actions
export default socketSlice.reducer
