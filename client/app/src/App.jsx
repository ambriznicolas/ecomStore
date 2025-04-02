import Home from "./Home.jsx"; // Home page component
import { Routes, Route } from "react-router-dom";
import ProductsPage from "./components/Products-Page.jsx"; // Product details page
import ViewProduct from "./components/View-Product.jsx";
// import { CartProvider } from "./hooks/Cart";
import { store } from "./Store.jsx";
import { Provider } from "react-redux";
import CartPage from "./components/CartPage.jsx";
function App() {
  return (
    <>
      {/* Routes for different pages */}
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:userSelection" element={<ProductsPage />} />
          <Route path="/:brand/:product/:color" element={<ViewProduct />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
