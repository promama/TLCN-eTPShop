import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantities: 0,
  cartTotalAmount: 0,
  status: "",
  message: "",
  showOffCanvas: false,
};

export const addToCartFetch = createAsyncThunk(
  "cart/addToCartFetch",
  async (productInfos, { rejectWithValue }) => {
    try {
      const refresh_token = localStorage.getItem("refresh_token");
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `http://localhost:5000/cart/addToCart`,
        data: { ...productInfos, refresh_token },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    showOffCanvas: (state, action) => {
      state.showOffCanvas = true;
    },
    hideOffCanvas: (state, action) => {
      state.showOffCanvas = false;
    },
    cartListItem: (state, action) => {
      state.cartItems = action.payload.products;
      state.cartTotalAmount = action.payload.total;
      state.cartTotalQuantities = action.payload.quantity;
    },
    dropCart: (state, action) => {
      state.cartItems = [];
      state.cartTotalAmount = 0;
      state.cartTotalQuantities = 0;
      state.message = "";
      state.status = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCartFetch.fulfilled, (state, action) => {
      state.status = "success";
      state.message = "add to cart successfully";
      state.cartItems = action.payload.cart.products;
      state.cartTotalAmount = action.payload.cart.total;
      state.cartTotalQuantities = action.payload.cart.quantity;
    });
    builder.addCase(addToCartFetch.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
    });
  },
});

export const { showOffCanvas, hideOffCanvas, cartListItem, dropCart } =
  cartSlice.actions;

export default cartSlice.reducer;
