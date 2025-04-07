import {
  Navbar,
  Container,
  Col,
  Button,
  Row,
  Form,
  Image,
  InputGroup,
  Collapse,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { selectDataUrl } from "../Product-Images.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const price = useSelector((state) => state.cart.netPrice || 0);
  const DATA_URL = useSelector(selectDataUrl);
  const cart = useSelector((state) => state.cart.cart);
  const totalItems = useSelector((state) => state.cart.totalItems);
  return (
    <>
      <NavBarCart />
      <OrderSummary
        price={price}
        data_url={DATA_URL}
        cart={cart}
        totalItems={totalItems}
      />
    </>
  );
}
export default Checkout;
function NavBarCart() {
  return (
    <>
      <Navbar
        key="md"
        expand="lg"
        className="bg-body-tertiary navbar-checkout"
        fixed="top"
        id="navbar-checkout"
      >
        <Container fluid style={{ width: "70%" }}>
          <Navbar.Brand href="/" className="">
            <img
              alt=""
              src="/Fight-Club.png"
              width="170"
              height="40"
              className="align-top d-inline-block"
              id="logo"
            />{" "}
          </Navbar.Brand>
          <Col className="d-flex align-items-end flex-column">
            {" "}
            <Link to="/cart">
              <Button variant="link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill=""
                  className="bi bi-bag"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                </svg>
              </Button>
            </Link>
          </Col>
        </Container>
      </Navbar>
    </>
  );
}

function OrderSummary({ price, data_url, cart, totalItems }) {
  const navigate = useNavigate();

  const guestCartId = localStorage.getItem("guest_cart_id");

  // Add each cart item to backend
  const handleReviewOrder = async () => {
    for (const item of cart) {
      try {
        const res = await fetch(`${data_url}/api/cart/add/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product: item.product_id,
            quantity: item.quantity || 1,
            cart_id: guestCartId,
          }),
        });

        if (!res.ok) throw new Error(`Failed to add item: ${item.product_id}`);
        const result = await res.json();
        console.log("Item added:", result);
      } catch (err) {
        console.error(err);
      }
    }

    // Navigate to confirm page after posting
    navigate("/confirm");
  };

  const [openSummary, setOpenSummary] = useState(false);
  return (
    <>
      <Row className="d-flex flex-column flex-md-row">
        <Button
          variant=""
          className="d-md-none w-100 mb-2"
          onClick={() => setOpenSummary(!openSummary)}
          aria-controls="order-summary-collapse"
          aria-expanded={openSummary}
        >
          {openSummary ? "Order Summary ^" : "Order Summary"}
        </Button>
        <Collapse in={openSummary} className="d-md-block">
          <Col
            className=" order-summary  order-1 order-md-2 collapse "
            style={{ minHeight: "100vh" }}
          >
            <div
              className="align-items-center pt-5 pb-4 ms-5 order-summary-sm"
              style={{ width: "70%" }}
            >
              {cart.length > 0 ? (
                cart.map((product, index) => {
                  return (
                    <Row key={index} className="mt-2 align-items-center ">
                      <Col className="align-items-center">
                        <Image
                          src={`${data_url}/${product.image}`}
                          alt="Product Image"
                          className=""
                          width={100}
                          height={100}
                          fluid
                          thumbnail
                        />
                      </Col>
                      <Col className="align-items-center" xs={6}>
                        <p
                          className="content-center"
                          style={{ textAlign: "center" }}
                        >
                          {product.cartItem}
                        </p>
                      </Col>
                      <Col className="align-items-center">
                        <p>${product.price}</p>
                      </Col>
                    </Row>
                  );
                })
              ) : (
                <p className="mb-10" style={{ textAlign: "center" }}>
                  Cart is empty
                </p>
              )}
            </div>

            <div className="ms-5">
              <Col>
                {" "}
                <InputGroup className="mb-3" style={{ width: "70%" }}>
                  <Form.Control
                    placeholder="Discount or gift card"
                    aria-label="Discount or gift card"
                    aria-describedby="basic-addon2"
                    width={{ width: "90%" }}
                    className="pe-3"
                  />
                  <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    className="ms-2"
                  >
                    Apply
                  </Button>
                </InputGroup>
              </Col>
            </div>

            <div className=" ms-5" style={{ width: "90%" }}>
              <Row>
                <Col className="">
                  <p className="me-5" style={{}}>
                    Subtotal {totalItems} items
                  </p>
                  <p className="me-5" style={{}}>
                    Shipping
                  </p>
                  <h5 style={{ fontWeight: "bold" }}>Total</h5>
                </Col>
                <Col>
                  <p className="me-5" style={{}}>
                    ${price}
                  </p>
                  <p className="me-5" style={{}}>
                    Enter Shipping Address
                  </p>

                  <h5 className="me-5" style={{ fontWeight: "bold" }}>
                    ${price}
                  </h5>
                </Col>
              </Row>
            </div>
          </Col>
        </Collapse>

        <Col
          className="customer-info order-2 order-md-1  mt-3 ms-5 "
          bg="light"
          style={{ width: "80%" }}
        >
          <div id="contact">
            <div className="ms-3">
              <h4 className="align-self-start ">Contact</h4>

              <InputGroup className="mb-3">
                <Form.Control
                  id="email"
                  aria-describedby="basic-addon3"
                  placeholder="Email"
                />
              </InputGroup>
            </div>
          </div>
          <div id="delivery" className="mt-4 ms-3">
            <div>
              <h4 className="align-self-start ">Delivery</h4>
              <Form.Select aria-label="Country/Region">
                <option>Default select</option>
              </Form.Select>
              <InputGroup className="mt-3">
                <Form.Control
                  aria-label="First name"
                  placeholder="First Name"
                  rounded
                />
                <Form.Control
                  aria-label="Last name"
                  placeholder="Last Name"
                  className="ms-3"
                />
              </InputGroup>

              <InputGroup className="mb-3 mt-3">
                <Form.Control
                  id="address"
                  aria-describedby="basic-addon3"
                  placeholder="Address"
                />
              </InputGroup>

              <InputGroup className="mb-3 mt-3">
                <Form.Control
                  id="Apartment"
                  aria-describedby="basic-addon3"
                  placeholder="Apartment, suite etc. (Optional)"
                />
              </InputGroup>

              <InputGroup className="mt-3 ">
                <Form.Control aria-label="city" placeholder="City" rounded />
                <Form.Control
                  aria-label="State"
                  placeholder="State"
                  className="ms-3"
                />
                <Form.Control
                  aria-label="Zip code"
                  placeholder="Zip code"
                  className="ms-3"
                />
              </InputGroup>
              <InputGroup className="mb-3 mt-3">
                <Form.Control
                  id="phone-number"
                  aria-describedby="basic-addon3"
                  placeholder="Phone"
                />
              </InputGroup>
            </div>

            <Button onClick={handleReviewOrder}>Review Order</Button>
          </div>

          {/* <Form.Control size="lg" type="text" placeholder="Large text" />
          <br />
          <Form.Control type="text" placeholder="Normal text" />
          <br />
          <Form.Control size="sm" type="text" placeholder="Small text" /> */}
        </Col>
      </Row>
    </>
  );
}
OrderSummary.propTypes = {
  price: PropTypes.number, // ✅ correct type
  cart: PropTypes.array,
  data_url: PropTypes.string,
  totalItems: PropTypes.number,
};
