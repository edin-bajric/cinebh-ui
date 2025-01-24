import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie, SeatType } from "../utils/types";

type SelectedSeatsState = {
  selectedSeats: SeatType[];
  totalPrice: number;
  userEmail: string;
  movie: Movie | null;
  projectionDetails: any;
  filters: any;
};

const initialState: SelectedSeatsState = {
  selectedSeats: [],
  totalPrice: 0,
  userEmail: "",
  movie: null,
  projectionDetails: null,
  filters: null,
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
    setProjectionDetails: (state, action: PayloadAction<any>) => {
      state.projectionDetails = action.payload;
    },
    setFilters: (state, action: PayloadAction<any>) => {
      state.filters = action.payload;
    },
  },
});

export const { setSelectedSeats, setTotalPrice, setUserEmail, setMovie, setProjectionDetails, setFilters } =
  selectedSeatsSlice.actions;
export default selectedSeatsSlice.reducer;
