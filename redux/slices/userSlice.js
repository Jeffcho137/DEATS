import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    name: null,
    username: null,
    email: null,
    phoneNum: null,
    DEATSTokens: null,
    paymentIntentId: null,
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

        setUsername: (state, action) => {
            state.username = action.payload;
        },

        setEmail: (state, action) => {
            state.email = action.payload;
        },

        setPhoneNum: (state, action) => {
            state.phoneNum = action.payload;
        },

        setDEATSTokens: (state, action) => {
            state.DEATSTokens = action.payload;
        },

        setPaymentIntentId: (state, action) => {
            state.paymentIntentId = action.payload;
        },

        setProfileImgUri: (state, action) => {
            state.profileImgUri = action.payload;
        }
    }
})

export const selectId = (state) => state.userSlice.id
export const selectName = (state) => state.userSlice.name
export const selectUsername = (state) => state.userSlice.username
export const selectEmail = (state) => state.userSlice.email
export const selectPhoneNum = (state) => state.userSlice.phoneNum
export const selectDEATSTokens = (state) => state.userSlice.DEATSTokens
export const selectPaymentIntentId = (state) => state.userSlice.paymentIntentId
export const selectProfileImgUri = (state) => state.userSlice.profileImgUri
export const { setId, setName, setUsername, setEmail, setPhoneNum, setDEATSTokens, setPaymentIntentId, setProfileImgUri } = userSlice.actions
export default userSlice.reducer
