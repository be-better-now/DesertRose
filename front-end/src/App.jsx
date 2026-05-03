import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import FlowerLogin from "./page/FlowerLogin";
import Bouquets from "./page/Bouquets";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<FlowerLogin />} />
          <Route path="/bouquets" element={<Bouquets />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;