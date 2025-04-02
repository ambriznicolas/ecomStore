import {
  Button,
  Nav,
  Navbar,
  Offcanvas,
  Container,
  Row,
  Col,
  Image,
  ButtonGroup,
} from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import { removeItem, addQuantity, decreaseQuantity } from "../hooks/Cart.jsx";

// import { useEffect } from "react";

export function NavigationBar({ data_url }) {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);

  const price = useSelector((state) => state.cart.netPrice || 0);

  const totalItems = useSelector((state) => state.cart.totalItems);

  // const [order, setOrder] = useState(0);

  function handleRemoveItem(product) {
    dispatch(removeItem({ cartItem: product }));
  }
  function addItemQuantity(product) {
    dispatch(addQuantity({ cartItem: product }));
  }
  function decreaseItemQuantity(product) {
    dispatch(decreaseQuantity({ cartItem: product }));
  }

  return (
    <Navbar
      key="md"
      expand="lg"
      className="bg-body-tertiary navbar"
      fixed="top"
    >
      <Container fluid>
        <Navbar.Brand href="/" className="mx-auto">
          {" "}
          <img
            alt=""
            src="/Fight-Club.png"
            width="150"
            height="30"
            className="align-top d-inline-block"
            id="logo"
          />
        </Navbar.Brand>

        <Navbar.Toggle
          className="position-absolute start-0 ms-3"
          aria-controls={`offcanvasNavbar-expand-md`}
        />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-md`}
          aria-labelledby={`offcanvasNavbarLabel-expand-md`}
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
              Fight Club
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link className="Nav-Link" to="/products/Yokkao" as={Link}>
                {" "}
                Yokkao
              </Nav.Link>
              <Nav.Link className="Nav-Link" to="/products/Fairtex" as={Link}>
                Fairtex
              </Nav.Link>
              <Nav.Link className="Nav-Link" to="/products/Twins" as={Link}>
                Twins
              </Nav.Link>
              <Nav.Link
                className="Nav-Link"
                to="/products/Cleto-Reyes"
                as={Link}
              >
                Cleto Reyes
              </Nav.Link>
              {/* <NavDropdown
                  title="Dropdown"
                  id={`offcanvasNavbarDropdown-expand-md`}
                >
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown> */}
            </Nav>
            {/* <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form> */}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <Offcanvas
          show={showCart}
          onHide={() => setShowCart(false)}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabelCart">
              Shopping Cart ({totalItems})
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {cart.length > 0 ? (
              cart.map((product, index) => {
                // const productImg = GetImage(product.cartItem);
                // console.log(productImg.selectedP);

                // console.log(productImg);
                // console.log(productImg.selectedP.images);

                console.log(product.cartItem);

                return (
                  <Row key={index} className="mb-3">
                    <Col className="product-img" Col>
                      <Image
                        src={`${data_url}/${product.image}`}
                        alt="Product Image"
                        className="align-self-center"
                        fluid
                        rounded
                      />
                    </Col>

                    <Col xs={6}>
                      <p>{product.cartItem}</p>
                      <ButtonGroup
                        style={{ border: "solid" }}
                        className="rounded d-inline-flex align-items-center "
                      >
                        <Button
                          variant="light"
                          className="flex-grow-0 px-3 decrease-button"
                          type="button"
                          onClick={() =>
                            decreaseItemQuantity(
                              product.cartItem,
                              product.quantity
                            )
                          }
                        >
                          -
                        </Button>
                        <p className="mb-0 mx-3">{product.quantity}</p>
                        <Button
                          variant="light"
                          className="flex-grow-0 px-3 increase-button"
                          type="button"
                          onClick={() => addItemQuantity(product.cartItem)}
                        >
                          +
                        </Button>
                      </ButtonGroup>
                    </Col>
                    <Col xs lg="2">
                      <Button
                        variant="link"
                        onClick={() => handleRemoveItem(product.cartItem)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill=""
                          className="bi bi-trash3 trash"
                          viewBox="0 0 16 16"
                        >
                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                        </svg>
                      </Button>

                      <p className="price">{product.price}</p>
                    </Col>
                  </Row>
                );
              })
            ) : (
              <p>Your cart is empty.</p>
            )}
            <Link to="/cart">
              <div className="d-flex justify-content-center checkout">
                <Button
                  className="checkout-button t-3 px-4"
                  style={{ width: "90%" }}
                  variant="dark"
                >
                  Checkout: ${price}
                </Button>
              </div>
            </Link>
          </Offcanvas.Body>
        </Offcanvas>

        <div>
          <Button variant="link" onClick={() => setShowCart(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill=""
              className="bi bi-bag"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
            </svg>
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}
// export default NavigationBar;
NavigationBar.propTypes = {
  cart: PropTypes.object,
  data_url: PropTypes.string,

  children: PropTypes.node,
};
// const [quantity, setQuantity] = useState(0);
// const { product: selectedProduct } = useProduct();

// function GImage(product) {
//   console.log(product);
//   const images = GetImage(product);
//   console.log(image);

//   return image.images;
// }

// function increaseQuantity({ key, quantity }) {
//   quantity + 1;
//   setCart((prevCart) => {
//     const newCart = { ...prevCart }; // ✅ Copy existing cart

//     // ✅ If product already exists, increase quantity
//     newCart[key] = (newCart[key] || 0) + quantity;

//     localStorage.setItem("cart", JSON.stringify(newCart)); // ✅ Save updated cart in localStorage
//     return newCart;
//   });
// }
// function decreaseQuantity({ key, quantity }) {
//   quantity - 1;
//   setCart((prevCart) => {
//     const newCart = { ...prevCart }; // ✅ Copy existing cart

//     // ✅ If product already exists, increase quantity
//     newCart[key] = (newCart[key] || 0) + quantity;

//     localStorage.setItem("cart", JSON.stringify(newCart)); // ✅ Save updated cart in localStorage
//     return newCart;
//   });
// }\
// const dispatch = useDispatch();
