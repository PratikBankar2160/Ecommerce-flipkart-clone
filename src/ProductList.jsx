import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BrandList from "./BrandList";
import ProductCard from "./ProductCard";
import axiosInstance from "./axiosInstance";

const ProductList = () => {
  const location = useLocation();
  const { categoryId, brand } = location.state || {};

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!categoryId || !brand) return;

    setLoading(true);
    axiosInstance
      .get(`/products/category/${categoryId}/brand/${brand}`)
      .then((res) => setProducts(res.data))
      .catch(() => alert("Error loading products"))
      .finally(() => setLoading(false));
  }, [categoryId, brand]);

  if (!categoryId || !brand) {
    return (
      <div className="container mt-4">
        <h5>Please select a category and brand</h5>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-4">
      <div className="row">

        {/* ✅ LEFT SIDEBAR */}
        <div className="col-md-3">
          <BrandList categoryId={categoryId} />
        </div>

        {/* ✅ RIGHT PRODUCTS */}
        <div className="col-md-9">
          <h4 className="mb-3">Products - {brand}</h4>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="row g-3">
              {products.map((p) => (
                <div className="col-md-6" key={p.id}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductList;
