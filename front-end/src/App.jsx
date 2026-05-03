import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import FlowerLogin from "./page/FlowerLogin";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<FlowerLogin />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;