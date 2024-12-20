import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  singleItem: {},
  status: "nah",
  backend: 0,
  item_Props: [],
  color: "",
  size: "",
  price: 0,
  productSizes: [],
  isLoading: false,
};

//render address
// const base_url = "https://e-tpshop-backend.onrender.com";
const base_url = "http://localhost:5000";

export const productColorFetch = createAsyncThunk(
  "products/productColorFetch",
  async (productId) => {
    try {
      const res = await axios.get(
        `${base_url}/product/findColor/${productId.id}`
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

//test dispatch data from back end
export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    try {
      const res = await axios.get(`${base_url}`);
      console.log("entering productsSlice");
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const allProductsFetch = createAsyncThunk(
  "products/allProductsFetch",
  async () => {
    try {
      const res = await axios.get(`${base_url}/product/getAll`);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const productFetch = createAsyncThunk(
  "products/productFetch",
  async (productId) => {
    try {
      const res = await axios.get(
        `${base_url}/product/findProduct/${productId.id}`
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    changeSize: (state, action) => {
      state.size = action.payload;
      localStorage.setItem("size", action.payload);
    },
    changeColor: (state, action) => {
      state.color = action.payload;
      localStorage.setItem("color", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(productsFetch.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.status = "success";
      state.backend = action.payload.data;
    });
    builder.addCase(allProductsFetch.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(allProductsFetch.fulfilled, (state, action) => {
      state.status = "success";
      state.items = action.payload.products;
      state.isLoading = false;
    });
    builder.addCase(productFetch.fulfilled, (state, action) => {
      state.status = "success";
      state.singleItem = action.payload.product[0];
      state.color = action.payload.color;
      state.price = action.payload.base_price;
    });
    builder.addCase(productColorFetch.fulfilled, (state, action) => {
      state.status = "success";
      state.item_Props = action.payload.color;
      state.productSizes = action.payload.size;
    });
  },
});

export const { changeSize, changeColor } = productsSlice.actions;

export default productsSlice.reducer;
