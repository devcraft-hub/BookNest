import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import AdminSidebar from "./AdminSidebar";

import Loader from "../../components/Loader/Loader";

function AdminDashboard() {

  const [loading, setLoading] =
    useState(true);

  const [dashboard,
    setDashboard] =
    useState(null);

  // headers

  const headers = {
    id: localStorage.getItem("id"),
    authorization:
      `Bearer ${localStorage.getItem("token")}`,
  };

  // =====================
  // FETCH DASHBOARD DATA
  // =====================

  useEffect(() => {

    const fetchDashboard =
      async () => {

        try {

          const response =
            await axios.get(

              `${import.meta.env.VITE_API_URL}/api/v1/dashboard`,

              {
                headers,
              }
            );

          setDashboard(
            response.data.data
          );

          setLoading(false);

        } catch (error) {

          console.log(error);

          setLoading(false);
        }
      };

    fetchDashboard();

  }, []);

  // =====================
  // LOADER
  // =====================

  if (loading) {

    return (

      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">

        <Loader />

      </div>
    );
  }

  return (

    <div className="bg-zinc-950 min-h-screen text-white px-6 py-16">

      <div className="max-w-7xl mx-auto grid md:grid-cols-6 gap-8">

        {/* ===================== */}
        {/* SIDEBAR */}
        {/* ===================== */}

        <div className="md:col-span-2">

          <AdminSidebar />

        </div>

        {/* ===================== */}
        {/* DASHBOARD CONTENT */}
        {/* ===================== */}

        <div className="md:col-span-4">

          {/* Heading */}

          <div>

            <h1 className="text-5xl font-bold">

              Admin Dashboard

            </h1>

            <p className="text-zinc-400 mt-4 text-lg">

              Manage books, users and orders 🚀

            </p>

          </div>

          {/* ===================== */}
          {/* STATS CARDS */}
          {/* ===================== */}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">

            {/* Users */}

            <div className="bg-zinc-900 rounded-2xl p-8 shadow-lg hover:shadow-blue-500/10 transition-all duration-300">

              <h2 className="text-zinc-400 text-lg">

                Total Users

              </h2>

              <p className="text-5xl font-bold mt-5 text-blue-400">

                {dashboard?.totalUsers || 0}

              </p>

            </div>

            {/* Books */}

            <div className="bg-zinc-900 rounded-2xl p-8 shadow-lg hover:shadow-green-500/10 transition-all duration-300">

              <h2 className="text-zinc-400 text-lg">

                Total Books

              </h2>

              <p className="text-5xl font-bold mt-5 text-green-400">

                {dashboard?.totalBooks || 0}

              </p>

            </div>

            {/* Orders */}

            <div className="bg-zinc-900 rounded-2xl p-8 shadow-lg hover:shadow-pink-500/10 transition-all duration-300">

              <h2 className="text-zinc-400 text-lg">

                Total Orders

              </h2>

              <p className="text-5xl font-bold mt-5 text-pink-400">

                {dashboard?.totalOrders || 0}

              </p>

            </div>

          </div>

          {/* ===================== */}
          {/* RECENT ORDERS */}
          {/* ===================== */}

          <div className="bg-zinc-900 rounded-2xl p-8 mt-12 shadow-lg">

            <h2 className="text-3xl font-bold">

              Recent Orders

            </h2>

            {/* Empty */}

            {dashboard?.recentOrders
              ?.length === 0 && (

              <div className="mt-10 text-center">

                <h1 className="text-2xl text-zinc-500">

                  No Orders Yet

                </h1>

              </div>
            )}

            {/* Orders */}

            <div className="mt-8 flex flex-col gap-5">

              {dashboard?.recentOrders?.map(

                (order) => (

                  <div
                    key={order._id}
                    className="bg-zinc-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                  >

                    {/* Left */}

                    <div>

                      <h3 className="text-xl font-semibold">

                        {
                          order?.book
                            ?.title
                        }

                      </h3>

                      <p className="text-zinc-400 mt-2">

                        Ordered by:
                        <span className="text-white ml-2">

                          {
                            order?.user
                              ?.username
                          }

                        </span>

                      </p>

                    </div>

                    {/* Right */}

                    <div className="flex flex-wrap gap-3">

                      {/* Quantity */}

                      <span className="bg-blue-500 px-4 py-2 rounded-full text-sm font-semibold">

                        Qty:
                        {" "}
                        {
                          order?.quantity
                        }

                      </span>

                      {/* Payment */}

                      <span className="bg-green-500 text-black px-4 py-2 rounded-full text-sm font-semibold">

                        {
                          order?.paymentMode
                        }

                      </span>

                      {/* Status */}

                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        order?.status ===
                        "Delivered"

                          ? "bg-green-500 text-black"

                          : order?.status ===
                            "Canceled"

                          ? "bg-red-500 text-white"

                          : "bg-yellow-500 text-black"
                      }`}>

                        {
                          order?.status
                        }

                      </span>

                    </div>

                  </div>
                )
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;