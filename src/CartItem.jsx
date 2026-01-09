import React, { useState } from "react";
import "./CartItem.css";
import axiosInstance from "./axiosInstance";

const CartItem = ({ item, setCart }) => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [loading, setLoading] = useState(false);

  // Update quantity
  const updateQty = (itemId, change) => {
    if (loading) return;

    setLoading(true);

    axiosInstance
      .put(`/cart/quantity/${itemId}`, null, {
        params: { change, userId },
      })
      .then((res) => setCart(res.data))
      .catch(() => alert("Failed to update quantity"))
      .finally(() => setLoading(false));
  };

  // Remove item
  const removeItem = (itemId) => {
    axiosInstance
      .delete(`/cart/remove/${itemId}`, {
        params: { userId },
      })
      .then(() =>
        setCart((prevCart) => {
          const updatedItems = prevCart.items.filter(
            (i) => i.itemId !== itemId
          );

          return {
            ...prevCart,
            items: updatedItems,
            totalAmount: updatedItems.reduce(
              (sum, i) => sum + i.subTotal,
              0
            ),
          };
        })
      )
      .catch(() => alert("Failed to remove item"));
  };

  return (
    <div className="card mb-3 p-3 shadow-sm rounded-3">
      <div className="row align-items-center">

        {/* Product Info */}
        <div className="col-md-6 d-flex align-items-center gap-3">

          {/* ✅ Product Image */}
          {item.image && (
            <img
              src={`http://localhost:8080${item.image}`}
              alt={item.productName}
              className="cart-product-img"
              onError={(e) => {
                e.target.src = "/no-image.png";
              }}
            />
          )}

          <div>
            <h6 className="mb-1">{item.productName}</h6>
            <p className="text-muted small mb-0">
              Product ID: {item.productId}
            </p>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="col-md-2">
          <div className="d-flex align-items-center justify-content-center">
            <button
              className="btn btn-outline-secondary btn-sm"
              disabled={item.quantity === 1 || loading}
              onClick={() => updateQty(item.itemId, -1)}
            >
              <i className="bi bi-dash"></i>
            </button>

            <span className="mx-2 fw-bold">{item.quantity}</span>

            <button
              className="btn btn-outline-secondary btn-sm"
              disabled={loading}
              onClick={() => updateQty(item.itemId, 1)}
            >
              <i className="bi bi-plus"></i>
            </button>
          </div>
        </div>

        {/* Price + Remove */}
        <div className="col-md-4 text-end d-flex flex-column align-items-end">
          <h6 className="mb-2">₹{item.subTotal}</h6>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => removeItem(item.itemId)}
            disabled={loading}
          >
            <i className="bi bi-trash-fill"></i>
          </button>
        </div>

      </div>
    </div>
  );
};

export default CartItem;
