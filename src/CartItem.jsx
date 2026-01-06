import React, { useState } from "react";
import axios from "axios";
import "./CartItem.css"

const CartItem = ({ item, setCart }) => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [loading, setLoading] = useState(false);

  // Update quantity
  const updateQty = (itemId, change) => {
    if (loading) return;

    setLoading(true);

    axios
      .put(`http://localhost:8080/cart/quantity/${itemId}`, null, {
        params: { change, userId },
      })
      .then((res) => setCart(res.data))
      .catch(() => alert("Failed to update quantity"))
      .finally(() => setLoading(false));
  };

  // Remove item
  const removeItem = (itemId) => {
    axios
      .delete(`http://localhost:8080/cart/remove/${itemId}`, {
        params: { userId },
      })
      .then(() =>
        setCart((prevCart) => ({
          ...prevCart,
          items: prevCart.items.filter((i) => i.itemId !== itemId),
          totalAmount: prevCart.items
            .filter((i) => i.itemId !== itemId)
            .reduce((sum, i) => sum + i.subTotal, 0),
        }))
      )
      .catch(() => alert("Failed to remove item"));
  };


  return (
    <div className="card mb-3 p-3 shadow-sm rounded-3">
      <div className="row align-items-center">

        {/* Product Info */}
        <div className="col-md-6 d-flex align-items-center gap-3">


          {/* Product Image */}
          <img
            src={item.imageUrl}
            alt={item.productName}
            className="cart-product-img"
          />


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
              disabled={item.quantity === 1}
              onClick={() => updateQty(item.itemId, -1)}
            >
              <i className="bi bi-dash"></i>
            </button>

            <span className="mx-2 fw-bold">{item.quantity}</span>

            <button
              className="btn btn-outline-secondary btn-sm"
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
          >
            <i className="bi bi-trash-fill"></i>
          </button>
        </div>

      </div>
    </div>
  );
};

export default CartItem;
