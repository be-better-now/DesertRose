import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ─── PETALS (same as register) ─── */
const PETALS = [
    { id: 0, left: "6%",  delay: "0s",   dur: "11s", w: 14, h: 9  },
    { id: 1, left: "18%", delay: "2.6s", dur: "9s",  w: 10, h: 7  },
    { id: 2, left: "31%", delay: "5.1s", dur: "12s", w: 16, h: 11 },
    { id: 3, left: "44%", delay: "1.3s", dur: "10s", w: 12, h: 8  },
    { id: 4, left: "57%", delay: "3.9s", dur: "8s",  w: 11, h: 7  },
    { id: 5, left: "69%", delay: "0.7s", dur: "13s", w: 15, h: 10 },
    { id: 6, left: "79%", delay: "4.6s", dur: "10s", w: 13, h: 9  },
    { id: 7, left: "90%", delay: "7.2s", dur: "11s", w: 9,  h: 6  },
];

/* ─── BOTANICAL PANEL SVG ─── */
function BotanicalSide() {
    return (
        <svg viewBox="0 0 500 900" width="100%" height="100%"
            style={{ position: "absolute", inset: 0 }} aria-hidden="true">

            {/* Title */}
            <text x="250" y="72" textAnchor="middle"
                fontFamily="Cormorant Garamond, serif"
                fontSize="38" fontWeight="300" fontStyle="italic"
                fill="#E4D8C0" opacity="0.92" letterSpacing="4">
                Bloom &amp; Garden
            </text>
            <text x="250" y="100" textAnchor="middle"
                fontFamily="Jost, sans-serif"
                fontSize="11" fontWeight="400"
                fill="#7AAA8A" opacity="0.8" letterSpacing="8">
                FLOWER BOUTIQUE
            </text>
            <line x1="175" y1="114" x2="325" y2="114"
                stroke="#4A7A5A" strokeWidth="0.5" opacity="0.4" />

            

            {/* Left eucalyptus branch */}
            <path d="M 22 130 C 50 200 72 280 90 360"
                stroke="#2E6048" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.65" />
            {[
                { x: 44,  y: 172, r: -32 }, { x: 58,  y: 210, r: 22  },
                { x: 70,  y: 250, r: -28 }, { x: 80,  y: 290, r: 26  },
                { x: 88,  y: 330, r: -18 }, { x: 94,  y: 355, r: 14  },
            ].map((l, i) => (
                <ellipse key={i} cx={l.x} cy={l.y} rx="15" ry="8.5"
                    fill="#2E6048" transform={`rotate(${l.r} ${l.x} ${l.y})`} opacity="0.62" />
            ))}

            {/* Right eucalyptus branch */}
            <path d="M 478 90 C 444 170 422 260 410 350"
                stroke="#285838" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.60" />
            {[
                { x: 450, y: 145, r: 38  }, { x: 436, y: 190, r: -22 },
                { x: 424, y: 235, r: 30  }, { x: 414, y: 278, r: -24 },
                { x: 408, y: 316, r: 18  },
            ].map((l, i) => (
                <ellipse key={i} cx={l.x} cy={l.y} rx="15" ry="8.5"
                    fill="#285838" transform={`rotate(${l.r} ${l.x} ${l.y})`} opacity="0.58" />
            ))}

            {/* Small pink flower top-left */}
            <g transform="translate(118, 240)">
                {[0, 72, 144, 216, 288].map((r, i) => (
                    <ellipse key={i} cx="0" cy="-17" rx="9" ry="5.5"
                        fill="#E8B0C0" transform={`rotate(${r})`} opacity="0.78" />
                ))}
                <circle cx="0" cy="0" r="6.5" fill="#F0D060" opacity="0.9" />
            </g>

            {/* Orange flower top-right */}
            <g transform="translate(385, 400)">
                {[0, 72, 144, 216, 288].map((r, i) => (
                    <ellipse key={i} cx="0" cy="-15" rx="8" ry="5"
                        fill="#F2C8A0" transform={`rotate(${r})`} opacity="0.72" />
                ))}
                <circle cx="0" cy="0" r="5.5" fill="#E8A040" opacity="0.85" />
            </g>

            {/* Purple flower left */}
            <g transform="translate(78, 470)">
                {[0, 60, 120, 180, 240, 300].map((r, i) => (
                    <ellipse key={i} cx="0" cy="-19" rx="9.5" ry="6"
                        fill="#D0B0D8" transform={`rotate(${r})`} opacity="0.68" />
                ))}
                <circle cx="0" cy="0" r="7" fill="#B880C0" opacity="0.78" />
            </g>

            {/* Center main rose — lower for tall panel */}
            <path d="M 250 870 C 248 800 244 730 250 668"
                stroke="#2A6040" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 250 790 C 218 768 192 780 176 768"
                stroke="#2A6040" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 250 740 C 278 718 305 730 316 718"
                stroke="#2A6040" strokeWidth="2" fill="none" strokeLinecap="round" />
            <ellipse cx="172" cy="766" rx="23" ry="12"
                fill="#2A6040" transform="rotate(-32 172 766)" opacity="0.78" />
            <ellipse cx="318" cy="716" rx="23" ry="12"
                fill="#245838" transform="rotate(22 318 716)" opacity="0.74" />
            <ellipse cx="238" cy="820" rx="18" ry="9.5"
                fill="#2A6040" transform="rotate(-18 238 820)" opacity="0.68" />

            
            {/* Extra small flowers mid-panel */}
            <g transform="translate(420, 570)">
                {[0, 72, 144, 216, 288].map((r, i) => (
                    <ellipse key={i} cx="0" cy="-13" rx="7" ry="4.5"
                        fill="#E8B0C0" transform={`rotate(${r})`} opacity="0.65" />
                ))}
                <circle cx="0" cy="0" r="5" fill="#F0D060" opacity="0.8" />
            </g>
            <g transform="translate(60, 620)">
                {[0, 72, 144, 216, 288].map((r, i) => (
                    <ellipse key={i} cx="0" cy="-11" rx="6" ry="4"
                        fill="#F2C8A0" transform={`rotate(${r})`} opacity="0.6" />
                ))}
                <circle cx="0" cy="0" r="4.5" fill="#E8A040" opacity="0.75" />
            </g>

            {/* Scattered decorative dots */}
            {[
                { x: 204, y: 320, r: 2 }, { x: 212, y: 308, r: 1.5 },
                { x: 322, y: 355, r: 2 }, { x: 138, y: 430, r: 1.5 },
                { x: 354, y: 545, r: 2 }, { x: 404, y: 480, r: 1.5 },
                { x: 166, y: 540, r: 2 }, { x: 440, y: 640, r: 1.5 },
            ].map((d, i) => (
                <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#F0D060" opacity="0.42" />
            ))}
        </svg>
    );
}

