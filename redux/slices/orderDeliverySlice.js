import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pickupLocation: null,
    dropLocation: null,
    orderId: null
}

export const orderDeliverySlice = createSlice({
    name: "orderDeliverySlice",
    initialState: {initialState}, 
    reducers: {
        setPickupLocation: (state, action) => {
            state.pickupLocation = action.payload;
        },

        setDropLocation: (state, action) => {
            state.dropLocation = action.payload;
        },

        setOrderId: (state, action) => {
            state.orderId = action.payload;
        }
    }
})

export const selectPickupLocation = (state) => state.orderDeliverySlice.pickupLocation
export const selectDropLocation = (state) => state.orderDeliverySlice.destination
export const selectOrderId = (state) => state.orderDeliverySlice.orderId
export const { setPickupLocation, setDropLocation, setOrderId } = orderDeliverySlice.actions
export default orderDeliverySlice.reducer
