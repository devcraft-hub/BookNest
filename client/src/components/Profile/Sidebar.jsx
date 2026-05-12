import React from "react";

import { Link } from "react-router-dom";

import {
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaBoxOpen,
  FaSignOutAlt,
  FaCog,
  FaHistory,
  FaWallet,
  FaCrown,
} from "react-icons/fa";

function Sidebar({ data, logout }) {

  return (

    <div className="bg-zinc-900 rounded-2xl p-6 flex flex-col items-center shadow-lg sticky top-24">

      {/* ===================== */}
      {/* PROFILE SECTION */}
      {/* ===================== */}

      {/* Profile Image */}

      <div className="relative">

        <img
          src={
            data?.avatar ||
            "/books.png"
          }
          alt="profile"
          className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover shadow-lg"
        />

        {/* Premium Badge */}

        {data?.isPremiumMember && (

          <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-black p-3 rounded-full shadow-lg">

            <FaCrown />

          </div>
        )}

      </div>

      {/* Username */}

      <h2 className="text-white text-3xl font-bold mt-6 text-center break-words">

        {data?.username ||
          "BookNest User"}

      </h2>

      {/* Email */}

      <p className="text-zinc-400 text-sm mt-3 break-all text-center">

        {data?.email ||
          "user@gmail.com"}

      </p>

      {/* Role */}

      <div className="mt-5">

        <span className={`px-5 py-2 rounded-full text-sm font-semibold ${
          data?.role === "admin"
            ? "bg-purple-500 text-white"
            : "bg-blue-500 text-white"
        }`}>

          {data?.role || "user"}

        </span>

      </div>

      {/* Wallet */}

      <div className="mt-6 bg-zinc-800 rounded-xl px-6 py-4 w-full flex items-center justify-between">

        <div className="flex items-center gap-3">

          <FaWallet className="text-green-400 text-xl" />

          <span className="text-zinc-300">

            Wallet

          </span>

        </div>

        <span className="text-green-400 font-bold text-lg">

          ₹ {data?.wallet || 0}

        </span>

      </div>

      {/* Divider */}

      <div className="w-full h-[1px] bg-zinc-700 my-8"></div>

      {/* ===================== */}
      {/* NAVIGATION */}
      {/* ===================== */}

      <div className="w-full flex flex-col gap-4">

        {/* Profile */}

        <Link
          to="/profile"
          className="flex items-center gap-4 bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 px-5 py-4 rounded-xl hover:translate-x-1"
        >

          <FaUser className="text-blue-400" />

          <span className="text-zinc-200 font-medium">

            Profile

          </span>

        </Link>

        {/* Favourites */}

        <Link
          to="/profile/favourites"
          className="flex items-center gap-4 bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 px-5 py-4 rounded-xl hover:translate-x-1"
        >

          <FaHeart className="text-pink-400" />

          <span className="text-zinc-200 font-medium">

            Favourites

          </span>

        </Link>

        {/* Recently Viewed */}

        <Link
          to="/profile/recently-viewed"
          className="flex items-center gap-4 bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 px-5 py-4 rounded-xl hover:translate-x-1"
        >

          <FaHistory className="text-yellow-400" />

          <span className="text-zinc-200 font-medium">

            Recently Viewed

          </span>

        </Link>

        {/* Cart */}

        <Link
          to="/cart"
          className="flex items-center gap-4 bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 px-5 py-4 rounded-xl hover:translate-x-1"
        >

          <FaShoppingCart className="text-blue-400" />

          <span className="text-zinc-200 font-medium">

            Cart

          </span>

        </Link>

        {/* Orders */}

        <Link
          to="/profile/orders"
          className="flex items-center gap-4 bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 px-5 py-4 rounded-xl hover:translate-x-1"
        >

          <FaBoxOpen className="text-green-400" />

          <span className="text-zinc-200 font-medium">

            Order History

          </span>

        </Link>

        {/* Settings */}

        <Link
          to="/profile/settings"
          className="flex items-center gap-4 bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 px-5 py-4 rounded-xl hover:translate-x-1"
        >

          <FaCog className="text-orange-400" />

          <span className="text-zinc-200 font-medium">

            Settings

          </span>

        </Link>

      </div>

      {/* ===================== */}
      {/* LOGOUT */}
      {/* ===================== */}

      <button
        onClick={logout}
        className="mt-10 w-full bg-red-500 hover:bg-red-600 transition-all duration-300 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:scale-[1.02] shadow-lg"
      >

        <FaSignOutAlt />

        Logout

      </button>

    </div>
  );
}

export default Sidebar;