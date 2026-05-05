import "../css/contact.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, ChevronRight } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <Header />

      <section className="contact-hero">
        <span className="contact-badge">GET IN TOUCH</span>
        <h1>
          CONTACT<br />
          <em>Desert Rose</em>
        </h1>
        <p className="contact-desc">
          Chúng tôi luôn sẵn sàng lắng nghe và giúp bạn chọn những bó hoa hoàn hảo nhất.
        </p>
        <div className="hero-divider">
          <span className="hero-divider-line" />
          <span className="hero-divider-dot" />
          <span className="hero-divider-line" />
        </div>
      </section>

      <section className="contact-container">
        <div className="contact-grid">

          <div className="contact-info">
            <div className="info-header">
              <h3>Our Information</h3>
              <p>Đến thăm chúng tôi hoặc liên hệ qua các kênh bên dưới.</p>
            </div>

            <div className="info-list">
              <div className="info-item">
                <div className="info-icon">
                  <MapPin size={17} />
                </div>
                <div className="info-text">
                  <span className="info-label">Địa chỉ</span>
                  <span>36 QL1A, P. Dĩ An, TP. HCM</span>
                </div>
                <ChevronRight size={14} className="info-arrow" />
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <Phone size={17} />
                </div>
                <div className="info-text">
                  <span className="info-label">Điện thoại</span>
                  <span>+84 123 456 789</span>
                </div>
                <ChevronRight size={14} className="info-arrow" />
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <Mail size={17} />
                </div>
                <div className="info-text">
                  <span className="info-label">Email</span>
                  <span>desertrose.contact@gmail.com</span>
                </div>
                <ChevronRight size={14} className="info-arrow" />
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <Clock size={17} />
                </div>
                <div className="info-text">
                  <span className="info-label">Giờ mở cửa</span>
                  <span>8:00 – 21:00, mỗi ngày</span>
                </div>
              </div>
            </div>

            <div className="info-note">
              Đội ngũ của chúng tôi sẽ phản hồi bạn trong vòng 24 giờ làm việc.
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-header">
              <h3>Message</h3>
              <p>Điền thông tin bên dưới, chúng tôi sẽ liên hệ lại sớm nhất.</p>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Họ và tên</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Nguyễn Văn A"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Nội dung</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Bạn cần tư vấn về loại hoa, sự kiện, hay đặt hàng đặc biệt?"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button className={`send-btn ${sent ? "sent" : ""}`} type="submit">
              {sent ? (
                <>Đã gửi thành công <span className="btn-check">✓</span></>
              ) : (
                <>Gửi tin nhắn <Send size={15} /></>
              )}
            </button>
          </form>

        </div>
      </section>

      <section className="contact-map-section">
        <div className="map-header">
          <span className="contact-badge">TÌM CHÚNG TÔI</span>
          <h2>MAP</h2>
        </div>
        <div className="map-wrapper">
          <iframe
            title="map"
            src="https://maps.google.com/maps?q=FPT%20University%20HCM&t=&z=13&ie=UTF8&iwloc=&output=embed"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}



