import React from "react";

import { Link, useLocation } from "react-router-dom";

import {
  FaChartLine,
  FaBook,
  FaShoppingBag,
  FaUsers,
} from "react-icons/fa";

function AdminSidebar() {

  const location = useLocation();

  // sidebar links

  const links = [

    {
      title: "Dashboard",
      link: "/admin/dashboard",
      icon: <FaChartLine />,
    },

    {
      title: "Add Book",
      link: "/admin/add-book",
      icon: <FaBook />,
    },

    {
      title: "Orders",
      link: "/admin/orders",
      icon: <FaShoppingBag />,
    },

    {
      title: "Users",
      link: "/admin/users",
      icon: <FaUsers />,
    },
  ];

  return (

    <div className="bg-zinc-900 rounded-2xl p-8 shadow-lg sticky top-24">

      {/* Heading */}

      <h1 className="text-4xl font-bold mb-10">

        Admin Panel

      </h1>

      {/* Links */}

      <div className="flex flex-col gap-5">

        {links.map((items, i) => (

          <Link
            key={i}
            to={items.link}
            className={`flex items-center gap-4 px-5 py-4 rounded-xl text-lg font-semibold transition-all duration-300 ${
              location.pathname === items.link
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
            }`}
          >

            <span className="text-2xl">

              {items.icon}

            </span>

            {items.title}

          </Link>

        ))}

      </div>

      {/* Bottom Box */}

      <div className="bg-zinc-800 rounded-xl p-5 mt-12">

        <h2 className="text-xl font-bold">

          BookNest Admin

        </h2>

        <p className="text-zinc-400 mt-3 leading-7">

          Manage books, users and orders
          professionally from one dashboard.

        </p>

      </div>

    </div>
  );
}

export default AdminSidebar;