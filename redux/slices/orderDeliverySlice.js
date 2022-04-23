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

export const selectSetPickupLocation = (state) => state.orderDeliverySlice.pickupLocation
export const selectSetDropLocation = (state) => state.orderDeliverySlice.destination
export const selectSetOrderId = (state) => state.orderDeliverySlice.orderId
export const { setPickupLocation, setDropLocation, setOrderId } = orderDeliverySlice.actions
export default orderDeliverySlice.reducer
