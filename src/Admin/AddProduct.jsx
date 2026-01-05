import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddProduct.css";

const AddProduct = () => {
    const [categories, setCategories] = useState([]);

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        oldPrice: "",
        quantity: "",
        brand: "",
        categoryId: ""
    });

    // 🔄 Load categories
    useEffect(() => {
        axios
            .get("http://localhost:8080/categories")
            .then(res => setCategories(res.data))
            .catch(() => alert("Failed to load categories"));
    }, []);

    // 🖊 Input handler
    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    // 🚀 Submit (JSON request)
    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            name: product.name,
            description: product.description,
            price: Number(product.price),
            oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
            quantity: Number(product.quantity),
            brand: product.brand,
            category: {
                id: Number(product.categoryId)
            }
        };


        axios
            .post("http://localhost:8080/products", payload)
            .then(() => {
                alert("Product added successfully");

                setProduct({
                    name: "",
                    description: "",
                    price: "",
                    oldPrice: "",
                    quantity: "",
                    brand: "",
                    categoryId: ""
                });
            })
            .catch(err => {
                console.error(err);
                alert(err.response?.data || "Failed to add product");
            });
    };

    return (
        <div className="add-product-page">
            <form className="product-form" onSubmit={handleSubmit}>
                <h3>Add New Product</h3>

                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Product Description"
                    rows="3"
                    value={product.description}
                    onChange={handleChange}
                    required
                />

                <div className="row">
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="oldPrice"
                        placeholder="MRP / Old Price"
                        value={product.oldPrice}
                        onChange={handleChange}
                    />
                </div>

                <div className="row">
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="brand"
                        placeholder="Brand"
                        value={product.brand}
                        onChange={handleChange}
                        required
                    />
                </div>

                <select
                    name="categoryId"
                    value={product.categoryId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
