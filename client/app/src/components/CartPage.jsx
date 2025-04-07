import { NavigationBar } from "./NavigationBar.jsx";
import { Footer } from "./Footer.jsx";
import { Col, Row, Image, ButtonGroup, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addQuantity, decreaseQuantity } from "../hooks/Cart.jsx";
import { selectDataUrl } from "../Product-Images.jsx";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
function CartPage() {
  const DATA_URL = useSelector(selectDataUrl);
  return (
    <>
      <NavigationBar data_url={DATA_URL} />
      <CartItems data_url={DATA_URL} />
      <Footer />
    </>
  );
}

export default CartPage;

function CartItems({ data_url }) {
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  const netPrice = useSelector((state) => state.cart.netPrice);
  const dispatch = useDispatch();
  function decreaseItemQuantity(product) {
    dispatch(decreaseQuantity({ cartItem: product }));
  }
  function addItemQuantity(product) {
    dispatch(addQuantity({ cartItem: product }));
  }

  return (
    <>
      <div>
        <Row className="mt-5">
          <Col className="align-items-center">
            <h1>Cart</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Link className="continue-shopping">
              <p style={{ textAlign: "center" }}>Continue Shopping</p>
            </Link>
          </Col>
        </Row>

        {cart.length > 0 ? (
          cart.map((product, index) => {
            return (
              <>
                <hr
                  style={{
                    width: "70%",
                    height: "1px",
                  }}
                  className="mx-auto horiz-line"
                />

                <Row
                  key={index}
                  style={{ width: "70%" }}
                  className="mx-auto align-items-center"
                >
                  <Col className="section-cart-product d-flex align-items-center">
                    <Image
                      src={`${data_url}/${product.image}`}
                      alt="Product Image"
                      className="align-self-center product-cart-img my-auto"
                      fluid
                      rounded
                    />
                  </Col>
                  <Col
                    className="section-cart-product d-flex align-items-center"
                    xs={6}
                  >
                    <p
                      className="content-center"
                      style={{ textAlign: "center" }}
                    >
                      {product.cartItem}
                    </p>
                  </Col>
                  <Col className="section-cart-product  align-items-center ">
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
                </Row>
              </>
            );
          })
        ) : (
          <p className="mb-10" style={{ textAlign: "center" }}>
            Cart is empty
          </p>
        )}
        <hr
          style={{
            width: "70%",
            height: "1px",
          }}
          className="mx-auto horiz-line"
        />
        <Row className="mt-5 mx-auto" style={{ width: "70%" }}>
          <Col className="d-flex align-items-end flex-column mb-3 ready-pay">
            <div>
              <h5 style={{ fontWeight: "bold" }}>SUBTOTAL: ${netPrice}</h5>
            </div>
            <div>
              <p>Shipping, taxes and discount codes calculated at checkout</p>
            </div>
            <div>
              <Link to="/checkout">
                <Button variant="dark" size="lg">
                  Checkout
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
CartItems.propTypes = {
  data_url: PropTypes.string,
};
