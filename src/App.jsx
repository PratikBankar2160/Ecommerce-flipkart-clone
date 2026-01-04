import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap-icons/font/bootstrap-icons.css";

import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./Navbar";
import CategoryNavbar from "./CategoryNavbar";
import BrandList from "./BrandList";
import ProductList from "./ProductList";
import CartPage from "./CartPage";
import MyOrders from "./MyOrders";

// import AdminLayout from "./Admin/AdminLayout";
import AdminOrders from "./Admin/AdminOrders";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <Routes>

      {/* ================= USER ROUTES ================= */}
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <CategoryNavbar onCategorySelect={setSelectedCategory} />
            {selectedCategory && (
              <BrandList categoryId={selectedCategory} />
            )}
          </>
        }
      >
        <Route index element={<h2 className="text-center mt-4">Home</h2>} />
        <Route path="brandProducts" element={<ProductList />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="my-orders" element={<MyOrders />} />
      </Route>

      {/* ================= ADMIN ROUTES ================= */}
      {/* ================= ADMIN ROUTES ================= */}
      <Route >
        <Route path="/admin"/>
        <Route path="orders" element={<AdminOrders />} />
      </Route>

    </Routes>
  );
}

export default App;
