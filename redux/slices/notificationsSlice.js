import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    exponentPushToken: null,
}

export const notificationsSlice = createSlice({
    name: "notificationsSlice",
    initialState: {initialState}, 
    reducers: {
        setExponentPushToken: (state, action) => {
            state.exponentPushToken = action.payload;
        },
    }
})

export const selectExponentPushToken = (state) => state.notificationsSlice.startingPoint
export const { setExponentPushToken } = notificationsSlice.actions
export default notificationsSlice.reducer
