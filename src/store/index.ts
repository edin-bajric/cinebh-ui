import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import selectedSeatsReducer from "./selectedSeatsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    selectedSeats: selectedSeatsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
