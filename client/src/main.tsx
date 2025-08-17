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

const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <UnauthenticatedNav/>}
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="rentals/create" element={<AddRental />} />
          <Route path="textbooks/create" element={<AddTextbook />} />
          <Route path="rentals/:id" element={<HouseDetail />} />
        </Route>
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
