import { Footer } from "./Footer";
import { NavigationBar } from "./NavigationBar";
import { useParams } from "react-router-dom";
function Product() {
  const { userSelection } = useParams();
  console.log(userSelection);

  return (
    <>
      <NavigationBar />
      <Footer />
    </>
  );
}
export default Product;
