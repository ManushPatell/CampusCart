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
import TextbookDetail from "./pages/TextbookDetail";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import Textbooks from "./components/Textbooks";
import Houses from "./components/Houses";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route >
            <Route path="/" element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="rentals/:id" element={<HouseDetail />} />
            <Route path="textbooks/:id" element={<TextbookDetail />} />
          </Route>
          <Route path="textbooks" element={<Textbooks />} />
          <Route path="rentals" element={<Houses />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Signup />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
