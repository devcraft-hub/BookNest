import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Loader from "../Loader/Loader";

import { Link } from "react-router-dom";

function UserOrderHistory() {

  const [orderHistory,
    setOrderHistory] =
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
  // FETCH ORDER HISTORY
  // =====================

  useEffect(() => {

    const fetchOrderHistory =
      async () => {

        try {

          const response =
            await axios.get(

              "http://localhost:1000/api/v1/get-order-history",

              {
                headers,
              }
            );

          setOrderHistory(
            response.data.data
          );

          setLoading(false);

        } catch (error) {

          console.log(error);

          setLoading(false);
        }
      };

    fetchOrderHistory();

  }, []);

  // =====================
  // CANCEL ORDER
  // =====================

  const cancelOrder =
    async (orderId) => {

      try {

        const response =
          await axios.put(

            `http://localhost:1000/api/v1/cancel-order/${orderId}`,

            {},

            {
              headers,
            }
          );

        alert(
          response.data.message
        );

        // update UI instantly

        setOrderHistory(

          orderHistory.map(

            (item) =>

              item._id ===
              orderId

                ? {

                    ...item,

                    status:
                      "Canceled",

                    paymentStatus:
                      item.paymentMode ===
                      "COD"

                        ? "Pending"

                        : "Refunded",

                    refundStatus:
                      item.paymentMode ===
                      "COD"

                        ? "Not Requested"

                        : "Refunded",

                    refundAmount:
                      item.paymentMode ===
                      "COD"

                        ? 0

                        : item.totalPrice,

                    refundReason:
                      item.paymentMode ===
                      "COD"

                        ? ""

                        : "Order canceled by user",

                    refundedAt:
                      new Date(),
                  }

                : item
          )
        );

      } catch (error) {

        alert(
          error.response?.data
            ?.message
        );
      }
    };

  // =====================
  // STATUS COLORS
  // =====================

  const getStatusColor =
    (status) => {

      switch (status) {

        case "Delivered":
          return "bg-green-500 text-black";

        case "Processing":
          return "bg-yellow-500 text-black";

        case "Packed":
          return "bg-orange-500 text-black";

        case "Shipped":
          return "bg-cyan-500 text-black";

        case "Out for Delivery":
          return "bg-blue-500 text-white";

        case "Canceled":
          return "bg-red-500 text-white";

        default:
          return "bg-purple-500 text-white";
      }
    };

  // =====================
  // PAYMENT MODE COLORS
  // =====================

  const getPaymentColor =
    (mode) => {

      switch (mode) {

        case "COD":
          return "bg-yellow-500 text-black";

        case "ONLINE":
          return "bg-green-500 text-black";

        case "WALLET":
          return "bg-purple-500 text-white";

        default:
          return "bg-zinc-700 text-white";
      }
    };

  // =====================
  // PAYMENT STATUS COLORS
  // =====================

  const getPaymentStatusColor =
    (status) => {

      switch (status) {

        case "Paid":
          return "bg-green-500 text-black";

        case "Pending":
          return "bg-yellow-500 text-black";

        case "Failed":
          return "bg-red-500 text-white";

        case "Refunded":
          return "bg-purple-500 text-white";

        default:
          return "bg-zinc-700 text-white";
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

    <div className="text-white h-full flex flex-col">

      {/* ===================== */}
      {/* HEADING */}
      {/* ===================== */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold">

          Order History

        </h1>

        <p className="text-zinc-400 mt-3 text-lg">

          Track all your purchased books 📚

        </p>

      </div>

      {/* ===================== */}
      {/* NO ORDERS */}
      {/* ===================== */}

      {orderHistory.length === 0 && (

        <div className="flex items-center justify-center h-[50vh]">

          <h1 className="text-3xl text-zinc-500 font-semibold">

            No Orders Found

          </h1>

        </div>
      )}

      {/* ===================== */}
      {/* ORDERS SECTION */}
      {/* ===================== */}

      {orderHistory.length > 0 && (

        <div className="flex flex-col gap-5 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-zinc-900">

          {orderHistory.map(

            (items, i) => (

              <div
                key={i}
                className="bg-zinc-900 rounded-xl p-5 flex flex-col md:flex-row gap-6 items-center shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
              >

                {/* ===================== */}
                {/* BOOK IMAGE */}
                {/* ===================== */}

                <Link
                  to={`/view-book-details/${items.book?._id}`}
                  className="shrink-0"
                >

                  <img
                    src={
                      items.book?.url
                    }
                    alt={
                      items.book?.title
                    }
                    className="w-28 h-36 object-cover rounded-lg hover:scale-105 transition-all duration-300"
                  />

                </Link>

                {/* ===================== */}
                {/* BOOK DETAILS */}
                {/* ===================== */}

                <div className="flex-1 w-full">

                  {/* Title */}

                  <h2 className="text-2xl font-bold line-clamp-2">

                    {
                      items.book?.title
                    }

                  </h2>

                  {/* Author */}

                  <p className="text-zinc-400 mt-2">

                    by {
                      items.book?.author
                    }

                  </p>

                  {/* Price */}

                  <p className="text-blue-400 text-xl font-semibold mt-3">

                    ₹ {
                      items.book?.price
                    }

                  </p>

                  {/* Quantity */}

                  <p className="text-zinc-400 mt-2">

                    Quantity:

                    <span className="text-white ml-2 font-semibold">

                      {
                        items.quantity ||
                        1
                      }

                    </span>

                  </p>

                  {/* Tracking */}

                  <p className="text-zinc-500 mt-2 text-sm break-all">

                    Tracking ID:

                    <span className="text-white ml-2">

                      {
                        items.trackingId
                      }

                    </span>

                  </p>

                  {/* Invoice */}

                  <p className="text-zinc-500 mt-2 text-sm break-all">

                    Invoice:

                    <span className="text-white ml-2">

                      {
                        items.invoiceNumber
                      }

                    </span>

                  </p>

                  {/* Delivery */}

                  <p className="text-zinc-500 mt-2 text-sm">

                    Estimated Delivery:

                    <span className="text-white ml-2">

                      {new Date(
                        items.estimatedDelivery
                      ).toLocaleDateString()}

                    </span>

                  </p>

                  {/* Payment Tags */}

                  <div className="flex flex-wrap gap-3 mt-4">

                    {/* Payment Mode */}

                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPaymentColor(
                      items.paymentMode
                    )}`}>

                      {
                        items.paymentMode ||
                        "COD"
                      }

                    </span>

                    {/* Payment Status */}

                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPaymentStatusColor(
                      items.paymentStatus
                    )}`}>

                      {
                        items.paymentStatus ||
                        "Pending"
                      }

                    </span>

                  </div>

                  {/* ===================== */}
                  {/* REFUND HISTORY */}
                  {/* ===================== */}

                  {items.refundStatus ===
                    "Refunded" && (

                    <div className="bg-zinc-800 rounded-xl p-4 mt-5">

                      <h3 className="text-red-400 font-bold text-lg">

                        Refund History

                      </h3>

                      {/* Refund Status */}

                      <p className="text-yellow-400 mt-2">

                        Refund Status:
                        {" "}

                        {
                          items.refundStatus
                        }

                      </p>

                      {/* Refund Amount */}

                      <p className="text-zinc-300 mt-2">

                        Refunded Amount:

                        <span className="text-green-400 ml-2 font-semibold">

                          ₹ {
                            items.refundAmount
                          }

                        </span>

                      </p>

                      {/* Refund Reason */}

                      <p className="text-zinc-400 mt-2 text-sm">

                        Reason:
                        {" "}

                        {
                          items.refundReason
                        }

                      </p>

                      {/* Refund Date */}

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
                {/* STATUS + ACTION */}
                {/* ===================== */}

                <div className="flex flex-col items-center gap-4">

                  {/* Status */}

                  <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${getStatusColor(
                    items.status
                  )}`}>

                    {
                      items.status ||
                      "Order Placed"
                    }

                  </span>

                  {/* Cancel Button */}

                  {items.status !==
                    "Delivered" &&

                    items.status !==
                    "Canceled" &&

                    items.status !==
                    "Out for Delivery" && (

                    <button
                      onClick={() =>
                        cancelOrder(
                          items._id
                        )
                      }
                      className="bg-red-500 hover:bg-red-600 transition-all duration-300 px-5 py-2 rounded-lg text-sm font-semibold"
                    >

                      Cancel Order

                    </button>
                  )}

                </div>

              </div>
            )
          )}

        </div>
      )}

    </div>
  );
}

export default UserOrderHistory;