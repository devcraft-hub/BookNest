import React, { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function AddBook() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [preview, setPreview] =
    useState("");

  const [data, setData] = useState({

    url: "",

    title: "",

    author: "",

    price: "",

    desc: "",

    language: "",

    stock: "",

    category: "",

    publisher: "",

    pages: "",

    publishedYear: "",

    bestseller: false,
  });

  // headers

  const headers = {
    id: localStorage.getItem("id"),
    authorization:
      `Bearer ${localStorage.getItem("token")}`,
  };

  // input change

  const change = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setData({
      ...data,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });

    // image preview

    if (name === "url") {

      setPreview(value);
    }
  };

  // submit handler

  const submit = async () => {

    try {

      setLoading(true);

      // validation

      if (

        data.url === "" ||
        data.title === "" ||
        data.author === "" ||
        data.price === "" ||
        data.desc === "" ||
        data.language === "" ||
        data.stock === "" ||
        data.category === ""

      ) {

        alert(
          "All fields are required"
        );

        setLoading(false);

        return;
      }

      // validation

      if (data.price <= 0) {

        alert(
          "Price must be greater than 0"
        );

        setLoading(false);

        return;
      }

      if (data.stock < 0) {

        alert(
          "Stock cannot be negative"
        );

        setLoading(false);

        return;
      }

      // api request

      const response = await axios.post(

        `${import.meta.env.VITE_API_URL}/api/v1/add-book`,

        {
          ...data,

          price:
            Number(data.price),

          stock:
            Number(data.stock),

          pages:
            Number(data.pages),

          publishedYear:
            Number(
              data.publishedYear
            ),
        },

        {
          headers,
        }
      );

      alert(response.data.message);

      // clear form

      setData({

        url: "",

        title: "",

        author: "",

        price: "",

        desc: "",

        language: "",

        stock: "",

        category: "",

        publisher: "",

        pages: "",

        publishedYear: "",

        bestseller: false,
      });

      setPreview("");

      // redirect

      navigate("/all-books");

    } catch (error) {

      alert(
        error.response?.data?.message
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="bg-zinc-950 min-h-screen text-white px-6 py-16">

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">

        {/* Left Side */}

        <div className="bg-zinc-900 rounded-2xl p-8 shadow-lg">

          {/* Heading */}

          <h1 className="text-5xl font-bold">

            Add New Book

          </h1>

          <p className="text-zinc-400 mt-4 text-lg">

            Add books to your BookNest store 📚

          </p>

          {/* Form */}

          <div className="flex flex-col gap-6 mt-12">

            {/* Image URL */}

            <input
              type="text"
              placeholder="Book Image URL"
              className="bg-zinc-800 px-5 py-4 rounded-xl outline-none border border-zinc-700 focus:border-blue-500 transition-all duration-300"
              name="url"
              value={data.url}
              onChange={change}
            />

            {/* Title */}

            <input
              type="text"
              placeholder="Book Title"
              className="bg-zinc-800 px-5 py-4 rounded-xl outline-none border border-zinc-700 focus:border-blue-500 transition-all duration-300"
              name="title"
              value={data.title}
              onChange={change}
            />

            {/* Author */}

            <input
              type="text"
              placeholder="Author Name"
              className="bg-zinc-800 px-5 py-4 rounded-xl outline-none border border-zinc-700 focus:border-blue-500 transition-all duration-300"
              name="author"
              value={data.author}
              onChange={change}
            />

            {/* Price */}

            <input
              type="number"
              placeholder="Price"
              className="bg-zinc-800 px-5 py-4 rounded-xl outline-none border border-zinc-700 focus:border-blue-500 transition-all duration-300"
              name="price"
              value={data.price}
              onChange={change}
            />

            {/* Stock */}

            <input
              type="number"
              placeholder="Stock"
              className="bg-zinc-800 px-5 py-4 rounded-xl outline-none border border-zinc-700 focus:border-blue-500 transition-all duration-300"
              name="stock"
              value={data.stock}
              onChange={change}
            />

            {/* Language */}

            <select
              className="bg-zinc-800 px-5 py-4 rounded-xl outline-none border border-zinc-700 focus:border-blue-500 transition-all duration-300"
              name="language"
              value={data.language}
              onChange={change}
            >

              <option value="">

                Select Language

              </option>

              <option value="English">

                English

              </option>

              <option value="Hindi">

                Hindi

              </option>

            </select>

            {/* Category */}

            <select
              className="bg-zinc-800 px-5 py-4 rounded-xl outline-none border border-zinc-700 focus:border-blue-500 transition-all duration-300"
              name="category"
              value={data.category}
              onChange={change}
            >

              <option value="">

                Select Category

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

            {/* Publisher */}

            <input
              type="text"
              placeholder="Publisher"
              className="bg-zinc-800 px-5 py-4 rounded-xl outline-none border border-zinc-700 focus:border-blue-500 transition-all duration-300"
              name="publisher"
              value={data.publisher}
              onChange={change}
            />

            {/* Pages */}

            <input
              type="number"
              placeholder="Pages"
              className="bg-zinc-800 px-5 py-4 rounded-xl outline-none border border-zinc-700 focus:border-blue-500 transition-all duration-300"
              name="pages"
              value={data.pages}
              onChange={change}
            />

            {/* Published Year */}

            <input
              type="number"
              placeholder="Published Year"
              className="bg-zinc-800 px-5 py-4 rounded-xl outline-none border border-zinc-700 focus:border-blue-500 transition-all duration-300"
              name="publishedYear"
              value={data.publishedYear}
              onChange={change}
            />

            {/* Bestseller */}

            <label className="flex items-center gap-4 bg-zinc-800 px-5 py-4 rounded-xl">

              <input
                type="checkbox"
                name="bestseller"
                checked={data.bestseller}
                onChange={change}
              />

              Bestseller Book

            </label>

            {/* Description */}

            <textarea
              placeholder="Book Description"
              rows="6"
              className="bg-zinc-800 px-5 py-4 rounded-xl outline-none resize-none border border-zinc-700 focus:border-blue-500 transition-all duration-300"
              name="desc"
              value={data.desc}
              onChange={change}
            ></textarea>

            {/* Button */}

            <button
              onClick={submit}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-zinc-700 disabled:cursor-not-allowed transition-all duration-300 py-4 rounded-xl text-xl font-semibold hover:scale-[1.02]"
            >

              {loading
                ? "Adding Book..."
                : "Add Book"}

            </button>

          </div>

        </div>

        {/* Right Side Preview */}

        <div className="bg-zinc-900 rounded-2xl p-8 shadow-lg flex flex-col">

          <h2 className="text-4xl font-bold">

            Live Preview

          </h2>

          <p className="text-zinc-400 mt-3">

            Preview how your book will look 📖

          </p>

          {/* Preview Card */}

          <div className="bg-zinc-800 rounded-2xl mt-10 overflow-hidden shadow-lg hover:shadow-blue-500/10 transition-all duration-300">

            {/* Image */}

            <div className="h-[400px] bg-zinc-700 flex items-center justify-center overflow-hidden">

              {preview ? (

                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />

              ) : (

                <p className="text-zinc-400 text-lg">

                  Image Preview

                </p>
              )}

            </div>

            {/* Content */}

            <div className="p-6">

              {/* Bestseller */}

              {data.bestseller && (

                <span className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-bold">

                  Bestseller

                </span>
              )}

              <h1 className="text-3xl font-bold line-clamp-2 mt-4">

                {data.title ||
                  "Book Title"}

              </h1>

              <p className="text-zinc-400 mt-3">

                by {
                  data.author ||
                  "Author Name"
                }

              </p>

              <p className="text-blue-400 text-3xl font-bold mt-5">

                ₹ {
                  data.price || 0
                }

              </p>

              {/* Category */}

              {data.category && (

                <div className="mt-4">

                  <span className="bg-purple-500 px-4 py-2 rounded-full text-sm font-semibold">

                    {data.category}

                  </span>

                </div>
              )}

              {/* Stock */}

              <div className="flex flex-wrap items-center gap-3 mt-5">

                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  data.stock === ""
                    ? "bg-zinc-700"
                    : Number(data.stock) === 0
                    ? "bg-red-500 text-white"
                    : Number(data.stock) <= 5
                    ? "bg-yellow-500 text-black"
                    : "bg-green-500 text-black"
                }`}>

                  {data.stock === ""
                    ? "Stock"
                    : Number(data.stock) === 0
                    ? "Out of Stock"
                    : Number(data.stock) <= 5
                    ? `Only ${data.stock} Left`
                    : "In Stock"}

                </span>

                {data.language && (

                  <span className="bg-blue-500 px-4 py-2 rounded-full text-sm font-semibold">

                    {data.language}

                  </span>
                )}

              </div>

              {/* Publisher */}

              {data.publisher && (

                <p className="text-zinc-400 mt-5">

                  Publisher:
                  <span className="text-white ml-2">

                    {data.publisher}

                  </span>

                </p>
              )}

              {/* Pages */}

              {data.pages && (

                <p className="text-zinc-400 mt-2">

                  Pages:
                  <span className="text-white ml-2">

                    {data.pages}

                  </span>

                </p>
              )}

              {/* Published Year */}

              {data.publishedYear && (

                <p className="text-zinc-400 mt-2">

                  Published:
                  <span className="text-white ml-2">

                    {data.publishedYear}

                  </span>

                </p>
              )}

              {/* Description */}

              <p className="text-zinc-400 mt-6 leading-7 line-clamp-4">

                {data.desc ||
                  "Book description preview will appear here..."}

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddBook;