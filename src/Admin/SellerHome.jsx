import "./SellerHome.css";

const SellerHome = () => {
    return (
        <div className="sellerhub">

            {/* ===== TOP NAVBAR ===== */}
            <header className="sellerhub-navbar">
                <div className="nav-left">
                    <div className="logo">Flipkart Seller Hub</div>

                    <ul className="nav-links">
                        <li>Sell Online</li>
                        <li>Fees and Commission</li>
                        <li>Grow</li>
                        <li>Learn</li>
                        <li>Shopsy</li>
                    </ul>
                </div>

                <div className="nav-right">
                    <span className="login">Login</span>
                    <button className="start-selling">Start Selling</button>
                </div>
            </header>

            {/* ===== HERO SECTION ===== */}
            <section className="hero">
    <div className="hero-text">
        <h1>Sell Online with Flipkart</h1>
    </div>

    <div className="hero-image">
        <img
            src="https://static-assets-web.flixcart.com/fk-sp-static/images/prelogin/banner/Desktop_sell.webp"
            alt="Sell on Flipkart"
        />
    </div>
</section>


            {/* ===== INFO STRIP ===== */}
            <section className="info-strip">
                {[
                    "45 crore+ Flipkart customers",
                    "7* days secure & regular payments",
                    "Low cost of doing business",
                    "One click Seller Support",
                    "Access to The Big Billion Days & more"
                ].map((text, index) => (
                    <div className="info-item" key={index}>
                        <div className="icon-placeholder"></div>
                        <p>{text}</p>
                    </div>
                ))}
            </section>

            {/* ===== SUCCESS STORIES ===== */}
            <section className="stories">
                <h2>
                    <span>Seller Success</span> Stories
                </h2>

                <div className="story-card">
                    <button className="arrow left">‹</button>

                    <div className="story-content">
                        <div className="profile-placeholder"></div>

                        <div className="story-text">
                            <h4>Vinay Garg, Activa & Digi Smart</h4>
                            <p>
                                When moving from offline to online business, our aim was to sell
                                300 orders per month. Today, we sell more than 700 orders per day
                                and this has been possible because of the growth features on the
                                Flipkart seller dashboard, Flipkart Ads and regular payments.
                            </p>
                        </div>
                    </div>

                    <button className="arrow right">›</button>
                </div>

                {/* dots */}
                <div className="dots">
                    <span></span>
                    <span className="active"></span>
                    <span></span>
                </div>
            </section>
        </div>
    );
};



export default SellerHome;
