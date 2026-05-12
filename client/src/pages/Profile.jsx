import React, {
  useState,
  useEffect,
} from "react";

import axios from "axios";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import { authActions } from "../store/auth";

import {
  useNavigate,
  Outlet,
} from "react-router-dom";

import Sidebar from "../components/Profile/Sidebar";

import Loader from "../components/Loader/Loader";

function Profile() {

  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  // =====================
  // LOADER STATE
  // =====================

  const [loading,
    setLoading] =
    useState(true);

  // =====================
  // PROFILE STATE
  // =====================

  const [profile,
    setProfile] =
    useState(null);

  // =====================
  // REDUX STATE
  // =====================

  const isLoggedIn =
    useSelector(

      (state) =>

        state.auth
          .isLoggedIn
    );

  // =====================
  // HEADERS
  // =====================

  const headers = {

    id:
      localStorage.getItem(
        "id"
      ),

    authorization:

      `Bearer ${localStorage.getItem("token")}`,
  };

  // =====================
  // FETCH PROFILE
  // =====================

  useEffect(() => {

    const fetchProfile =
      async () => {

        try {

          const response =
            await axios.get(

              `${import.meta.env.VITE_API_URL}/api/v1/get-user-information`,

              {
                headers,
              }
            );

          setProfile(
            response.data.data
          );

          setLoading(false);

        } catch (error) {

          console.log(error);

          setLoading(false);
        }
      };

    fetchProfile();

  }, []);

  // =====================
  // LOGOUT
  // =====================

  const logout = () => {

    localStorage.clear();

    dispatch(
      authActions.logout()
    );

    navigate("/login");
  };

  // =====================
  // LOADER
  // =====================

  if (loading) {

    return (

      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">

        <Loader />

      </div>
    );
  }

  // =====================
  // NOT LOGGED IN
  // =====================

  if (!isLoggedIn) {

    return (

      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">

        <h1 className="text-3xl font-bold">

          Please Login First

        </h1>

      </div>
    );
  }

  return (

    <div className="bg-zinc-950 min-h-screen px-6 py-20 text-white">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-8 items-start">

        {/* ===================== */}
        {/* SIDEBAR */}
        {/* ===================== */}

        <div className="md:col-span-2">

          <Sidebar
            data={profile}
            logout={logout}
          />

        </div>

        {/* ===================== */}
        {/* MAIN CONTENT */}
        {/* ===================== */}

        <div className="md:col-span-4 bg-zinc-900 rounded-2xl p-8 shadow-lg min-h-[75vh]">

          {/* ===================== */}
          {/* PROFILE HEADER */}
          {/* ===================== */}

          <div className="mb-10 border-b border-zinc-700 pb-8">

            <div className="flex flex-col md:flex-row items-center gap-6">

              {/* Avatar */}

              <img
                src={
                  profile?.avatar ||

                  "/books.png"
                }
                alt="profile"
                className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
              />

              {/* Info */}

              <div className="text-center md:text-left">

                {/* Username */}

                <h1 className="text-4xl font-bold break-words">

                  {profile?.username ||

                    "BookNest User"}

                </h1>

                {/* Email */}

                <p className="text-zinc-400 mt-2 text-lg break-all">

                  {profile?.email ||

                    "user@gmail.com"}

                </p>

                {/* Tags */}

                <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">

                  {/* Role */}

                  <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                    profile?.role ===
                    "admin"

                      ? "bg-purple-500 text-white"

                      : "bg-blue-500 text-white"
                  }`}>

                    {profile?.role ||

                      "user"}

                  </span>

                  {/* Verification */}

                  {profile?.isVerified && (

                    <span className="bg-green-500 text-black px-4 py-1 rounded-full text-sm font-semibold">

                      Verified

                    </span>
                  )}

                  {/* Premium */}

                  {profile?.isPremiumMember && (

                    <span className="bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-semibold">

                      Premium

                    </span>
                  )}

                </div>

              </div>

            </div>

            {/* ===================== */}
            {/* EXTRA DETAILS */}
            {/* ===================== */}

            <div className="grid sm:grid-cols-2 gap-5 mt-8">

              {/* Address */}

              <div className="bg-zinc-800 rounded-xl p-5">

                <h3 className="text-lg font-semibold">

                  Address

                </h3>

                <p className="text-zinc-400 mt-2 break-words">

                  {profile?.address ||

                    "No address added"}

                </p>

              </div>

              {/* Wallet */}

              <div className="bg-zinc-800 rounded-xl p-5">

                <h3 className="text-lg font-semibold">

                  Wallet Balance

                </h3>

                <p className="text-green-400 text-3xl font-bold mt-3">

                  ₹ {
                    profile?.wallet || 0
                  }

                </p>

                {/* Wallet History */}

                {profile?.walletHistory
                  ?.length > 0 && (

                  <div className="mt-5 border-t border-zinc-700 pt-4">

                    <h4 className="text-white font-semibold mb-4">

                      Wallet History

                    </h4>

                    <div className="flex flex-col gap-3 max-h-48 overflow-y-auto pr-2">

                      {profile?.walletHistory

                        ?.slice()

                        ?.reverse()

                        ?.map(

                          (item, index) => (

                            <div
                              key={index}
                              className="bg-zinc-900 rounded-lg p-3"
                            >

                              {/* Amount */}

                              <p className="text-green-400 font-bold">

                                + ₹ {
                                  item.amount
                                }

                              </p>

                              {/* Type */}

                              <p className="text-zinc-300 text-sm mt-1">

                                {
                                  item.type
                                }

                              </p>

                              {/* Message */}

                              <p className="text-zinc-500 text-xs mt-1 break-words">

                                {
                                  item.message
                                }

                              </p>

                              {/* Date */}

                              <p className="text-zinc-600 text-xs mt-2">

                                {new Date(
                                  item.createdAt
                                ).toLocaleDateString()}

                              </p>

                            </div>
                          )
                        )}

                    </div>

                  </div>
                )}

              </div>

            </div>

          </div>

          {/* ===================== */}
          {/* NESTED ROUTES */}
          {/* ===================== */}

          <div className="min-h-[35vh]">

            <Outlet />

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;