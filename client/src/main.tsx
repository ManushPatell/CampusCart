import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UnauthenticatedNav from "./components/Nav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./fonts/fonts.css";
import HouseDetail from "./pages/HouseDetail";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route >
            <Route path="/" element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="rentals/:id" element={<HouseDetail />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Signup />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
