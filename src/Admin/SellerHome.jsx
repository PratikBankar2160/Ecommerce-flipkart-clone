import React from 'react';
import { Link } from 'react-router-dom';
import "./SellerHome.css";

const SellerHome = () => {
    return (
        <div className="sellerhub">

            {/* ===== TOP NAVBAR ===== */}
            <header className="sellerhub-navbar">
                <div className="nav-left">
                    <div className="logo">ShopEase Seller Hub</div>

                    <ul className="nav-links">
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/addProduct">Add Product</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/products">All Products</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/orders">Show Orders</Link>
                        </li>
                        
                        {/* <li>Grow</li>
                        <li>Learn</li>
                        <li>Shopsy</li> */}
                    </ul>
                </div>

                <div className="nav-right">
                    <span className="login">Login</span>
                    <button className="start-selling">Start Selling</button>
                </div>
            </header>

            {/* ===== HERO SECTION ===== */}
            <section className="hero">
                <div className="hero-overlay">
                    <h1>Sell Online with ShopEase</h1>
                </div>

                <img
                    className="hero-bg"
                    src="/img/HeroSeller.webp"
                    alt="Sell on Flipkart"
                />
            </section>



            {/* ===== INFO STRIP ===== */}
            <section className="info-strip">
                {[
                    { text: "45 crore+ Flipkart customers", img: "/icons/Customers.svg" },
                    { text: "7* days secure & regular payments", img: "/icons/paymets.svg" },
                    { text: "Low cost of doing business", img: "/icons/lowcost.svg" },
                    { text: "One click Seller Support", img: "/icons/support.svg" },
                    { text: "Access to The Big Billion Days & more", img: "/icons/bigbillion.svg" }
                ].map((item, index) => (
                    <div className="info-item" key={index}>
                        <img
                            src={item.img}
                            alt={item.text}
                            className="info-icon"
                        />
                        <p>{item.text}</p>
                    </div>
                ))}
            </section>


            {/* ===== SUCCESS STORIES ===== */}
            <section className="stories">
                <h2><span>Seller Success</span> Stories</h2>

                <div
                    id="sellerStoriesCarousel"
                    className="carousel slide"
                    data-bs-ride="carousel"
                >
                    {/* indicators */}
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#sellerStoriesCarousel" data-bs-slide-to="0" className="active"></button>
                        <button type="button" data-bs-target="#sellerStoriesCarousel" data-bs-slide-to="1"></button>
                        <button type="button" data-bs-target="#sellerStoriesCarousel" data-bs-slide-to="2"></button>
                    </div>

                    {/* carousel content */}
                    <div className="carousel-inner">

                        {/* Slide 1 */}
                        <div className="carousel-item active">
                            <div className="story-card">
                                <img
                                    src="/seller/seller1.webp"
                                    className="story-img"
                                    alt="Seller"
                                />
                                <div className="story-text">
                                    <h4>Vinay Garg, Activa & Digi Smart</h4>
                                    <p>
                                        When moving from offline to online business, our aim was
                                        to sell 300 orders per month. Today, we sell more than
                                        700 orders per day due to Flipkart growth tools.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Slide 2 */}
                        <div className="carousel-item">
                            <div className="story-card">
                                <img
                                    src="/seller/seller2.webp"
                                    className="story-img"
                                    alt="Seller"
                                />
                                <div className="story-text">
                                    <h4>Ritika Jain, StyleKart</h4>
                                    <p>
                                        Flipkart helped us scale nationwide with fast payments
                                        and seller-friendly policies.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Slide 3 */}
                        <div className="carousel-item">
                            <div className="story-card">
                                <img
                                    src="/seller/seller3.webp"
                                    className="story-img"
                                    alt="Seller"
                                />
                                <div className="story-text">
                                    <h4>Amit Sharma, TechWorld</h4>
                                    <p>
                                        With Flipkart Ads and analytics, our online business
                                        grew faster than expected.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* controls */}
                    <button className="carousel-control-prev" type="button" data-bs-target="#sellerStoriesCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </button>

                    <button className="carousel-control-next" type="button" data-bs-target="#sellerStoriesCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </button>
                </div>
            </section>

        </div>
    );
};



export default SellerHome;
