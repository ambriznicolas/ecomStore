import { configureStore } from "@reduxjs/toolkit";
import cartSlicer from "./hooks/Cart.jsx";
import imageSlicer from "./Product-Images.jsx";

export const store = configureStore({
  reducer: {
    cart: cartSlicer,
    product_images: imageSlicer,
  },
});
