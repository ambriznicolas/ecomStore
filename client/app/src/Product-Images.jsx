import { createSlice } from "@reduxjs/toolkit";
const imageSlice = createSlice({
  name: "product_images",
  initialState: {
    DATA_URL: import.meta.env.VITE_API_BASE_URL,
  },
  reducers: {},
});

export const selectDataUrl = (state) => state.product_images.DATA_URL;
export default imageSlice.reducer;
