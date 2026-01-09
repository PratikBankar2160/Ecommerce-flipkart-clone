import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axiosInstance from "./axiosInstance"; // ✅ adjust path if needed

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axiosInstance
      .get("/products") // ✅ confirm backend endpoint
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="container mt-4">Loading products...</div>;
  }

  if (error) {
    return <div className="container mt-4 text-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Products</h3>

      <div className="row">
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))
        )}
      </div>
    </div>
  );
};

export default Products;

// import React, { useEffect, useState } from "react";
// import ProductCard from "./ProductCard";
// import axiosInstance from "./axiosInstance";

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     axiosInstance
//       .get("/products") // backend endpoint
//       .then((res) => {
//         setProducts(res.data);
//       })
//       .catch((err) => {
//         console.error(err);
//         setError("Failed to load products");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <div className="container mt-4 text-center">
//         <span className="spinner-border text-primary"></span>
//         <p className="mt-2">Loading products...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mt-4 text-danger text-center">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-4">
//       <h3 className="mb-4">Products</h3>

//       <div className="row g-3">
//         {products.length === 0 ? (
//           <p className="text-muted">No products available</p>
//         ) : (
//           products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Products;
