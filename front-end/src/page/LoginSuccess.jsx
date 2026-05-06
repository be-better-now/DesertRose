import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8080/user", {
          method: "GET",
          credentials: "include" // 💥 QUAN TRỌNG
        });

        const data = await res.json();

        localStorage.setItem("user", JSON.stringify(data));

        window.dispatchEvent(new Event("userChanged"));

        navigate("/");
      } catch (err) {
        console.log("Error:", err);
      }
    };

    fetchUser();
  }, []);

  return <div>Logging in with Google...</div>;
}