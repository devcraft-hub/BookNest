import React from "react";

import { Link } from "react-router-dom";

function BookCard({ data }) {

  return (

    <Link
      to={`/view-book-details/${data._id}`}
      className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:scale-[1.03] transition-all duration-300 hover:shadow-blue-500/20 flex flex-col"
    >

      {/* Book Image */}

      <img
        src={data.url}
        alt={data.title}
        className="h-64 w-full object-cover"
      />

      {/* Book Details */}

      <div className="p-5 flex flex-col flex-grow">

        {/* Top Section */}

        <div>

          {/* Title */}

          <h2 className="text-2xl font-semibold text-white line-clamp-2 min-h-[64px]">

            {data.title}

          </h2>

          {/* Author */}

          <p className="text-zinc-400 mt-2 line-clamp-1">

            by {data.author}

          </p>

        </div>

        {/* Bottom Section */}

        <div className="flex items-center justify-between mt-auto pt-6">

          <p className="text-blue-400 text-xl font-bold">

            ₹ {data.price}

          </p>

          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-300">

            View

          </button>

        </div>

      </div>

    </Link>
  );
}

export default BookCard;