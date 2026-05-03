import "../css/home.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    Flower2,
    ShoppingBag,
    Heart,
    Star,
    Truck,
    Sparkles,
    LogOut,
    User,
    ArrowRight
} from "lucide-react";

const PETALS = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    dur: `${8 + Math.random() * 6}s`,
    size: `${10 + Math.random() * 10}px`
}));

const products = [
    {
        name: "Desert Rose Classic",
        desc: "Soft blush roses with eucalyptus leaves",
        tag: "Best Seller",
        img: "/images/rose1.jpg"
    },
    {
        name: "Golden Garden Bloom",
        desc: "Luxury bouquet for elegant moments",
        tag: "Premium",
        img: "/images/rose2.jpg"
    },
    {
        name: "Spring Whisper",
        desc: "Fresh pastel flowers, gentle fragrance",
        tag: "New",
        img: "/images/rose3.jpg"
    }
];

export default function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem("user");
        if (data) setUser(JSON.parse(data));
    }, []);

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="home-page">

            <Header />

            {/* Falling petals */}
            {PETALS.map((p) => (
                <span
                    key={p.id}
                    className="petal"
                    style={{
                        left: p.left,
                        animationDelay: p.delay,
                        animationDuration: p.dur,
                        width: p.size,
                        height: p.size
                    }}
                />
            ))}


            {/* Hero */}
            <section className="hero">
                <div className="container hero-inner">
                    <div className="hero-left">
                        <p className="mini-title">FLOWER BOUTIQUE</p>

                        <h1>
                            Fresh Blooms <br />
                            for Every Moment
                        </h1>

                        <p className="hero-desc">
                            Elegant flowers crafted with love. Bring beauty,
                            fragrance and emotion into every occasion.
                        </p>

                        <div className="hero-actions">
                            <button className="primary-btn">
                                Shop Now <ArrowRight size={16} />
                            </button>

                            <button className="ghost-btn">
                                View Collection
                            </button>
                        </div>

                        <div className="stats">
                            <div>
                                <h3>5K+</h3>
                                <span>Happy Clients</span>
                            </div>
                            <div>
                                <h3>120+</h3>
                                <span>Bouquet Types</span>
                            </div>
                            <div>
                                <h3>24/7</h3>
                                <span>Delivery</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero-right">
                        <div className="flower-card">
                            <img
                                src="/images/bouquet.jpg"
                                alt="Flower Bouquet"
                                className="hero-image"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="features">
                <div className="container features-inner">
                    <div className="feature-box">
                        <Truck size={24} />
                        <h4>Fast Delivery</h4>
                        <p>Fresh flowers delivered same day</p>
                    </div>

                    <div className="feature-box">
                        <Heart size={24} />
                        <h4>Made with Love</h4>
                        <p>Handcrafted premium bouquets</p>
                    </div>

                    <div className="feature-box">
                        <Sparkles size={24} />
                        <h4>Luxury Style</h4>
                        <p>Elegant wrapping & design</p>
                    </div>
                </div>
            </section>

            {/* Products */}
            <section className="products">
                <div className="container">
                    <div className="section-head">
                        <p>OUR COLLECTION</p>
                        <h2>Popular Bouquets</h2>
                    </div>

                    <div className="product-grid">
                        {products.map((item, i) => (
                            <div className="product-card" key={i}>
                                <div className="product-img-wrap">
                                    <img src={item.img} alt={item.name} />
                                    <span className="tag">{item.tag}</span>
                                </div>

                                <div className="product-body">
                                    <h3>{item.name}</h3>
                                    <p className="product-desc">{item.desc}</p>

                                    <button className="view-collection-btn">
                                        View Collection
                                        <span className="arrow-circle">
                                            <ArrowRight size={14} />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />

        </div>
    );
}