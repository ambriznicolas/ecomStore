import { Footer } from "./Footer.jsx";
import { NavigationBar } from "./NavigationBar.jsx";

import PropTypes from "prop-types";
import { Card, Button, Row, Col } from "react-bootstrap";

import { useParams, Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts.jsx";
import { useSelector } from "react-redux";
import { selectDataUrl } from "../Product-Images.jsx";

function ProductsPage() {
  const DATA_URL = useSelector(selectDataUrl);

  const { userSelection } = useParams();
  console.log(userSelection);

  return (
    <>
      <NavigationBar data_url={DATA_URL} />
      <Products userSelection={userSelection} />
      <Footer />
    </>
  );
}

export default ProductsPage;

function Products({ userSelection }) {
  const option = userSelection
    ? userSelection.replace(/[^a-zA-Z0-9\s]/g, " ")
    : "";

  const DATA_URL = import.meta.env.VITE_API_BASE_URL;

  const { products, loading } = useProducts();
  // if (products.length > 0) {
  //   console.log("First product brand:", products[0].brand.brand_name);
  // } else {
  //   console.log("No products available yet.");
  // }
  return (
    <>
      <div className="section">
        <p>
          <Link className="return-home" to="/">
            Home
          </Link>{" "}
          / {option}
        </p>
      </div>
      {option && (
        <div className="user">
          <h1 style={{ fontSize: "60px" }}>{option}</h1>
        </div>
      )}
      <div>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <Row className="d-flex flex-column flex-sm-row flex-row overflow-auto">
            {products.length > 0 ? (
              products
                .filter((product) => product.brand?.brand_name === option)
                .map((product) => (
                  <Col key={product.product_id} sm={6} lg={3} className="mb-3">
                    <Card className="h-100 border-0">
                      <Card.Img
                        variant="top"
                        src={`${DATA_URL}/${product.images} `}
                        alt={product.product}
                      />
                      <Card.Body>
                        <Card.Title>
                          {product.brand_name} {product.product}{" "}
                          {product.colors}
                        </Card.Title>
                        <Card.Text>${product.price}</Card.Text>
                        <Link
                          to={`/${product.brand?.brand_name}/${product.product}/${product.colors}`}
                        >
                          <Button variant="dark">View Product</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
            ) : (
              <p>No Products Found.</p>
            )}
          </Row>
        )}
      </div>
    </>
  );
}
Products.propTypes = {
  userSelection: PropTypes.string.isRequired, // Ensures userSelection is a required string
};
{
  /* {products.length > 0 ? (
              products
                .filter((product) => product.number_of_purchases >= 50) // Filter best-selling products
                .slice(0, 4) // Show only first 4 products
                .map((product) => (
                  <Col key={product.product_id} sm={6} lg={3} className="mb-3">
                    <Card className="h-100">
                      <Card.Img
                        variant="top"
                        src={product.images || "/placeholder.jpg"}
                        alt={product.product}
                      />
                      <Card.Body>
                        <Card.Title>
                          {product.brand.brand_name} {product.product}{" "}
                          {product.colors}
                        </Card.Title>
                        <Card.Text>${product.price}</Card.Text>
                        <Button variant="dark">View Product</Button>
                      </Card.Body>
                    </Card>
                  </Col> */
}
