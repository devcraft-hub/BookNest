import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { HiOutlineMenuAlt3 } from "react-icons/hi";

import { RxCross2 } from "react-icons/rx";

import { FaShoppingCart } from "react-icons/fa";

import { FaUserCircle } from "react-icons/fa";

import { MdAdminPanelSettings } from "react-icons/md";

import { useSelector, useDispatch } from "react-redux";

import { authActions } from "../../store/auth";

function Navbar() {

  const navigate = useNavigate();

  // mobile menu state

  const [menuOpen, setMenuOpen] =
    useState(false);

  // redux

  const isLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn
  );

  const dispatch = useDispatch();

  // role

  const role =
    localStorage.getItem("role");

  // cart count

  const cartCount =
    JSON.parse(
      localStorage.getItem("cartCount")
    ) || 0;

  // logout

  const logout = () => {

    localStorage.clear();

    dispatch(authActions.logout());

    navigate("/login");
  };

  // navbar links array

  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About Us",
      link: "/about-us",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
  ];

  return (

    <nav className="bg-zinc-900/95 backdrop-blur-md text-white px-6 md:px-8 py-4 shadow-lg sticky top-0 z-50 border-b border-zinc-800">

      <div className="flex items-center justify-between">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3 cursor-pointer group"
        >

          <img
            src="/books.png"
            alt="logo"
            className="h-12 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
          />

          <h1 className="text-3xl font-bold tracking-wide transition-all duration-300 group-hover:text-blue-400">

            BookNest

          </h1>

        </Link>

        {/* Desktop Nav */}

        <div className="hidden md:flex gap-8 text-lg">

          {links.map((items, i) => (

            <Link
              to={items.link}
              key={i}
              className="relative group transition-all duration-300"
            >

              {items.title}

              {/* Underline Animation */}

              <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] w-0 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>

            </Link>
          ))}

        </div>

        {/* Desktop Buttons */}

        <div className="hidden md:flex items-center gap-4">

          {/* Cart */}

          {isLoggedIn && role === "user" && (

            <Link
              to="/cart"
              className="relative border border-blue-500 p-3 rounded-lg hover:bg-blue-500 transition-all duration-300 hover:scale-105"
            >

              <FaShoppingCart className="text-xl" />

              {/* Cart Count */}

              {cartCount > 0 && (

                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">

                  {cartCount}

                </span>
              )}

            </Link>
          )}

          {/* Not Logged In */}

          {!isLoggedIn && (

            <>

              <Link
                to="/login"
                className="border border-blue-500 px-5 py-2 rounded-lg hover:bg-blue-500 hover:scale-105 transition-all duration-300"
              >

                Login

              </Link>

              <Link
                to="/signup"
                className="bg-blue-500 px-5 py-2 rounded-lg hover:bg-blue-600 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-blue-500/50"
              >

                Signup

              </Link>

            </>
          )}

          {/* Logged In */}

          {isLoggedIn && (

            <>

              {/* Admin Panel */}

              {role === "admin" && (

                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-2 bg-purple-500 px-5 py-2 rounded-lg hover:bg-purple-600 transition-all duration-300 hover:scale-105"
                >

                  <MdAdminPanelSettings />

                  Admin

                </Link>
              )}

              {/* Profile */}

              <Link
                to="/profile"
                className="flex items-center gap-2 border border-blue-500 px-5 py-2 rounded-lg hover:bg-blue-500 hover:scale-105 transition-all duration-300"
              >

                <FaUserCircle />

                Profile

              </Link>

              {/* Logout */}

              <button
                onClick={logout}
                className="bg-red-500 px-5 py-2 rounded-lg hover:bg-red-600 hover:scale-105 transition-all duration-300"
              >

                Logout

              </button>

            </>
          )}

        </div>

        {/* Mobile Menu Icon */}

        <button
          className="md:hidden text-3xl"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >

          {menuOpen
            ? <RxCross2 />
            : <HiOutlineMenuAlt3 />}

        </button>

      </div>

      {/* Mobile Menu */}

      <div
        className={`absolute top-full left-0 w-full bg-zinc-900 border-t border-zinc-800 flex flex-col items-center gap-6 py-6 transition-all duration-300 md:hidden z-50 ${
          menuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      >

        {links.map((items, i) => (

          <Link
            to={items.link}
            key={i}
            onClick={() =>
              setMenuOpen(false)
            }
            className="text-lg hover:text-blue-400 transition-all duration-300"
          >

            {items.title}

          </Link>
        ))}

        {/* Mobile Cart */}

        {isLoggedIn && role === "user" && (

          <Link
            to="/cart"
            className="flex items-center gap-3 text-lg"
          >

            <FaShoppingCart />

            Cart ({cartCount})

          </Link>
        )}

        {/* Mobile Buttons */}

        <div className="flex gap-4 flex-wrap justify-center">

          {!isLoggedIn && (

            <>

              <Link
                to="/login"
                className="border border-blue-500 px-5 py-2 rounded-lg hover:bg-blue-500 transition-all duration-300"
              >

                Login

              </Link>

              <Link
                to="/signup"
                className="bg-blue-500 px-5 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
              >

                Signup

              </Link>

            </>
          )}

          {isLoggedIn && (

            <>

              {/* Admin */}

              {role === "admin" && (

                <Link
                  to="/admin/dashboard"
                  className="bg-purple-500 px-5 py-2 rounded-lg hover:bg-purple-600 transition-all duration-300"
                >

                  Admin

                </Link>
              )}

              {/* Profile */}

              <Link
                to="/profile"
                className="border border-blue-500 px-5 py-2 rounded-lg hover:bg-blue-500 transition-all duration-300"
              >

                Profile

              </Link>

              {/* Logout */}

              <button
                onClick={logout}
                className="bg-red-500 px-5 py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
              >

                Logout

              </button>

            </>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;