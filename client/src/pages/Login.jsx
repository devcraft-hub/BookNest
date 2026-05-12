import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import {
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

import { auth } from "../firebase/firebase";

import { FcGoogle } from "react-icons/fc";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useDispatch } from "react-redux";

import { authActions } from "../store/auth";

function Login() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // show / hide password

  const [showPassword, setShowPassword] = useState(false);

  const [values, setValues] = useState({
    username: "",
    password: "",
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
        "http://localhost:1000/api/v1/sign-in",
        values
      );

      // local storage

      localStorage.setItem(
        "id",
        response.data.id
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      // redux login

      dispatch(
        authActions.login({
          role: response.data.role,
        })
      );

      alert("Login Successful");

      navigate("/");

    } catch (error) {

      alert(error.response.data.message);
    }
  };

  // google login

  const googleLogin = async () => {

    try {

      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(
        auth,
        provider
      );

      console.log(result.user);

      // temporary localStorage

      localStorage.setItem(
        "googleUser",
        JSON.stringify(result.user)
      );

      // redux login

      dispatch(
        authActions.login({
          role: "user",
        })
      );

      alert("Google Login Successful");

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

          Welcome Back

        </h1>

        <p className="text-zinc-400 text-center mt-3">

          Login to continue your reading journey 📚

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

          {/* Login Button */}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white py-3 rounded-lg text-lg font-semibold hover:scale-[1.02]"
          >

            Login

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
          onClick={googleLogin}
          className="w-full mt-6 flex items-center justify-center gap-3 bg-white text-black py-3 rounded-lg font-semibold hover:bg-zinc-200 transition-all duration-300 hover:scale-[1.02]"
        >

          <FcGoogle className="text-2xl" />

          Continue with Google

        </button>

        {/* Signup Link */}

        <p className="text-zinc-400 text-center mt-6">

          Don’t have an account?

          <Link
            to="/signup"
            className="text-blue-400 ml-2 hover:underline"
          >

            Sign Up

          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;