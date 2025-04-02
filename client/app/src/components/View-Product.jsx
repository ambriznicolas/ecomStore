import { Footer } from "./Footer";
import { NavigationBar } from "./NavigationBar";
import { useParams, Link } from "react-router-dom";
// import { useState } from "react";
import PropTypes from "prop-types";
import {
  Image,
  Row,
  Col,
  Spinner,
  ButtonGroup,
  Button,
  Accordion,
} from "react-bootstrap";
import { useProduct } from "../hooks/useProducts.jsx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../hooks/Cart.jsx";

// import { useCart } from "../hooks/Cart";
function ViewProduct() {
  const { brand, product, color } = useParams();
  const dispatch = useDispatch();
  // const cart = useSelector((state) => state.cart.cart);
  // console.log(cart);

  // console.log(brand, product, color);
  // const { cart, setCart } = useState({});
  // console.log(cart);
  const DATA_URL = import.meta.env.VITE_API_BASE_URL;
  // useEffect(() => {
  //   const savedCart = localStorage.getItem("cart");
  //   if (savedCart) {
  //     setCart(JSON.parse(savedCart)); // ✅ Restore cart from localStorage
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // }, [cart]);

  return (
    <>
      <NavigationBar data_url={DATA_URL} />
      <Product
        brand={brand}
        product={product}
        color={color}
        // cart={cart || {}}
        // setCart={setCart}
        data_url={DATA_URL}
        dispatch={dispatch}
      />
      <Footer />
    </>
  );
}

export default ViewProduct;

function Product({ brand, product, color, dispatch, data_url }) {
  const slug = `${brand}-${product}-${color}`;
  const { product: selectedProduct, loading } = useProduct(slug);
  const [quantity, setQuantity] = useState(1);
  // console.log(selectedProduct.brand);

  function updatingCart() {
    if (selectedProduct && quantity) {
      const productName = `${selectedProduct.brand.brand_name} ${selectedProduct.product} ${selectedProduct.colors}`;
      const productPrice = selectedProduct.price;
      const productImage = selectedProduct.images;
      console.log(productImage);
      console.log(productPrice);

      // const productName = `${brand} ${product} ${color}`;
      dispatch(
        addItem({
          cartItem: productName,
          quantity,
          price: productPrice,
          image: productImage,
        })
      );
    }
    setQuantity(1);

    // const updatedCart = new Map(cart);
    // updatedCart.set(
    //   `${brand} ${selectedProduct.colors} ${selectedProduct.product}`,
    //   quantity
    // );
    // setCart((prevCart) => {
    //   const updatedCart = new Map(...prevCart);
    //   updatedCart.set(
    //     `${brand} ${selectedProduct.colors} ${selectedProduct.product}`,
    //     quantity
    //   );
    // });
    // setCart((prevCart) => ({
    //   ...prevCart, // ✅ Preserve previous items
    //   [`${brand} ${selectedProduct.colors} ${selectedProduct.product}`]:
    //     (prevCart[
    //       `${brand} ${selectedProduct.colors} ${selectedProduct.product}`
    //     ] || 0) + quantity, // ✅ Update quantity correctly
    // }));

    // setQuantity(1);
    // setCart((prevCart) => {
    //   const newCart = { ...prevCart }; // ✅ Copy existing cart
    //   const key = `${brand} ${selectedProduct.product} ${selectedProduct.color}`;
    //   if (!selectedProduct || !selectedProduct.product) {
    //     console.error("Trying to add an undefined product:", selectedProduct);
    //     return prevCart; // Prevent invalid cart updates
    //   }
    //   // ✅ If product already exists, increase quantity
    //   newCart[key] = (newCart[key] || 0) + quantity;

    //   localStorage.setItem("cart", JSON.stringify(newCart)); // ✅ Save updated cart in localStorage
    //   return newCart;
  }

  function increaseQuantity() {
    setQuantity(quantity + 1);
  }
  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }
  }
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
              src={`${data_url}/${selectedProduct.images}`}
              fluid
              alt={`${brand} ${product} ${color}`}
            />
          </Col>
          <Col className="product-info ">
            {/* Add product details here */}
            <h1>
              {brand} {selectedProduct.colors} {selectedProduct.product}
            </h1>
            <h2>${selectedProduct.price}</h2>
            <hr
              style={{
                width: "60%",
                height: "1px",
              }}
              className="mx-auto horiz-line"
            />
            <p className="product-extra-info mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-check2-circle icons-view-product"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
              </svg>
              Genuine Product
            </p>
            <p className="product-extra-info mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-globe-americas icons-view-product"
                viewBox="0 0 16 16"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484q-.121.12-.242.234c-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z" />
              </svg>
              UK & Europe Shipping 3-5 working days
            </p>

            <p className="product-extra-info mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-box-seam icons-view-product"
                viewBox="0 0 16 16"
              >
                <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z" />
              </svg>
              US Shipping: 1-2 working days
            </p>
            <p className="product-extra-info mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-lock icons-view-product"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
              </svg>
              Safe and secure checkout options
            </p>
            <div className="product-extra-info mx-auto mt-3 quantity ">
              <h5>Quantity</h5>
              <ButtonGroup
                style={{ border: "solid" }}
                className="rounded d-inline-flex align-items-center "
              >
                <Button
                  variant="light"
                  className="flex-grow-0 px-3 decrease-button"
                  type="button"
                  onClick={decreaseQuantity}
                >
                  -
                </Button>
                <p className="mb-0 mx-3">{quantity}</p>
                <Button
                  variant="light"
                  className="flex-grow-0 px-3 increase-button"
                  type="button"
                  onClick={increaseQuantity}
                >
                  +
                </Button>
              </ButtonGroup>
            </div>
            <div
              id="add-to-cart"
              className="mx-auto mt-3"
              style={{ width: "60%" }}
            >
              <Button
                variant="light"
                size="lg"
                className="mx-auto mt-3 mt-3  px-4 "
                id="add-to-cart"
                style={({ border: "solid" }, { width: "100%" })}
                onClick={updatingCart}
              >
                Add to cart
              </Button>
            </div>
            <Accordion
              className="mt-3 mx-auto "
              style={{ width: "60%" }}
              defaultActiveKey="0"
            >
              <Accordion.Item eventKey="0">
                <Accordion.Header>Description</Accordion.Header>
                <Accordion.Body>{selectedProduct.description}</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Shipping Information</Accordion.Header>
                <Accordion.Body>
                  All products are shipped from Thailand and once order has been
                  dispatched, you will get your order within 2 to 5 working
                  days.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Returns & Refunds</Accordion.Header>
                <Accordion.Body>
                  Customer satisfaction is our number one priority. If you are
                  not 100% happy with your purchase, you have 14-days after
                  receiving your item to request a return. You can return your
                  product for an exchange or a refund to the original payment
                  method. Any customs charges due are to be paid by the
                  customer. Note: Customers are responsible for any shipping
                  fees when returning their item(s). To be eligible for a
                  return, your item must be in the same condition that you
                  received it, unworn or unused, with tags, and in its original
                  packaging. You’ll also need the receipt or proof of purchase.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
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
  cart: PropTypes.object,
  // setCart: PropTypes.func.isRequired,
  dispatch: PropTypes.func,
  data_url: PropTypes.string.isRequired,
};
