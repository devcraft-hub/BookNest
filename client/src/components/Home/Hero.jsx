import React from "react";

import { Link } from "react-router-dom";

function Hero() {

  return (

    <div className="min-h-[85vh] bg-zinc-950 text-white flex items-center justify-center px-6 py-20">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Left Section */}

        <div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">

            Discover Your Next

            <span className="text-blue-500">
              {" "}Favourite Book
            </span>

          </h1>

          <p className="text-zinc-400 text-lg mt-7 leading-8">

   Explore lots of books from different
  categories, save your favourites, and
  manage your cart with ease. Enjoy a
  smooth and seamless reading journey with
  BookNest.


          </p>

          {/* Buttons */}

          <div className="flex gap-5 mt-20">

            {/* Explore Books */}

            <Link
              to="/all-books"
              className="bg-blue-500 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
            >

              Explore Books

            </Link>

            {/* Learn More */}

            <Link
              to="/about-us"
              className="border border-blue-500 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-500 hover:scale-105 transition-all duration-300"
            >

              Learn More

            </Link>

          </div>

        </div>

        {/* Right Section */}

        <div className="flex justify-center">

          <img
            src={"/library1.webp"}
            alt="books"
            className="w-[320px] md:w-[420px] drop-shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:scale-105 transition-all duration-500"
          />

        </div>

      </div>

    </div>
  );
}

export default Hero;