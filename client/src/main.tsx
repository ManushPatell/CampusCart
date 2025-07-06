import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterNav from "./components/RegisterNav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./fonts/fonts.css";
import HouseDetail from "./pages/HouseDetail";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<RegisterNav />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />
        <Route path="rentals/:id" element={<HouseDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
