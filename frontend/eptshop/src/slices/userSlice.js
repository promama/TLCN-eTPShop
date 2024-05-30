import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  email: localStorage.getItem("email") || "",
  status: "idle",
  token: localStorage.getItem("access_token") || "",
  message: "",
  phoneNumber: "",
  gender: "",
  dob: "",
  addresses: [],
  allowAccess: true,
  addressInfos: {},
  show: 0,
  isLoading: false,
};

export const fetchVerify = createAsyncThunk(
  "user/fetchVerify",
  async (numb, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `http://localhost:5000/user/verify`,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUserSetDefaultAddress = createAsyncThunk(
  "user/fetchUserSetDefaultAddress",
  async (addressId, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `http://localhost:5000/user/setUserDefaultAddress/${addressId}`,
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
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "DELETE",
        url: `http://localhost:5000/user/deleteUserAddressById/${addressId}`,
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
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
        url: `http://localhost:5000/user/showUserShortProfile`,
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
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `http://localhost:5000/user/editUserProfile`,
        data: { ...userProfile },
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
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `http://localhost:5000/user/getAllAddress`,
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
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `http://localhost:5000/user/createNewAddress`,
        data: { ...userInfos },
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
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
        url: `http://localhost:5000/user/getAllAddress`,
        data: { ...userInfos },
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

export const fetchConfirmAndBuy = createAsyncThunk(
  "user/fetchConfirmAndBuy",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `http://localhost:5000/user/confirmOder`,
        data: data,
      });
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
    reset: (state, action) => {
      state.email = "";
      state.status = "idle";
      state.token = "";
      state.message = "";
      state.phoneNumber = 0;
      state.gender = "";
      state.dob = "";
      state.addresses = [];
      state.allowAccess = true;
      localStorage.clear();
    },
    removeEmail: (state, action) => {
      state.email = "";
      state.token = "";
      state.message = "";
      state.status = "idle";
      localStorage.clear();
    },
    setOrderAddress: (state, action) => {
      state.addressInfos = action.payload.addressInfos;
    },
    setShowPage: (state, action) => {
      state.show = action.payload;
    },
  },
  extraReducers: (builder) => {
    //create new user account
    builder.addCase(fetchSignUp.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSignUp.fulfilled, (state, action) => {
      state.status = "success";
      state.message = "create success!";
      state.isLoading = false;
    });
    builder.addCase(fetchSignUp.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = false;
    });
    //sign in
    builder.addCase(fetchLogin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.status = "success";
      state.message = "login success!";
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.gender = action.payload.gender;
      state.dob = action.payload.birthDay;
      state.isLoading = true;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = true;
    });
    //find user addresses
    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      state.addresses = action.payload.address;
      state.status = "success";
      state.token = action.payload.token;
      localStorage.setItem("access_token", action.payload.token);
    });
    builder.addCase(fetchAddress.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
    });
    //add new user address
    builder.addCase(fetchAddNewAddress.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAddNewAddress.fulfilled, (state, action) => {
      state.status = "success";
      state.addresses = action.payload.address;
      state.token = action.payload.token;
      localStorage.setItem("access_token", action.payload.token);
      state.isLoading = true;
    });
    builder.addCase(fetchAddNewAddress.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = true;
    });
    //get all user addresses
    builder.addCase(fetchGetAllAddress.fulfilled, (state, action) => {
      state.status = "success";
      state.addresses = action.payload.address;
      state.token = action.payload.token;
      localStorage.setItem("access_token", action.payload.token);
    });
    builder.addCase(fetchGetAllAddress.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
    });
    //change user profile
    builder.addCase(fetchChangeUserProfile.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchChangeUserProfile.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
      state.dob = action.payload.data.birthDay;
      state.gender = action.payload.data.sex;
      state.phoneNumber = action.payload.data.phoneNumber;
      state.token = action.payload.token;
      localStorage.setItem("access_token", action.payload.token);
      state.isLoading = false;
    });
    builder.addCase(fetchChangeUserProfile.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = false;
    });
    //change user short profile
    builder.addCase(fetchUserShortProfile.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
      state.dob = action.payload.data.birthDay;
      state.gender = action.payload.data.sex;
      state.phoneNumber = action.payload.data.phoneNumber;
      state.token = action.payload.token;
      localStorage.setItem("access_token", action.payload.token);
    });
    builder.addCase(fetchUserShortProfile.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
    });
    //delete address
    builder.addCase(fetchUserDeleteAddress.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserDeleteAddress.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
      state.addresses = action.payload.address;
      state.token = action.payload.token;
      localStorage.setItem("access_token", action.payload.token);
      state.isLoading = true;
    });
    builder.addCase(fetchUserDeleteAddress.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = true;
    });
    //set new default address
    builder.addCase(fetchUserSetDefaultAddress.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserSetDefaultAddress.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
      state.addresses = action.payload.address;
      state.token = action.payload.token;
      localStorage.setItem("access_token", action.payload.token);
      state.isLoading = false;
    });
    builder.addCase(fetchUserSetDefaultAddress.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = false;
    });
    //protected route
    builder.addCase(fetchVerify.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
      state.addresses = action.payload.address;
      state.token = action.payload.token;
      localStorage.setItem("access_token", action.payload.token);
      state.allowAccess = action.payload.success;
    });
    builder.addCase(fetchVerify.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.allowAccess = action.payload.success;
    });
    //confirm oder
    builder.addCase(fetchConfirmAndBuy.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchConfirmAndBuy.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
      state.token = action.payload.token;
      localStorage.setItem("access_token", action.payload.token);
      state.addressInfos = {};
      state.isLoading = true;
    });
    builder.addCase(fetchConfirmAndBuy.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = true;
    });
  },
});

export const { removeEmail, reset, setOrderAddress, setShowPage } =
  userSlice.actions;

export default userSlice.reducer;
