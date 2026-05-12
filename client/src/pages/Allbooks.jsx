import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import BookCard from "../components/BookCard/BookCard";

import Loader from "../components/Loader/Loader";

function AllBooks() {

  const [books, setBooks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [languageFilter,
    setLanguageFilter] =
    useState("All");

  const [categoryFilter,
    setCategoryFilter] =
    useState("All");

  const [sortBy,
    setSortBy] =
    useState("latest");

  const [bestsellerOnly,
    setBestsellerOnly] =
    useState(false);

  // =====================
  // FETCH ALL BOOKS
  // =====================

  const fetchBooks = async () => {

    try {

      setLoading(true);

      const response =
        await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/get-all-books`
        );

      setBooks(response.data.data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);
    }
  };

  // initial fetch

  useEffect(() => {

    fetchBooks();

  }, []);

  // =====================
  // SEARCH BOOKS
  // =====================

  const searchBooks = async () => {

    try {

      // empty search

      if (
        search.trim() === ""
      ) {

        fetchBooks();

        return;
      }

      setLoading(true);

      const response =
        await axios.get(

          `${import.meta.env.VITE_API_URL}/api/v1/search-books/${search}`
        );

      setBooks(response.data.data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);
    }
  };

  // =====================
  // FILTER + SORT BOOKS
  // =====================

  let filteredBooks = [...books];

  // language filter

  if (languageFilter !== "All") {

    filteredBooks =
      filteredBooks.filter(

        (book) =>

          book.language ===
          languageFilter
      );
  }

  // category filter

  if (categoryFilter !== "All") {

    filteredBooks =
      filteredBooks.filter(

        (book) =>

          book.category ===
          categoryFilter
      );
  }

  // bestseller filter

  if (bestsellerOnly) {

    filteredBooks =
      filteredBooks.filter(

        (book) =>

          book.bestseller === true
      );
  }

  // sorting

  if (sortBy === "lowToHigh") {

    filteredBooks.sort(
      (a, b) =>
        a.price - b.price
    );
  }

  if (sortBy === "highToLow") {

    filteredBooks.sort(
      (a, b) =>
        b.price - a.price
    );
  }

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

      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold">

            All Books

          </h1>

          <p className="text-zinc-400 mt-3 text-lg">

            Explore all books available on BookNest 📚

          </p>

        </div>

        {/* Search + Filters */}

        <div className="flex flex-col xl:flex-row gap-5 mb-12">

          {/* Search */}

          <div className="flex gap-4 flex-1">

            <input
              type="text"
              placeholder="Search books or authors..."
              className="w-full bg-zinc-900 text-white px-5 py-4 rounded-xl outline-none border border-zinc-700 focus:border-blue-500 transition-all duration-300"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

            <button
              onClick={searchBooks}
              className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 px-8 rounded-xl font-semibold"
            >

              Search

            </button>

          </div>

          {/* Language Filter */}

          <select
            value={languageFilter}
            onChange={(e) =>
              setLanguageFilter(
                e.target.value
              )
            }
            className="bg-zinc-900 text-white px-5 py-4 rounded-xl outline-none border border-zinc-700 focus:border-blue-500 transition-all duration-300"
          >

            <option value="All">

              All Languages

            </option>

            <option value="English">

              English

            </option>

            <option value="Hindi">

              Hindi

            </option>

          </select>

          {/* Category Filter */}

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(
                e.target.value
              )
            }
            className="bg-zinc-900 text-white px-5 py-4 rounded-xl outline-none border border-zinc-700 focus:border-blue-500 transition-all duration-300"
          >

            <option value="All">

              All Categories

            </option>

            <option value="Programming">

              Programming

            </option>

            <option value="Fiction">

              Fiction

            </option>

            <option value="Self Help">

              Self Help

            </option>

            <option value="Science">

              Science

            </option>

            <option value="Business">

              Business

            </option>

            <option value="History">

              History

            </option>

            <option value="Biography">

              Biography

            </option>

          </select>

          {/* Sorting */}

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                e.target.value
              )
            }
            className="bg-zinc-900 text-white px-5 py-4 rounded-xl outline-none border border-zinc-700 focus:border-blue-500 transition-all duration-300"
          >

            <option value="latest">

              Latest

            </option>

            <option value="lowToHigh">

              Price: Low to High

            </option>

            <option value="highToLow">

              Price: High to Low

            </option>

          </select>

        </div>

        {/* Bestseller Toggle */}

        <div className="mb-10">

          <label className="flex items-center gap-3 bg-zinc-900 px-5 py-4 rounded-xl border border-zinc-700 w-fit">

            <input
              type="checkbox"
              checked={bestsellerOnly}
              onChange={(e) =>
                setBestsellerOnly(
                  e.target.checked
                )
              }
            />

            Bestseller Only

          </label>

        </div>

        {/* Results Count */}

        <div className="mb-8">

          <p className="text-zinc-400 text-lg">

            Showing
            <span className="text-white font-semibold mx-2">

              {filteredBooks.length}

            </span>
            books

          </p>

        </div>

        {/* Empty State */}

        {filteredBooks.length === 0 && (

          <div className="flex items-center justify-center h-[50vh]">

            <h1 className="text-4xl text-zinc-500 font-bold">

              No Books Found

            </h1>

          </div>
        )}

        {/* Books Grid */}

        {filteredBooks.length > 0 && (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {filteredBooks.map(
              (items) => (

                <BookCard
                  key={items._id}
                  data={items}
                />

              )
            )}

          </div>
        )}

      </div>

    </div>
  );
}

export default AllBooks;