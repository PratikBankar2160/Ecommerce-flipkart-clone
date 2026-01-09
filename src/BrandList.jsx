import React, { useEffect, useState } from "react";
import "./BrandList.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";

const BrandList = ({ categoryId }) => {
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!categoryId) return;

    axiosInstance
      .get(`/products/brands/${categoryId}`)
      .then((res) => setBrands(res.data))
      .catch(() => alert("Error fetching brands"));
  }, [categoryId]);

  const handleBrandClick = (brand) => {
    navigate("/brandProducts", {
      state: { categoryId, brand },
    });
  };

  return (
    <div className="brand-sidebar">
      <h5 className="fw-bold mb-3 border-bottom pb-2">Brands</h5>

      <ul className="brand-list">
        {brands.map((brand, index) => (
          <li
            key={index}
            className="brand-item"
            onClick={() => handleBrandClick(brand)}
          >
            {brand}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandList;
