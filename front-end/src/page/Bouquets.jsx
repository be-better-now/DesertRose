import "../css/bouquets.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ArrowRight } from "lucide-react";

const PETALS = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    dur: `${8 + Math.random() * 6}s`,
    size: `${10 + Math.random() * 10}px`
}));

const collections = [
    {
        title: "Bó Hoa Tươi",
        desc: "Bouquet tươi cho mọi dịp: sinh nhật, kỷ niệm, chúc mừng.",
        tag: "Best Seller",
        img: "images/bouquets1.jpg"
    },
    {
        title: "Hoa Để Bàn",
        desc: "Trang trí góc làm việc/nhà cửa, tinh tế và nhẹ nhàng.",
        tag: "Decor",
        img: "images/bouquets2.jpg"
    },
    {
        title: "Hộp Hoa",
        desc: "Thiết kế sang trọng, phù hợp quà tặng cao cấp.",
        tag: "Premium",
        img: "images/bouquets3.jpg"
    },
    {
        title: "Giỏ Hoa",
        desc: "Sang trọng, đầy đặn, dễ trưng bày và biếu tặng.",
        tag: "Gift",
        img: "images/bouquets4.jpg"
    },
    {
        title: "Lẵng Hoa",
        desc: "Sự kiện, khai trương, chúc mừng — nổi bật và trang trọng.",
        tag: "Event",
        img: "images/bouquets5.jpg"
    },
    {
        title: "Hoa Gấu Bông",
        desc: "Dễ thương, phù hợp tặng bạn bè/người thương.",
        tag: "Cute",
        img: "images/bouquets6.jpg"
    },
    {
        title: "Hoa Tiền",
        desc: "Món quà độc đáo và ấn tượng cho dịp đặc biệt.",
        tag: "Trending",
        img: "images/bouquets7.jpg"
    },
    {
        title: "Hoa Sáp",
        desc: "Bền đẹp, giữ được lâu, phong cách thanh lịch.",
        tag: "Long-lasting",
        img: "images/bouquets8.jpg"
    },
    {
        title: "Hoa Bánh Kẹo",
        desc: "Set quà độc lạ: kết hợp hoa & edible decor.",
        tag: "Special",
        img: "images/bouquets9.jpg"
    }
];

export default function Bouquets() {
    return (
        <div className="bouquets-page">
            <Header />

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

            <section className="bouquets-hero">
                <p className="bouquets-mini">OUR COLLECTION</p>
                <h1>Browse Bouquets</h1>
                <p className="bouquets-desc">
                    Chọn theo bộ sưu tập — kiểu dáng, dịp tặng và phong cách.
                </p>
            </section>

            <section className="bouquets-grid-wrap">
                <div className="container">
                    <div className="bouquets-grid">
                        {collections.map((c) => (
                            <article className="product-card" key={c.title}>
                                <div className="product-img-wrap">
                                    <img src={c.img} alt={c.title} />
                                    <span className="tag">{c.tag}</span>
                                </div>

                                <div className="product-body">
                                    <h3>{c.title}</h3>
                                    <p className="product-desc">{c.desc}</p>

                                    <button className="view-collection-btn">
                                        Xem bộ sưu tập
                                        <span className="arrow-circle">
                                            <ArrowRight size={14} />
                                        </span>
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}