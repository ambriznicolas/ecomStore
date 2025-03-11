import axios from "axios";

const DATA_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchProducts() {
  try {
    const productResponse = await axios.get(`${DATA_URL}/api/products`);
    return productResponse.data;
  } catch (err) {
    throw new Error("Failed to fetch products");
  }
}

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
