import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminOrders.css";
import axiosInstance from "../axiosInstance";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState("ALL");

    const fetchOrders = () => {
        axiosInstance
            .get("/orders/admin")
            .then(res => setOrders(res.data))
            .catch(() => alert("Failed to load orders"));
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = (orderId, status) => {
        axiosInstance
            .put(
                `/orders/${orderId}/status`,
                null,
                { params: { status } }
            )
            .then(() => {
                alert("Order status updated");
                fetchOrders();
            })
            .catch(err => {
                alert(err.response?.data || "Update failed");
            });
    };

    // 🔎 Filter logic
    const filteredOrders =
        filterStatus === "ALL"
            ? orders
            : orders.filter(order => order.status === filterStatus);

    return (
        <div className="container mt-4">
            <h3 className="fw-bold mb-3">
                <i className="bi bi-box-seam me-2 text-primary"></i>
                Admin Orders
            </h3>

            {/* 🔘 FILTER BUTTONS */}
            <div className="order-filters mb-4">
                {[
                    "ALL",
                    "PLACED",
                    "PAID",
                    "SHIPPED",
                    "OUT_FOR_DELIVERY",
                    "DELIVERED",
                    "CANCELLED"
                ].map(status => (
                    <button
                        key={status}
                        className={`filter-btn ${
                            filterStatus === status ? "active" : ""
                        }`}
                        onClick={() => setFilterStatus(status)}
                    >
                        {status.replaceAll("_", " ")}
                    </button>
                ))}
            </div>

            {/* 📦 ORDERS */}
            {filteredOrders.length === 0 ? (
                <p className="text-muted">No orders found</p>
            ) : (
                filteredOrders.map(order => (
                    <div className="admin-order-card" key={order.id}>

                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <h6>Order #{order.id}</h6>

                            <select
                                className="status-dropdown"
                                value={order.status}
                                disabled={
                                    order.status === "CANCELLED" ||
                                    order.status === "DELIVERED"
                                }
                                onChange={(e) =>
                                    updateStatus(order.id, e.target.value)
                                }
                            >
                                <option value="PLACED">PLACED</option>
                                <option value="PAID">PAID</option>
                                <option value="SHIPPED">SHIPPED</option>
                                <option value="OUT_FOR_DELIVERY">
                                    OUT FOR DELIVERY
                                </option>
                                <option value="DELIVERED">DELIVERED</option>
                            </select>
                        </div>

                        <p className="text-muted mb-1">
                            User ID: {order.user?.id}
                        </p>

                        {order.items.map((item, index) => (
                            <div
                                className="d-flex justify-content-between small mb-1"
                                key={index}
                            >
                                <span>{item.product.name}</span>
                                <span>
                                    {item.quantity} × ₹{item.price}
                                </span>
                            </div>
                        ))}

                        <div className="d-flex justify-content-between fw-semibold mt-2">
                            <span>Total</span>
                            <span>₹{order.totalAmount}</span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default AdminOrders;