/* ─── TABLE OF CONTENTS NAV ─── */
const SECTIONS = [
    { id: "dieu-khoan",      label: "1. Điều Khoản Sử Dụng"      },
    { id: "tai-khoan",       label: "2. Tài Khoản & Đặt Hàng"    },
    { id: "san-pham",        label: "3. Sản Phẩm & Thanh Toán"    },
    { id: "van-chuyen",      label: "4. Vận Chuyển & Giao Hàng"   },
    { id: "doi-tra",         label: "5. Đổi Trả & Hoàn Tiền"      },
    { id: "bao-mat",         label: "6. Chính Sách Bảo Mật"       },
    { id: "du-lieu",         label: "7. Thu Thập Dữ Liệu"         },
    { id: "cookie",          label: "8. Cookies"                   },
    { id: "quyen-loi",       label: "9. Quyền Của Bạn"            },
    { id: "lien-he",         label: "10. Liên Hệ"                 },
];

/* ─── SECTION BLOCK ─── */
function Section({ id, title, badge, children }) {
    return (
        <section id={id} style={{ marginBottom: "52px", scrollMarginTop: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
                {badge && (
                    <span style={{
                        fontFamily:    "'Montserrat', sans-serif",
                        fontSize:      "9px",
                        fontWeight:    600,
                        letterSpacing: "0.15em",
                        color:         "#FAF6EE",
                        background:    "#2A6040",
                        padding:       "4px 10px",
                        borderRadius:  "2px",
                        whiteSpace:    "nowrap",
                        textTransform: "uppercase",
                    }}>{badge}</span>
                )}
                <h2 style={{
                    fontFamily:   "'Cormorant Garamond', serif",
                    fontSize:     "24px",
                    fontWeight:   400,
                    fontStyle:    "italic",
                    color:        "#1C3428",
                    margin:       0,
                    lineHeight:   1.2,
                }}>{title}</h2>
            </div>
            <div style={{
                width:            "40px",
                height:           "1px",
                background:       "linear-gradient(90deg, #4A7A5A, transparent)",
                marginBottom:     "20px",
            }} />
            <div style={{
                fontFamily:   "'Montserrat', sans-serif",
                fontSize:     "13px",
                fontWeight:   300,
                lineHeight:   1.9,
                color:        "#3A4A3A",
                letterSpacing:"0.015em",
            }}>
                {children}
            </div>
        </section>
    );
}

/* ─── INFO BOX ─── */
function InfoBox({ icon, children, variant = "green" }) {
    const styles = {
        green: { bg: "rgba(42,96,64,0.06)", border: "rgba(42,96,64,0.18)", dot: "#2A6040" },
        pink:  { bg: "rgba(212,120,146,0.06)", border: "rgba(212,120,146,0.20)", dot: "#D47892" },
        gold:  { bg: "rgba(184,144,80,0.07)", border: "rgba(184,144,80,0.20)", dot: "#B89060" },
    };
    const s = styles[variant];
    return (
        <div style={{
            background:    s.bg,
            border:        `0.5px solid ${s.border}`,
            borderRadius:  "3px",
            padding:       "16px 20px",
            margin:        "18px 0",
            display:       "flex",
            gap:           "14px",
            alignItems:    "flex-start",
        }}>
            <span style={{ fontSize: "16px", lineHeight: 1.6, flexShrink: 0 }}>{icon}</span>
            <div style={{
                fontFamily:   "'Montserrat', sans-serif",
                fontSize:     "12.5px",
                fontWeight:   400,
                lineHeight:   1.8,
                color:        "#2A3A2A",
                letterSpacing:"0.01em",
            }}>{children}</div>
        </div>
    );
}

/* ─── LIST ITEM ─── */
function Li({ children }) {
    return (
        <div style={{
            display:       "flex",
            gap:           "12px",
            marginBottom:  "10px",
            alignItems:    "flex-start",
        }}>
            <span style={{
                width:        "5px",
                height:       "5px",
                borderRadius: "50%",
                background:   "#4A7A5A",
                flexShrink:   0,
                marginTop:    "8px",
            }} />
            <span style={{
                fontFamily:   "'Montserrat', sans-serif",
                fontSize:     "13px",
                fontWeight:   300,
                lineHeight:   1.8,
                color:        "#3A4A3A",
                letterSpacing:"0.015em",
            }}>{children}</span>
        </div>
    );
}

/* ─── TERMS & PRIVACY PAGE ─── */
export default function TermsAndPrivacy() {
    const navigate    = useNavigate();
    const [active, setActive] = useState("dieu-khoan");
    const contentRef  = useRef(null);

    /* Track scroll to highlight nav */
    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;
        const handler = () => {
            const scrollY = el.scrollTop + 48;
            for (let i = SECTIONS.length - 1; i >= 0; i--) {
                const sec = document.getElementById(SECTIONS[i].id);
                if (sec && sec.offsetTop <= scrollY) {
                    setActive(SECTIONS[i].id);
                    break;
                }
            }
        };
        el.addEventListener("scroll", handler, { passive: true });
        return () => el.removeEventListener("scroll", handler);
    }, []);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el && contentRef.current) {
            contentRef.current.scrollTo({ top: el.offsetTop - 24, behavior: "smooth" });
        }
        setActive(id);
    };

    return (
        <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "'Montserrat', sans-serif" }}>

            {/* ── Google Fonts ── */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&family=Montserrat:wght@300;400;500;600&display=swap');

                /* Falling petals */
                @keyframes petalFall {
                    0%   { transform: translateY(-30px) rotate(0deg); opacity: 0; }
                    8%   { opacity: 0.65; }
                    88%  { opacity: 0.45; }
                    100% { transform: translateY(100vh) rotate(280deg); opacity: 0; }
                }
                .petal-tp {
                    position: fixed;
                    z-index: 0;
                    border-radius: 50% 10% 50% 10%;
                    background: radial-gradient(ellipse at 35% 35%, #F2C0D0, #C87090 70%);
                    opacity: 0;
                    animation: petalFall linear infinite;
                    pointer-events: none;
                }

                /* Nav links */
                .toc-link {
                    display: block;
                    padding: 8px 14px;
                    border-radius: 2px;
                    cursor: pointer;
                    transition: all 0.2s;
                    fontFamily: 'Montserrat', sans-serif;
                    fontSize: 11.5px;
                    fontWeight: 300;
                    letterSpacing: 0.02em;
                    color: #5A7A5A;
                    border-left: 1.5px solid transparent;
                    user-select: none;
                }
                .toc-link:hover { color: #1C3428; background: rgba(42,96,64,0.05); }
                .toc-link.active {
                    color: #f2fef8 !important;
                    background: rgba(42,96,64,0.08) !important;
                    border-left: 1.5px solid #4A7A5A !important;
                    font-weight: 500 !important;
                }

                /* Custom scrollbar */
                .content-scroll::-webkit-scrollbar { width: 4px; }
                .content-scroll::-webkit-scrollbar-track { background: transparent; }
                .content-scroll::-webkit-scrollbar-thumb { background: #C8D8C8; border-radius: 2px; }
                .content-scroll::-webkit-scrollbar-thumb:hover { background: #4A7A5A; }
            `}</style>

            {/* ── Falling petals ── */}
            {PETALS.map(p => (
                <div key={p.id} className="petal-tp" style={{
                    left:              p.left,
                    top:               "-20px",
                    width:             `${p.w}px`,
                    height:            `${p.h}px`,
                    animationDuration: p.dur,
                    animationDelay:    p.delay,
                }} />
            ))}

            {/* ── LEFT: Botanical panel ── */}
            <div style={{
                width:      "300px",
                minWidth:   "300px",
                background: "#152818",
                position:   "relative",
                overflow:   "hidden",
                flexShrink: 0,
                display:    "flex",
                flexDirection: "column",
            }}>
                <BotanicalSide />

                {/* Navigation overlay */}
                <div style={{
                    position:   "absolute",
                    inset:      0,
                    display:    "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding:    "160px 24px 40px",
                    zIndex:     2,
                }}>
                    <p style={{
                        fontFamily:    "'Montserrat', sans-serif",
                        fontSize:      "9px",
                        fontWeight:    600,
                        letterSpacing: "0.20em",
                        color:         "#5A8A6A",
                        textTransform: "uppercase",
                        marginBottom:  "14px",
                        paddingLeft:   "14px",
                    }}>Nội dung</p>

                    {SECTIONS.map(s => (
                        <div
                            key={s.id}
                            className={`toc-link${active === s.id ? " active" : ""}`}
                            onClick={() => scrollTo(s.id)}
                            style={{
                                fontFamily:   "'Montserrat', sans-serif",
                                fontSize:     "11px",
                                fontWeight:   active === s.id ? 500 : 300,
                                letterSpacing:"0.025em",
                                color:        active === s.id ? "#E4D8C0" : "#7A9A7A",
                                borderLeft:   active === s.id ? "1.5px solid #D47892" : "1.5px solid transparent",
                                padding:      "7px 14px",
                                cursor:       "pointer",
                                transition:   "all 0.2s",
                                borderRadius: "1px",
                                background:   active === s.id ? "rgba(212,120,146,0.08)" : "transparent",
                            }}
                        >
                            {s.label}
                        </div>
                    ))}

                    {/* Back button */}
                    <button
                        onClick={() => navigate(-1)}
                        style={{
                            marginTop:     "28px",
                            marginLeft:    "67px",
                            background:    "transparent",
                            border:        "0.5px solid rgba(74,122,90,0.45)",
                            borderRadius:  "2px",
                            color:         "#7AAA8A",
                            fontFamily:    "'Montserrat', sans-serif",
                            fontSize:      "10px",
                            fontWeight:    500,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            padding:       "9px 18px",
                            cursor:        "pointer",
                            width:         "fit-content",
                            transition:    "all 0.22s",
                        }}
                        onMouseEnter={e => {
                            e.target.style.background = "rgba(74,122,90,0.12)";
                            e.target.style.color = "#B0D0B8";
                            e.target.style.borderColor = "rgba(74,122,90,0.7)";
                        }}
                        onMouseLeave={e => {
                            e.target.style.background = "transparent";
                            e.target.style.color = "#7AAA8A";
                            e.target.style.borderColor = "rgba(74,122,90,0.45)";
                        }}
                    >
                        ← Quay lại
                    </button>
                </div>
            </div>

            {/* ── RIGHT: Content ── */}
            <div
                ref={contentRef}
                className="content-scroll"
                style={{
                    flex:       1,
                    background: "#FAF6EE",
                    overflowY:  "auto",
                    overflowX:  "hidden",
                    position:   "relative",
                }}
            >
                {/* Ambient glows */}
                <div style={{
                    position: "fixed", right: "-80px", bottom: "-80px",
                    width: "320px", height: "320px", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(200,112,138,0.09) 0%, transparent 68%)",
                    pointerEvents: "none", zIndex: 0,
                }} />
                <div style={{
                    position: "fixed", right: "30%", top: "-60px",
                    width: "240px", height: "240px", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(180,144,80,0.06) 0%, transparent 65%)",
                    pointerEvents: "none", zIndex: 0,
                }} />

                {/* Content wrapper */}
                <div style={{
                    maxWidth:  "760px",
                    margin:    "0 auto",
                    padding:   "64px 60px 100px",
                    position:  "relative",
                    zIndex:    1,
                }}>

                    {/* ── Page Header ── */}
                    <div style={{ marginBottom: "60px", borderBottom: "0.5px solid #D8CCBA", paddingBottom: "40px" }}>
                        <span style={{
                            fontFamily:    "'Montserrat', sans-serif",
                            fontSize:      "9px",
                            fontWeight:    600,
                            letterSpacing: "0.20em",
                            color:         "#7AAA8A",
                            textTransform: "uppercase",
                            display:       "block",
                            marginBottom:  "16px",
                        }}>Bloom &amp; Garden — Tài liệu pháp lý</span>

                        <h1 style={{
                            fontFamily:   "'Cormorant Garamond', serif",
                            fontSize:     "52px",
                            fontWeight:   300,
                            fontStyle:    "italic",
                            color:        "#1C3428",
                            lineHeight:   1.1,
                            margin:       "0 0 20px",
                        }}>
                            Điều Khoản &amp;<br />Chính Sách Bảo Mật
                        </h1>

                        <p style={{
                            fontFamily:    "'Montserrat', sans-serif",
                            fontSize:      "13px",
                            fontWeight:    300,
                            color:         "#789A78",
                            lineHeight:    1.8,
                            letterSpacing: "0.02em",
                            maxWidth:      "560px",
                        }}>
                            Chào mừng bạn đến với Bloom &amp; Garden. Vui lòng đọc kỹ các điều khoản và chính sách dưới đây trước khi sử dụng dịch vụ của chúng tôi. Việc tiếp tục sử dụng trang web đồng nghĩa với việc bạn đồng ý với toàn bộ nội dung này.
                        </p>

                        <div style={{
                            display:       "flex",
                            gap:           "24px",
                            marginTop:     "28px",
                            flexWrap:      "wrap",
                        }}>
                            {[
                                { label: "Cập nhật lần cuối", value: "01 tháng 05, 2025" },
                                { label: "Phiên bản",         value: "2.4.0"             },
                                { label: "Ngôn ngữ",          value: "Tiếng Việt"        },
                            ].map(item => (
                                <div key={item.label}>
                                    <div style={{
                                        fontFamily:    "'Montserrat', sans-serif",
                                        fontSize:      "9px",
                                        fontWeight:    600,
                                        letterSpacing: "0.14em",
                                        color:         "#A8B8A8",
                                        textTransform: "uppercase",
                                        marginBottom:  "4px",
                                    }}>{item.label}</div>
                                    <div style={{
                                        fontFamily:    "'Montserrat', sans-serif",
                                        fontSize:      "12px",
                                        fontWeight:    400,
                                        color:         "#4A6A4A",
                                    }}>{item.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ══════════════════════════════════════════════
                        SECTION 1 — ĐIỀU KHOẢN SỬ DỤNG
                    ═══════════════════════════════════════════════ */}
                    <Section id="dieu-khoan" title="Điều Khoản Sử Dụng" badge="Điều khoản">
                        <p style={{ marginBottom: "16px" }}>
                            Bằng cách truy cập và sử dụng trang web <strong style={{ fontWeight: 500, color: "#2A5038" }}>bloomandgarden.vn</strong>, bạn xác nhận rằng bạn đã đọc, hiểu và đồng ý bị ràng buộc bởi các Điều khoản Sử dụng này. Nếu bạn không đồng ý, vui lòng ngừng sử dụng dịch vụ ngay lập tức.
                        </p>

                        <InfoBox icon="🌿" variant="green">
                            Bloom &amp; Garden cung cấp dịch vụ đặt hàng hoa tươi trực tuyến, bó hoa theo yêu cầu, quà tặng theo mùa và dịch vụ trang trí sự kiện tại Việt Nam. Tất cả giao dịch đều tuân thủ Luật Thương mại điện tử Việt Nam.
                        </InfoBox>

                        <p style={{ marginBottom: "12px" }}>Người dùng có nghĩa vụ:</p>
                        <Li>Cung cấp thông tin chính xác, đầy đủ và cập nhật khi đăng ký tài khoản hoặc đặt hàng.</Li>
                        <Li>Không sử dụng dịch vụ cho các mục đích bất hợp pháp, gian lận hoặc gây hại đến người khác.</Li>
                        <Li>Không cố tình phá hoại, can thiệp vào hệ thống kỹ thuật, cơ sở dữ liệu của Bloom &amp; Garden.</Li>
                        <Li>Không sao chép, phân phối, sửa đổi nội dung, hình ảnh sản phẩm mà không có sự cho phép bằng văn bản.</Li>
                        <Li>Tuân thủ mọi luật pháp hiện hành tại Việt Nam khi sử dụng dịch vụ.</Li>

                        <p style={{ marginTop: "18px", marginBottom: "0" }}>
                            Bloom &amp; Garden có quyền đơn phương chấm dứt tài khoản hoặc từ chối cung cấp dịch vụ đối với bất kỳ người dùng nào vi phạm các điều khoản này mà không cần thông báo trước.
                        </p>
                    </Section>

                    {/* ══════════════════════════════════════════════
                        SECTION 2 — TÀI KHOẢN & ĐẶT HÀNG
                    ═══════════════════════════════════════════════ */}
                    <Section id="tai-khoan" title="Tài Khoản &amp; Đặt Hàng" badge="Tài khoản">
                        <p style={{ marginBottom: "16px" }}>
                            Để sử dụng đầy đủ các tính năng của Bloom &amp; Garden, bạn cần tạo tài khoản với thông tin hợp lệ. Mỗi tài khoản chỉ được phép có một đại diện duy nhất và không được chuyển nhượng cho bên thứ ba.
                        </p>

                        <InfoBox icon="🔐" variant="gold">
                            <strong style={{ fontWeight: 500 }}>Bảo mật tài khoản:</strong> Bạn chịu hoàn toàn trách nhiệm về tính bảo mật của mật khẩu và mọi hoạt động xảy ra dưới tài khoản của mình. Vui lòng thông báo ngay cho chúng tôi nếu phát hiện truy cập trái phép.
                        </InfoBox>

                        <p style={{ marginBottom: "12px" }}>Quy trình đặt hàng:</p>
                        <Li><strong style={{ fontWeight: 500 }}>Bước 1 — Chọn sản phẩm:</strong> Duyệt danh mục, chọn loại hoa, kích thước bó và ghi chú cá nhân hóa nếu muốn.</Li>
                        <Li><strong style={{ fontWeight: 500 }}>Bước 2 — Điền thông tin:</strong> Cung cấp địa chỉ giao hàng, số điện thoại liên hệ và thời gian giao mong muốn.</Li>
                        <Li><strong style={{ fontWeight: 500 }}>Bước 3 — Thanh toán:</strong> Chọn phương thức thanh toán và hoàn tất giao dịch an toàn.</Li>
                        <Li><strong style={{ fontWeight: 500 }}>Bước 4 — Xác nhận:</strong> Email xác nhận đơn hàng sẽ được gửi trong vòng 5 phút sau khi đặt thành công.</Li>
                        <Li><strong style={{ fontWeight: 500 }}>Bước 5 — Giao hàng:</strong> Nhận hoa tươi tận nơi theo thời gian đã chọn.</Li>

                        <p style={{ marginTop: "18px" }}>
                            Bloom &amp; Garden có quyền hủy đơn hàng trong trường hợp sản phẩm không còn sẵn có, thông tin giao hàng không hợp lệ hoặc phát hiện dấu hiệu gian lận. Chúng tôi sẽ thông báo và hoàn tiền đầy đủ trong vòng <strong style={{ fontWeight: 500 }}>3–5 ngày làm việc</strong>.
                        </p>
                    </Section>

                    {/* ══════════════════════════════════════════════
                        SECTION 3 — SẢN PHẨM & THANH TOÁN
                    ═══════════════════════════════════════════════ */}
                    <Section id="san-pham" title="Sản Phẩm &amp; Thanh Toán" badge="Thanh toán">
                        <p style={{ marginBottom: "16px" }}>
                            Hoa tươi là sản phẩm tự nhiên, do đó màu sắc và hình dạng thực tế có thể có sự khác biệt nhỏ so với hình ảnh trên website do điều kiện mùa vụ và nguồn cung. Chúng tôi luôn cam kết cung cấp sản phẩm chất lượng cao nhất có thể.
                        </p>

                        <InfoBox icon="💐" variant="pink">
                            Trong trường hợp một loại hoa cụ thể không có sẵn, đội ngũ của chúng tôi sẽ liên hệ để đề xuất thay thế hoặc hoàn tiền. Chúng tôi không bao giờ giao sản phẩm kém chất lượng mà không thông báo trước.
                        </InfoBox>

                        <p style={{ marginBottom: "12px" }}>Phương thức thanh toán được chấp nhận:</p>
                        <Li>Thẻ tín dụng / ghi nợ nội địa và quốc tế (Visa, Mastercard, JCB).</Li>
                        <Li>Chuyển khoản ngân hàng (Vietcombank, Techcombank, MB Bank, VPBank).</Li>
                        <Li>Ví điện tử: MoMo, ZaloPay, VNPay.</Li>
                        <Li>Thanh toán khi nhận hàng (COD) — áp dụng trong khu vực nội thành TP.HCM và Hà Nội.</Li>

                        <p style={{ marginTop: "18px", marginBottom: "12px" }}>Giá cả và ưu đãi:</p>
                        <Li>Tất cả giá niêm yết trên website đã bao gồm thuế VAT 10%.</Li>
                        <Li>Phí vận chuyển được tính riêng dựa trên địa chỉ giao hàng và thời điểm đặt.</Li>
                        <Li>Mã giảm giá chỉ có hiệu lực trong thời gian quy định và không thể dùng kết hợp.</Li>
                        <Li>Bloom &amp; Garden có quyền điều chỉnh giá sản phẩm mà không cần thông báo trước; giá tại thời điểm xác nhận đơn sẽ được ưu tiên áp dụng.</Li>
                    </Section>

                    {/* ══════════════════════════════════════════════
                        SECTION 4 — VẬN CHUYỂN & GIAO HÀNG
                    ═══════════════════════════════════════════════ */}
                    <Section id="van-chuyen" title="Vận Chuyển &amp; Giao Hàng" badge="Giao hàng">
                        <p style={{ marginBottom: "16px" }}>
                            Bloom &amp; Garden cung cấp dịch vụ giao hàng trong ngày với đội ngũ shipper chuyên nghiệp, đảm bảo hoa được vận chuyển trong điều kiện tối ưu bằng xe lạnh hoặc hộp cách nhiệt.
                        </p>

                        <div style={{
                            display:      "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap:          "14px",
                            margin:       "18px 0",
                        }}>
                            {[
                                { title: "Nội thành TP.HCM & HN", time: "2–4 giờ", note: "Đặt trước 14:00" },
                                { title: "Ngoại thành & Tỉnh lân cận", time: "4–8 giờ", note: "Đặt trước 10:00" },
                                { title: "Giao đúng giờ theo lịch", time: "Đặt lịch sẵn", note: "Trước 48 giờ" },
                                { title: "Giao quốc tế", time: "Liên hệ", note: "Tùy đối tác" },
                            ].map(item => (
                                <div key={item.title} style={{
                                    background:    "rgba(42,96,64,0.04)",
                                    border:        "0.5px solid rgba(42,96,64,0.14)",
                                    borderRadius:  "3px",
                                    padding:       "16px 18px",
                                }}>
                                    <div style={{
                                        fontFamily:    "'Montserrat', sans-serif",
                                        fontSize:      "12px",
                                        fontWeight:    500,
                                        color:         "#1C3428",
                                        marginBottom:  "6px",
                                    }}>{item.title}</div>
                                    <div style={{
                                        fontFamily:    "'Cormorant Garamond', serif",
                                        fontSize:      "20px",
                                        fontStyle:     "italic",
                                        color:         "#4A7A5A",
                                        marginBottom:  "4px",
                                    }}>{item.time}</div>
                                    <div style={{
                                        fontFamily:    "'Montserrat', sans-serif",
                                        fontSize:      "10.5px",
                                        fontWeight:    300,
                                        color:         "#789A78",
                                        letterSpacing: "0.02em",
                                    }}>{item.note}</div>
                                </div>
                            ))}
                        </div>

                        <Li>Bloom &amp; Garden không chịu trách nhiệm về sự chậm trễ do thiên tai, tai nạn giao thông, điều kiện thời tiết cực đoan hoặc các sự kiện bất khả kháng.</Li>
                        <Li>Vui lòng đảm bảo có người nhận hàng tại địa chỉ giao. Sau 2 lần liên lạc không thành, đơn hàng sẽ bị hủy và không hoàn tiền.</Li>
                        <Li>Chúng tôi không giao hoa đến hộp thư, tủ gửi đồ hoặc địa điểm không có người tiếp nhận.</Li>
                    </Section>

                    {/* ══════════════════════════════════════════════
                        SECTION 5 — ĐỔI TRẢ & HOÀN TIỀN
                    ═══════════════════════════════════════════════ */}
                    <Section id="doi-tra" title="Đổi Trả &amp; Hoàn Tiền" badge="Đổi trả">
                        <InfoBox icon="🌺" variant="pink">
                            Do tính chất đặc thù của hoa tươi, chúng tôi không chấp nhận đổi trả theo yêu cầu chủ quan. Tuy nhiên, nếu sản phẩm bị hư hại trong quá trình vận chuyển hoặc không đúng với đơn đặt hàng, chúng tôi cam kết giải quyết thỏa đáng trong vòng 24 giờ.
                        </InfoBox>

                        <p style={{ marginBottom: "12px" }}>Bloom &amp; Garden chấp nhận đổi/hoàn tiền trong các trường hợp sau:</p>
                        <Li>Hoa bị héo, dập nát hoặc có dấu hiệu hư hỏng rõ ràng khi nhận hàng.</Li>
                        <Li>Giao nhầm loại hoa, màu sắc hoặc kích thước so với đơn đặt hàng ban đầu.</Li>
                        <Li>Giao hàng trễ hơn 2 giờ so với thời gian đã cam kết mà không có thông báo trước.</Li>
                        <Li>Đơn hàng bị hủy bởi phía Bloom &amp; Garden do hết hàng hoặc lỗi hệ thống.</Li>

                        <p style={{ marginTop: "18px", marginBottom: "12px" }}>Quy trình yêu cầu:</p>
                        <Li>Chụp ảnh sản phẩm ngay khi nhận và gửi kèm mã đơn hàng qua email <strong style={{ fontWeight: 500, color: "#2A5038" }}>support@bloomandgarden.vn</strong> hoặc hotline trong vòng <strong style={{ fontWeight: 500 }}>2 giờ</strong> sau khi nhận hàng.</Li>
                        <Li>Đội ngũ chăm sóc khách hàng sẽ xem xét và phản hồi trong vòng 4 giờ làm việc.</Li>
                        <Li>Hoàn tiền (nếu được chấp thuận) sẽ được xử lý trong vòng 3–7 ngày làm việc tùy phương thức thanh toán.</Li>

                        <p style={{ marginTop: "18px" }}>
                            Chúng tôi không chấp nhận yêu cầu đổi trả vì lý do cá nhân như thay đổi ý định sau khi đặt hàng, không còn cần thiết hoặc chọn nhầm sản phẩm từ phía khách hàng.
                        </p>
                    </Section>

                    {/* Divider */}
                    <div style={{
                        display:      "flex",
                        alignItems:   "center",
                        gap:          "18px",
                        margin:       "8px 0 52px",
                    }}>
                        <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(90deg, transparent, #CBBFA8)" }} />
                        <span style={{
                            fontFamily:    "'Cormorant Garamond', serif",
                            fontSize:      "18px",
                            color:         "#D47892",
                            opacity:       0.8,
                        }}>✿</span>
                        <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(90deg, #CBBFA8, transparent)" }} />
                    </div>

                    {/* ══════════════════════════════════════════════
                        SECTION 6 — CHÍNH SÁCH BẢO MẬT
                    ═══════════════════════════════════════════════ */}
                    <Section id="bao-mat" title="Chính Sách Bảo Mật" badge="Bảo mật">
                        <p style={{ marginBottom: "16px" }}>
                            Bloom &amp; Garden cam kết bảo vệ quyền riêng tư của bạn. Chính sách này mô tả cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin cá nhân của bạn khi sử dụng dịch vụ. Chúng tôi tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân của Việt Nam.
                        </p>

                        <InfoBox icon="🛡️" variant="green">
                            <strong style={{ fontWeight: 500 }}>Cam kết cốt lõi:</strong> Chúng tôi <strong style={{ fontWeight: 500 }}>không bao giờ bán</strong> thông tin cá nhân của bạn cho bên thứ ba. Dữ liệu của bạn chỉ được sử dụng để cung cấp và cải thiện dịch vụ.
                        </InfoBox>

                        <p style={{ marginBottom: "12px" }}>Nguyên tắc xử lý dữ liệu của chúng tôi:</p>
                        <Li><strong style={{ fontWeight: 500 }}>Hợp pháp và minh bạch:</strong> Chỉ thu thập dữ liệu khi có cơ sở pháp lý rõ ràng và thông báo cho bạn biết.</Li>
                        <Li><strong style={{ fontWeight: 500 }}>Giới hạn mục đích:</strong> Dữ liệu chỉ được dùng cho mục đích đã công bố, không được tái sử dụng trái phép.</Li>
                        <Li><strong style={{ fontWeight: 500 }}>Tối thiểu hóa dữ liệu:</strong> Chỉ thu thập những gì thực sự cần thiết cho việc cung cấp dịch vụ.</Li>
                        <Li><strong style={{ fontWeight: 500 }}>Bảo mật:</strong> Áp dụng các biện pháp kỹ thuật và tổ chức phù hợp để bảo vệ dữ liệu.</Li>
                        <Li><strong style={{ fontWeight: 500 }}>Trách nhiệm giải trình:</strong> Chúng tôi có thể chứng minh sự tuân thủ với mọi quy định bảo mật.</Li>
                    </Section>

                    {/* ══════════════════════════════════════════════
                        SECTION 7 — THU THẬP DỮ LIỆU
                    ═══════════════════════════════════════════════ */}
                    <Section id="du-lieu" title="Thu Thập Dữ Liệu" badge="Dữ liệu">
                        <p style={{ marginBottom: "16px" }}>
                            Chúng tôi thu thập thông tin từ bạn qua nhiều kênh khác nhau trong quá trình sử dụng dịch vụ:
                        </p>

                        <div style={{ margin: "18px 0" }}>
                            {[
                                {
                                    title: "Thông tin bạn cung cấp trực tiếp",
                                    items: ["Họ tên, địa chỉ email, số điện thoại khi đăng ký tài khoản", "Địa chỉ giao hàng và thông tin người nhận", "Lịch sử đơn hàng và ghi chú cá nhân hóa", "Nội dung liên hệ, phản hồi, đánh giá sản phẩm"]
                                },
                                {
                                    title: "Thông tin thu thập tự động",
                                    items: ["Địa chỉ IP và thông tin thiết bị (trình duyệt, hệ điều hành)", "Dữ liệu hành vi duyệt web (trang đã xem, thời gian, điểm nhấp)", "Cookies và dữ liệu phiên làm việc", "Vị trí địa lý xấp xỉ (từ địa chỉ IP)"]
                                },
                                {
                                    title: "Thông tin từ bên thứ ba",
                                    items: ["Thông tin xác thực từ Google / Facebook khi đăng nhập bằng mạng xã hội", "Dữ liệu thanh toán từ cổng thanh toán (chúng tôi không lưu số thẻ)", "Đánh giá và phản hồi từ nền tảng bên ngoài"]
                                },
                            ].map(group => (
                                <div key={group.title} style={{ marginBottom: "22px" }}>
                                    <div style={{
                                        fontFamily:    "'Montserrat', sans-serif",
                                        fontSize:      "11.5px",
                                        fontWeight:    600,
                                        color:         "#2A5038",
                                        letterSpacing: "0.06em",
                                        textTransform: "uppercase",
                                        marginBottom:  "12px",
                                    }}>{group.title}</div>
                                    {group.items.map(item => <Li key={item}>{item}</Li>)}
                                </div>
                            ))}
                        </div>

                        <p>
                            Thông tin thanh toán của bạn được xử lý hoàn toàn qua các cổng thanh toán được mã hóa (PCI-DSS). Bloom &amp; Garden <strong style={{ fontWeight: 500 }}>không lưu trữ</strong> số thẻ tín dụng hay thông tin tài khoản ngân hàng trên hệ thống của chúng tôi.
                        </p>
                    </Section>

                    {/* ══════════════════════════════════════════════
                        SECTION 8 — COOKIES
                    ═══════════════════════════════════════════════ */}
                    <Section id="cookie" title="Cookies &amp; Công Nghệ Theo Dõi" badge="Cookies">
                        <p style={{ marginBottom: "16px" }}>
                            Chúng tôi sử dụng cookies và các công nghệ tương tự để nâng cao trải nghiệm của bạn, phân tích lưu lượng truy cập và cá nhân hóa nội dung. Bạn có thể kiểm soát việc sử dụng cookies thông qua cài đặt trình duyệt.
                        </p>

                        <div style={{
                            display:      "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap:          "12px",
                            margin:       "18px 0",
                        }}>
                            {[
                                {
                                    name: "Cookies thiết yếu",
                                    desc: "Cần thiết cho hoạt động cơ bản của website: giỏ hàng, phiên đăng nhập, bảo mật.",
                                    toggle: false,
                                    color: "#2A6040",
                                },
                                {
                                    name: "Cookies phân tích",
                                    desc: "Giúp chúng tôi hiểu cách người dùng tương tác với website qua Google Analytics.",
                                    toggle: true,
                                    color: "#4A7A5A",
                                },
                                {
                                    name: "Cookies chức năng",
                                    desc: "Ghi nhớ tùy chọn của bạn như ngôn ngữ, khu vực, hiển thị sản phẩm yêu thích.",
                                    toggle: true,
                                    color: "#4A7A5A",
                                },
                                {
                                    name: "Cookies marketing",
                                    desc: "Được dùng để hiển thị quảng cáo phù hợp. Bạn có thể từ chối bất cứ lúc nào.",
                                    toggle: true,
                                    color: "#789A78",
                                },
                            ].map(c => (
                                <div key={c.name} style={{
                                    background:   "rgba(42,96,64,0.04)",
                                    border:       "0.5px solid rgba(42,96,64,0.14)",
                                    borderRadius: "3px",
                                    padding:      "16px 18px",
                                }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                                        <span style={{
                                            fontFamily:    "'Montserrat', sans-serif",
                                            fontSize:      "11.5px",
                                            fontWeight:    600,
                                            color:         "#1C3428",
                                        }}>{c.name}</span>
                                        <span style={{
                                            fontFamily:    "'Montserrat', sans-serif",
                                            fontSize:      "9px",
                                            fontWeight:    600,
                                            letterSpacing: "0.1em",
                                            color:         c.toggle ? "#789A78" : "#FAF6EE",
                                            background:    c.toggle ? "rgba(42,96,64,0.1)" : "#2A6040",
                                            border:        c.toggle ? "0.5px solid rgba(42,96,64,0.3)" : "none",
                                            padding:       "3px 8px",
                                            borderRadius:  "1px",
                                        }}>
                                            {c.toggle ? "Tùy chọn" : "Bắt buộc"}
                                        </span>
                                    </div>
                                    <p style={{
                                        fontFamily:    "'Montserrat', sans-serif",
                                        fontSize:      "11.5px",
                                        fontWeight:    300,
                                        color:         "#5A7A5A",
                                        lineHeight:    1.7,
                                        margin:        0,
                                    }}>{c.desc}</p>
                                </div>
                            ))}
                        </div>

                        <p>
                            Để xóa hoặc chặn cookies, truy cập cài đặt trình duyệt của bạn. Lưu ý rằng một số tính năng của website có thể không hoạt động đầy đủ nếu bạn vô hiệu hóa cookies thiết yếu.
                        </p>
                    </Section>

                    {/* ══════════════════════════════════════════════
                        SECTION 9 — QUYỀN LỢI CỦA BẠN
                    ═══════════════════════════════════════════════ */}
                    <Section id="quyen-loi" title="Quyền Của Bạn" badge="Quyền lợi">
                        <p style={{ marginBottom: "18px" }}>
                            Theo quy định của pháp luật Việt Nam và thông lệ quốc tế tốt nhất, bạn có các quyền sau đây liên quan đến dữ liệu cá nhân của mình:
                        </p>

                        <div style={{ margin: "4px 0 20px" }}>
                            {[
                                { right: "Quyền truy cập", desc: "Yêu cầu xem bản sao dữ liệu cá nhân mà chúng tôi đang lưu trữ về bạn.", icon: "👁️" },
                                { right: "Quyền chỉnh sửa", desc: "Yêu cầu sửa đổi thông tin không chính xác hoặc không đầy đủ.", icon: "✏️" },
                                { right: "Quyền xóa dữ liệu", desc: "Yêu cầu xóa dữ liệu cá nhân khi không còn cần thiết cho mục đích ban đầu.", icon: "🗑️" },
                                { right: "Quyền phản đối", desc: "Phản đối việc xử lý dữ liệu cho mục đích marketing trực tiếp bất cứ lúc nào.", icon: "✋" },
                                { right: "Quyền hạn chế", desc: "Yêu cầu tạm thời hạn chế việc xử lý dữ liệu trong khi tranh chấp đang được giải quyết.", icon: "⏸️" },
                                { right: "Quyền di chuyển", desc: "Nhận dữ liệu của bạn ở định dạng có cấu trúc, có thể đọc bằng máy để chuyển sang dịch vụ khác.", icon: "📦" },
                            ].map(item => (
                                <div key={item.right} style={{
                                    display:      "flex",
                                    gap:          "16px",
                                    padding:      "14px 0",
                                    borderBottom: "0.5px solid rgba(200,190,175,0.4)",
                                    alignItems:   "flex-start",
                                }}>
                                    <span style={{ fontSize: "16px", marginTop: "1px", flexShrink: 0 }}>{item.icon}</span>
                                    <div>
                                        <div style={{
                                            fontFamily:    "'Montserrat', sans-serif",
                                            fontSize:      "12.5px",
                                            fontWeight:    500,
                                            color:         "#1C3428",
                                            marginBottom:  "4px",
                                        }}>{item.right}</div>
                                        <div style={{
                                            fontFamily:    "'Montserrat', sans-serif",
                                            fontSize:      "12.5px",
                                            fontWeight:    300,
                                            color:         "#5A7A5A",
                                            lineHeight:    1.7,
                                        }}>{item.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p>
                            Để thực hiện bất kỳ quyền nào ở trên, vui lòng gửi yêu cầu bằng văn bản đến <strong style={{ fontWeight: 500, color: "#2A5038" }}>privacy@bloomandgarden.vn</strong>. Chúng tôi sẽ phản hồi trong vòng <strong style={{ fontWeight: 500 }}>30 ngày</strong> kể từ khi nhận được yêu cầu hợp lệ.
                        </p>
                    </Section>

                    {/* ══════════════════════════════════════════════
                        SECTION 10 — LIÊN HỆ
                    ═══════════════════════════════════════════════ */}
                    <Section id="lien-he" title="Liên Hệ Với Chúng Tôi" badge="Liên hệ">
                        <p style={{ marginBottom: "24px" }}>
                            Nếu bạn có bất kỳ câu hỏi, thắc mắc hoặc phản hồi nào liên quan đến Điều khoản, Chính sách bảo mật, hoặc cách chúng tôi xử lý dữ liệu cá nhân của bạn, đừng ngần ngại liên hệ với chúng tôi.
                        </p>

                        <div style={{
                            display:             "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap:                 "14px",
                            margin:              "0 0 28px",
                        }}>
                            {[
                                { label: "Email chung",      value: "hello@bloomandgarden.vn",   icon: "✉️" },
                                { label: "Email bảo mật",    value: "privacy@bloomandgarden.vn", icon: "🔒" },
                                { label: "Hỗ trợ khách hàng",value: "support@bloomandgarden.vn", icon: "💬" },
                                { label: "Hotline",          value: "1800 6868 (miễn phí)",      icon: "📞" },
                                { label: "Địa chỉ",         value: "123 Lý Tự Trọng, Quận 1, TP.HCM", icon: "📍" },
                                { label: "Giờ làm việc",    value: "T2 – CN: 7:00 – 22:00",     icon: "🕐" },
                            ].map(item => (
                                <div key={item.label} style={{
                                    background:   "rgba(42,96,64,0.04)",
                                    border:       "0.5px solid rgba(42,96,64,0.14)",
                                    borderRadius: "3px",
                                    padding:      "14px 16px",
                                    display:      "flex",
                                    gap:          "12px",
                                    alignItems:   "flex-start",
                                }}>
                                    <span style={{ fontSize: "14px", flexShrink: 0 }}>{item.icon}</span>
                                    <div>
                                        <div style={{
                                            fontFamily:    "'Montserrat', sans-serif",
                                            fontSize:      "9px",
                                            fontWeight:    600,
                                            letterSpacing: "0.12em",
                                            color:         "#A8B8A8",
                                            textTransform: "uppercase",
                                            marginBottom:  "4px",
                                        }}>{item.label}</div>
                                        <div style={{
                                            fontFamily:    "'Montserrat', sans-serif",
                                            fontSize:      "12px",
                                            fontWeight:    400,
                                            color:         "#2A4A2A",
                                            lineHeight:    1.5,
                                        }}>{item.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <InfoBox icon="⚖️" variant="gold">
                            <strong style={{ fontWeight: 500 }}>Cơ quan giám sát:</strong> Nếu bạn cho rằng chúng tôi xử lý dữ liệu cá nhân của bạn không đúng quy định, bạn có quyền khiếu nại đến Bộ Công an (Cục An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao) hoặc các cơ quan chức năng có thẩm quyền tại Việt Nam.
                        </InfoBox>
                    </Section>

                    {/* ── Footer ── */}
                    <div style={{
                        borderTop:  "0.5px solid #D8CCBA",
                        paddingTop: "36px",
                        textAlign:  "center",
                    }}>
                        <div style={{
                            fontFamily:    "'Cormorant Garamond', serif",
                            fontSize:      "22px",
                            fontStyle:     "italic",
                            color:         "#4A7A5A",
                            marginBottom:  "10px",
                        }}>
                            Bloom &amp; Garden
                        </div>
                        <p style={{
                            fontFamily:    "'Montserrat', sans-serif",
                            fontSize:      "11px",
                            fontWeight:    300,
                            color:         "#A8B8A8",
                            letterSpacing: "0.04em",
                            lineHeight:    1.8,
                            maxWidth:      "420px",
                            margin:        "0 auto 20px",
                        }}>
                            Cảm ơn bạn đã tin tưởng Bloom &amp; Garden. Chúng tôi luôn nỗ lực để mang đến trải nghiệm mua sắm hoa tươi đẹp nhất, an toàn nhất.
                        </p>
                        <span style={{
                            fontFamily:    "'Montserrat', sans-serif",
                            fontSize:      "10px",
                            fontWeight:    300,
                            color:         "#C8D0C8",
                            letterSpacing: "0.06em",
                        }}>
                            © 2025 Bloom &amp; Garden. Bảo lưu mọi quyền. ĐKKD: 0312345678.
                        </span>
                    </div>

                </div>
            </div>
        </div>
    );
}