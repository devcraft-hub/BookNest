import React from "react";

import {
  FaBookOpen,
  FaUsers,
  FaRocket,
  FaShieldAlt,
} from "react-icons/fa";

function AboutUs() {

  return (

    <div className="bg-zinc-950 min-h-screen text-white px-6 py-16">

      <div className="max-w-7xl mx-auto">

        {/* Hero Section */}

        <div className="text-center">

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">

            About
            <span className="text-blue-500 ml-3">

              BookNest

            </span>

          </h1>

          <p className="text-zinc-400 text-lg md:text-xl mt-6 max-w-3xl mx-auto leading-8">

            BookNest is a modern online bookstore platform
            designed for readers who love exploring books,
            managing collections, and enjoying a seamless
            reading experience. From fiction to technology,
            BookNest helps users discover and purchase books
            easily with a clean and user-friendly interface.

          </p>

        </div>

        {/* Stats Section */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">

          {/* Card 1 */}

          <div className="bg-zinc-900 rounded-2xl p-8 text-center shadow-lg hover:shadow-blue-500/20 transition-all duration-300">

            <div className="flex justify-center">

              <FaBookOpen className="text-5xl text-blue-500" />

            </div>

            <h2 className="text-3xl font-bold mt-6">

              10K+

            </h2>

            <p className="text-zinc-400 mt-3 text-lg">

              Books Available

            </p>

          </div>

          {/* Card 2 */}

          <div className="bg-zinc-900 rounded-2xl p-8 text-center shadow-lg hover:shadow-green-500/20 transition-all duration-300">

            <div className="flex justify-center">

              <FaUsers className="text-5xl text-green-500" />

            </div>

            <h2 className="text-3xl font-bold mt-6">

              5K+

            </h2>

            <p className="text-zinc-400 mt-3 text-lg">

              Active Readers

            </p>

          </div>

          {/* Card 3 */}

          <div className="bg-zinc-900 rounded-2xl p-8 text-center shadow-lg hover:shadow-pink-500/20 transition-all duration-300">

            <div className="flex justify-center">

              <FaRocket className="text-5xl text-pink-500" />

            </div>

            <h2 className="text-3xl font-bold mt-6">

              Fast

            </h2>

            <p className="text-zinc-400 mt-3 text-lg">

              Smooth Experience

            </p>

          </div>

        </div>

        {/* Mission Section */}

        <div className="mt-24 grid md:grid-cols-2 gap-12 items-center">

          {/* Left */}

          <div>

            <h2 className="text-4xl font-bold leading-tight">

              Our Mission

            </h2>

            <p className="text-zinc-400 text-lg leading-8 mt-6">

              Our mission is to make reading accessible,
              affordable, and enjoyable for everyone.
              We aim to build a digital bookstore that
              combines technology with knowledge, helping
              readers discover books that inspire learning,
              creativity, and personal growth.

            </p>

            <p className="text-zinc-400 text-lg leading-8 mt-6">

              BookNest is not just a bookstore —
              it’s a platform where readers,
              students, and professionals can
              connect with books that shape
              their future.

            </p>

          </div>

          {/* Right */}

          <div className="bg-zinc-900 rounded-2xl p-10 shadow-lg">

            <div className="flex items-center gap-5">

              <FaShieldAlt className="text-5xl text-blue-500" />

              <div>

                <h3 className="text-2xl font-bold">

                  Secure & Reliable

                </h3>

                <p className="text-zinc-400 mt-2">

                  Safe authentication and reliable
                  order management system.

                </p>

              </div>

            </div>

            <div className="w-full h-[1px] bg-zinc-700 my-8"></div>

            <div className="flex items-center gap-5">

              <FaRocket className="text-5xl text-pink-500" />

              <div>

                <h3 className="text-2xl font-bold">

                  Modern Technology

                </h3>

                <p className="text-zinc-400 mt-2">

                  Built using the MERN stack with
                  scalable backend architecture.

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Footer Quote */}

        <div className="mt-24 text-center">

          <h2 className="text-3xl md:text-4xl font-bold leading-relaxed">

            “A reader lives a thousand lives before he dies.”

          </h2>

          <p className="text-zinc-500 mt-4 text-lg">

            — George R.R. Martin

          </p>

        </div>

      </div>

    </div>
  );
}

export default AboutUs;