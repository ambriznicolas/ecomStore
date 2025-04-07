// import { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import { createSlice } from "@reduxjs/toolkit";
// localStorage.clear();

// const initialState = {
//   cart: JSON.parse(localStorage.getItem("cart")) || [],
//   netPrice: Number(JSON.parse(localStorage.getItem("netPrice"))) || 0.0,
//   totalItems: Number(JSON.parse(localStorage.getItem("totalItems"))) || 0,
// };

const loadInitialState = () => {
  try {
    const savedCart = localStorage.getItem("cart");
    const savedNetPrice = localStorage.getItem("netPrice");
    const savedTotalItems = localStorage.getItem("totalItems");

    if (savedCart && savedNetPrice && savedTotalItems) {
      return {
        cart: JSON.parse(savedCart),
        netPrice: Number(savedNetPrice),
        totalItems: Number(savedTotalItems),
      };
    }
  } catch (e) {
    console.error("Failed to load from localStorage", e);
    return { cart: [], netPrice: 0, totalItems: 0 };
  }

  // Fallback in case of failure
};

const initialState = loadInitialState();
// const netPrice = 0;
// const initialState = { cart: [] };
// console.log();
import { useProduct } from "../hooks/useProducts.jsx";

const cartSlice = createSlice({
  name: "cart",
  initialState,
  useProduct,

  reducers: {
    addItem: (state, action) => {
      if (!state.cart) state.cart = [];

      const { cartItem, quantity, price, image } = action.payload;

      const existingItem = state.cart.find(
        (item) => item.cartItem === cartItem
      );

      if (existingItem) {
        existingItem.quantity += Number(quantity);
      } else {
        // state.cart.push({ cartArray.cartItem, cartArray.quantity });
        state.cart.push({
          cartItem: cartItem,
          quantity: Number(quantity),
          price: Number(price),
          image,
        });
        // console.log(existingItem.price);
      }
      // state.netPrice = Number((price * quantity).toFixed(2));
      state.netPrice = Number(
        state.cart
          .reduce((acc, item) => acc + item.price * item.quantity, 0)
          .toFixed(2)
      );

      state.totalItems = Number(
        state.cart.reduce((acc, item) => acc + item.quantity, 0)
      );
      // state.totalItems += Number(quantity);

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      localStorage.setItem("netPrice", JSON.stringify(state.netPrice));
    },
    removeItem: (state, action) => {
      const { cartItem } = action.payload;
      console.log(cartItem);
      const remove = state.cart.find((item) => item.cartItem === cartItem);

      state.netPrice = Number(
        state.netPrice - remove.price * remove.quantity
      ).toFixed(2);
      state.totalItems = Number(
        (state.totalItems - remove.quantity).toFixed(2)
      );

      console.log(state.netPrice);
      if (state.netPrice <= 0 && state.totalItems <= 0) {
        state.netPrice = 0.0;
        state.totalItems = 0;
      }
      // state.cart.splice(cartItem, 1);

      state.cart = state.cart.filter((item) => item.cartItem !== cartItem);

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      localStorage.setItem("netPrice", JSON.stringify(state.netPrice));
    },

    addQuantity: (state, action) => {
      const { cartItem } = action.payload;

      const existingItem = state.cart.find(
        (item) => item.cartItem === cartItem
      );

      existingItem.quantity += 1;
      // state.netPrice = Number((state.netPrice + existingItem.price).toFixed(2));
      state.netPrice = Number(
        state.cart
          .reduce((acc, item) => acc + item.price * item.quantity, 0)
          .toFixed(2)
      );

      state.totalItems = Number(state.totalItems + 1);
      // state.netPrice += existingItem.price;
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      localStorage.setItem("netPrice", JSON.stringify(state.netPrice));
    },
    decreaseQuantity: (state, action) => {
      const { cartItem } = action.payload;

      const existingItem = state.cart.find(
        (item) => item.cartItem === cartItem
      );

      existingItem.quantity -= 1;
      state.netPrice = Number(state.netPrice - existingItem.price).toFixed(2);
      state.netPrice = Number(
        state.cart
          .reduce((acc, item) => acc + existingItem.price * item.quantity, 0)
          .toFixed(2)
      );
      state.totalItems = Number(state.totalItems - 1);

      if (existingItem.quantity < 1) {
        const removeItem = state.cart.indexOf(cartItem);
        // state.netPrice += removeItem.price;
        state.cart.splice(removeItem, 1);
        console.log(removeItem);
      }
      if (state.netPrice <= 0 && state.totalItems < 1) {
        state.netPrice = 0.0;
        state.totalItems = 0;
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      localStorage.setItem("netPrice", JSON.stringify(state.netPrice));
    },
  },
});

export const { addItem, removeItem, addQuantity, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;

// const CartContext = createContext(null);
// export function useCart() {
//   return useContext(CartContext);
// }
// export function CartProvider({ children }) {
//   const [cart, setCart] = useState(() => {
//     const savedCart = localStorage.getItem("cart");
//     return savedCart ? JSON.parse(savedCart) : {}; // Initialize from localStorage if available
//   });

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to localStorage whenever it changes
//   }, [cart]);

//   return (
//     <CartContext.Provider value={{ cart, setCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// }
// CartProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// CHECK FOR NUMBER OF ITEMS IN STOCK DOESNT SURPASS
// const { product: selectedProduct } = useProduct(existingItem.cartItem);
// if (existingItem.quantity > selectedProduct.quantity) {
//   return alert(
//     "The number of surpasses what we have in stock please reduce the number of items for this product"
//   );
// } else {
//   localStorage.setItem("cart", JSON.stringify(state.cart));
// }
