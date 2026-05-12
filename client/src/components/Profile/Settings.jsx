import React, { useState } from "react";
import { toast }
from "react-toastify";

function Settings() {

  const [values, setValues] = useState({
    address: "",
  });

  // handle change

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

    toast.success(
  "Settings Updated Successfully 🚀"
);

    console.log(values);
  };

  return (

    <div className="text-white">

      {/* Heading */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold">

          Settings

        </h1>

        <p className="text-zinc-400 mt-3 text-lg">

          Manage your account settings ⚙️

        </p>

      </div>

      {/* Form */}

      <form
        onSubmit={submit}
        className="flex flex-col gap-6"
      >

        {/* Address */}

        <div>

          <label className="block mb-2 text-lg font-semibold">

            Update Address

          </label>

          <textarea
            name="address"
            value={values.address}
            onChange={change}
            rows="5"
            placeholder="Enter your new address..."
            className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg outline-none border border-zinc-700 focus:border-blue-500 resize-none"
          />

        </div>

        {/* Button */}

        <button
          type="submit"
          className="w-fit bg-blue-500 hover:bg-blue-600 transition-all duration-300 px-8 py-3 rounded-lg text-lg font-semibold hover:scale-105"
        >

          Save Changes

        </button>

      </form>

    </div>
  );
}

export default Settings;