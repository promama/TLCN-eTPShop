import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "default name",
};

const userSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
