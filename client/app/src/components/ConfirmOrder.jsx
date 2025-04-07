import { useEffect } from "react";
import { Row, Navbar, Container, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectDataUrl } from "../Product-Images.jsx";

function ConfirmOrder() {
  const price = useSelector((state) => state.cart.netPrice || 0);
  const cart = useSelector((state) => state.cart.cart);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const DATA_URL = useSelector(selectDataUrl);

  return (
    <>
      <NavBarCart />
      <CheckOrder />
    </>
  );
}

export default ConfirmOrder;

function NavBarCart() {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary navbar-checkout"
      fixed="top"
      id="navbar-checkout"
    >
      <Container fluid style={{ width: "70%" }}>
        <Navbar.Brand href="/">
          <img src="/Fight-Club.png" width="170" height="40" alt="Fight Club" />
        </Navbar.Brand>
        <Col className="d-flex align-items-end flex-column">
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
  );
}

function CheckOrder() {
  return (
    <Row className="p-5 mt-5">
      <h2 className="mb-4">Order Summary</h2>
      <p>Show order items, price, quantity, etc. here…</p>
    </Row>
  );
}
