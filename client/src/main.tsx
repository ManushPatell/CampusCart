import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./fonts/fonts.css";
import HouseDetail from "./pages/HouseDetail";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AddRental from "./pages/AddRental";
import AddTextbook from "./pages/AddTextbook";
import UnauthenticatedNav from "./components/Nav";
import Textbooks from "./components/Textbooks";
import Houses from "./components/Houses";
import { ProtectedRoute } from "./components/ProtectedRoute";
import AddMisc from "./pages/AddMisc";

const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <UnauthenticatedNav />}
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="rentals/:id" element={<HouseDetail />} />
          <Route path="rentals/create" element={<AddRental />} />
          <Route path="textbooks/create" element={<AddTextbook />} />
          <Route path="misc/create" element={<AddMisc />} />
        </Route>
        <Route path="textbooks" element={<Textbooks />} />
        <Route path="rentals" element={<Houses />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />
      </Routes>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
