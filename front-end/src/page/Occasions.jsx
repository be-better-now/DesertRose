import "../css/occasions.css";
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

const occasions = [
    {
        title: "Hoa Sinh Nhật",
        desc: "Những bó hoa rực rỡ mang lại niềm vui và bất ngờ trong ngày đặc biệt.",
        tag: "Birthday",
        img: "images/occasions1.jpg"
    },
    {
        title: "Hoa Cưới",
        desc: "Tinh tế và lãng mạn, hoàn hảo cho ngày trọng đại của đôi uyên ương.",
        tag: "Wedding",
        img: "images/occasions2.jpg"
    },
    {
        title: "Hoa Khai Trương",
        desc: "Mang ý nghĩa may mắn, tài lộc và khởi đầu thuận lợi.",
        tag: "Opening",
        img: "images/occasions3.jpg"
    },
    {
        title: "Hoa Tốt Nghiệp",
        desc: "Chúc mừng thành công và đánh dấu cột mốc quan trọng.",
        tag: "Graduation",
        img: "images/occasions4.jpg"
    },
    {
        title: "Hoa Chia Buồn",
        desc: "Trang trọng và sâu lắng để gửi lời tiếc thương chân thành.",
        tag: "Sympathy",
        img: "images/occasions5.jpg"
    },
    {
        title: "Hoa Chúc Mừng",
        desc: "Tươi sáng và nổi bật để lan tỏa niềm vui và thành công.",
        tag: "Congrats",
        img: "images/occasions6.jpg"
    }
];

export default function Occasions() {
    return (
        <div className="occasions-page">
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

            <section className="occasions-hero">
                <p className="occasions-mini">BY OCCASIONS</p>
                <h1>Shop by Occasion</h1>
                <p className="occasions-desc">
                    Chọn hoa theo từng dịp — dễ dàng, tinh tế và đúng cảm xúc.
                </p>
            </section>

            <section className="occasions-grid-wrap">
                <div className="container">
                    <div className="occasions-grid">
                        {occasions.map((o) => (
                            <article className="product-card" key={o.title}>
                                <div className="product-img-wrap">
                                    <img src={o.img} alt={o.title} />
                                    <span className="tag">{o.tag}</span>
                                </div>

                                <div className="product-body">
                                    <h3>{o.title}</h3>
                                    <p className="product-desc">{o.desc}</p>

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