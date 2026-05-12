import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Loader from "../../components/Loader/Loader";

import { toast }
from "react-toastify";

function AdminOrders() {

  const [orders,
    setOrders] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  // =====================
  // HEADERS
  // =====================

  const headers = {

    id:
      localStorage.getItem(
        "id"
      ),

    authorization:
      `Bearer ${localStorage.getItem("token")}`,
  };

  // =====================
  // FETCH ORDERS
  // =====================

  const fetchOrders =
    async () => {

      try {

        const response =
          await axios.get(

            `${import.meta.env.VITE_API_URL}/api/v1/get-all-orders`,

            {
              headers,
            }
          );

        setOrders(
          response.data.data
        );

        setLoading(false);

      } catch (error) {

        console.log(error);

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchOrders();

  }, []);

  // =====================
  // UPDATE STATUS
  // =====================

  const updateStatus =
    async (
      id,
      status
    ) => {

      try {

        const response =
          await axios.put(

            `${import.meta.env.VITE_API_URL}/api/v1/update-status/${id}`,

            {
              status,
            },

            {
              headers,
            }
          );

        toast.success(
          response.data.message
        );

        // update UI instantly

        setOrders(

          orders.map((item) =>

            item._id === id

              ? {

                  ...item,

                  status,

                  paymentStatus:

                    status ===
                    "Delivered"

                      ? "Paid"

                      : status ===
                        "Canceled"

                      ? "Refunded"

                      : item.paymentStatus,

                  refundStatus:

                    status ===
                    "Canceled"

                      ? "Refunded"

                      : item.refundStatus,

                  refundedAt:

                    status ===
                    "Canceled"

                      ? new Date()

                      : item.refundedAt,
                }

              : item
          )
        );

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message
        );
      }
    };

  // =====================
  // DELETE ORDER
  // =====================

  const deleteOrder =
    async (id) => {

      try {

        const confirmDelete =
          window.confirm(

            "Are you sure you want to delete this order?"
          );

        if (
          !confirmDelete
        ) {

          return;
        }

        const response =
          await axios.delete(

            `${import.meta.env.VITE_API_URL}/api/v1/delete-order/${id}`,

            {
              headers,
            }
          );

        toast.success(
          response.data.message
        );

        // remove from UI

        setOrders(

          orders.filter(

            (item) =>

              item._id !== id
          )
        );

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message
        );
      }
    };

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

      <div className="max-w-7xl mx-auto">

        {/* ===================== */}
        {/* HEADING */}
        {/* ===================== */}

        <div>

          <h1 className="text-5xl font-bold">

            Manage Orders

          </h1>

          <p className="text-zinc-400 mt-4 text-lg">

            Track and manage all orders 🚚

          </p>

        </div>

        {/* ===================== */}
        {/* EMPTY STATE */}
        {/* ===================== */}

        {orders.length === 0 && (

          <div className="flex items-center justify-center h-[50vh]">

            <h1 className="text-4xl text-zinc-500 font-bold">

              No Orders Found

            </h1>

          </div>
        )}

        {/* ===================== */}
        {/* ORDERS */}
        {/* ===================== */}

        <div className="flex flex-col gap-6 mt-12">

          {orders.map((items) => (

            <div
              key={items._id}
              className="bg-zinc-900 rounded-2xl p-6 flex flex-col lg:flex-row gap-6 items-center shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
            >

              {/* BOOK IMAGE */}

              <img
                src={items.book?.url}
                alt={items.book?.title}
                className="w-28 h-36 rounded-xl object-cover"
              />

              {/* DETAILS */}

              <div className="flex-1 w-full">

                {/* TITLE */}

                <h2 className="text-3xl font-bold">

                  {
                    items.book?.title
                  }

                </h2>

                {/* USERNAME */}

                <p className="text-zinc-400 mt-3">

                  User:

                  <span className="text-white ml-2">

                    {
                      items.user
                        ?.username
                    }

                  </span>

                </p>

                {/* EMAIL */}

                <p className="text-zinc-400 mt-2">

                  Email:

                  <span className="text-blue-400 ml-2">

                    {
                      items.user
                        ?.email
                    }

                  </span>

                </p>

                {/* QUANTITY */}

                <p className="text-zinc-400 mt-2">

                  Quantity:

                  <span className="text-white ml-2">

                    {
                      items.quantity
                    }

                  </span>

                </p>

                {/* PAYMENT MODE */}

                <p className="text-zinc-400 mt-2">

                  Payment Mode:

                  <span className="text-green-400 ml-2">

                    {
                      items.paymentMode
                    }

                  </span>

                </p>

                {/* PAYMENT STATUS */}

                <p className="text-zinc-400 mt-2">

                  Payment Status:

                  <span className={`ml-2 font-semibold ${
                    items.paymentStatus ===
                    "Paid"

                      ? "text-green-400"

                      : items.paymentStatus ===
                        "Refunded"

                      ? "text-red-400"

                      : "text-yellow-400"
                  }`}>

                    {
                      items.paymentStatus
                    }

                  </span>

                </p>

                {/* TOTAL */}

                <p className="text-zinc-400 mt-2">

                  Total:

                  <span className="text-blue-400 ml-2 font-bold">

                    ₹ {
                      items.totalPrice
                    }

                  </span>

                </p>

                {/* ORDER DATE */}

                <p className="text-zinc-500 mt-2 text-sm">

                  Ordered On:
                  {" "}

                  {
                    new Date(
                      items.createdAt
                    ).toLocaleDateString()
                  }

                </p>

                {/* ===================== */}
                {/* REFUND HISTORY */}
                {/* ===================== */}

                {items.refundStatus ===
                  "Refunded" && (

                  <div className="bg-zinc-800 rounded-xl p-4 mt-5">

                    <h3 className="text-red-400 font-bold text-lg">

                      Refund History

                    </h3>

                    {/* REFUND AMOUNT */}

                    <p className="text-zinc-300 mt-2">

                      Refunded Amount:

                      <span className="text-green-400 ml-2 font-semibold">

                        ₹ {
                          items.refundAmount
                        }

                      </span>

                    </p>

                    {/* REFUND REASON */}

                    <p className="text-zinc-400 mt-2 text-sm">

                      Reason:
                      {" "}

                      {
                        items.refundReason
                      }

                    </p>

                    {/* REFUND DATE */}

                    <p className="text-zinc-500 mt-2 text-sm">

                      Refunded On:
                      {" "}

                      {
                        items.refundedAt
                          ? new Date(
                              items.refundedAt
                            ).toLocaleDateString()
                          : "-"
                      }

                    </p>

                  </div>
                )}

              </div>

              {/* ===================== */}
              {/* ACTIONS */}
              {/* ===================== */}

              <div className="flex flex-col gap-4 w-full lg:w-auto">

                {/* STATUS */}

                <select
                  value={items.status}
                  onChange={(e) =>
                    updateStatus(
                      items._id,
                      e.target.value
                    )
                  }
                  className="bg-zinc-800 px-5 py-3 rounded-xl outline-none"
                >

                  <option>

                    Order Placed

                  </option>

                  <option>

                    Processing

                  </option>

                  <option>

                    Packed

                  </option>

                  <option>

                    Shipped

                  </option>

                  <option>

                    Out for Delivery

                  </option>

                  <option>

                    Delivered

                  </option>

                  <option>

                    Canceled

                  </option>

                </select>

                {/* DELETE */}

                <button
                  onClick={() =>
                    deleteOrder(
                      items._id
                    )
                  }
                  className="bg-red-500 hover:bg-red-600 transition-all duration-300 px-5 py-3 rounded-xl font-semibold"
                >

                  Delete Order

                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default AdminOrders;