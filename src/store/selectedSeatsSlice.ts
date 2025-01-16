import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SeatType } from "../utils/types";

type SelectedSeatsState = {
  selectedSeats: SeatType[];
  totalPrice: number;
  userEmail: string;
};

const initialState: SelectedSeatsState = {
  selectedSeats: [],
  totalPrice: 0,
  userEmail: "",
};

const selectedSeatsSlice = createSlice({
  name: "selectedSeats",
  initialState,
  reducers: {
    setSelectedSeats: (state, action: PayloadAction<SeatType[]>) => {
      state.selectedSeats = action.payload;
    },
    setTotalPrice: (state, action: PayloadAction<number>) => {
      state.totalPrice = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
    },
  },
});

export const { setSelectedSeats, setTotalPrice, setUserEmail } =
  selectedSeatsSlice.actions;
export default selectedSeatsSlice.reducer;
