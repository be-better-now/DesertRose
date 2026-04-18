import { useState } from "react";

/* ─── Falling petal data (static so no re-render flicker) ─── */
const PETALS = [
    { id: 0,  left: "6%",  delay: "0s",    dur: "11s", w: 14, h: 9  },
    { id: 1,  left: "18%", delay: "2.6s",  dur: "9s",  w: 10, h: 7  },
    { id: 2,  left: "31%", delay: "5.1s",  dur: "12s", w: 16, h: 11 },
    { id: 3,  left: "44%", delay: "1.3s",  dur: "10s", w: 12, h: 8  },
    { id: 4,  left: "57%", delay: "3.9s",  dur: "8s",  w: 11, h: 7  },
    { id: 5,  left: "69%", delay: "0.7s",  dur: "13s", w: 15, h: 10 },
    { id: 6,  left: "79%", delay: "4.6s",  dur: "10s", w: 13, h: 9  },
    { id: 7,  left: "90%", delay: "7.2s",  dur: "11s", w: 9,  h: 6  },
    { id: 8,  left: "13%", delay: "6.4s",  dur: "9s",  w: 14, h: 10 },
    { id: 9,  left: "47%", delay: "8.8s",  dur: "12s", w: 11, h: 8  },
    { id: 10, left: "63%", delay: "3.2s",  dur: "10s", w: 10, h: 7  },
    { id: 11, left: "85%", delay: "9.5s",  dur: "11s", w: 13, h: 9  },
];

