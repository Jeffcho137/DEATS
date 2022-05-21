import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    expoPushToken: null,
}

export const notificationsSlice = createSlice({
    name: "notificationsSlice",
    initialState: {initialState}, 
    reducers: {
        setExpoPushToken: (state, action) => {
            state.expoPushToken = action.payload;
        },
    }
})

export const selectExpoPushToken = (state) => state.notificationsSlice.expoPushToken
export const { setExpoPushToken } = notificationsSlice.actions
export default notificationsSlice.reducer
