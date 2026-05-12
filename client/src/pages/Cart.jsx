import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Loader from "../components/Loader/Loader";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { FaTrash } from "react-icons/fa";

function Cart() {

  const navigate =
    useNavigate();

  const [cartBooks,
    setCartBooks] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [placingOrder,
    setPlacingOrder] =
    useState(false);

  const [paymentMode,
    setPaymentMode] =
    useState("COD");

    const [useWallet,
  setUseWallet] =
  useState(false);

const [walletAmount,
  setWalletAmount] =
  useState(0);

  // =====================
  // HEADERS
  // =====================

  const headers = {
    id: localStorage.getItem("id"),
    authorization:
      `Bearer ${localStorage.getItem("token")}`,
  };

// =====================
// FETCH CART BOOKS
// =====================

useEffect(() => {

  const fetchCartBooks =
    async () => {

      try {

        // fetch cart books

        const response =
          await axios.get(

            "http://localhost:1000/api/v1/get-cart-books",

            {
              headers,
            }
          );

        setCartBooks(
          response.data.data
        );

        // =====================
        // FETCH USER WALLET
        // =====================

        const userResponse =
          await axios.get(

            "http://localhost:1000/api/v1/get-user-information",

            {
              headers,
            }
          );

        setWalletAmount(

          userResponse.data
            .data.wallet
        );

        setLoading(false);

      } catch (error) {

        console.log(error);

        setLoading(false);
      }
    };

  fetchCartBooks();

}, []);

// =====================
// INCREASE QUANTITY
// =====================

const increaseQuantity =
  async (bookId) => {

    try {

      await axios.put(

        `http://localhost:1000/api/v1/increase-quantity/${bookId}`,

        {},

        {
          headers,
        }
      );

      setCartBooks(

        cartBooks.map(

          (item) =>

            item.book?._id ===
            bookId

              ? {
                  ...item,
                  quantity:
                    item.quantity + 1,
                }

              : item
        )
      );

    } catch (error) {

      console.log(error);
    }
  };

// =====================
// DECREASE QUANTITY
// =====================

const decreaseQuantity =
  async (bookId) => {

    try {

      await axios.put(

        `http://localhost:1000/api/v1/decrease-quantity/${bookId}`,

        {},

        {
          headers,
        }
      );

      setCartBooks(

        cartBooks

          .map(

            (item) =>

              item.book?._id ===
              bookId

                ? {
                    ...item,
                    quantity:
                      item.quantity - 1,
                  }

                : item
          )

          .filter(
            (item) =>
              item.quantity > 0
          )
      );

    } catch (error) {

      console.log(error);
    }
  };

// =====================
// REMOVE FROM CART
// =====================

const removeFromCart =
  async (bookId) => {

    try {

      const response =
        await axios.put(

          `http://localhost:1000/api/v1/remove-from-cart/${bookId}`,

          {},

          {
            headers,
          }
        );

      alert(
        response.data.message
      );

      setCartBooks(

        cartBooks.filter(

          (item) =>

            item.book?._id !==
            bookId
        )
      );

    } catch (error) {

      console.log(error);
    }
  };

// =====================
// CALCULATE TOTAL
// =====================

const totalPrice =
  cartBooks.reduce(

    (total, item) =>

      item.book

        ? total +

          item.book.price *

            item.quantity

        : total,

    0
  );

// delivery fee

const deliveryFee =
  totalPrice > 500
    ? 0
    : 40;

// final amount

const finalAmount =
  totalPrice +
  deliveryFee;

// =====================
// WALLET CALCULATION
// =====================

const walletUsed =

  useWallet

    ? Math.min(
        walletAmount,
        finalAmount
      )

    : 0;

const payableAmount =
  finalAmount -
  walletUsed;

// total quantity

const totalBooks =
  cartBooks.reduce(

    (total, item) =>

      total +
      item.quantity,

    0
  );

// =====================
// PLACE ORDER
// =====================

const placeOrder =
  async (
    payment =
      paymentMode
  ) => {

    try {

      const response =
        await axios.post(

          "http://localhost:1000/api/v1/place-order",

          {

            order:
              cartBooks,

            paymentMode:
              payment,

            walletUsed,
          },

          {
            headers,
          }
        );

      alert(
        response.data.message
      );

      // clear cart UI

      setCartBooks([]);

      // update wallet instantly

      setWalletAmount(

        walletAmount -
        walletUsed
      );

      // redirect

      navigate(
        "/profile/orders"
      );

    } catch (error) {

      alert(
        error.response?.data
          ?.message
      );
    }
  };
  // =====================
  // HANDLE PAYMENT
  // =====================

  const handlePayment =
    async () => {

      try {

        setPlacingOrder(true);

   // =====================
// FULL WALLET PAYMENT
// =====================

if (

  useWallet &&

  payableAmount === 0
) {

  await placeOrder(
    "WALLET"
  );

  alert(
    "Order placed using wallet balance"
  );

  setPlacingOrder(
    false
  );

  return;
}

// =====================
// COD PAYMENT
// =====================

if (
  paymentMode ===
  "COD"
) {

  await placeOrder();

  setPlacingOrder(
    false
  );

  return;
}
  // =====================
        // CREATE RAZORPAY ORDER
        // =====================

        const response =
          await axios.post(

            "http://localhost:1000/api/v1/create-order",

            {
              amount:
                finalAmount,
            },

            {
              headers,
            }
          );

        const order =
          response.data.order;

        // =====================
        // RAZORPAY OPTIONS
        // =====================

        const options = {

          key:
            import.meta.env
              .VITE_RAZORPAY_KEY,

          amount:
            order.amount,

          currency:
            order.currency,

          name:
            "BookNest",

          description:
            "Book Purchase",

          order_id:
            order.id,

          handler:
            async function (
              response
            ) {

              try {

                // verify payment

                const verify =
                  await axios.post(

                    "http://localhost:1000/api/v1/verify-payment",

                    response,

                    {
                      headers,
                    }
                  );

                // success

                if (
                  verify.data
                    .success
                ) {

                  await placeOrder(
                  "ONLINE"
                   );

                  alert(
                    "Payment Successful"
                  );
                }

              } catch (error) {

                alert(
                  "Payment verification failed"
                );
              }
            },

          theme: {
            color:
              "#3b82f6",
          },
        };

        // open razorpay

        const razorpay =
          new window.Razorpay(
            options
          );

        razorpay.open();

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data
            ?.message
        );

      } finally {

        setPlacingOrder(
          false
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

        <div className="mb-10">

          <h1 className="text-4xl font-bold">

            Your Cart

          </h1>

          <p className="text-zinc-400 mt-3 text-lg">

            Manage your selected books 🛒

          </p>

        </div>

        {/* ===================== */}
        {/* EMPTY CART */}
        {/* ===================== */}

        {cartBooks.filter(
          (item) => item.book
        ).length === 0 && (

          <div className="flex flex-col items-center justify-center h-[60vh]">

            <h1 className="text-4xl text-zinc-500 font-bold">

              Your Cart is Empty

            </h1>

            <Link
              to="/all-books"
              className="mt-6 bg-blue-500 hover:bg-blue-600 transition-all duration-300 px-6 py-3 rounded-lg text-lg font-semibold"
            >

              Explore Books

            </Link>

          </div>
        )}

        {/* ===================== */}
        {/* CART SECTION */}
        {/* ===================== */}

        {cartBooks.filter(
          (item) => item.book
        ).length > 0 && (

          <div className="grid lg:grid-cols-3 gap-8">

            {/* ===================== */}
            {/* CART BOOKS */}
            {/* ===================== */}

            <div className="lg:col-span-2 flex flex-col gap-5 max-h-[75vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-zinc-900">

              {cartBooks

                .filter(
                  (items) =>
                    items.book
                )

                .map((items) => (

                  <div
                    key={
                      items.book._id
                    }
                    className="bg-zinc-900 rounded-xl p-4 flex flex-col md:flex-row gap-5 items-center shadow-lg"
                  >

                    {/* Book Image */}

                    <Link
                      to={`/view-book-details/${items.book._id}`}
                      className="shrink-0"
                    >

                      <img
                        src={
                          items.book.url
                        }
                        alt={
                          items.book.title
                        }
                        className="w-28 h-36 object-cover rounded-lg hover:scale-105 transition-all duration-300"
                      />

                    </Link>

                    {/* Book Details */}

                    <div className="flex-1 w-full">

                      {/* Title */}

                      <h2 className="text-2xl font-bold line-clamp-2">

                        {
                          items.book
                            .title
                        }

                      </h2>

                      {/* Author */}

                      <p className="text-zinc-400 mt-2">

                        by {
                          items.book
                            .author
                        }

                      </p>

                      {/* Price */}

                      <p className="text-blue-400 text-xl font-semibold mt-3">

                        ₹ {
                          items.book
                            .price
                        }

                      </p>

                      {/* Subtotal */}

                      <p className="text-zinc-400 mt-2">

                        Subtotal:

                        <span className="text-white ml-2">

                          ₹ {

                            items.book
                              .price *

                            items.quantity
                          }

                        </span>

                      </p>

                      {/* Quantity Controls */}

                      <div className="flex items-center gap-4 mt-4">

                        <button
                          onClick={() =>
                            decreaseQuantity(
                              items.book
                                ._id
                            )
                          }
                          className="bg-zinc-800 px-4 py-2 rounded-lg hover:bg-zinc-700 transition-all duration-300"
                        >

                          -

                        </button>

                        <span className="text-xl font-bold">

                          {
                            items.quantity
                          }

                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(
                              items.book
                                ._id
                            )
                          }
                          className="bg-zinc-800 px-4 py-2 rounded-lg hover:bg-zinc-700 transition-all duration-300"
                        >

                          +

                        </button>

                      </div>

                    </div>

                    {/* Remove */}

                    <button
                      onClick={() =>
                        removeFromCart(
                          items.book
                            ._id
                        )
                      }
                      className="bg-red-500 hover:bg-red-600 transition-all duration-300 text-white p-4 rounded-lg"
                    >

                      <FaTrash />

                    </button>

                  </div>
                ))}

            </div>

            {/* ===================== */}
            {/* SUMMARY */}
            {/* ===================== */}

            <div className="bg-zinc-900 rounded-xl p-6 h-fit sticky top-24 shadow-lg">

              <h2 className="text-3xl font-bold">

                Cart Summary

              </h2>

              {/* Total Books */}

              <div className="mt-8 flex justify-between text-lg">

                <span>
                  Total Books
                </span>

                <span>

                  {totalBooks}

                </span>

              </div>

              {/* Products */}

              <div className="mt-4 flex justify-between text-lg">

                <span>
                  Products Price
                </span>

                <span className="text-blue-400 font-bold">

                  ₹ {totalPrice}

                </span>

              </div>

              {/* Delivery */}

              <div className="mt-4 flex justify-between text-lg">

                <span>
                  Delivery Fee
                </span>

                <span className="text-green-400 font-bold">

                  {deliveryFee ===
                  0

                    ? "FREE"

                    : `₹ ${deliveryFee}`}

                </span>

              </div>

              {/* Final Amount */}

              <div className="mt-6 flex justify-between text-2xl font-bold border-t border-zinc-700 pt-6">

                <span>
                  Total Amount
                </span>

                <span className="text-blue-400">

                  ₹ {finalAmount}

                </span>

              </div>
            {/* ===================== */}
{/* WALLET */}
{/* ===================== */}

<div className="mt-6 bg-zinc-800 p-4 rounded-xl">

  <div className="flex items-center justify-between">

    <div>

      <h3 className="font-semibold">

        Wallet Balance

      </h3>

      <p className="text-green-400 mt-1">

        ₹ {walletAmount}

      </p>

    </div>

    <input
      type="checkbox"
      checked={useWallet}
      onChange={() =>
        setUseWallet(
          !useWallet
        )
      }
      className="w-5 h-5"
    />

  </div>

  {useWallet && (

    <div className="mt-3">

      <p className="text-zinc-400 text-sm">

        Wallet Used:
        {" "}

        ₹ {walletUsed}

      </p>

      <p className="text-zinc-400 text-sm mt-1">

        Remaining Payment:
        {" "}

        ₹ {payableAmount}

      </p>

    </div>
  )}

</div>
 {/* Payment */}

<div className="mt-8">

  <h3 className="text-lg font-semibold mb-4">

    Payment Method

  </h3>

  <select
    value={paymentMode}
    onChange={(e) =>
      setPaymentMode(
        e.target.value
      )
    }
    className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg outline-none"
  >

    {/* COD */}

    <option value="COD">

      Cash On Delivery

    </option>

    {/* ONLINE PAYMENT */}

    <option value="ONLINE">

      Razorpay / Online Payment

    </option>

  </select>

</div>

              {/* Checkout */}

              <button
                onClick={
                  handlePayment
                }
                disabled={
                  placingOrder ||

                  cartBooks.length ===
                    0
                }
                className="w-full mt-10 bg-blue-500 hover:bg-blue-600 disabled:bg-zinc-700 disabled:cursor-not-allowed transition-all duration-300 py-3 rounded-lg text-lg font-semibold hover:scale-[1.02]"
              >

                {placingOrder

                  ? "Processing..."

                  : "Proceed to Pay"}

              </button>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default Cart;