import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/flower-login.css";

/* ─── PETALS ─── */
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

/* ─── BOTANICAL SVG (identical to login) ─── */
function Botanical() {
    const outerPetals  = [0, 51, 102, 153, 204, 255, 306];
    const middlePetals = [25, 77, 129, 181, 233];
    const innerPetals  = [12, 84, 156, 228, 300];

    const eucaLeft  = [
        { x: 44, y: 172, r: -32 }, { x: 58,  y: 204, r: 22  },
        { x: 70, y: 238, r: -28 }, { x: 80,  y: 268, r: 26  },
        { x: 88, y: 298, r: -18 }, { x: 94,  y: 320, r: 14  },
    ];
    const eucaRight = [
        { x: 450, y: 130, r: 38  }, { x: 436, y: 165, r: -22 },
        { x: 424, y: 205, r: 30  }, { x: 414, y: 244, r: -24 },
        { x: 408, y: 275, r: 18  },
    ];

    return (
        <svg viewBox="0 0 500 700" width="100%" height="100%"
            style={{ position: "absolute", inset: 0 }} aria-hidden="true">

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
            <line x1="185" y1="114" x2="315" y2="114"
                stroke="#4A7A5A" strokeWidth="0.5" opacity="0.4" />

            <path d="M 22 110 C 50 178 72 248 90 322"
                stroke="#2E6048" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.65" />
            {eucaLeft.map((l, i) => (
                <ellipse key={i} cx={l.x} cy={l.y} rx="15" ry="8.5"
                    fill="#2E6048" transform={`rotate(${l.r} ${l.x} ${l.y})`} opacity="0.62" />
            ))}

            <path d="M 478 70 C 444 148 422 222 410 292"
                stroke="#285838" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.60" />
            {eucaRight.map((l, i) => (
                <ellipse key={i} cx={l.x} cy={l.y} rx="15" ry="8.5"
                    fill="#285838" transform={`rotate(${l.r} ${l.x} ${l.y})`} opacity="0.58" />
            ))}

            <g transform="translate(118, 210)">
                {[0, 72, 144, 216, 288].map((r, i) => (
                    <ellipse key={i} cx="0" cy="-17" rx="9" ry="5.5"
                        fill="#E8B0C0" transform={`rotate(${r})`} opacity="0.78" />
                ))}
                <circle cx="0" cy="0" r="6.5" fill="#F0D060" opacity="0.9" />
            </g>

            <g transform="translate(385, 368)">
                {[0, 72, 144, 216, 288].map((r, i) => (
                    <ellipse key={i} cx="0" cy="-15" rx="8" ry="5"
                        fill="#F2C8A0" transform={`rotate(${r})`} opacity="0.72" />
                ))}
                <circle cx="0" cy="0" r="5.5" fill="#E8A040" opacity="0.85" />
            </g>

            <g transform="translate(78, 428)">
                {[0, 60, 120, 180, 240, 300].map((r, i) => (
                    <ellipse key={i} cx="0" cy="-19" rx="9.5" ry="6"
                        fill="#D0B0D8" transform={`rotate(${r})`} opacity="0.68" />
                ))}
                <circle cx="0" cy="0" r="7" fill="#B880C0" opacity="0.78" />
            </g>

            <path d="M 250 700 C 248 636 244 574 250 514"
                stroke="#2A6040" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 250 626 C 218 606 192 618 176 606"
                stroke="#2A6040" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 250 582 C 278 560 305 572 316 560"
                stroke="#2A6040" strokeWidth="2" fill="none" strokeLinecap="round" />

            <ellipse cx="172" cy="604" rx="23" ry="12"
                fill="#2A6040" transform="rotate(-32 172 604)" opacity="0.78" />
            <ellipse cx="318" cy="558" rx="23" ry="12"
                fill="#245838" transform="rotate(22 318 558)" opacity="0.74" />
            <ellipse cx="238" cy="654" rx="18" ry="9.5"
                fill="#2A6040" transform="rotate(-18 238 654)" opacity="0.68" />

            <g transform="translate(250, 484)" opacity="0.97">
                {outerPetals.map((rot, i) => (
                    <ellipse key={i} cx="0" cy="-54" rx="27" ry="19"
                        fill={i % 2 === 0 ? "#D47892" : "#CA6880"}
                        transform={`rotate(${rot})`} opacity="0.88" />
                ))}
                {middlePetals.map((rot, i) => (
                    <ellipse key={i} cx="0" cy="-35" rx="21" ry="14"
                        fill={i % 2 === 0 ? "#C06070" : "#B85868"}
                        transform={`rotate(${rot})`} opacity="0.91" />
                ))}
                {innerPetals.map((rot, i) => (
                    <ellipse key={i} cx="0" cy="-21" rx="14.5" ry="10"
                        fill="#A84860" transform={`rotate(${rot})`} opacity="0.93" />
                ))}
                <circle cx="0" cy="0" r="14" fill="#8B3050" />
                <circle cx="0" cy="0" r="8"  fill="#721E3E" />
                {[0, 60, 120, 180, 240, 300].map((rot, i) => (
                    <line key={i} x1="0" y1="-5" x2="0" y2="-13"
                        stroke="#B89060" strokeWidth="1.2"
                        transform={`rotate(${rot})`} opacity="0.65" />
                ))}
                {[0, 60, 120, 180, 240, 300].map((rot, i) => (
                    <circle key={i} cx="0" cy="-13" r="1.5"
                        fill="#E8B860" transform={`rotate(${rot})`} opacity="0.7" />
                ))}
            </g>

            <path d="M 362 684 C 382 642 404 600 424 558"
                stroke="#285038" strokeWidth="2" fill="none" opacity="0.55" />
            {[{ x: 374, y: 658, r: 26 }, { x: 388, y: 630, r: -16 },
              { x: 402, y: 600, r: 30 }, { x: 414, y: 572, r: -18 }].map((l, i) => (
                <ellipse key={i} cx={l.x} cy={l.y} rx="17" ry="9"
                    fill="#285038" transform={`rotate(${l.r} ${l.x} ${l.y})`} opacity="0.52" />
            ))}

            {[{ x: 166, y: 344, r: 5.5 }, { x: 176, y: 336, r: 4   }, { x: 156, y: 337, r: 3.5 },
              { x: 342, y: 462, r: 5   }, { x: 352, y: 454, r: 3.5  }, { x: 332, y: 456, r: 4.5 }].map((b, i) => (
                <circle key={i} cx={b.x} cy={b.y} r={b.r} fill="#8B3050" opacity="0.58" />
            ))}

            {[{ x: 204, y: 282, r: 2 }, { x: 212, y: 272, r: 1.5 }, { x: 322, y: 305, r: 2   },
              { x: 138, y: 382, r: 1.5 }, { x: 354, y: 503, r: 2 }, { x: 404, y: 424, r: 1.5 }].map((d, i) => (
                <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#F0D060" opacity="0.48" />
            ))}
        </svg>
    );
}

