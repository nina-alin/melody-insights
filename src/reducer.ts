import { createSlice } from "@reduxjs/toolkit";

const globalStateSlice = createSlice({
  name: "globalState",
  initialState: {
    range: "medium_term",
  },
  reducers: {
    setRange: (state, action) => {
      state.range = action.payload;
    },
  },
});

export const { setRange } = globalStateSlice.actions;
export default globalStateSlice.reducer;
