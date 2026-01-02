import React from "react";

const CartItem = ({ item }) => {
  return (
    <div className="card mb-3 p-3">
      <div className="row align-items-center">

        <div className="col-md-6">
          <h6>{item.productName}</h6>
          <p className="text-muted small">Product ID: {item.productId}</p>
        </div>

        <div className="col-md-2">
          Qty: <b>{item.quantity}</b>
        </div>

        <div className="col-md-4 text-end">
          <h6>₹{item.subTotal}</h6>
        </div>

      </div>
    </div>
  );
};

export default CartItem;