/* ─── Small rose icon ─── */
function RoseIcon() {
    return (
        <svg width="52" height="52" viewBox="0 0 52 52" aria-hidden="true">
            {[0, 72, 144, 216, 288].map((r, i) => (
                <ellipse key={i} cx="26" cy="10" rx="8" ry="5"
                    fill="#D47892" transform={`rotate(${r} 26 26)`} />
            ))}
            <circle cx="26" cy="26" r="8" fill="#8B3050" />
        </svg>
    );
}

/* ─── Divider ─── */
function Divider() {
    return (
        <div style={{
            display: "flex", alignItems: "center",
            gap: "14px", margin: "6px 0 28px",
        }}>
            <div style={{ flex: 1, height: "0.5px", background: "#CBBFA8" }} />
            <span style={{
                fontFamily: "'Jost', sans-serif", fontSize: "10px",
                letterSpacing: "0.14em", color: "#A8B8A8",
                textTransform: "uppercase",
            }}>
                or continue with
            </span>
            <div style={{ flex: 1, height: "0.5px", background: "#CBBFA8" }} />
        </div>
    );
}

/* ─── Field component — defined OUTSIDE parent to prevent remount on every render ─── */
function Field({ label, id, type = "text", onChange }) {
    return (
        <div className="f-group">
            <label className="f-label" htmlFor={id}>{label}</label>
            <input
                id={id}
                type={type}
                className="f-input"
                autoComplete={type === "password" ? "new-password" : "off"}
                onChange={e => onChange(id, e.target.value)}
            />
            <div className="f-bar" />
        </div>
    );
}

