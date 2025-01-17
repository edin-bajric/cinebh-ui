import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie, SeatType } from "../utils/types";

type SelectedSeatsState = {
  selectedSeats: SeatType[];
  totalPrice: number;
  userEmail: string;
  movie: Movie | null;
};

const initialState: SelectedSeatsState = {
  selectedSeats: [],
  totalPrice: 0,
  userEmail: "",
  movie: null,
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
    setMovie: (state, action: PayloadAction<Movie>) => {
      state.movie = action.payload;
    },
  },
});

export const { setSelectedSeats, setTotalPrice, setUserEmail, setMovie } =
  selectedSeatsSlice.actions;
export default selectedSeatsSlice.reducer;
