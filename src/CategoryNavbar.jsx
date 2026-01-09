import React, { useEffect, useState } from "react";
import "./CategoryNavbar.css";
import axiosInstance from "./axiosInstance";
// ⬆️ adjust path if needed (../api/axiosInstance)

const CategoryNavbar = ({ onCategorySelect }) => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosInstance
            .get("/categories")
            .then(res => {
                setCategories(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                alert("Error fetching categories");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="category-navbar">Loading...</div>;
    }

    return (
        <div className="category-navbar">
            {categories.length === 0 ? (
                <p className="empty-text">No categories found</p>
            ) : (
                categories.map((cat) => (
                    <div
                        key={cat.id}
                        className="category-item"
                        onClick={() => onCategorySelect(cat.id)}
                    >
                        {cat.name}
                    </div>
                ))
            )}
        </div>
    );
};

export default CategoryNavbar;
