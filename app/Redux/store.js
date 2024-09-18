"use client";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth-slice";
import productSlice from "./features/product-slice";
import accountSlice from "./features/account-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    product: productSlice.reducer,
    account: accountSlice.reducer,
  },
});

export default store;
