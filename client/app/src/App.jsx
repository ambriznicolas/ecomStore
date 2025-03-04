import Home from "./Home.jsx"; // Home page component
import { Routes, Route } from "react-router-dom";
import ProductsPage from "./components/Products-Page.jsx"; // Product details page
import ViewProduct from "./components/View-Product.jsx";
function App() {
  return (
    <>
      {/* Routes for different pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:userSelection" element={<ProductsPage />} />
        <Route
          path="/products/:brand-:product-:color"
          element={<ViewProduct />}
        />
      </Routes>
    </>
  );
}

export default App;
