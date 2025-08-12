import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import { ProtectedRoute } from "./components/ProtectedRoute";
import AddMisc from "./pages/AddMisc";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route>
              <Route path="/" element={<Home />} />
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="rentals/create"
                element={
                  <ProtectedRoute>
                    <AddRental />
                  </ProtectedRoute>
                }
              />
              <Route
                path="textbooks/create"
                element={
                  <ProtectedRoute>
                    <AddTextbook />
                  </ProtectedRoute>
                }
              />
              <Route path="misc/create" element={<AddMisc />} />
              <Route path="rentals/:id" element={<HouseDetail />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Signup />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
