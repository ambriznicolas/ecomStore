import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
// import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image";
import { Card, Button, Row, Col } from "react-bootstrap";
import slideShow from "./slideShow.js";
import PropTypes from "prop-types";
import { fetchProducts } from "./Products";

import { useState, useEffect } from "react";

import "./App.css";

function App() {
  return (
    <>
      <NavigationBar />
      <SlideShow images={slideShow} interval={3000} />
      <Brands />
      <BestSelling />
      <About />
      <Footer />
    </>
  );
}

export default App;

function Footer() {
  return (
    <>
      <footer>
        <Row>
          <Col>
            <h1>Fight Club</h1>
            <Row>
              <Col className="socials">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-instagram"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                </svg>
              </Col>
              <Col className="socials">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-facebook"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                </svg>
              </Col>
              <Col className="socials">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-youtube"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
                </svg>
              </Col>
            </Row>
          </Col>
          <Col>
            <h1>COMPANY INFO</h1>
            <h3>@ 2025. Fight Club</h3>
            <h3>fc@gmail.com</h3>
          </Col>
          <Col>
            <h1>COMPANY INFORMATION</h1>
            <h3>About us</h3>
            <h3>Customer Reviews</h3>
            <h3>Contact Us</h3>
          </Col>
          <Col>
            <h1>POLICY</h1>
            <h3>Shipping Policy</h3>
            <h3>Returns Policy</h3>
            <h3>Privacy Policy</h3>
            <h3>Terms of service</h3>
          </Col>
        </Row>
      </footer>
    </>
  );
}

function About() {
  return (
    <>
      <Container className="about">
        <Row className="ms-3">
          <Col xs={12} md={8}>
            <div className="d-flex flex-column mb-3 align-items-center flex-grow-1">
              <h1>THE US LEADING AUTHENTIC MUAY THAI STORE</h1>
              <h3>
                Welcome to Fight Club, your ultimate destination for authentic
                fighting gear. We profdly offer top-quality equipment for your
                needs in martial arts from trusted brands such like Twins,
                Fairtex, Cleto Reyes, and Yokkao. Wether you are a beginner or
                an experienced fighter, or coach we are here to support you on
                your journey.
              </h3>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className="about-imgs align-items-center">
              <Image
                width="290"
                height="355"
                className="img-top"
                src="ecom-pics/about/about-img-1.jpg"
                fluid
              />

              <Image
                width="290"
                height="355"
                className="img-bottom"
                src="ecom-pics/about/about-img-2.webp"
                fluid
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
function BestSelling() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts(); // Call the function to fetch data
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);
  return (
    <div>
      <h2>Trending</h2>
      <h1>BEST SELLERS</h1>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <Row className="d-flex flex-column flex-sm-row flex-row overflow-auto">
          {products.length > 0 ? (
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
                </Col>
              ))
          ) : (
            <p>No best-selling products found.</p>
          )}
        </Row>
      )}
      <div className="d-flex justify-content-center mt-3 ">
        <Button
          href="#best-selling"
          size="lg"
          className="mx-auto "
          variant="dark"
        >
          View All
        </Button>
      </div>
    </div>
  );
}
function Brands() {
  return (
    <Container>
      <h1 className="text-center">Brands we have in our store</h1>
      <Row className="align-items-center">
        <Col>
          <a href="" className="brand">
            <Image
              width="170"
              height="210"
              src="ecom-pics/brands/brand-yokkao.jpg"
              fluid
            />
          </a>
        </Col>
        <Col>
          <a href="" className="brand">
            <Image
              width="170"
              height="210"
              src="ecom-pics/brands/brand-twins.jpg"
              fluid
            />
          </a>
        </Col>
        <Col>
          <a href="" className="brand">
            <Image
              width="170"
              height="210"
              src="ecom-pics/brands/brand-fairtex.png"
              fluid
            />
          </a>
        </Col>
        <Col>
          <a href="" className="brand">
            <Image
              width="170"
              height="210"
              src="ecom-pics/brands/brand-cleto_retes.webp"
              fluid
            />
          </a>
        </Col>
      </Row>
    </Container>
  );
}

