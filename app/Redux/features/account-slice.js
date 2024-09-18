"use client";

import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: { theme: null },
  reducers: {
    updateState(state, action) {
      const params = action.payload;
      Object.keys(params).map((i) => {
        return (state[i] = params[i]);
      });
    },
  },
});

export const accountActions = accountSlice.actions;

export default accountSlice;
