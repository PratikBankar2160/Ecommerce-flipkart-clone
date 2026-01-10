import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import axiosInstance from "./axiosInstance";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const addToCart = () => {
    const userId = JSON.parse(localStorage.getItem("userId")) || 3;

    axiosInstance
      .post("/cart/add", {
        userId,
        productId: product.id,
        quantity: 1,
      })
      .then(() => {
        navigate("/cart");
      })
      .catch(() => alert("Failed to add product"));
  };

  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100
        )
      : 0;

  return (
    <div className="product-card d-flex p-3 mb-3">

      {/* Product Image */}
      <div className="product-img">
  <img
  src="/products/biba.webp"
  alt={product.name}
  className="product-img-hover"
/>

</div>


      {/* Product Details */}
      <div className="product-details flex-grow-1 ms-4">
        <h5 className="product-title">{product.name}</h5>

        <div className="rating mb-2">
          <span className="badge bg-success me-2">4.6 ★</span>
          <span className="text-muted small">{product.brand}</span>
        </div>

        <ul className="product-specs">
          <li>{product.description}</li>
        </ul>

        <button className="btn btn-primary mt-auto" onClick={addToCart}>
          Add to Cart
        </button>
      </div>

      {/* Price Section */}
      <div className="product-price text-end">
        <h4 className="fw-bold">₹{product.price}</h4>

        {product.oldPrice && (
          <div>
            <span className="text-muted text-decoration-line-through">
              ₹{product.oldPrice}
            </span>
            {discount > 0 && (
              <span className="text-success ms-2">
                {discount}% off
              </span>
            )}
          </div>
        )}

        <p className="text-danger small mt-1">
          Only {product.quantity} left
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
