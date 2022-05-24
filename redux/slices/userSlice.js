import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    name: null,
    email: null,
    phoneNum: null,
    DEATSTokens: null,
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

        setDEATSTokens: (state, action) => {
            state.DEATSTokens = action.payload;
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
export const selectDEATSTokens = (state) => state.userSlice.DEATSTokens
export const selectProfileImgUri = (state) => state.userSlice.profileImgUri
export const { setId, setName, setEmail, setPhoneNum, setDEATSTokens, setProfileImgUri } = userSlice.actions
export default userSlice.reducer
