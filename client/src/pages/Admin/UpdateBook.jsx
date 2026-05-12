import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import Loader from "../../components/Loader/Loader";

function UpdateBook() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [updating, setUpdating] =
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

    category: "",

    stock: "",

    bestseller: false,
  });

  // =====================
  // HEADERS
  // =====================

  const headers = {

    id:
      localStorage.getItem("id"),

    authorization:
      `Bearer ${localStorage.getItem("token")}`,
  };

  // =====================
  // FETCH BOOK
  // =====================

  useEffect(() => {

    const fetchBook =
      async () => {

        try {

          const response =
            await axios.get(

              `http://localhost:1000/api/v1/get-book-by-id/${id}`
            );

          setData({

            url:
              response.data.data.url,

            title:
              response.data.data.title,

            author:
              response.data.data.author,

            price:
              response.data.data.price,

            desc:
              response.data.data.desc,

            language:
              response.data.data.language,

            category:
              response.data.data.category,

            stock:
              response.data.data.stock || 0,

            bestseller:
              response.data.data.bestseller || false,
          });

          setPreview(
            response.data.data.url
          );

          setLoading(false);

        } catch (error) {

          console.log(error);

          setLoading(false);
        }
      };

    fetchBook();

  }, [id]);

  // =====================
  // INPUT CHANGE
  // =====================

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

  // =====================
  // UPDATE BOOK
  // =====================

  const submit =
    async () => {

      try {

        setUpdating(true);

        // validation

        if (

          data.url === "" ||
          data.title === "" ||
          data.author === "" ||
          data.price === "" ||
          data.desc === "" ||
          data.language === "" ||
          data.category === ""

        ) {

          alert(
            "All fields are required"
          );

          setUpdating(false);

          return;
        }

        const response =
          await axios.put(

            `http://localhost:1000/api/v1/update-book/${id}`,

            {

              ...data,

              price:
                Number(data.price),

              stock:
                Number(data.stock),
            },

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
          error.response?.data?.message
        );

      } finally {

        setUpdating(false);
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

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">

        {/* LEFT SIDE */}

        <div className="bg-zinc-900 rounded-2xl p-8 shadow-lg">

          {/* HEADING */}

          <h1 className="text-5xl font-bold">

            Update Book

          </h1>

          <p className="text-zinc-400 mt-4 text-lg">

            Edit your existing book 📚

          </p>

          {/* FORM */}

          <div className="flex flex-col gap-6 mt-12">

            {/* IMAGE URL */}

            <input
              type="text"
              placeholder="Book Image URL"
              className="bg-zinc-800 px-5 py-4 rounded-xl outline-none border border-zinc-700 focus:border-blue-500 transition-all duration-300"
              name="url"
              value={data.url}
              onChange={change}
            />

            {/* TITLE */}

            <input
              type="text"
              placeholder="Book Title"
              className="bg-zinc-800 px-5 py-4 rounded-xl outline-none border border-zinc-700 focus:border-blue-500 transition-all duration-300"
              name="title"
              value={data.title}
              onChange={change}
            />

            {/* AUTHOR */}

            <input
              type="text"
              placeholder="Author Name"
              className="bg-zinc-800 px-5 py-4 rounded-xl outline-none border border-zinc-700 focus:border-blue-500 transition-all duration-300"
              name="author"
              value={data.author}
              onChange={change}
            />

            {/* PRICE */}

            <input
              type="number"
              placeholder="Price"
              className="bg-zinc-800 px-5 py-4 rounded-xl outline-none border border-zinc-700 focus:border-blue-500 transition-all duration-300"
              name="price"
              value={data.price}
              onChange={change}
            />

            {/* STOCK */}

            <input
              type="number"
              placeholder="Stock"
              className="bg-zinc-800 px-5 py-4 rounded-xl outline-none border border-zinc-700 focus:border-blue-500 transition-all duration-300"
              name="stock"
              value={data.stock}
              onChange={change}
            />

            {/* LANGUAGE */}

            <select
              className="bg-zinc-800 px-5 py-4 rounded-xl outline-none border border-zinc-700 focus:border-blue-500 transition-all duration-300"
              name="language"
              value={data.language}
              onChange={change}
            >

              <option value="English">

                English

              </option>

              <option value="Hindi">

                Hindi

              </option>

            </select>

            {/* CATEGORY */}

            <select
              className="bg-zinc-800 px-5 py-4 rounded-xl outline-none border border-zinc-700 focus:border-blue-500 transition-all duration-300"
              name="category"
              value={data.category}
              onChange={change}
            >

              <option value="">

                Select Category

              </option>

              <option value="Self Help">

                Self Help

              </option>

              <option value="Programming">

                Programming

              </option>

              <option value="Business">

                Business

              </option>

              <option value="Finance">

                Finance

              </option>

              <option value="Fantasy">

                Fantasy

              </option>

              <option value="Science Fiction">

                Science Fiction

              </option>

              <option value="Thriller">

                Thriller

              </option>

              <option value="Mystery">

                Mystery

              </option>

              <option value="Romance">

                Romance

              </option>

              <option value="Classic">

                Classic

              </option>

              <option value="Biography">

                Biography

              </option>

              <option value="Motivation">

                Motivation

              </option>

              <option value="Psychology">

                Psychology

              </option>

              <option value="History">

                History

              </option>

              <option value="Horror">

                Horror

              </option>

            </select>

            {/* BESTSELLER */}

            <div className="flex items-center gap-4 bg-zinc-800 px-5 py-4 rounded-xl border border-zinc-700">

              <input
                type="checkbox"
                name="bestseller"
                checked={data.bestseller}
                onChange={change}
                className="w-5 h-5 accent-blue-500"
              />

              <label className="text-lg font-semibold">

                Bestseller Book

              </label>

            </div>

            {/* DESCRIPTION */}

            <textarea
              placeholder="Book Description"
              rows="6"
              className="bg-zinc-800 px-5 py-4 rounded-xl outline-none resize-none border border-zinc-700 focus:border-blue-500 transition-all duration-300"
              name="desc"
              value={data.desc}
              onChange={change}
            ></textarea>

            {/* BUTTON */}

            <button
              onClick={submit}
              disabled={updating}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-zinc-700 disabled:cursor-not-allowed transition-all duration-300 py-4 rounded-xl text-xl font-semibold hover:scale-[1.02]"
            >

              {updating

                ? "Updating..."

                : "Update Book"}

            </button>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="bg-zinc-900 rounded-2xl p-8 shadow-lg flex flex-col">

          <h2 className="text-4xl font-bold">

            Live Preview

          </h2>

          <p className="text-zinc-400 mt-3">

            Preview updated book 📖

          </p>

          {/* PREVIEW CARD */}

          <div className="bg-zinc-800 rounded-2xl mt-10 overflow-hidden shadow-lg hover:shadow-blue-500/10 transition-all duration-300">

            {/* IMAGE */}

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

            {/* CONTENT */}

            <div className="p-6">

              {/* TITLE */}

              <div className="flex items-center gap-3 flex-wrap">

                <h1 className="text-3xl font-bold line-clamp-2">

                  {data.title ||
                    "Book Title"}

                </h1>

                {/* BESTSELLER TAG */}

                {data.bestseller && (

                  <span className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-bold">

                    Bestseller

                  </span>
                )}

              </div>

              {/* AUTHOR */}

              <p className="text-zinc-400 mt-3">

                by {
                  data.author ||
                  "Author Name"
                }

              </p>

              {/* PRICE */}

              <p className="text-blue-400 text-3xl font-bold mt-5">

                ₹ {
                  data.price || 0
                }

              </p>

              {/* STOCK + LANGUAGE + CATEGORY */}

              <div className="flex items-center gap-3 mt-5 flex-wrap">

                {/* STOCK */}

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

                {/* LANGUAGE */}

                {data.language && (

                  <span className="bg-blue-500 px-4 py-2 rounded-full text-sm font-semibold">

                    {data.language}

                  </span>
                )}

                {/* CATEGORY */}

                {data.category && (

                  <span className="bg-purple-500 px-4 py-2 rounded-full text-sm font-semibold">

                    {data.category}

                  </span>
                )}

              </div>

              {/* DESCRIPTION */}

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

export default UpdateBook;