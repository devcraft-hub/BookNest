import React, { useEffect } from "react";

import Navbar from "./components/Navbar/Navbar";

import Footer from "./components/Footer/Footer";

import Home from "./pages/Home";

import Profile from "./pages/Profile";

import Cart from "./pages/Cart";

import AllBooks from "./pages/Allbooks";

import SignUp from "./pages/SignUp";

import LogIn from "./pages/Login";

import AboutUs from "./pages/AboutUs";

import AdminDashboard from "./pages/Admin/AdminDashboard";

import AddBook from "./pages/Admin/AddBook";

import UpdateBook from "./pages/Admin/UpdateBook";

import AdminOrders from "./pages/Admin/AdminOrders";

import AdminUsers from "./pages/Admin/AdminUsers";

import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";

import Favourites from "./components/Profile/Favourites";

import RecentlyViewed from "./components/Profile/RecentlyViewed";

import UserOrderHistory from "./components/Profile/UserOrderHistory";

import Settings from "./components/Profile/Settings";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useDispatch } from "react-redux";

import { authActions } from "./store/auth";

function App() {

  const dispatch = useDispatch();

  // =====================
  // RESTORE LOGIN
  // =====================

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    const role =
      localStorage.getItem("role");

    const id =
      localStorage.getItem("id");

    if (token && role && id) {

      dispatch(
        authActions.login({ role })
      );
    }

  }, [dispatch]);

  // =====================
  // ADMIN PROTECTION
  // =====================

  const AdminRoute = ({
    children,
  }) => {

    const role =
      localStorage.getItem("role");

    const token =
      localStorage.getItem("token");

    return role === "admin" &&
      token

      ? children

      : <Navigate to="/" />;
  };

  // =====================
  // USER PROTECTION
  // =====================

  const UserRoute = ({
    children,
  }) => {

    const token =
      localStorage.getItem("token");

    return token

      ? children

      : <Navigate to="/login" />;
  };

  return (

    <Router>

      {/* ===================== */}
      {/* APP LAYOUT */}
      {/* ===================== */}

      <div className="min-h-screen flex flex-col justify-between bg-zinc-950 text-white overflow-x-hidden">

        {/* ===================== */}
        {/* NAVBAR */}
        {/* ===================== */}

        <Navbar />

        {/* ===================== */}
        {/* MAIN CONTENT */}
        {/* ===================== */}

        <main className="flex-1 bg-zinc-950">

          <Routes>

            {/* ===================== */}
            {/* PUBLIC ROUTES */}
            {/* ===================== */}

            {/* Home */}

            <Route
              path="/"
              element={<Home />}
            />

            {/* All Books */}

            <Route
              path="/all-books"
              element={<AllBooks />}
            />

            {/* Signup */}

            <Route
              path="/signup"
              element={<SignUp />}
            />

            {/* Login */}

            <Route
              path="/login"
              element={<LogIn />}
            />

            {/* About Us */}

            <Route
              path="/about-us"
              element={<AboutUs />}
            />

            {/* View Book Details */}

            <Route
              path="/view-book-details/:id"
              element={<ViewBookDetails />}
            />

            {/* ===================== */}
            {/* USER ROUTES */}
            {/* ===================== */}

            {/* Cart */}

            <Route
              path="/cart"
              element={
                <UserRoute>

                  <Cart />

                </UserRoute>
              }
            />

            {/* Profile */}

            <Route
              path="/profile"
              element={
                <UserRoute>

                  <Profile />

                </UserRoute>
              }
            >

              {/* Default */}

              <Route
                index
                element={<Favourites />}
              />

              {/* Favourites */}

              <Route
                path="favourites"
                element={<Favourites />}
              />

              {/* Recently Viewed */}

              <Route
                path="recently-viewed"
                element={<RecentlyViewed />}
              />

              {/* Orders */}

              <Route
                path="orders"
                element={<UserOrderHistory />}
              />

              {/* Settings */}

              <Route
                path="settings"
                element={<Settings />}
              />

            </Route>

            {/* ===================== */}
            {/* ADMIN ROUTES */}
            {/* ===================== */}

            {/* Dashboard */}

            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>

                  <AdminDashboard />

                </AdminRoute>
              }
            />

            {/* Add Book */}

            <Route
              path="/admin/add-book"
              element={
                <AdminRoute>

                  <AddBook />

                </AdminRoute>
              }
            />

            {/* Admin Orders */}

            <Route
              path="/admin/orders"
              element={
                <AdminRoute>

                  <AdminOrders />

                </AdminRoute>
              }
            />

            {/* Admin Users */}

            <Route
              path="/admin/users"
              element={
                <AdminRoute>

                  <AdminUsers />

                </AdminRoute>
              }
            />

            {/* Update Book */}

            <Route
              path="/update-book/:id"
              element={
                <AdminRoute>

                  <UpdateBook />

                </AdminRoute>
              }
            />

            {/* ===================== */}
            {/* INVALID ROUTE */}
            {/* ===================== */}

            <Route
              path="*"
              element={<Navigate to="/" />}
            />

          </Routes>

        </main>

        {/* ===================== */}
        {/* FOOTER */}
        {/* ===================== */}

        <Footer />

      </div>

    </Router>
  );
}

export default App;