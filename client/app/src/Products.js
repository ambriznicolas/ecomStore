import axios from "axios";

const DATA_URL = import.meta.env.VITE_API_BASE_URL;

// export const fetchProducts = async () => {
//   try {
//     const productResponse = await axios.get(
//       "http://localhost:8000/api/products/"
//     );
//     return productResponse.data;
//   } catch (err) {
//     throw new Error("Failed to fetch products");
//   }
// };

// export default fetchProducts;

export const fetchProducts = async () => {
  try {
    const productResponse = await axios.get(`${DATA_URL}/products`);
    return productResponse.data;
  } catch (err) {
    throw new Error("Failed to fetch products");
  }
};
