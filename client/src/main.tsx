import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./fonts/fonts.css";
import HouseDetail from "./pages/HouseDetail";
import TextbookDetail from "./pages/TextbookDetail";
import MiscDetail from "./pages/MiscDetail";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AddRental from "./pages/AddRental";
import AddTextbook from "./pages/AddTextbook";
import Nav from "./components/Nav";
import Textbooks from "./components/Textbooks";
import Houses from "./components/Houses";
import Misc from "./components/Misc";
import { ProtectedRoute } from "./components/ProtectedRoute";
import AddMisc from "./pages/AddMisc";
import AboutUs from "./pages/AboutUs";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<AboutUs />} />
            <Route element={<Nav />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Signup />} />

              <Route element={<ProtectedRoute />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="rentals/:id" element={<HouseDetail />} />
                <Route path="textbooks/:id" element={<TextbookDetail />} />
                <Route path="misc/:id" element={<MiscDetail />} />
                <Route path="rentals/create" element={<AddRental />} />
                <Route path="textbooks/create" element={<AddTextbook />} />
                <Route path="misc/create" element={<AddMisc />} />
              </Route>

              <Route path="textbooks" element={<Textbooks />} />
              <Route path="rentals" element={<Houses />} />
              <Route path="misc" element={<Misc />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
