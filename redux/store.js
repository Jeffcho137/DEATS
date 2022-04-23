import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./slices/userSlice";
import orderDeliverySliceReducer from "./slices/orderDeliverySlice";
import makeDeliverySliceReducer from "./slices/makeDeliverySlice";

export const store = configureStore({
    reducer: {
        userSlice: userSliceReducer,
        orderDeliverySlice: orderDeliverySliceReducer,
        makeDeliverySlice: makeDeliverySliceReducer
    }
})