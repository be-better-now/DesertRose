import "../css/about.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Flower2, Heart, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";



const PETALS = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: Math.random() * 100 + "vw",
    delay: Math.random() * 5 + "s",
    dur: 6 + Math.random() * 6 + "s",
    size: 8 + Math.random() * 12 + "px"
}));

export default function AboutUs() {
    const navigate = useNavigate();


    return (
        <div className="about-page">

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


            {/* HERO */}
            <section className="about-hero">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Our Story
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    Desert Rose is more than just flowers — it's a story of elegance,
                    emotion, and timeless beauty.
                </motion.p>
            </section>

            {/* STORY */}
            <section className="about-section">
                <div className="about-content">
                    <motion.img
                        src="/images/bouquet.jpg"
                        alt="about"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    />

                    <motion.div
                        className="text"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2>Who We Are</h2>
                        <p>
                            We craft premium flower arrangements designed to express love,
                            appreciation, and unforgettable moments. Each bouquet is carefully
                            curated with passion and artistic vision.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* VALUES */}
            <section className="about-values">
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Our Values
                </motion.h2>

                <div className="values-grid">
                    <motion.div
                        className="card"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Flower2 size={28} />
                        <h3>Elegance</h3>
                        <p>Every design is crafted with refined aesthetics.</p>
                    </motion.div>

                    <motion.div
                        className="card"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Heart size={28} />
                        <h3>Passion</h3>
                        <p>We put heart into every bouquet we create.</p>
                    </motion.div>

                    <motion.div
                        className="card"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Sparkles size={28} />
                        <h3>Creativity</h3>
                        <p>Unique designs that stand out beautifully.</p>
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="about-cta">
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                >
                    Let us be part of your special moments
                </motion.h2>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => navigate("/bouquets")}
                >
                    Explore Bouquets
                </motion.button>
            </section>

            <Footer />
        </div>
    );
}