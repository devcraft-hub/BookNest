import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Loader from "../../components/Loader/Loader";

function AdminUsers() {

  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // headers

  const headers = {
    id: localStorage.getItem("id"),
    authorization:
      `Bearer ${localStorage.getItem("token")}`,
  };

  // fetch users

  useEffect(() => {

    const fetchUsers =
      async () => {

        try {

          const response =
            await axios.get(

              `${import.meta.env.VITE_API_URL}/api/v1/get-all-users`,

              {
                headers,
              }
            );

          setUsers(
            response.data.data
          );

          setLoading(false);

        } catch (error) {

          console.log(error);

          setLoading(false);
        }
      };

    fetchUsers();

  }, []);

  // block user

  const blockUser = async (
    id
  ) => {

    try {

      const response =
        await axios.put(

          `${import.meta.env.VITE_API_URL}/api/v1/block-user/${id}`,

          {},

          {
            headers,
          }
        );

      alert(response.data.message);

      // update ui

      setUsers(

        users.map((user) =>

          user._id === id
            ? {
                ...user,
                accountStatus:
                  "blocked",
              }
            : user
        )
      );

    } catch (error) {

      alert(
        error.response?.data?.message
      );
    }
  };

  // unblock user

  const unblockUser = async (
    id
  ) => {

    try {

      const response =
        await axios.put(

          `${import.meta.env.VITE_API_URL}/api/v1/unblock-user/${id}`,

          {},

          {
            headers,
          }
        );

      alert(response.data.message);

      // update ui

      setUsers(

        users.map((user) =>

          user._id === id
            ? {
                ...user,
                accountStatus:
                  "active",
              }
            : user
        )
      );

    } catch (error) {

      alert(
        error.response?.data?.message
      );
    }
  };

  // loader

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

        <div>

          <h1 className="text-5xl font-bold">

            Manage Users

          </h1>

          <p className="text-zinc-400 mt-4 text-lg">

            View and manage all users 👥

          </p>

        </div>

        {/* Users */}

        <div className="flex flex-col gap-6 mt-12">

          {users.map((items) => (

            <div
              key={items._id}
              className="bg-zinc-900 rounded-2xl p-6 flex flex-col lg:flex-row gap-6 items-center shadow-lg"
            >

              {/* Avatar */}

              <img
                src={items.avatar}
                alt={items.username}
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
              />

              {/* Details */}

              <div className="flex-1 w-full">

                <h2 className="text-3xl font-bold">

                  {items.username}

                </h2>

                <p className="text-zinc-400 mt-3">

                  {items.email}

                </p>

                <div className="flex flex-wrap gap-3 mt-4">

                  {/* Role */}

                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    items.role === "admin"
                      ? "bg-purple-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}>

                    {items.role}

                  </span>

                  {/* Status */}

                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    items.accountStatus === "blocked"
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-black"
                  }`}>

                    {
                      items.accountStatus
                    }

                  </span>

                </div>

                {/* Joined */}

                <p className="text-zinc-500 mt-4">

                  Joined:
                  <span className="text-white ml-2">

                    {new Date(
                      items.createdAt
                    ).toLocaleDateString()}

                  </span>

                </p>

              </div>

              {/* Actions */}

              <div>

                {items.accountStatus ===
                "blocked" ? (

                  <button
                    onClick={() =>
                      unblockUser(
                        items._id
                      )
                    }
                    className="bg-green-500 hover:bg-green-600 transition-all duration-300 px-6 py-3 rounded-xl font-semibold"
                  >

                    Unblock

                  </button>

                ) : (

                  <button
                    onClick={() =>
                      blockUser(
                        items._id
                      )
                    }
                    className="bg-red-500 hover:bg-red-600 transition-all duration-300 px-6 py-3 rounded-xl font-semibold"
                  >

                    Block

                  </button>
                )}

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default AdminUsers;