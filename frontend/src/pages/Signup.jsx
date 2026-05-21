import { useState } from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import {
  FiUser,
  FiMail,
  FiLock,
  FiPhone
} from "react-icons/fi";

import GlassCard from "../components/common/GlassCard";

import axiosInstance from "../api/axios";

import toast from "react-hot-toast";

const Signup = () => {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({

      name: "",

      email: "",

      password: "",

      phone: "",

      photo: null

    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };

  const handleFileChange =
    (e) => {

      setFormData({

        ...formData,

        photo:
          e.target.files[0]

      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const data =
          new FormData();

        data.append(
          "name",
          formData.name
        );

        data.append(
          "email",
          formData.email
        );

        data.append(
          "password",
          formData.password
        );

        data.append(
          "phone",
          formData.phone
        );

        if (formData.photo) {

          data.append(
            "photo",
            formData.photo
          );

        }

        const response =
          await axiosInstance.post(

            "/auth/signup",

            data,

            {
              headers: {
                "Content-Type":
                  "multipart/form-data"
              }
            }

          );

        toast.success(
          response.data.message
        );

        navigate(
          "/verify-otp",
          {
            state: {
              email:
                formData.email
            }
          }
        );

      } catch (error) {

        toast.error(

          error.response?.data
            ?.message ||

          "Signup failed"

        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="
      min-h-screen

      flex
      items-center
      justify-center

      px-6
      py-24
    ">

      <GlassCard
        className="
        w-full
        max-w-162.5

        overflow-y-auto

        px-8
        sm:px-14

        py-12

        rounded-[40px]

        flex
        flex-col
        items-center
      "
      >

        <div className="
          w-20
          h-20

          rounded-3xl

          bg-indigo-600/20

          border
          border-indigo-500/20

          flex
          items-center
          justify-center

          text-4xl
          text-indigo-400

          mb-8
        ">

          <FiUser />

        </div>

        <h2 className="
          text-4xl
          sm:text-5xl

          font-bold

          text-center
        ">

          Create Account

        </h2>

        <p className="
          mt-5

          text-slate-400

          text-center

          max-w-md

          leading-8
        ">

          Signup to access the
          smart visitor management
          platform.

        </p>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="
          mt-14

          w-full

          flex
          flex-col

          gap-7
        "
        >

          {/* user name */}

          <div className="
            h-17

            px-6

            rounded-3xl

            bg-slate-900/80

            border
            border-white/10

            flex
            items-center

            gap-4
          ">

            <FiUser
              className="
              text-2xl
              text-slate-400
            "
            />

            <input
              type="text"

              name="name"

              placeholder="Full Name"

              value={formData.name}

              onChange={handleChange}

              className="
              w-full

              bg-transparent

              outline-none

              text-lg
              "
            />

          </div>

          {/* email id */}

          <div className="
            h-17

            px-6

            rounded-3xl

            bg-slate-900/80

            border
            border-white/10

            flex
            items-center

            gap-4
          ">

            <FiMail
              className="
              text-2xl
              text-slate-400
            "
            />

            <input
              type="email"

              name="email"

              placeholder="Email Address"

              value={formData.email}

              onChange={handleChange}

              className="
              w-full

              bg-transparent

              outline-none

              text-lg
              "
            />

          </div>

          {/* phone no. */}

          <div className="
            h-17

            px-6

            rounded-3xl

            bg-slate-900/80

            border
            border-white/10

            flex
            items-center

            gap-4
          ">

            <FiPhone
              className="
              text-2xl
              text-slate-400
            "
            />

            <input
              type="text"

              name="phone"

              placeholder="Phone Number"

              value={formData.phone}

              onChange={handleChange}

              className="
              w-full

              bg-transparent

              outline-none

              text-lg
              "
            />

          </div>

          {/* photo */}

          <div className="
            flex
            flex-col
            gap-3
          ">

            <label className="
              text-slate-300
              text-sm
            ">

              Upload Photo

            </label>

            <input
              type="file"

              accept="image/*"

              onChange={
                handleFileChange
              }

              className="
              w-full

              text-sm
              text-slate-300

              file:mr-4
              file:py-3
              file:px-6

              file:rounded-2xl

              file:border-0

              file:bg-indigo-600

              file:text-white

              hover:file:bg-indigo-700
              "
            />

          </div>

          {/* password */}

          <div className="
            h-17

            px-6

            rounded-3xl

            bg-slate-900/80

            border
            border-white/10

            flex
            items-center

            gap-4
          ">

            <FiLock
              className="
              text-2xl
              text-slate-400
            "
            />

            <input
              type="password"

              name="password"

              placeholder="Password"

              value={formData.password}

              onChange={handleChange}

              className="
              w-full

              bg-transparent

              outline-none

              text-lg
              "
            />

          </div>

          {/* button */}

          <button
            type="submit"

            disabled={loading}

            className="
            mt-4

            h-17

            rounded-3xl

            bg-indigo-600

            hover:bg-indigo-700

            transition-all
            duration-300

            text-lg
            font-semibold

            disabled:opacity-60
            "
          >

            {
              loading
                ? "Creating..."
                : "Create Account"
            }

          </button>

          {/* login page me jane ke liye */}

          <div className="
            mt-6

            text-center
          ">

            <p className="
              text-slate-400
            ">

              Already have
              an account?

              <Link
                to="/login"

                className="
                ml-2

                text-indigo-400

                hover:text-indigo-300

                font-semibold
                "
              >

                Login

              </Link>

            </p>

          </div>

        </form>

      </GlassCard>

    </div>

  );

};

export default Signup;