function NavigationBar() {
  const [showCart, setShowCart] = useState(false);
  return (
    <>
      <Navbar key="md" expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#" className="mx-auto">
            {" "}
            <img
              alt=""
              src="/ecom-pics/Fight-Club.png"
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
              {/* <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                Offcanvas
              </Offcanvas.Title> */}
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#yk">Yokkao</Nav.Link>
                <Nav.Link href="#tw">Twins</Nav.Link>
                <Nav.Link href="#ftx">Fairtex</Nav.Link>
                <Nav.Link href="#cr">Cleto Reyes</Nav.Link>
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

function SlideShow({ images, interval }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  // Manual navigation functions
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="slideshow position-relative">
      {/* Image */}
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="img-fluid h-100 w-100 object-fit-cover"
        style={{
          objectFit: "contain",
          backgroundColor: "#000",
        }}
      />

      {/* Navigation Controls */}
      <div className="px-3 controls position-absolute top-50 start-0 end-0 translate-middle-y d-flex justify-content-between">
        <button className="btn btn-dark" onClick={goToPrevious}>
          ❮
        </button>
        <button className="btn btn-dark" onClick={goToNext}>
          ❯
        </button>
      </div>

      {/* Indicators */}
      <div className="bottom-0 py-3 indicators position-absolute start-50 translate-middle-x d-flex justify-content-center w-100">
        {images.map((_, index) => (
          <span
            key={index}
            className={`indicator rounded-circle mx-1 ${
              index === currentIndex ? "bg-dark" : "bg-light"
            }`}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: "12px",
              height: "12px",
              cursor: "pointer",
              display: "inline-block",
            }}
          ></span>
        ))}
      </div>
    </div>
  );
}

// PropTypes validation
SlideShow.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  interval: PropTypes.number,
};

// Navbar
// // <Navbar expand="lg" className="bg-body-tertiary">
//   <Container>
//     {/* Navbar Toggle aligned to the left */}
//     <Navbar.Toggle
//       aria-controls="basic-navbar-nav offcanvasNavbar-expand-${expand}"
//       className="order-1"
//     />

//     {/* Centered Navbar Brand when screen is small */}
//     <Navbar.Brand href="#home" className="mx-auto">
//       <img
//         alt=""
//         src="/ecom-pics/Fight-Club.png"
//         width="150"
//         height="30"
//         className="align-top d-inline-block"
//         id="logo"
//       />
//     </Navbar.Brand>

//     {/* Navbar Links aligned to the right */}
//     <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
//       <Nav>
//         <Nav.Link href="#home">Home</Nav.Link>
//         <Nav.Link href="#yk">Yokkao</Nav.Link>
//         <Nav.Link href="#tw">Twins</Nav.Link>
//         <Nav.Link href="#ftx">Fairtex</Nav.Link>
//         <Nav.Link href="#cr">Cleto Reyes</Nav.Link>
//       </Nav>
//     </Navbar.Collapse>
//   </Container>
// </Navbar>

// first version
// <Navbar expand="lg" className="bg-body-tertiary">
//   <Container>
//     <Navbar.Brand href="#home">
//       <img
//         alt=""
//         src="/ecom-pics/Fight-Club.png"
//         width="150"
//         height="30"
//         className="align-top d-inline-block"
//         id="logo"
//       />{" "}
//     </Navbar.Brand>
//     <Navbar.Toggle aria-controls="basic-navbar-nav" />
//     <Navbar.Collapse id="basic-navbar-nav">
//       <Nav className="ms-auto">
//         <Nav.Link href="#home">Home</Nav.Link>
//         <Nav.Link href="#yk">Yokkao</Nav.Link>
//         <Nav.Link href="#tw">Twins</Nav.Link>
//         <Nav.Link href="#ftx">Fairtex</Nav.Link>
//         <Nav.Link href="#cr">Cleto Reyes</Nav.Link>
//       </Nav>
//     </Navbar.Collapse>
//   </Container>
// </Navbar>
