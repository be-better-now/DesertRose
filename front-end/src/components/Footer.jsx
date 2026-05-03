import "../css/footer.css";
import { Flower2, Mail, MapPin, Phone, Sparkles } from "lucide-react";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="site-footer" aria-labelledby="footer-title">
            <div className="footer-inner">
                <div className="footer-top">
                    <div className="footer-brand">
                        <div>
                            <h2 id="footer-title" className="footer-title">
                                Desert Rose
                            </h2>
                            <p className="footer-subtitle">
                                Fresh blooms, crafted with care — delivered with love.
                            </p>

                            <div className="footer-badges" aria-label="Highlights">
                                <span className="footer-badge">
                                    <Sparkles size={14} /> Premium Bouquets
                                </span>
                                <span className="footer-badge">
                                    <Sparkles size={14} /> Same-day Delivery
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="footer-cols">
                        <div className="footer-col">
                            <h3>Explore</h3>
                            <ul>
                                <li><a href="/">Home</a></li>
                                <li><a href="/bouquets">Bouquets</a></li>
                                <li><a href="/occasions">Occasions</a></li>
                                <li><a href="/best-sellers">Best Sellers</a></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h3>Support</h3>
                            <ul>
                                <li><a href="#">Shipping & Delivery</a></li>
                                <li><a href="#">Returns & Exchanges</a></li>
                                <li><a href="#">Care Guide</a></li>
                                <li><a href="#">FAQ</a></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h3>Contact</h3>
                            <ul className="footer-contact">
                                <li>
                                    <MapPin size={16} />
                                    <span>36 QL1A, P. Dĩ An, TP. HCM</span>
                                </li>
                                <li>
                                    <Phone size={16} />
                                    <a href="tel:+84000000000">+84 327 460 340</a>
                                </li>
                                <li>
                                    <Mail size={16} />
                                    <a href="mailto:desertrose.contact@gmail.com">desertrose.contact@gmail.com</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © {year} Desert Rose. All rights reserved.
                    </p>

                    <div className="footer-legal">
                        <a href="#">Privacy</a>
                        <span className="footer-dot" aria-hidden="true">•</span>
                        <a href="#">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}