/* ─── REGISTER PAGE ─── */
export default function FlowerRegister() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirm: "",
    });
    const [error,   setError]   = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }));
        setError("");
    };

    const handleRegister = async () => {
        if (loading) return;
        const { fullName, username, email, password, confirm } = form;

        if (!fullName || !username || !email || !password)
            return setError("Vui lòng nhập đầy đủ thông tin.");
        if (password !== confirm)
            return setError("Mật khẩu xác nhận không khớp.");

        setLoading(true);
        try {
            const res  = await fetch("http://localhost:8080/api/auth/register", {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify({ fullName, username, email, password }),
            });
            const data = await res.json();
            if (!res.ok) return setError(data.message || "Đăng ký thất bại.");
            navigate("/login");
        } catch {
            setError("Không thể kết nối server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>

            {/* ── Falling petals ── */}
            {PETALS.map(p => (
                <div key={p.id} className="petal" style={{
                    left:              p.left,
                    top:               "-20px",
                    width:             `${p.w}px`,
                    height:            `${p.h}px`,
                    animationDuration: p.dur,
                    animationDelay:    p.delay,
                }} />
            ))}

            {/* ── Left botanical panel ── */}
            <div className="botanical-panel" style={{
                width:      "55%",
                background: "#152818",
                position:   "relative",
                overflow:   "hidden",
                flexShrink: 0,
            }}>
                <Botanical />
            </div>

            {/* ── Right register panel ── */}
            <div
                className="login-side register-side"
                style={{
                    width:          "45%",
                    background:     "#FAF6EE",
                    display:        "flex",
                    alignItems:     "flex-start",   /* allow inner scroll */
                    justifyContent: "center",
                    position:       "relative",
                    overflowY:      "auto",          /* scroll if viewport too short */
                    overflowX:      "hidden",
                }}
            >
                {/* Ambient glows */}
                <div style={{
                    position: "absolute", right: "-70px", bottom: "-70px",
                    width: "290px", height: "290px", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(200,112,138,0.10) 0%, transparent 68%)",
                    pointerEvents: "none",
                }} />
                <div style={{
                    position: "absolute", left: "-50px", top: "-50px",
                    width: "200px", height: "200px", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(180,144,80,0.07) 0%, transparent 65%)",
                    pointerEvents: "none",
                }} />

                {/* ── Form card ── */}
                <div
                    className="form-fade"
                    style={{
                        width:     "100%",
                        maxWidth:  "360px",
                        padding:   "48px 44px 52px",
                    }}
                >
                    {/* Rose icon */}
                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                        <div className="botanical-icon">
                            <RoseIcon />
                        </div>
                    </div>

                    {/* Heading */}
                    <h1 style={{
                        fontFamily:   "'Cormorant Garamond', serif",
                        fontSize:     "36px",
                        fontWeight:   300,
                        textAlign:    "center",
                        color:        "#1C3428",
                        lineHeight:   1.15,
                        marginBottom: "6px",
                    }}>
                        Create account
                    </h1>

                    <p style={{
                        textAlign:    "center",
                        marginBottom: "32px",
                        color:        "#789A78",
                        fontFamily:   "'Jost', sans-serif",
                        fontSize:     "13px",
                        fontWeight:   300,
                        letterSpacing: "0.03em",
                    }}>
                        Join the garden 🌿
                    </p>

                    {/* Fields */}
                    <Field label="Full name"        id="fullName" onChange={handleChange} />
                    <Field label="Username"         id="username" onChange={handleChange} />
                    <Field label="Email"            id="email"    type="email"    onChange={handleChange} />
                    <Field label="Password"         id="password" type="password" onChange={handleChange} />
                    <Field label="Confirm password" id="confirm"  type="password" onChange={handleChange} />

                    {/* Error */}
                    {error && (
                        <p style={{
                            fontFamily:   "'Monserrat', sans-serif",
                            fontSize:     "12.5px",
                            fontWeight:   400,
                            color:        "#B84848",
                            background:   "rgba(184,72,72,0.06)",
                            border:       "0.5px solid rgba(184,72,72,0.18)",
                            borderRadius: "2px",
                            padding:      "10px 14px",
                            marginBottom: "20px",
                            letterSpacing: "0.02em",
                        }}>
                            {error}
                        </p>
                    )}

                    {/* CTA */}
                    <button
                        className="btn-enter"
                        onClick={handleRegister}
                        disabled={loading}
                        style={{ marginBottom: "0" }}
                    >
                        {loading ? "Planting…" : "Create account →"}
                    </button>

                    {/* Divider */}
                    <Divider />

                    {/* Social stubs */}
                    <div style={{ display: "flex", gap: "12px", marginBottom: "32px" }}>
                        <button className="social-btn">Google</button>
                        <button className="social-btn">Facebook</button>
                    </div>

                    {/* Switch to login */}
                    <p style={{
                        textAlign:     "center",
                        color:         "#98A898",
                        fontFamily:    "'Monserrat', sans-serif",
                        fontSize:      "13px",
                        fontWeight:    300,
                        letterSpacing: "0.03em",
                    }}>
                        Already have an account?{" "}
                        <span
                            className="aux"
                            role="button"
                            tabIndex={0}
                            style={{ cursor: "pointer", color: "#5A7A5A", fontWeight: 400 }}
                            onClick={() => navigate("/login")}
                            onKeyDown={e => e.key === "Enter" && navigate("/login")}
                        >
                            Sign in
                        </span>
                    </p>

                    {/* Legal footnote */}
                    <p style={{
                        textAlign:     "center",
                        marginTop:     "18px",
                        color:         "#B8C8B8",
                        fontFamily:    "'Jost', sans-serif",
                        fontSize:      "10px",
                        letterSpacing: "0.06em",
                        lineHeight:    1.7,
                    }}>
                        By creating an account you agree to our{" "}
                        <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => navigate("/terms&privacy")}>
                            Terms
                        </span>
                        {" "}&amp;{" "}
                        <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => navigate("/terms&privacy")}>
                            Privacy Policy
                        </span>
                    </p>

                </div>
            </div>
        </div>
    );
}