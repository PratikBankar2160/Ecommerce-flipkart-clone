import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap-icons/font/bootstrap-icons.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';

import Navbar from './Navbar';
import CategoryNavbar from './CategoryNavbar';
import BrandList from './BrandList';
import ProductList from './ProductList';
import CartPage from './CartPage';
import MyOrders from './MyOrders';

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
  const [selectedCategory, setSelectedCategory] = useState(null);

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <BrowserRouter>

      {/* ✅ Show Navbar ONLY if logged in */}
      {isLoggedIn && <Navbar />}
      {isLoggedIn && <CategoryNavbar onCategorySelect={setSelectedCategory} />}

      {isLoggedIn && selectedCategory && (
        <BrandList categoryId={selectedCategory} />
      )}

      <Routes>

        {/* 🌍 PUBLIC ROUTES */}
        <Route path="/" element={<h2>Home Page</h2>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* 🛒 USER ROUTES */}
        <Route path="/brandProducts" element={<ProductList />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/my-orders" element={<MyOrders />} />

        {/* 🔒 SELLER ROUTES */}
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
    </BrowserRouter>
  );
}

export default App;
