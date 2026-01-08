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
// import SellerDashboard from "./pages/SellerDashboard";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <BrowserRouter>
      <Navbar />
      <CategoryNavbar onCategorySelect={setSelectedCategory} />

      {/* ✅ conditional rendering */}
      {selectedCategory && (
        <BrandList categoryId={selectedCategory} />
      )}

      <Routes>

        {/* 🌍 Public routes */}
        <Route path="/" element={<h2>Home Page</h2>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/brandProducts" element={<ProductList />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/my-orders" element={<MyOrders />} />

        {/* 🔒 SELLER protected route */}
        <Route
          path="admin/seller"
          element={
            <ProtectedRoute role="SELLER">
              <SellerHome />
            </ProtectedRoute>
          }
        />

        {/* 🔒 ADMIN / SELLER routes (optional protect later) */}
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/addProduct" element={<AddProduct />} />
        <Route path="/admin/seller" element={<SellerHome />} />
        <Route path="/admin/products" element={<Products />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
