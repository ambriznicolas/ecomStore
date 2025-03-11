import { Footer } from "./Footer";
import { NavigationBar } from "./NavigationBar";
import { useParams, Link } from "react-router-dom";
// import { useState } from "react";
import PropTypes from "prop-types";
import { Image, Row, Col, Spinner } from "react-bootstrap";
import { useProduct } from "../hooks/useProducts.js";
// import { useState } from "react";
function ViewProduct() {
  const { brand, product, color } = useParams();
  console.log(brand, product, color);

  return (
    <>
      <NavigationBar />
      <Product brand={brand} product={product} color={color} />
      <Footer />
    </>
  );
}

export default ViewProduct;

function Product({ brand, product, color }) {
  const DATA_URL = import.meta.env.VITE_API_BASE_URL;

  const slug = `${brand}-${product}-${color}`;
  const { product: selectedProduct, loading } = useProduct(slug);

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!selectedProduct) {
    return <p>Product not found</p>;
  }

  return (
    <>
      <div className="product-page">
        <div className="section">
          <p>
            <Link className="return-home" to="/">
              Home
            </Link>{" "}
            / {brand} {product} {color}
          </p>
        </div>

        <Row className="product">
          <Col className="product-img" Col xs={6} md={4}>
            <Image
              src={`${DATA_URL}/${selectedProduct.images}`}
              fluid
              alt={`${brand} ${product} ${color}`}
            />
          </Col>
          <Col className="product-info">
            {/* Add product details here */}
            <h1>
              {brand} {selectedProduct.colors} {selectedProduct.product}
            </h1>
            <h2>${selectedProduct.price}</h2>
            <p className="text-center">{selectedProduct.description}</p>
            {/* Add more product info here */}
          </Col>
        </Row>
      </div>
    </>
  );
}

Product.propTypes = {
  brand: PropTypes.string.isRequired,
  product: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
