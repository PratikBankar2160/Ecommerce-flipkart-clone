import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap-icons/font/bootstrap-icons.css";


import { Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Navbar from './Navbar';
// import Products from './Products';
import CategoryNavbar from './CategoryNavbar';
import BrandList from './BrandList';
import ProductList from './ProductList';
import CartPage from './CartPage';
import MyOrders from './MyOrders';
import AdminOrders from './Admin/AdminOrders';
import AddProduct from './Admin/AddProduct';
import SellerHome from './Admin/SellerHome';
import Products from './Products';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div>
      <Navbar />

      <CategoryNavbar onCategorySelect={setSelectedCategory} />

      {/* ✅ conditional rendering */}
      {selectedCategory && (
        <BrandList categoryId={selectedCategory} />
      )}

      <Routes>
        {/* <Route path="/" element={<Products />} /> */}
        <Route path="/" element={<h2>Home Page</h2>} />
        {/* <Route path="/products" element={<Products />} /> */}
        <Route path="/brandProducts" element={<ProductList />} />
        <Route path="/login" element={<h2>Login Page</h2>} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/my-orders" element={<MyOrders />} />

        {/* <Route path="/brands/:categoryId" element={<AddToCart />} /> */}
        <Route path="/brandProducts" element={<ProductList />} />

        {/* ----------------------------------------------- ADMIN ROUTES--------------------------------------------------------------- */}

        <Route path="admin/orders" element={<AdminOrders />} />
        <Route path="admin/addProduct" element={<AddProduct />} />
        <Route path="admin/seller" element={<SellerHome />} />
        <Route path="admin/products" element={<Products />} />

      </Routes>
    </div>
  );
}


export default App;
