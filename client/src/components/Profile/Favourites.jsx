import React, { useEffect, useState } from "react";

import axios from "axios";

import Loader from "../Loader/Loader";

import { Link } from "react-router-dom";

function Favourites() {

  const [favouriteBooks, setFavouriteBooks] = useState([]);

  const [loading, setLoading] = useState(true);

  // headers

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // fetch favourite books

  useEffect(() => {

    const fetchFavouriteBooks = async () => {

      try {

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/get-favourite-books`,
          {
            headers,
          }
        );

        setFavouriteBooks(response.data.data);

        setLoading(false);

      } catch (error) {

        console.log(error);

        setLoading(false);
      }
    };

    fetchFavouriteBooks();

  }, []);

  // remove from favourite

  const removeFromFavourite = async (bookId) => {

    try {

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/remove-book-from-favourite/${bookId}`,
        {},
        {
          headers,
        }
      );

      alert(response.data.message);

      // update UI instantly

      setFavouriteBooks(
        favouriteBooks.filter(
          (item) => item._id !== bookId
        )
      );

    } catch (error) {

      console.log(error);
    }
  };

  // loader

  if (loading) {

    return <Loader />;
  }

  return (

    <div className="text-white h-full flex flex-col">

      {/* Heading */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold">

          Favourite Books

        </h1>

        <p className="text-zinc-400 mt-3 text-lg">

          Your saved favourite books 📚

        </p>

      </div>

      {/* No Favourite Books */}

      {favouriteBooks.length === 0 && (

        <div className="flex items-center justify-center h-[50vh]">

          <h1 className="text-3xl text-zinc-500 font-semibold">

            No Favourite Books

          </h1>

        </div>
      )}

      {/* Favourite Books Scrollable Section */}

      <div className="flex flex-col gap-5 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-zinc-900">

        {favouriteBooks.map((items) => (

          <div
            key={items._id}
            className="bg-zinc-900 rounded-xl p-4 flex flex-col md:flex-row gap-5 items-center shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
          >

            {/* Book Image */}

            <Link
              to={`/view-book-details/${items._id}`}
              className="shrink-0"
            >

              <img
                src={items.url}
                alt={items.title}
                className="w-28 h-36 object-cover rounded-lg hover:scale-105 transition-all duration-300"
              />

            </Link>

            {/* Book Details */}

            <div className="flex-1 w-full">

              <h2 className="text-2xl font-bold">

                {items.title}

              </h2>

              <p className="text-zinc-400 mt-2">

                by {items.author}

              </p>

              <p className="text-blue-400 text-xl font-semibold mt-3">

                ₹ {items.price}

              </p>

              <p className="text-zinc-500 text-sm mt-3 line-clamp-2">

                {items.desc}

              </p>

            </div>

            {/* Remove Button */}

            <button
              onClick={() =>
                removeFromFavourite(items._id)
              }
              className="bg-red-500 hover:bg-red-600 transition-all duration-300 text-white px-5 py-3 rounded-lg font-semibold whitespace-nowrap"
            >

              Remove

            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Favourites;