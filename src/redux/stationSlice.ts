import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { StationResponse } from "../interface/Interface";

const initialState: StationResponse = {
  content: [],
};

const stationSlice = createSlice({
  name: "stations",
  initialState,
  reducers: {
    setStations: (_, action: PayloadAction<StationResponse>) => {
      return action.payload;
    },
  },
});

export const { setStations } = stationSlice.actions;
export default stationSlice.reducer;
