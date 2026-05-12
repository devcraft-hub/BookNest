import React, {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  Link,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import Loader from "../Loader/Loader";

import BookCard from "../BookCard/BookCard";

import { FaCartShopping } from "react-icons/fa6";

import { FaHeart } from "react-icons/fa";

import { MdLanguage } from "react-icons/md";

import { FaEdit } from "react-icons/fa";

import { MdDelete } from "react-icons/md";

function ViewBookDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [book, setBook] =
    useState();

  const [recommendedBooks,
    setRecommendedBooks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [cartLoading,
    setCartLoading] =
    useState(false);

  const [favLoading,
    setFavLoading] =
    useState(false);

  const [reviewLoading,
    setReviewLoading] =
    useState(false);

  const [isFavourite,
    setIsFavourite] =
    useState(false);

  const [rating, setRating] =
    useState(5);

  const [comment,
    setComment] =
    useState("");

  // check login

  const isLoggedIn =
    localStorage.getItem("id");

  // check role

  const role =
    localStorage.getItem("role");

  // current user id

  const currentUserId =
    localStorage.getItem("id");

  // headers

  const headers = {
    id: localStorage.getItem("id"),
    authorization:
      `Bearer ${localStorage.getItem("token")}`,
  };

  // =====================
  // FETCH BOOK
  // =====================

  useEffect(() => {

    const fetchBook = async () => {

      try {

        // current book

        const response =
          await axios.get(
            `http://localhost:1000/api/v1/get-book-by-id/${id}`
          );

        setBook(response.data.data);

        // =====================
        // RECOMMENDATIONS
        // =====================

        const recommended =
          await axios.get(

            `http://localhost:1000/api/v1/recommended-books/${id}`
          );

        setRecommendedBooks(
          recommended.data.data
        );

        // =====================
        // ADD RECENTLY VIEWED
        // =====================

        if (
          localStorage.getItem("token")
        ) {

          await axios.put(

            `http://localhost:1000/api/v1/add-recently-viewed/${id}`,

            {},

            {
              headers,
            }
          );
        }

        setLoading(false);

      } catch (error) {

        console.log(error);

        setLoading(false);
      }
    };

    fetchBook();

  }, [id]);

  // =====================
  // ADD TO FAVOURITE
  // =====================

  const handleFavourite =
    async () => {

      try {

        setFavLoading(true);

        const response =
          await axios.put(
            `http://localhost:1000/api/v1/add-book-to-favourite/${id}`,
            {},
            { headers }
          );

        alert(
          response.data.message
        );

        setIsFavourite(true);

      } catch (error) {

        alert(
          error.response?.data
            ?.message
        );

      } finally {

        setFavLoading(false);
      }
    };

  // =====================
  // ADD TO CART
  // =====================

  const handleCart =
    async () => {

      try {

        setCartLoading(true);

        const response =
          await axios.put(
            `http://localhost:1000/api/v1/add-to-cart/${id}`,
            {},
            { headers }
          );

        alert(
          response.data.message
        );

      } catch (error) {

        alert(
          error.response?.data
            ?.message
        );

      } finally {

        setCartLoading(false);
      }
    };

  // =====================
  // ADD REVIEW
  // =====================

  const addReview =
    async () => {

      try {

        setReviewLoading(true);

        if (
          comment.trim() === ""
        ) {

          alert(
            "Please write review"
          );

          setReviewLoading(false);

          return;
        }

        const response =
          await axios.put(

            `http://localhost:1000/api/v1/add-review/${id}`,

            {
              rating,
              comment,
            },

            {
              headers,
            }
          );

        alert(
          response.data.message
        );

        // refresh book

        const updatedBook =
          await axios.get(

            `http://localhost:1000/api/v1/get-book-by-id/${id}`
          );

        setBook(
          updatedBook.data.data
        );

        setComment("");

      } catch (error) {

        alert(
          error.response?.data
            ?.message
        );

      } finally {

        setReviewLoading(false);
      }
    };

  // =====================
  // DELETE REVIEW
  // =====================

  const deleteReview =
    async (reviewId) => {

      try {

        const response =
          await axios.delete(

            `http://localhost:1000/api/v1/delete-review/${id}/${reviewId}`,

            {
              headers,
            }
          );

        alert(
          response.data.message
        );

        // refresh

        const updatedBook =
          await axios.get(

            `http://localhost:1000/api/v1/get-book-by-id/${id}`
          );

        setBook(
          updatedBook.data.data
        );

      } catch (error) {

        alert(
          error.response?.data
            ?.message
        );
      }
    };

  // =====================
  // DELETE BOOK
  // =====================

  const deleteBook =
    async () => {

      try {

        const response =
          await axios.delete(
            `http://localhost:1000/api/v1/delete-book/${id}`,
            {
              headers,
            }
          );

        alert(
          response.data.message
        );

        navigate("/all-books");

      } catch (error) {

        alert(
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

      <div className="min-h-screen bg-zinc-950">

        <Loader />

      </div>
    );
  }

  return (

    <div className="bg-zinc-950 min-h-screen text-white px-6 py-16">

      {/* ===================== */}
      {/* BOOK DETAILS */}
      {/* ===================== */}

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">

        {/* Left Section */}

        <div className="bg-zinc-900 rounded-2xl p-6 flex items-center justify-center shadow-lg relative overflow-hidden">

          {/* Stock Badge */}

          <div className="absolute top-5 left-5 z-10">

            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              book.stock === 0
                ? "bg-red-500 text-white"
                : book.stock <= 5
                ? "bg-yellow-500 text-black"
                : "bg-green-500 text-black"
            }`}>

              {book.stock === 0
                ? "Out of Stock"
                : book.stock <= 5
                ? `Only ${book.stock} Left`
                : "In Stock"}

            </span>

          </div>

          {/* Book Image */}

          <img
            src={book.url}
            alt={book.title}
            className="rounded-xl h-[500px] object-cover hover:scale-105 transition-all duration-500"
          />

        </div>

        {/* Right Section */}

        <div className="flex flex-col h-full">

          {/* Admin Buttons */}

          {isLoggedIn &&
            role === "admin" && (

            <div className="flex flex-wrap gap-4 mb-8">

              {/* Edit */}

              <Link
                to={`/update-book/${id}`}
                className="flex items-center gap-2 bg-yellow-500 px-5 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition-all duration-300 hover:scale-105"
              >

                <FaEdit />

                Edit

              </Link>

              {/* Delete */}

              <button
                onClick={deleteBook}
                className="flex items-center gap-2 bg-red-500 px-5 py-3 rounded-lg text-lg font-semibold hover:bg-red-600 transition-all duration-300 hover:scale-105"
              >

                <MdDelete />

                Delete

              </button>

            </div>
          )}

          {/* Bestseller */}

          {book.bestseller && (

            <span className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-bold w-fit">

              Bestseller

            </span>
          )}

          {/* Title */}

          <h1 className="text-5xl font-bold leading-tight break-words mt-5">

            {book.title}

          </h1>

          {/* Author */}

          <p className="text-zinc-400 text-xl mt-4">

            by {book.author}

          </p>

          {/* Rating */}

          <div className="flex items-center gap-3 mt-6">

            <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">

              ⭐ {book.ratings || 0}

            </span>

            <span className="text-zinc-400">

              {book.totalReviews || 0}
              reviews

            </span>

          </div>

          {/* Description */}

          <p className="text-zinc-300 leading-8 mt-8 text-lg">

            {book.desc}

          </p>

          {/* Language */}

          <div className="flex flex-wrap items-center gap-3 mt-8 text-lg">

            <MdLanguage className="text-blue-400 text-2xl shrink-0" />

            <span className="text-zinc-300">

              {book.language}

            </span>

            {/* Category */}

            {book.category && (

              <span className="bg-purple-500 px-4 py-2 rounded-full text-sm font-semibold">

                {book.category}

              </span>
            )}

          </div>

          {/* Publisher */}

          {book.publisher && (

            <p className="text-zinc-400 mt-5">

              Publisher:
              <span className="text-white ml-2">

                {book.publisher}

              </span>

            </p>
          )}

          {/* Pages */}

          {book.pages > 0 && (

            <p className="text-zinc-400 mt-2">

              Pages:
              <span className="text-white ml-2">

                {book.pages}

              </span>

            </p>
          )}

          {/* Published Year */}

          {book.publishedYear && (

            <p className="text-zinc-400 mt-2">

              Published:
              <span className="text-white ml-2">

                {book.publishedYear}

              </span>

            </p>
          )}

          {/* Price */}

          <div className="flex items-center gap-5 mt-8">

            <p className="text-blue-400 text-4xl font-bold">

              ₹ {book.price}

            </p>

            <span className="line-through text-zinc-500 text-xl">

              ₹ {book.price + 300}

            </span>

            <span className="text-green-400 font-semibold">

              25% OFF

            </span>

          </div>

          {/* User Buttons */}

          {isLoggedIn &&
            role === "user" && (

            <div className="flex flex-wrap gap-5 mt-10">

              {/* Add To Cart */}

              <button
                onClick={handleCart}
                disabled={
                  cartLoading ||
                  book.stock === 0
                }
                className="flex items-center gap-3 bg-blue-500 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 disabled:bg-zinc-700 disabled:cursor-not-allowed hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
              >

                <FaCartShopping />

                {cartLoading
                  ? "Adding..."
                  : book.stock === 0
                  ? "Out of Stock"
                  : "Add to Cart"}

              </button>

              {/* Favourite */}

              <button
                onClick={
                  handleFavourite
                }
                disabled={
                  favLoading
                }
                className={`flex items-center gap-3 px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 ${
                  isFavourite
                    ? "bg-pink-500 text-white"
                    : "border border-pink-500 hover:bg-pink-500"
                }`}
              >

                <FaHeart />

                {favLoading
                  ? "Adding..."
                  : isFavourite
                  ? "Added to Favourite"
                  : "Favourite"}

              </button>

            </div>
          )}

        </div>

      </div>

      {/* ===================== */}
      {/* REVIEWS SECTION */}
      {/* ===================== */}

      <div className="max-w-7xl mx-auto mt-24">

        <h2 className="text-4xl font-bold">

          Ratings & Reviews

        </h2>

        {/* Rating Summary */}

        <div className="flex items-center gap-5 mt-6">

          <span className="bg-yellow-500 text-black px-5 py-3 rounded-full text-2xl font-bold">

            ⭐ {book.ratings || 0}

          </span>

          <p className="text-zinc-400 text-lg">

            {book.totalReviews || 0}
            reviews

          </p>

        </div>

        {/* Add Review */}

        {isLoggedIn &&
          role === "user" && (

          <div className="bg-zinc-900 rounded-2xl p-6 mt-10">

            <h3 className="text-2xl font-bold">

              Write Review

            </h3>

            {/* Rating */}

            <select
              value={rating}
              onChange={(e) =>
                setRating(
                  Number(
                    e.target.value
                  )
                )
              }
              className="bg-zinc-800 px-5 py-4 rounded-xl outline-none mt-5"
            >

              <option value={5}>
                ⭐⭐⭐⭐⭐
              </option>

              <option value={4}>
                ⭐⭐⭐⭐
              </option>

              <option value={3}>
                ⭐⭐⭐
              </option>

              <option value={2}>
                ⭐⭐
              </option>

              <option value={1}>
                ⭐
              </option>

            </select>

            {/* Comment */}

            <textarea
              rows="5"
              placeholder="Write your review..."
              className="w-full bg-zinc-800 mt-5 px-5 py-4 rounded-xl outline-none resize-none"
              value={comment}
              onChange={(e) =>
                setComment(
                  e.target.value
                )
              }
            ></textarea>

            {/* Button */}

            <button
              onClick={addReview}
              disabled={
                reviewLoading
              }
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-zinc-700 transition-all duration-300 px-8 py-4 rounded-xl text-lg font-semibold mt-5"
            >

              {reviewLoading
                ? "Submitting..."
                : "Submit Review"}

            </button>

          </div>
        )}

        {/* Reviews List */}

        <div className="flex flex-col gap-6 mt-10">

          {book.reviews?.length >
          0 ? (

            book.reviews.map(
              (review) => (

                <div
                  key={review._id}
                  className="bg-zinc-900 rounded-2xl p-6"
                >

                  {/* Top */}

                  <div className="flex items-center justify-between gap-5">

                    {/* Username */}

                    <div>

                      <h3 className="text-2xl font-bold">

                        {
                          review.username
                        }

                      </h3>

                      {/* Rating */}

                      <p className="text-yellow-400 mt-3 text-lg">

                        {"⭐".repeat(
                          review.rating
                        )}

                      </p>

                    </div>

                    {/* Delete */}

                    {review.user ===
                      currentUserId && (

                      <button
                        onClick={() =>
                          deleteReview(
                            review._id
                          )
                        }
                        className="bg-red-500 hover:bg-red-600 transition-all duration-300 px-5 py-3 rounded-xl font-semibold"
                      >

                        Delete

                      </button>
                    )}

                  </div>

                  {/* Comment */}

                  <p className="text-zinc-300 mt-5 leading-7">

                    {
                      review.comment
                    }

                  </p>

                </div>
              )
            )

          ) : (

            <div className="bg-zinc-900 rounded-2xl p-10 text-center">

              <h1 className="text-3xl text-zinc-500 font-bold">

                No Reviews Yet

              </h1>

            </div>
          )}

        </div>

      </div>

      {/* ===================== */}
      {/* RECOMMENDED BOOKS */}
      {/* ===================== */}

      <div className="max-w-7xl mx-auto mt-24">

        <h2 className="text-4xl font-bold">

          You May Also Like

        </h2>

        <p className="text-zinc-400 mt-3 text-lg">

          Similar books recommended for you 📚

        </p>

        {/* Books */}

        {recommendedBooks.length > 0 ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">

            {recommendedBooks.map(
              (items) => (

                <BookCard
                  key={items._id}
                  data={items}
                />

              )
            )}

          </div>

        ) : (

          <div className="bg-zinc-900 rounded-2xl p-10 text-center mt-10">

            <h1 className="text-3xl text-zinc-500 font-bold">

              No Recommendations Found

            </h1>

          </div>
        )}

      </div>

    </div>
  );
}

export default ViewBookDetails;