import { useState, useEffect } from "react";
import { fetchProducts } from "../FetchingProducts.js";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return { products, loading };
}

export function useProduct(slug) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return; // ✅ Prevent fetching with' empty slug

    setLoading(true);
    fetchProducts().then((data) => {
      const selected = data.find(
        (p) => `${p.brand?.brand_name}-${p.product}-${p.colors}` === slug
      );
      setProduct(selected || null); // ✅ Avoid setting undefined
      setLoading(false);
    });
  }, [slug]);

  return { product, loading };
}
// export function GetImage(product) {
//   const [selectedP, setSelectedP] = useState(null);
//   useEffect(() => {
//     if (selectedP) return; // ✅ Prevent fetching with' empty slug

//     // setLoading(true);
//     fetchProducts().then((data) => {
//       const selected = data.find(
//         (p) => `${p.brand?.brand_name} ${p.product} ${p.colors}` === product
//       );
//       setSelectedP(selected || null); // ✅ Avoid setting undefined
//       // setLoading(false);
//     });
//   }, [product]);

//   return { selectedP };
// }
