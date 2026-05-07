import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import FlowerLogin from "./page/FlowerLogin";
import FlowerRegister from "./page/FlowerRegister";
import Bouquets from "./page/Bouquets";
import Occasions from "./page/Occasions";
import Contact from "./page/Contact";
import About from "./page/About";
import Termsandprivacy from "./page/Termsandprivacy";
import LoginSuccess from "./page/LoginSuccess";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminDashboard from "./page/admin/AdminDashboard";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<FlowerLogin />} />
        <Route path="/register" element={<FlowerRegister />} />
        <Route path="/bouquets" element={<Bouquets />} />
        <Route path="/occasions" element={<Occasions />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms&privacy" element={<Termsandprivacy />} />
        <Route path="/login-success" element={<LoginSuccess />} />

        {/* ADMIN ROUTE */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;