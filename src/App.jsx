import React, { Suspense, lazy } from 'react';
import { Routes, Route } from "react-router-dom";
import "./assets/tailwind.css";

// Import Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import GuestLayout from "./layouts/GuestLayout";

// Lazy Loading Pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Orders = lazy(() => import("./pages/Orders"));
const Customers = lazy(() => import("./pages/Customers"));
const NotFound = lazy(() => import("./pages/NotFound"));
const GuestPage = lazy(() => import("./pages/GuestPage"));

// Import Pages Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";

// Komponen Loading Sederhana
const Loading = () => <div className="p-5">Loading...</div>;

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Group Halaman Guest / Landing Page */}
        <Route element={<GuestLayout />}>
          <Route path="/guest" element={<GuestPage />} />
        </Route>

        {/* Group Halaman Utama */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
        </Route>

        {/* Group Halaman Auth */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
