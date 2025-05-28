import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<NavBar />}>
          <Route index element={<Home />} />

        </Route>

          <Route path="login" element={<Login />} />
    <Route path="register" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
