import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap-icons/font/bootstrap-icons.css";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from 'react';

import Navbar from './Navbar';
import CategoryNavbar from './CategoryNavbar';
import ProductList from './ProductList';
import CartPage from './CartPage';
import MyOrders from './MyOrders';
import Home from './Home';

// Admin / Seller
import AdminOrders from './Admin/AdminOrders';
import AddProduct from './Admin/AddProduct';
import SellerHome from './Admin/SellerHome';
import Products from './Products';

// Auth
import Register from './Register';
import Login from './Login';

// 🔒 Protected
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

function MainLayout() {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const isLoggedIn = !!localStorage.getItem("token");

  // ❌ Pages where navbar should NOT appear
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname.startsWith("/admin");

  return (
    <>
      {/* ✅ NAVBARS */}
      {isLoggedIn && !hideNavbar && <Navbar />}
      {isLoggedIn && !hideNavbar && (
        <CategoryNavbar onCategorySelect={setSelectedCategory} />
      )}

      <Routes>
        {/* 🌍 PUBLIC */}
        <Route
          path="/"
          element={<Home selectedCategory={selectedCategory} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* 🛒 PRODUCTS */}
        <Route path="/category/:categoryId" element={<ProductList />} />
        <Route path="/brandProducts" element={<ProductList />} />

        <Route path="/cart" element={<CartPage />} />
        <Route path="/my-orders" element={<MyOrders />} />

        {/* 🔒 SELLER */}
        <Route
          path="/admin/seller"
          element={
            <ProtectedRoute role="SELLER">
              <SellerHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/addProduct"
          element={
            <ProtectedRoute role="SELLER">
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute role="SELLER">
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute role="SELLER">
              <AdminOrders />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
