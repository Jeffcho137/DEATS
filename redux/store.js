import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./slices/userSlice";
import orderDeliverySliceReducer from "./slices/orderDeliverySlice";
import makeDeliverySliceReducer from "./slices/makeDeliverySlice";
import socketSliceReducer from "./slices/socketSlice";

export const store = configureStore({
    reducer: {
        userSlice: userSliceReducer,
        orderDeliverySlice: orderDeliverySliceReducer,
        makeDeliverySlice: makeDeliverySliceReducer,
        socketSlice: socketSliceReducer
    }
})