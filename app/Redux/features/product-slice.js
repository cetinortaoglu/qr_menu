"use client";

import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: { categories: [] },
  reducers: {
    updateState(state, action) {
      const params = action.payload;
      Object.keys(params).map((i) => {
        return (state[i] = params[i]);
      });
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice;
