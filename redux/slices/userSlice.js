import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    name: null,
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

        setName: (state, action) => {
            state.name = action.payload;
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
export const selectSetName = (state) => state.userSlice.name
export const selectSetEmail = (state) => state.userSlice.email
export const selectPhoneNum = (state) => state.userSlice.phoneNum
export const { setId, setName, setEmail, setPhoneNum } = userSlice.actions
export default userSlice.reducer
