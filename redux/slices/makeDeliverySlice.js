import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    startingPoint: null,
    destination: null,
    unmatchedCustomers: null,
    selectedCustomer: null
}

export const makeDeliverySlice = createSlice({
    name: "makeDeliverySlice",
    initialState: {initialState}, 
    reducers: {
        setStartingPoint: (state, action) => {
            state.startingPoint = action.payload;
        },

        setDestination: (state, action) => {
            state.destination = action.payload;
        },

        setUnmatchedCustomers: (state, action) => {
            state.unmatchedCustomers = action.payload;
        },

        setSelectedCustomer: (state, action) => {
            state.selectedCustomer = action.payload;
        }
    }
})

export const selectStartingPoint = (state) => state.makeDeliverySlice.startingPoint
export const selectDestination = (state) => state.makeDeliverySlice.destination
export const selectUnmatchedCustomers = (state) => state.makeDeliverySlice.unmatchedCustomers
export const selectSelectedCustomer = (state) => state.makeDeliverySlice.selectedCustomer
export const { setStartingPoint, setDestination, setUnmatchedCustomers, setSelectedCustomer } = makeDeliverySlice.actions
export default makeDeliverySlice.reducer
