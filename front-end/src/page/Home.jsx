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
        desc: "Sự hòa quyện tinh tế giữa sắc hồng dịu dàng và lá bạch đàn thanh nhã, mang đến vẻ đẹp nhẹ nhàng nhưng đầy cuốn hút",
        tag: "Best Seller",
        img: "/images/rose1.jpg"
    },
    {
        name: "Golden Garden Bloom",
        desc: "Thiết kế hoa cao cấp tôn vinh những khoảnh khắc trang trọng và đẳng cấp",
        tag: "Premium",
        img: "/images/rose2.jpg"
    },
    {
        name: "Spring Whisper",
        desc: "Những gam màu pastel dịu nhẹ kết hợp hương thơm tinh khiết, gợi lên cảm giác trong trẻo của mùa xuân",
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
                            Những bó hoa thanh lịch được kết tinh bằng cả tình yêu thương. 
                            Mang vẻ đẹp, hương thơm và cảm xúc trong mỗi khoảnh khắc.
                        </p>

                        <div className="hero-actions">
                            <button className="primary-btn">
                                Đặt Hoa Ngay <ArrowRight size={16} />
                            </button>

                            <button className="ghost-btn" onClick={() => navigate("/bouquets")}>
                                Xem Bộ Sưu Tập
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
                        <h4>Vận Chuyển Hỏa Tốc</h4>
                        <p>Mỗi bó hoa được nâng niu và trao gửi đúng khoảnh khắc</p>
                    </div>

                    <div className="feature-box">
                        <Heart size={24} />
                        <h4>Chế Tác Trọn Tâm Huyết</h4>
                        <p>Từng thiết kế là sự kết hợp của cảm xúc và nghệ thuật thủ công</p>
                    </div>

                    <div className="feature-box">
                        <Sparkles size={24} />
                        <h4>Thẩm Mỹ Sang Trọng</h4>
                        <p>Phong cách thanh lịch với dấu ấn tinh tế trong từng chi tiết</p>
                    </div>
                </div>
            </section>

            {/* Products */}
            <section className="products">
                <div className="container">
                    <div className="section-head">
                        <p>BỘ SƯU TẬP</p>
                        <h2>Những Bó Hoa Được Yêu Thích</h2>
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
                                        Khám Phá Bộ Sưu Tập
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