import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  email: "",
  status: "idle",
  token: "",
  message: "",
};

export const fetchLogin = createAsyncThunk(
  "user/fetchLogin",
  async (userInfos, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/user/login",
        userInfos
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchSignUp = createAsyncThunk(
  "user/fetchSignUp",
  async (userInfos, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/user/createUser",
        userInfos
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSignUp.fulfilled, (state, action) => {
      state.status = "success";
      state.message = "create success!";
    });
    builder.addCase(fetchSignUp.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.status = "success";
      state.message = "login success!";
      state.token = action.payload.token;
      state.email = action.payload.email;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
    });
  },
});

export default userSlice.reducer;
