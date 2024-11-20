"use client";

import { Provider } from "react-redux";
import store from "./store.js";

export function Providers({ children }) {
  return (
    <div>
      <Provider store={store}>{children}</Provider>{" "}
    </div>
  );
}
