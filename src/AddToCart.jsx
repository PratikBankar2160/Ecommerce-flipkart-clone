import React from 'react'
import { useParams } from 'react-router-dom'

export default function AddToCart() {
    let ProductId = useParams();

    const addToCart = (productId) => {
        axios.post("http://localhost:8080/cart/add", {
            productId,
            quantity: 1
        })
            .then(() => alert("Added to cart"))
            .catch(() => alert("Error adding to cart"));
    };


    return (
        <div>
            <h1>AddToCart</h1>
            <h4>{console.log(ProductId)}</h4>
        </div>
    )
}
