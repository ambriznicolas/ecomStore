import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import Stack from "react-bootstrap/Stack";

import Image from "react-bootstrap/Image";
import { Card, Button, Row, Col } from "react-bootstrap";
import { slideShow } from "./slideShow.js";
import PropTypes from "prop-types";
import { useProducts } from "./hooks/useProducts";
import { Footer } from "./components/Footer.jsx";
import { NavigationBar } from "./components/NavigationBar.jsx";
import { Link } from "react-router-dom";

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
                fighting gear. We proudly offer top-quality equipment for your
                needs in martial arts from trusted brands such as Twins,
                Fairtex, Cleto Reyes, and Yokkao. Whether you are a beginner or
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
                src="src/assets/about/about-img-1.jpg"
                fluid
              />

              <Image
                width="290"
                height="355"
                className="img-bottom"
                src="src/assets/about/about-img-2.webp"
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
  const DATA_URL = import.meta.env.VITE_API_BASE_URL;
  // const [bestSelling, setBestSelling] = useState("");
  const { products, loading } = useProducts();
  const bestSelling = products
    .filter((p) => p.number_of_purchases >= 50)
    .slice(0, 4); // Get top 4 best-sellers
  return (
    <div>
      <h2>Trending</h2>
      <h1>BEST SELLERS</h1>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <Row className="d-flex flex-column flex-sm-row flex-row overflow-auto">
          {bestSelling.map((product) => (
            <Col key={product.product_id} sm={6} lg={3} className="mb-3">
              <Card className="h-100 border-0">
                <Card.Img
                  variant="top"
                  src={`${DATA_URL}/${product.images}`}
                  alt="Product Image"
                />
                <Card.Body>
                  <Card.Title>
                    {product.brand.brand_name} {product.product}{" "}
                    {product.colors}
                  </Card.Title>
                  <Card.Text>${product.price}</Card.Text>
                  <Link
                    to={`/${product.brand.brand_name}/${product.product}/${product.colors}`}
                  >
                    <Button variant="dark">View Product</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
          : (<p></p>)
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
          <Link to="/products/Yokkao" className="brand">
            <Image
              width="170"
              height="210"
              src="/brands/brand-yokkao.jpg"
              fluid
            />
          </Link>
        </Col>
        <Col>
          <Link to="/products/Twins" className="brand">
            <Image
              width="170"
              height="210"
              src="/brands/brand-twins.jpg"
              fluid
            />
          </Link>
        </Col>
        <Col>
          <Link to="/products/Fairtex" className="brand">
            <Image
              width="170"
              height="210"
              src="/brands/brand-fairtex.png"
              fluid
            />
          </Link>
        </Col>
        <Col>
          <Link to="/products/Cleto-Reyes" className="brand">
            <Image
              width="170"
              height="210"
              src="/brands/brand-cleto_retes.webp"
              fluid
            />
          </Link>
        </Col>
      </Row>
    </Container>
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
