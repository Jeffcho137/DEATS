import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pickupLocation: null,
    dropLocation: null,
    oldPickupLocation: null,
    oldDropLocation: null,
    orderId: null,
    delivererId: null,
    delivererInfo: null,
    orderStatus: null,
    orderFee: null
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

        setOldDropLocation: (state, action) => {
            state.oldDropLocation = action.payload;
        },

        setOldPickupLocation: (state, action) => {
            state.oldPickupLocation = action.payload;
        },

        setOrderId: (state, action) => {
            state.orderId = action.payload;
        },

        setDelivererId: (state, action) => {
            state.delivererId = action.payload;
        },

        setDelivererInfo: (state, action) => {
            state.delivererInfo = action.payload;
        },

        setDelivererInfo: (state, action) => {
            state.delivererInfo = action.payload;
        },

        setOrderStatus: (state, action) => {
            state.orderStatus = action.payload;
        },

        setOrderFee: (state, action) => {
            state.orderFee = action.payload;
        }
    }
})

export const selectPickupLocation = (state) => state.orderDeliverySlice.pickupLocation
export const selectDropLocation = (state) => state.orderDeliverySlice.dropLocation
export const selectOldPickupLocation = (state) => state.orderDeliverySlice.oldPickupLocation
export const selectOldDropLocation = (state) => state.orderDeliverySlice.oldDropLocation
export const selectOrderId = (state) => state.orderDeliverySlice.orderId
export const selectDelivererId = (state) => state.orderDeliverySlice.delivererId
export const selectDelivererInfo = (state) => state.orderDeliverySlice.delivererInfo
export const selectOrderStatus = (state) => state.orderDeliverySlice.orderStatus
export const selectOrderFee = (state) => state.orderDeliverySlice.orderFee
export const { 
    setPickupLocation, 
    setDropLocation, 
    setOldPickupLocation, 
    setOldDropLocation, 
    setOrderId, 
    setDelivererId, 
    setDelivererInfo, 
    setOrderStatus, 
    setOrderFee } = orderDeliverySlice.actions
export default orderDeliverySlice.reducer
