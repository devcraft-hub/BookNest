import React, { useEffect, useState } from "react";

import axios from "axios";

import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";
function RecentlyAdded() {

  const [books, setBooks] = useState([]);

const [loading, setLoading] = useState(true);

  // fetch recent books

  useEffect(() => {

    const fetchBooks = async () => {

      try {

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/get-recent-books`
        );

        setBooks(response.data.data);
        setLoading(false);

      } catch (error) {

        console.log(error);
        
      // error loading stop
      setLoading(false);
    
      }
    };

    fetchBooks();

  }, []);
  if (loading) {

  return <Loader />;
}

  return (

    <div className="bg-zinc-950 text-white px-6 py-16">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold">

            Recently Added

          </h1>

          <p className="text-zinc-400 mt-3 text-lg">

            Explore the latest books added to BookNest.

          </p>

        </div>

        {/* Books Grid */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {books.map((items) => (

            <BookCard
              key={items._id}
              data={items}
            />

          ))}

        </div>

      </div>

    </div>
  );
}

export default RecentlyAdded;