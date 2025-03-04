import { fetchProducts } from "../FetchingProducts";
import { describe, it, expect, test } from "vitest";
// const data = import.meta.env.VITE_APP_DATA;
// import axios from "axios";
// // Function to fetch products from the API
// const fetchProducts = async () => {
//   try {
//     const response = await axios.get("http://localhost:3000/api/products/");
//     return response.data;
//   } catch (error) {
//     throw new Error("Failed to fetch products");
//   }
// };
// // Mock axios
// vi.mock("axios");
describe("fetchProducts", () => {
  it("returns specific product data when API call is successful", async () => {
    // Call function
    // const mockData = [
    //   { product_id: 11, brand_id: "CR", price: 249.99 },
    //   //   { id: 2, name: "Smartphone", price: 800 },
    // ];

    // axios.get.mockResolvedValue({ data: mockData });
    const products = await fetchProducts();
    test("function returns brand names", () => {
      expect(products.brand_name().tobeDefined());
    });

    // products.map((p) => console.log(p.product, p.brand.brand_name, p.colors));

    // expect(Array.isArray(products)).toBe(true);
    // // const firstProduct = products.find((product) => product.product_id ===1);
    // expect(firstProduct).toBeDefined(); // Ensure the product exists
    // expect(firstProduct).toHaveProperty("brand_id", );
    // // ✅ Check that the response matches the mock data
    // expect(products).toEqual();

    // // ✅ Check if a specific product exists
    // expect(products).toContainEqual({
    //   product_id: 11,
    //   product: "Boxing Gloves",
    //   price: 249.99,
    // });

    // // ✅ Check if the first product has a name
    // expect(products[0]).toHaveProperty("product", "Boxing Gloves");

    // // ✅ Check if a product with a specific price exists
    // expect(products.some((product) => product.price === 249.99)).toBe(true);

    // ✅ Ensure Axios was called with the correct API URL
    // expect(axios.get).toHaveBeenCalledWith(
    //   "http://localhost:3000/api/products/"
    // );
  });

  // it("throws an error when API call fails", async () => {
  //   axios.get.mockRejectedValue(new Error("Network Error"));

  //   await expect(fetchProducts()).rejects.toThrow("Failed to fetch products");
  // });
});
