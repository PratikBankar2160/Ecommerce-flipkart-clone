import React, { useEffect, useState } from "react";
import "./BrandList.css";
import axios from "axios";

const BrandList = ({ categoryId }) => {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        if (!categoryId) return;

        axios.get(`http://localhost:8080/products/brands/${categoryId}`)
            .then((res) => {
                setBrands(res.data)
            })
            .catch(() => alert("Error fetching brands"));
    }, [categoryId]);

    return (
        <div>
        <div className="col-md-3">
            <div className="brand-sidebar p-3">
                <h5 className="mb-3 fw-bold border-bottom pb-2">
                    Brands
                </h5>

                <ul className="nav flex-column brand-list">
                    {brands.map((brand, index) => (
                        <li className="nav-item" key={index}>
                            <span className="nav-link brand-item">
                                {brand}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </div>


    );
};

export default BrandList;
