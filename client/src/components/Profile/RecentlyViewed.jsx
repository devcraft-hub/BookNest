import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Loader from "../Loader/Loader";

import BookCard from "../BookCard/BookCard";

function RecentlyViewed() {

  const [books, setBooks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // headers

  const headers = {
    id: localStorage.getItem("id"),
    authorization:
      `Bearer ${localStorage.getItem("token")}`,
  };

  // fetch recently viewed

  useEffect(() => {

    const fetchBooks =
      async () => {

        try {

          const response =
            await axios.get(

              `${import.meta.env.VITE_API_URL}/api/v1/get-recently-viewed`,

              {
                headers,
              }
            );

          setBooks(
            response.data.data
          );

          setLoading(false);

        } catch (error) {

          console.log(error);

          setLoading(false);
        }
      };

    fetchBooks();

  }, []);

  // loader

  if (loading) {

    return <Loader />;
  }

  return (

    <div className="text-white">

      {/* Heading */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold">

          Recently Viewed

        </h1>

        <p className="text-zinc-400 mt-3 text-lg">

          Books you recently explored 📚

        </p>

      </div>

      {/* Empty */}

      {books.length === 0 && (

        <div className="flex items-center justify-center h-[50vh]">

          <h1 className="text-3xl text-zinc-500 font-semibold">

            No Recently Viewed Books

          </h1>

        </div>
      )}

      {/* Books */}

      {books.length > 0 && (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {books.map((items) => (

            <BookCard
              key={items._id}
              data={items}
            />

          ))}

        </div>
      )}

    </div>
  );
}

export default RecentlyViewed;