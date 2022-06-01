import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./slices/userSlice";
import orderDeliverySliceReducer from "./slices/orderDeliverySlice";
import makeDeliverySliceReducer from "./slices/makeDeliverySlice";
import socketSliceReducer from "./slices/socketSlice";
import notificationsSliceReducer from "./slices/notificationsSlice";
import navigationSliceReducer from "./slices/navigationSlice";

export const store = configureStore({
    reducer: {
        userSlice: userSliceReducer,
        orderDeliverySlice: orderDeliverySliceReducer,
        makeDeliverySlice: makeDeliverySliceReducer,
        socketSlice: socketSliceReducer,
        notificationsSlice: notificationsSliceReducer,
        navigationSlice: navigationSliceReducer
    }
})