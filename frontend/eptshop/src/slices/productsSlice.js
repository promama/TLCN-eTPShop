import { SatelliteAlt } from "@mui/icons-material";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  singleItem: {},
  status: "nah",
  backend: 0,
};

//test dispatch data from back end
export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    try {
      const res = await axios.get("http://localhost:5000");
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
      const res = await axios.get("http://localhost:5000/product/getAll");
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
        `http://localhost:5000/product/findProduct/${productId.id}`
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(productsFetch.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.status = "success";
      state.backend = action.payload.data;
    });
    builder.addCase(allProductsFetch.fulfilled, (state, action) => {
      state.status = "success";
      state.items = action.payload.products;
    });
    builder.addCase(productFetch.fulfilled, (state, action) => {
      state.status = "success";
      state.singleItem = action.payload.product[0];
    });
  },
});

export default productsSlice.reducer;
