import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    name: null,
    email: null,
    phoneNum: null,
    profileImgUri: null,
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
        },

        setProfileImgUri: (state, action) => {
            state.profileImgUri = action.payload;
        }
    }
})

export const selectId = (state) => state.userSlice.id
export const selectName = (state) => state.userSlice.name
export const selectEmail = (state) => state.userSlice.email
export const selectPhoneNum = (state) => state.userSlice.phoneNum
export const selectProfileImgUri = (state) => state.userSlice.profileImgUri
export const { setId, setName, setEmail, setPhoneNum, setProfileImgUri } = userSlice.actions
export default userSlice.reducer
