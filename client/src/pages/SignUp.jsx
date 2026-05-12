import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import {
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

import { auth } from "../firebase/firebase";

import { FcGoogle } from "react-icons/fc";

import { FaEye, FaEyeSlash } from "react-icons/fa";

function SignUp() {

  const navigate = useNavigate();

  // show / hide password

  const [showPassword, setShowPassword] = useState(false);

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  // handle input change

  const change = (e) => {

    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  // handle submit

  const submit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:1000/api/v1/sign-up",
        values
      );

      alert(response.data.message);

      navigate("/login");

    } catch (error) {

      alert(error.response.data.message);
    }
  };

  // google signup

  const googleSignup = async () => {

    try {

      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(
        auth,
        provider
      );

      console.log(result.user);

      alert("Google SignUp Successful");

      navigate("/");

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-20">

      <div className="bg-zinc-900 p-8 rounded-xl w-full max-w-md shadow-lg">

        {/* Heading */}

        <h1 className="text-4xl font-bold text-white text-center">

          Create Account

        </h1>

        <p className="text-zinc-400 text-center mt-3">

          Join BookNest today and dive into a world of endless reading possibilities!

        </p>

        {/* Form */}

        <form
          onSubmit={submit}
          className="flex flex-col gap-5 mt-8"
        >

          {/* Username */}

          <input
            type="text"
            placeholder="Username"
            name="username"
            value={values.username}
            onChange={change}
            required
            className="bg-zinc-800 text-white px-4 py-3 rounded outline-none border border-zinc-700 focus:border-blue-500"
          />

          {/* Email */}

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={change}
            required
            className="bg-zinc-800 text-white px-4 py-3 rounded outline-none border border-zinc-700 focus:border-blue-500"
          />

          {/* Password */}

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={change}
              required
              className="w-full bg-zinc-800 text-white px-4 py-3 rounded outline-none border border-zinc-700 focus:border-blue-500"
            />

            {/* Eye Icon */}

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-all duration-300"
            >

              {showPassword
                ? <FaEyeSlash />
                : <FaEye />
              }

            </button>

          </div>

          {/* Address */}

          <textarea
            placeholder="Address"
            name="address"
            value={values.address}
            onChange={change}
            required
            rows="4"
            className="bg-zinc-800 text-white px-4 py-3 rounded outline-none border border-zinc-700 focus:border-blue-500 resize-none"
          />

          {/* Button */}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white py-3 rounded-lg text-lg font-semibold hover:scale-[1.02]"
          >

            Sign Up

          </button>

        </form>

        {/* Divider */}

        <div className="flex items-center gap-3 mt-6">

          <div className="h-[1px] w-full bg-zinc-700"></div>

          <p className="text-zinc-400 text-sm">
            OR
          </p>

          <div className="h-[1px] w-full bg-zinc-700"></div>

        </div>

        {/* Google Button */}

        <button
          onClick={googleSignup}
          className="w-full mt-6 flex items-center justify-center gap-3 bg-white text-black py-3 rounded-lg font-semibold hover:bg-zinc-200 transition-all duration-300 hover:scale-[1.02]"
        >

          <FcGoogle className="text-2xl" />

          Continue with Google

        </button>

      </div>

    </div>
  );
}

export default SignUp;