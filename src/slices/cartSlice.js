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
  orderId: localStorage.getItem("orderId") || "",
  orders: [],
  isLoading: false,
};

//render address
// const base_url = "https://e-tpshop-backend.onrender.com";
const base_url = "http://localhost:5000";

export const showCartItemsFetch = createAsyncThunk(
  "cart/showCartItems",
  async (productInfos, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `${base_url}/cart/getCartItems`,
        data: { email: localStorage.getItem("email") },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const subtractToCartFetch = createAsyncThunk(
  "cart/subtractToCartFetch",
  async (productInfos, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `${base_url}/cart/subtractToCart`,
        data: { ...productInfos, email: localStorage.getItem("email") },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addToCartFetch = createAsyncThunk(
  "cart/addToCartFetch",
  async (productInfos, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `${base_url}/cart/addToCart`,
        data: { ...productInfos, email: localStorage.getItem("email") },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const showAllOrder = createAsyncThunk(
  "cart/showAllOrder",
  async (productInfos, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `${base_url}/cart/allOrder`,
        data: { email: localStorage.getItem("email") },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const showWaitingApproveOrder = createAsyncThunk(
  "cart/showWaitingApproveOrder",
  async (productInfos, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `${base_url}/cart/waitingApproveOrder`,
        data: { email: localStorage.getItem("email") },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const showDeliveringOrder = createAsyncThunk(
  "cart/showDeliveringOrder",
  async (productInfos, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `${base_url}/cart/deliveringOrder`,
        data: { ...productInfos, email: localStorage.getItem("email") },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const showFinishOrder = createAsyncThunk(
  "cart/showFinishOrder",
  async (productInfos, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `${base_url}/cart/finishOrder`,
        data: { ...productInfos, email: localStorage.getItem("email") },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchRatingProduct = createAsyncThunk(
  "user/fetchRatingProduct",
  async (productInfos, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `${base_url}/user/rateProduct`,
        data: { ...productInfos, email: localStorage.getItem("email") },
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
      state.cartTotalAmount = action.payload.cart.total;
      state.cartTotalQuantities = action.payload.cart.quantity;
      state.orderId = action.payload.orderId;
      localStorage.setItem("orderId", action.payload.orderId);
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
    //add item to cart
    builder.addCase(addToCartFetch.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addToCartFetch.fulfilled, (state, action) => {
      state.status = "success";
      state.message = "add to cart successfully";
      state.cartItems = action.payload.cart;
      state.cartTotalAmount = action.payload.total;
      state.cartTotalQuantities = action.payload.quantity;
      state.orderId = action.payload.orderId;
      localStorage.setItem("orderId", action.payload.orderId);
      if (action.payload.token)
        localStorage.setItem("access_token", action.payload.token);
      state.isLoading = false;
    });
    builder.addCase(addToCartFetch.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = false;
    });
    //subtract item from cart
    builder.addCase(subtractToCartFetch.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(subtractToCartFetch.fulfilled, (state, action) => {
      state.status = "success";
      state.message = "subtract to cart successfully";
      state.cartItems = action.payload.cart;
      state.cartTotalAmount = action.payload.total;
      state.cartTotalQuantities = action.payload.quantity;
      state.orderId = action.payload.orderId;
      localStorage.setItem("orderId", action.payload.orderId);
      state.isLoading = false;
    });
    builder.addCase(subtractToCartFetch.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = false;
    });
    //show item in cart
    builder.addCase(showCartItemsFetch.fulfilled, (state, action) => {
      state.status = "success";
      state.cartItems = action.payload.cart;
      state.cartTotalAmount = action.payload.total;
      state.cartTotalQuantities = action.payload.quantity;
    });
    builder.addCase(showCartItemsFetch.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload?.message;
    });
    //show all orders
    builder.addCase(showAllOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(showAllOrder.fulfilled, (state, action) => {
      state.status = "success";
      state.orders = action.payload.listOrder;
      state.isLoading = false;
    });
    builder.addCase(showAllOrder.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = false;
    });
    //show "waiting approve" orders
    builder.addCase(showWaitingApproveOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(showWaitingApproveOrder.fulfilled, (state, action) => {
      state.status = "success";
      state.orders = action.payload.listOrder;
      state.isLoading = false;
    });
    builder.addCase(showWaitingApproveOrder.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = false;
    });
    //show "delivering" orders
    builder.addCase(showDeliveringOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(showDeliveringOrder.fulfilled, (state, action) => {
      state.status = "success";
      state.orders = action.payload.listOrder;
      state.isLoading = false;
    });
    builder.addCase(showDeliveringOrder.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = false;
    });
    //show "finish" orders
    builder.addCase(showFinishOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(showFinishOrder.fulfilled, (state, action) => {
      state.status = "success";
      state.orders = action.payload.listOrder;
      state.isLoading = false;
    });
    builder.addCase(showFinishOrder.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = false;
    });
    //show "finish" orders
    builder.addCase(fetchRatingProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRatingProduct.fulfilled, (state, action) => {
      state.status = "success";
      state.orders = action.payload.listOrder;
      state.isLoading = false;
    });
    builder.addCase(fetchRatingProduct.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = false;
    });
  },
});

export const { showOffCanvas, hideOffCanvas, cartListItem, dropCart } =
  cartSlice.actions;

export default cartSlice.reducer;
