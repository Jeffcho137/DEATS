import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    email: null,
    phoneNum: null
}

export const userSlice = createSlice({
    name: "userSlice",
    initialState: {initialState}, 
    reducers: {
        setId: (state, action) => {
            state.id = action.payload;
        },

        setEmail: (state, action) => {
            state.email = action.payload;
        },

        setPhoneNum: (state, action) => {
            state.phoneNum = action.payload;
        }
    }
})

export const selectSetId = (state) => state.userSlice.id
export const selectSetEmail = (state) => state.userSlice.email
export const selectPhoneNum = (state) => state.userSlice.phoneNum
export default userSlice.reducer
export const { setId, setEmail, setPhoneNum } = userSlice.actions
