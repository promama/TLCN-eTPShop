import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  email: localStorage.getItem("email") || "",
  status: "idle",
  token: localStorage.getItem("access_token") || "",
  refresh_token: localStorage.getItem("refresh_token") || "",
  message: "",
  phoneNumber: 0,
  gender: "",
  dob: "",
  addresses: [],
};

export const fetchUserSetDefaultAddress = createAsyncThunk(
  "user/fetchUserSetDefaultAddress",
  async (addressId, { rejectWithValue }) => {
    try {
      const refresh_token = localStorage.getItem("refresh_token");
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `http://localhost:5000/user/setUserDefaultAddress/${addressId}`,
        data: { refresh_token },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUserDeleteAddress = createAsyncThunk(
  "user/fetchUserDeleteAddress",
  async (addressId, { rejectWithValue }) => {
    try {
      const refresh_token = localStorage.getItem("refresh_token");
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "DELETE",
        url: `http://localhost:5000/user/deleteUserAddressById/${addressId}`,
        data: { refresh_token },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUserShortProfile = createAsyncThunk(
  "user/fetchUserShortProfile",
  async (blank, { rejectWithValue }) => {
    try {
      const refresh_token = localStorage.getItem("refresh_token");
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
        url: `http://localhost:5000/user/showUserShortProfile`,
        data: { refresh_token },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchChangeUserProfile = createAsyncThunk(
  "user/fetchChangeUserProfile",
  async (userProfile, { rejectWithValue }) => {
    try {
      const refresh_token = localStorage.getItem("refresh_token");
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `http://localhost:5000/user/editUserProfile`,
        data: { refresh_token, ...userProfile },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchGetAllAddress = createAsyncThunk(
  "user/fetchGetAllAddress",
  async (numb, { rejectWithValue }) => {
    try {
      const refresh_token = localStorage.getItem("refresh_token");
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
        url: `http://localhost:5000/user/getAllAddress`,
        data: { refresh_token },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAddNewAddress = createAsyncThunk(
  "user/fetchAddNewAddress",
  async (userInfos, { rejectWithValue }) => {
    try {
      const refresh_token = localStorage.getItem("refresh_token");
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `http://localhost:5000/user/createNewAddress`,
        data: { ...userInfos, refresh_token },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async (userInfos, { rejectWithValue }) => {
    try {
      const refresh_token = localStorage.getItem("refresh_token");
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
        url: `http://localhost:5000/user/getAllAddress`,
        data: { ...userInfos, refresh_token },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

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
  reducers: {
    removeEmail: (state, action) => {
      state.email = "";
      state.token = "";
      state.message = "";
      state.status = "idle";
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("email");
    },
  },
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
      state.phoneNumber = action.payload.phoneNumber;
      state.gender = action.payload.gender;
      state.dob = action.payload.birthDay;
      state.refresh_token = action.payload.refreshToken;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
    });
    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      state.addresses = action.payload.address;
      state.status = "success";
    });
    builder.addCase(fetchAddress.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
    });
    builder.addCase(fetchAddNewAddress.fulfilled, (state, action) => {
      state.status = "success";
      state.addresses = action.payload.address;
    });
    builder.addCase(fetchAddNewAddress.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
    });
    builder.addCase(fetchGetAllAddress.fulfilled, (state, action) => {
      state.status = "success";
      state.addresses = action.payload.address;
    });
    builder.addCase(fetchGetAllAddress.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
    });
    builder.addCase(fetchChangeUserProfile.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
      state.dob = action.payload.data.birthDay;
      state.gender = action.payload.data.sex;
      state.phoneNumber = action.payload.data.phoneNumber;
    });
    builder.addCase(fetchChangeUserProfile.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
    });
    builder.addCase(fetchUserShortProfile.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
      state.dob = action.payload.data.birthDay;
      state.gender = action.payload.data.sex;
      state.phoneNumber = action.payload.data.phoneNumber;
    });
    builder.addCase(fetchUserShortProfile.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
    });

    builder.addCase(fetchUserDeleteAddress.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
      state.addresses = action.payload.address;
    });
    builder.addCase(fetchUserDeleteAddress.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
    });
    builder.addCase(fetchUserSetDefaultAddress.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
      state.addresses = action.payload.address;
    });
    builder.addCase(fetchUserSetDefaultAddress.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
    });
  },
});

export const { removeEmail } = userSlice.actions;

export default userSlice.reducer;
