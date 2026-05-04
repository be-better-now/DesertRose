import "../css/header.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { Flower2, LogOut, User, ChevronDown } from "lucide-react";

export default function Header() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [menuPos, setMenuPos] = useState({ left: 0, top: 0 });
    const triggerRef = useRef(null);

    const [openOcc, setOpenOcc] = useState(false);
    const [menuPosOcc, setMenuPosOcc] = useState({ left: 0, top: 0 });
    const triggerRefOcc = useRef(null);

    const occasionTypes = useMemo(() => [
        "Hoa Sinh Nhật",
        "Hoa Cưới",
        "Hoa Khai Trương",
        "Hoa Tốt Nghiệp",
        "Hoa Chia Buồn",
        "Hoa Chúc Mừng"
    ], []);

    const bouquetTypes = useMemo(() => [
        "Bó Hoa Tươi",
        "Hoa Để Bàn",
        "Hộp hoa",
        "Giỏ Hoa",
        "Lẵng hoa",
        "Hoa Gấu Bông",
        "Hoa Tiền",
        "Hoa Sáp",
        "Hoa ăn được"
    ], []);

    useEffect(() => {
        const data = localStorage.getItem("user");
        if (data) setUser(JSON.parse(data));
    }, []);

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    };

    const measure = () => {
        const el = triggerRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        setMenuPos({ left: r.left + r.width / 2, top: r.bottom });
    };

    const measureOcc = () => {
        const el = triggerRefOcc.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        setMenuPosOcc({ left: r.left + r.width / 2, top: r.bottom });
    };

    useEffect(() => {
        if (!open) return;
        measure();
        window.addEventListener("resize", measure);
        window.addEventListener("scroll", measure, true);
        return () => {
            window.removeEventListener("resize", measure);
            window.removeEventListener("scroll", measure, true);
        };
    }, [open]);

    useEffect(() => {
        if (!openOcc) return;
        measureOcc();
        window.addEventListener("resize", measureOcc);
        window.addEventListener("scroll", measureOcc, true);
        return () => {
            window.removeEventListener("resize", measureOcc);
            window.removeEventListener("scroll", measureOcc, true);
        };
    }, [openOcc]);

    return (
        <header className="home-header">

            {/* Brand */}
            <div className="brand" onClick={() => navigate("/")}>
                <Flower2 size={20} />
                <span>Desert Rose</span>
            </div>

            {/* Nav */}
            <nav>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
                    Home
                </a>

                

                <div
                    className="nav-dropdown"
                    onMouseEnter={() => { setOpen(true); requestAnimationFrame(measure); }}
                    onMouseLeave={() => setOpen(false)}
                >
                    <a
                        ref={triggerRef}
                        href="#"
                        className="nav-dropdown-trigger"
                        onClick={(e) => { e.preventDefault(); navigate("/bouquets"); }}
                    >
                        Bouquets <ChevronDown size={14} />
                    </a>

                    {open && (
                        <div
                            className="nav-dropdown-menu"
                            style={{ left: `${menuPos.left}px`, top: `${menuPos.top + 16}px` }}
                            role="menu"
                            aria-label="Bouquet types"
                        >
                            {bouquetTypes.map((t) => (
                                <a
                                    key={t}
                                    href="#"
                                    role="menuitem"
                                    onClick={(e) => { e.preventDefault(); navigate("/bouquets"); }}
                                >
                                    {t}
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                <div
                    className="nav-dropdown"
                    onMouseEnter={() => { setOpenOcc(true); requestAnimationFrame(measureOcc); }}
                    onMouseLeave={() => setOpenOcc(false)}
                >
                    <a
                        ref={triggerRefOcc}
                        href="#"
                        className="nav-dropdown-trigger"
                        onClick={(e) => e.preventDefault()}
                    >
                        Occasions <ChevronDown size={14} />
                    </a>

                    {openOcc && (
                        <div
                            className="nav-dropdown-menu"
                            style={{ left: `${menuPosOcc.left}px`, top: `${menuPosOcc.top + 16}px` }}
                            role="menu"
                            aria-label="Occasions"
                        >
                            {occasionTypes.map((t) => (
                                <a
                                    key={t}
                                    href="#"
                                    role="menuitem"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    {t}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
                
                <a href="#" onClick={(e) => e.preventDefault()}>Contact</a>

                <a href="/about" onClick={(e) => { e.preventDefault(); navigate("/about"); }}>
                    About
                </a>
            </nav>

            {/* Right */}
            <div className="header-right">
                {user ? (
                    <>
                        <div className="user-chip">
                            <User size={15} />
                            {user.username}
                        </div>
                        <button className="logout-btn" onClick={logout} title="Logout">
                            <LogOut size={15} />
                        </button>
                    </>
                ) : (
                    <button className="login-btn" onClick={() => navigate("/login")}>
                        Login
                    </button>
                )}
            </div>





        </header>
    );
}