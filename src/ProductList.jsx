import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import BrandList from "./BrandList";
import ProductCard from "./ProductCard";
import axiosInstance from "./axiosInstance";

const ProductList = () => {
  const location = useLocation();
  const params = useParams();

  const categoryId = params.categoryId || location.state?.categoryId;
  const brand = location.state?.brand;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!categoryId) return;

    setLoading(true);

    const apiUrl = brand
      ? `/products/category/${categoryId}/brand/${brand}`
      : `/products/category/${categoryId}`;

    axiosInstance
      .get(apiUrl)
      .then((res) => setProducts(res.data))
      .catch(() => alert("Error loading products"))
      .finally(() => setLoading(false));
  }, [categoryId, brand]);

  if (!categoryId) {
    return (
      <div className="container mt-4">
        <h5>Please select a category</h5>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-4">
      <div className="row">

        {/* ✅ LEFT SIDEBAR (UNCHANGED) */}
        {/* <div className="col-md-3">
          <BrandList categoryId={categoryId} />
        </div> */}

        {/* ✅ RIGHT PRODUCTS (OLD STYLE) */}
        <div className="col-md-12">
          <h4 className="mb-3">
            Products {brand && `- ${brand}`}
          </h4>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="row g-3">
              {products.map((p) => (
                <div className="col-md-6" key={p.id}>
                  {/* ⬅️ SAME AS BEFORE */}
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
