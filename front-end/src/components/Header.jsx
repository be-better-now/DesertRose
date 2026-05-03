import "../css/header.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Flower2, LogOut, User } from "lucide-react";

export default function Header() {
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
        <header className="home-header">
            <div className="brand" onClick={() => navigate("/")}>
                <Flower2 size={22} />
                <span>Desert Rose</span>
            </div>

            <nav>
                <a href="#">Home</a>
                <a href="#">Bouquets</a>
                <a href="#">Occasions</a>
                <a href="#">Contact</a>
            </nav>

            <div className="header-right">
                {user ? (
                    <>
                        <div className="user-chip">
                            <User size={16} />
                            {user.username}
                        </div>

                        <button className="logout-btn" onClick={logout}>
                            <LogOut size={16} />
                        </button>
                    </>
                ) : (
                    <button
                        className="login-btn"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                )}
            </div>
        </header>
    );
}