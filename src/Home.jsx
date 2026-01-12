import "./Home.css";
import { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";
import { useNavigate } from "react-router-dom";
import BrandList from "./BrandList";

const Home = ({selectedCategory}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/categories/home")
      .then(res => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h3 style={{ textAlign: "center" }}>Loading...</h3>;
  }

  return (
    <div className="home-layout">
      {selectedCategory && (
        <BrandList categoryId={selectedCategory} />
      )}

     <div className="home-page">
      <h2 className="home-title">Shop by Category</h2>

      <div className="category-grid">
        {categories.map(category => (
          <div
            key={category.id}
            className="category-card"
            onClick={() => navigate(`/category/${category.id}`)}
          >
            {/* Category Info */}
            <h4 className="category-name">{category.name}</h4>
            <p className="category-desc">{category.description}</p>

            {/* Product Preview (4 items) */}
            <div className="product-preview">
              {category.products.length > 0 ? (
                category.products.map(product => (
                  <div
                    key={product.id}
                    className="product-mini"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${product.id}`);
                    }}
                  >
                    <img
  src="/products/biba.webp"
  alt={product.name}
  className="product-img-hover"
/>
                    <span className="product-name">
                      {product.name}
                    </span>
                    <span className="product-price">
                      ₹{product.price}
                    </span>
                  </div>
                ))
              ) : (
                <p className="no-products">No products</p>
              )}
            </div>

            <span className="view-btn">View All →</span>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Home;