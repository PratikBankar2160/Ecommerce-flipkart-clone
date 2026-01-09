import React, { useEffect, useState } from "react";
import BrandList from "./BrandList";
import ProductCard from "./ProductCard";
import axiosInstance from "./axiosInstance";

const CategoryProducts = ({ categoryId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!categoryId) return;

    axiosInstance
      .get(`/products/category/${categoryId}`)
      .then((res) => setProducts(res.data))
      .catch(() => alert("Failed to load products"));
  }, [categoryId]);

  return (
    <div className="container-fluid mt-4">
      <div className="row">

        {/* ✅ LEFT SIDE – BRAND LIST */}
        <div className="col-md-3">
          <BrandList categoryId={categoryId} />
        </div>

        {/* ✅ RIGHT SIDE – PRODUCTS */}
        <div className="col-md-9">
          {products.length === 0 ? (
            <p>No products found</p>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default CategoryProducts;
