import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    navigationMode: null
}

export const navigationSlice = createSlice({
    name: "navigationSlice",
    initialState: {initialState}, 
    reducers: {
        setNavigationMode: (state, action) => {
            state.navigationMode = action.payload;
        }
    }
})

export const selectNavigationMode = (state) => state.navigationSlice.navigationMode
export const { setNavigationMode } = navigationSlice.actions
export default navigationSlice.reducer
