import { Button, Nav, Navbar, Offcanvas, Container } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

export function NavigationBar() {
  const [showCart, setShowCart] = useState(false);
  return (
    <>
      <Navbar key="md" expand="lg" className="bg-body-tertiary" sticky="top">
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
                Shopping Cart
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <p>Your cart is empty.</p>
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
    </>
  );
}
// export default NavigationBar;