/* ─── Global CSS + keyframes ─── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@200;300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes petalFall {
    0%   { transform: translateY(-30px) rotate(0deg)   translateX(0px);   opacity: 0; }
    8%   { opacity: 0.75; }
    50%  { transform: translateY(48vh)  rotate(380deg)  translateX(28px);  }
    92%  { opacity: 0.35; }
    100% { transform: translateY(102vh) rotate(740deg)  translateX(-18px); opacity: 0; }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0);    }
  }

  @keyframes floatBob {
    0%, 100% { transform: translateY(0px);  }
    50%      { transform: translateY(-9px); }
  }

  @keyframes revealLine {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }

  @keyframes spinIn {
    from { transform: rotate(-120deg) scale(0.3); opacity: 0; }
    to   { transform: rotate(0deg)   scale(1);   opacity: 1; }
  }

  .petal {
    position: fixed;
    border-radius: 50% 0 50% 0;
    background: rgba(200, 112, 138, 0.48);
    animation: petalFall linear infinite;
    pointer-events: none;
    z-index: 0;
  }

  .botanical-icon {
    animation: spinIn 1s cubic-bezier(.34,1.56,.64,1) forwards,
               floatBob 5s ease-in-out 1s infinite;
    display: block;
  }

  .form-fade {
    animation: fadeUp 0.85s ease forwards;
    animation-delay: 0.3s;
    opacity: 0;
  }

  /* Field */
  .f-group {
    position: relative;
    margin-bottom: 30px;
  }

  .f-label {
    display: block;
    font-family: 'Jost', sans-serif;
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #8A9E8A;
    margin-bottom: 9px;
  }

  .f-input {
    width: 100%;
    padding: 10px 0 10px 2px;
    background: transparent;
    border: none;
    border-bottom: 1px solid #CBBFA8;
    font-family: 'Jost', sans-serif;
    font-size: 15px;
    font-weight: 300;
    color: #1C3428;
    outline: none;
    letter-spacing: 0.03em;
    transition: border-color 0.3s ease;
  }

  .f-input::placeholder { color: #B8C8B8; }
  .f-input:focus        { border-bottom-color: transparent; }

  .f-bar {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 1.5px;
    background: #1C3428;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.35s ease;
    pointer-events: none;
  }

  .f-input:focus ~ .f-bar { transform: scaleX(1); }

  /* Button */
  .btn-enter {
    width: 100%;
    padding: 15px 24px;
    background: #1C3428;
    color: #EDE5D4;
    border: none;
    font-family: 'Jost', sans-serif;
    font-size: 11.5px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .btn-enter::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }

  .btn-enter:hover::after  { transform: translateX(100%); }
  .btn-enter:hover         { background: #284A38; transform: translateY(-2px); box-shadow: 0 10px 28px rgba(28,52,40,0.30); }
  .btn-enter:active        { transform: translateY(0); box-shadow: none; }

  /* Aux links */
  .aux { color: #8A9E8A; text-decoration: none; font-family: 'Jost',sans-serif; font-size: 12.5px; font-weight: 300; letter-spacing: 0.04em; transition: color 0.2s; }
  .aux:hover { color: #1C3428; }

  /* Social btn */
  .social-btn {
    flex: 1;
    padding: 11px 0;
    background: transparent;
    border: 0.5px solid #C8B898;
    font-family: 'Jost', sans-serif;
    font-size: 12px;
    font-weight: 400;
    color: #5A7A5A;
    cursor: pointer;
    letter-spacing: 0.06em;
    transition: background 0.25s ease, color 0.25s ease;
  }

  .social-btn:hover { background: #EEE6D8; color: #1C3428; }

  @media (max-width: 768px) {
    .botanical-panel { display: none !important; }
    .login-side       { width: 100% !important;   }
  }
`;

/* ─── Botanical SVG illustration ─── */
function Botanical() {
    const outerPetals  = [0, 51, 102, 153, 204, 255, 306];
    const middlePetals = [25, 77, 129, 181, 233];
    const innerPetals  = [12, 84, 156, 228, 300];

    const eucaLeft = [
        { x: 44,  y: 172, r: -32 }, { x: 58,  y: 204, r: 22  },
        { x: 70,  y: 238, r: -28 }, { x: 80,  y: 268, r: 26  },
        { x: 88,  y: 298, r: -18 }, { x: 94,  y: 320, r: 14  },
    ];
    const eucaRight = [
        { x: 450, y: 130, r: 38  }, { x: 436, y: 165, r: -22 },
        { x: 424, y: 205, r: 30  }, { x: 414, y: 244, r: -24 },
        { x: 408, y: 275, r: 18  },
    ];

    return (
        <svg
            viewBox="0 0 500 700"
            width="100%" height="100%"
            style={{ position: "absolute", inset: 0 }}
            aria-hidden="true"
        >
            {/* ── Brand name ── */}
            <text x="250" y="72"
                  textAnchor="middle"
                  fontFamily="Cormorant Garamond, serif"
                  fontSize="38" fontWeight="300" fontStyle="italic"
                  fill="#E4D8C0" opacity="0.92" letterSpacing="4">
                Bloom &amp; Garden
            </text>
            <text x="250" y="100"
                  textAnchor="middle"
                  fontFamily="Jost, sans-serif"
                  fontSize="11" fontWeight="400"
                  fill="#7AAA8A" opacity="0.8" letterSpacing="8">
                FLOWER BOUTIQUE
            </text>
            <line x1="185" y1="114" x2="315" y2="114" stroke="#4A7A5A" strokeWidth="0.5" opacity="0.4"/>

            {/* ── Left eucalyptus branch ── */}
            <path d="M 22 110 C 50 178 72 248 90 322" stroke="#2E6048" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.65"/>
            {eucaLeft.map((l, i) => (
                <ellipse key={i} cx={l.x} cy={l.y} rx="15" ry="8.5"
                         fill="#2E6048" transform={`rotate(${l.r} ${l.x} ${l.y})`} opacity="0.62"/>
            ))}

            {/* ── Right eucalyptus branch ── */}
            <path d="M 478 70 C 444 148 422 222 410 292" stroke="#285838" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.60"/>
            {eucaRight.map((l, i) => (
                <ellipse key={i} cx={l.x} cy={l.y} rx="15" ry="8.5"
                         fill="#285838" transform={`rotate(${l.r} ${l.x} ${l.y})`} opacity="0.58"/>
            ))}

            {/* ── Wildflower — blush (left) ── */}
            <g transform="translate(118, 210)">
                {[0,72,144,216,288].map((r,i) => (
                    <ellipse key={i} cx="0" cy="-17" rx="9" ry="5.5"
                             fill="#E8B0C0" transform={`rotate(${r})`} opacity="0.78"/>
                ))}
                <circle cx="0" cy="0" r="6.5" fill="#F0D060" opacity="0.9"/>
            </g>

            {/* ── Wildflower — peach (right) ── */}
            <g transform="translate(385, 368)">
                {[0,72,144,216,288].map((r,i) => (
                    <ellipse key={i} cx="0" cy="-15" rx="8" ry="5"
                             fill="#F2C8A0" transform={`rotate(${r})`} opacity="0.72"/>
                ))}
                <circle cx="0" cy="0" r="5.5" fill="#E8A040" opacity="0.85"/>
            </g>

            {/* ── Wildflower — lilac (lower-left) ── */}
            <g transform="translate(78, 428)">
                {[0,60,120,180,240,300].map((r,i) => (
                    <ellipse key={i} cx="0" cy="-19" rx="9.5" ry="6"
                             fill="#D0B0D8" transform={`rotate(${r})`} opacity="0.68"/>
                ))}
                <circle cx="0" cy="0" r="7" fill="#B880C0" opacity="0.78"/>
            </g>

            {/* ── Stems to main rose ── */}
            <path d="M 250 700 C 248 636 244 574 250 514" stroke="#2A6040" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <path d="M 250 626 C 218 606 192 618 176 606" stroke="#2A6040" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M 250 582 C 278 560 305 572 316 560" stroke="#2A6040" strokeWidth="2" fill="none" strokeLinecap="round"/>

            {/* Leaves on stems */}
            <ellipse cx="172" cy="604" rx="23" ry="12" fill="#2A6040" transform="rotate(-32 172 604)" opacity="0.78"/>
            <ellipse cx="318" cy="558" rx="23" ry="12" fill="#245838" transform="rotate(22 318 558)"  opacity="0.74"/>
            <ellipse cx="238" cy="654" rx="18" ry="9.5" fill="#2A6040" transform="rotate(-18 238 654)" opacity="0.68"/>

            {/* ── Main rose (center bottom) ── */}
            <g transform="translate(250, 484)" opacity="0.97">
                {outerPetals.map((rot, i) => (
                    <ellipse key={i} cx="0" cy="-54" rx="27" ry="19"
                             fill={i % 2 === 0 ? "#D47892" : "#CA6880"}
                             transform={`rotate(${rot})`} opacity="0.88"/>
                ))}
                {middlePetals.map((rot, i) => (
                    <ellipse key={i} cx="0" cy="-35" rx="21" ry="14"
                             fill={i % 2 === 0 ? "#C06070" : "#B85868"}
                             transform={`rotate(${rot})`} opacity="0.91"/>
                ))}
                {innerPetals.map((rot, i) => (
                    <ellipse key={i} cx="0" cy="-21" rx="14.5" ry="10"
                             fill="#A84860" transform={`rotate(${rot})`} opacity="0.93"/>
                ))}
                <circle cx="0" cy="0" r="14" fill="#8B3050"/>
                <circle cx="0" cy="0" r="8"  fill="#721E3E"/>
                {[0,60,120,180,240,300].map((rot, i) => (
                    <line key={i} x1="0" y1="-5" x2="0" y2="-13"
                          stroke="#B89060" strokeWidth="1.2"
                          transform={`rotate(${rot})`} opacity="0.65"/>
                ))}
                {[0,60,120,180,240,300].map((rot, i) => (
                    <circle key={i} cx="0" cy="-13" r="1.5"
                            fill="#E8B860" transform={`rotate(${rot})`} opacity="0.7"/>
                ))}
            </g>

            {/* ── Lower-right foliage ── */}
            <path d="M 362 684 C 382 642 404 600 424 558" stroke="#285038" strokeWidth="2" fill="none" opacity="0.55"/>
            {[{x:374,y:658,r:26},{x:388,y:630,r:-16},{x:402,y:600,r:30},{x:414,y:572,r:-18}].map((l,i)=>(
                <ellipse key={i} cx={l.x} cy={l.y} rx="17" ry="9"
                         fill="#285038" transform={`rotate(${l.r} ${l.x} ${l.y})`} opacity="0.52"/>
            ))}

            {/* ── Berries ── */}
            {[{x:166,y:344,r:5.5},{x:176,y:336,r:4},{x:156,y:337,r:3.5},
                {x:342,y:462,r:5},{x:352,y:454,r:3.5},{x:332,y:456,r:4.5}].map((b,i)=>(
                <circle key={i} cx={b.x} cy={b.y} r={b.r} fill="#8B3050" opacity="0.58"/>
            ))}

            {/* ── Pollen dots ── */}
            {[{x:204,y:282,r:2},{x:212,y:272,r:1.5},{x:322,y:305,r:2},
                {x:138,y:382,r:1.5},{x:354,y:503,r:2},{x:404,y:424,r:1.5}].map((d,i)=>(
                <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#F0D060" opacity="0.48"/>
            ))}
        </svg>
    );
}

/* ─── Small rose icon (login panel header) ─── */
function RoseIcon() {
    return (
        <svg width="52" height="52" viewBox="0 0 52 52" aria-hidden="true">
            {[0,72,144,216,288].map((r,i)=>(
                <ellipse key={i} cx="26" cy="10" rx="8" ry="5"
                         fill={i%2===0?"#D47892":"#C86880"}
                         transform={`rotate(${r} 26 26)`} opacity="0.9"/>
            ))}
            {[36,108,180,252,324].map((r,i)=>(
                <ellipse key={i} cx="26" cy="16" rx="5.5" ry="3.5"
                         fill="#BE5870" transform={`rotate(${r} 26 26)`} opacity="0.88"/>
            ))}
            <circle cx="26" cy="26" r="8"  fill="#8B3050"/>
            <circle cx="26" cy="26" r="4.5" fill="#6B1A36"/>
        </svg>
    );
}

/* ─── Main component ─── */
export default function FlowerLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading,  setLoading]  = useState(false);
    const [done,     setDone]     = useState(false);

    const handleLogin = async () => {
        if (!username || !password) {
            alert("Nhập đủ đi m");
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data);
            }

            console.log("User:", data);

            alert("Login successfully");

            // lưu user
            localStorage.setItem("user", JSON.stringify(data));

        } catch (err) {
            alert("Login fail: " + err.message);
        }
    };

    return (
        <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
            <style>{CSS}</style>

            {/* ── Falling petals (global overlay) ── */}
            {PETALS.map(p => (
                <div key={p.id} className="petal" style={{
                    left: p.left,
                    top: "-20px",
                    width:  `${p.w}px`,
                    height: `${p.h}px`,
                    animationDuration: p.dur,
                    animationDelay:    p.delay,
                }}/>
            ))}

            {/* ══════════════════════════════════════
          LEFT — Botanical panel
      ══════════════════════════════════════ */}
            <div
                className="botanical-panel"
                style={{
                    width: "55%",
                    flexShrink: 0,
                    position: "relative",
                    overflow: "hidden",
                    background: "#152818",
                }}
            >
                {/* Radial glow overlay */}
                <div style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    background: "radial-gradient(ellipse at 35% 72%, rgba(44,88,60,0.38) 0%, transparent 58%)",
                }}/>

                <Botanical />

                {/* Bottom tagline */}
                <p style={{
                    position: "absolute", bottom: 36, left: 0, right: 0,
                    textAlign: "center",
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "11px", fontWeight: 300,
                    color: "rgba(148, 192, 148, 0.55)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                }}>
                    Fresh flowers for every occasion
                </p>
            </div>

            {/* ══════════════════════════════════════
          RIGHT — Login panel
      ══════════════════════════════════════ */}
            <div
                className="login-side"
                style={{
                    width: "45%",
                    background: "#FAF6EE",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Subtle rose watermark */}
                <div style={{
                    position: "absolute", right: "-70px", bottom: "-70px",
                    width: "290px", height: "290px", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(200,112,138,0.10) 0%, transparent 68%)",
                    pointerEvents: "none",
                }}/>
                <div style={{
                    position: "absolute", left: "-50px", top: "-50px",
                    width: "200px", height: "200px", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(180,144,80,0.07) 0%, transparent 65%)",
                    pointerEvents: "none",
                }}/>

                <div className="form-fade" style={{ width: "100%", maxWidth: "360px", padding: "0 44px" }}>

                    {/* Rose icon */}
                    <div style={{ textAlign: "center", marginBottom: "28px" }}>
                        <div className="botanical-icon">
                            <RoseIcon />
                        </div>
                    </div>

                    {/* Heading */}
                    <h1 style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "38px", fontWeight: 300,
                        color: "#1A3024",
                        textAlign: "center", lineHeight: 1.15,
                        marginBottom: "8px", letterSpacing: "0.01em",
                    }}>
                        Welcome back
                    </h1>
                    <p style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "12.5px", fontWeight: 300,
                        color: "#789A78",
                        textAlign: "center", letterSpacing: "0.06em",
                        marginBottom: "44px",
                    }}>
                        Sign in to your garden
                    </p>

                    {/* Username */}
                    <div className="f-group">
                        <label className="f-label">Username</label>
                        <input
                            className="f-input"
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="your_username"
                            onKeyDown={e => e.key === "Enter" && handleLogin()}
                        />
                        <div className="f-bar"/>
                    </div>

                    {/* Password */}
                    <div className="f-group">
                        <label className="f-label">Password</label>
                        <input
                            className="f-input"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            onKeyDown={e => e.key === "Enter" && handleLogin()}
                        />
                        <div className="f-bar"/>
                    </div>

                    {/* Remember + forgot */}
                    <div style={{
                        display: "flex", justifyContent: "space-between",
                        alignItems: "center", marginBottom: "28px",
                    }}>
                        <label style={{
                            display: "flex", alignItems: "center", gap: "7px", cursor: "pointer",
                            fontFamily: "'Jost', sans-serif", fontSize: "12px",
                            fontWeight: 300, color: "#8A9E8A", letterSpacing: "0.03em",
                        }}>
                            <input type="checkbox" style={{ accentColor: "#1C3428", width: "13px", height: "13px" }}/>
                            Remember me
                        </label>
                        <a href="#" className="aux">Forgot password?</a>
                    </div>

                    {/* CTA button */}
                    <button className="btn-enter" onClick={handleLogin}>
                        {done
                            ? "✦  Welcome to the Garden"
                            : loading
                                ? "Opening the gate…"
                                : "Enter the Garden  →"}
                    </button>

                    {/* Divider */}
                    <div style={{
                        display: "flex", alignItems: "center",
                        margin: "30px 0 22px", gap: "14px",
                    }}>
                        <div style={{ flex: 1, height: "0.5px", background: "#C8B898", opacity: 0.45 }}/>
                        <span style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "15px", fontStyle: "italic",
                            color: "#C8A878", opacity: 0.65,
                        }}>✦</span>
                        <div style={{ flex: 1, height: "0.5px", background: "#C8B898", opacity: 0.45 }}/>
                    </div>

                    {/* Social */}
                    <p style={{
                        textAlign: "center",
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "11.5px", fontWeight: 300,
                        color: "#98A898", letterSpacing: "0.05em",
                        marginBottom: "14px",
                    }}>
                        or continue with
                    </p>

                    <div style={{ display: "flex", gap: "12px" }}>
                        {["Google", "Facebook"].map(p => (
                            <button key={p} className="social-btn">{p}</button>
                        ))}
                    </div>

                    {/* Sign-up prompt */}
                    <p style={{
                        textAlign: "center", marginTop: "28px",
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "12.5px", fontWeight: 300,
                        color: "#98A898", letterSpacing: "0.02em",
                    }}>
                        New here?{" "}
                        <a href="#" className="aux" style={{ color: "#5A7A5A", fontWeight: 400 }}>
                            Create an account
                        </a>
                    </p>

                </div>
            </div>
        </div>
    );
}