import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import {
  FiMail,
  FiLock,
  FiLogIn
} from "react-icons/fi";

import GlassCard from "../components/common/GlassCard";

import axiosInstance from "../api/axios";

import toast from "react-hot-toast";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    email: "",
    password: ""

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

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response =
        await axiosInstance.post(

          "/auth/login",

          formData

        );

      /* token save krne ke liye */

      localStorage.setItem(

        "token",

        response.data.data.token

      );

      /* save user */

      localStorage.setItem(

        "user",

        JSON.stringify(
          response.data.data
        )

      );

      toast.success(

        response.data.message

      );

      /* ROLE BASED NAVIGATION */

      if (

        response.data.data.role
        === "admin"

      ) {

        navigate(
          "/dashboard/admin"
        );

      }

      else if (

        response.data.data.role
        === "employee"

      ) {

        navigate(
          "/dashboard/employee"
        );

      }

      else if (

        response.data.data.role
        === "security"

      ) {

        navigate(
          "/dashboard/security"
        );

      }

      else {

        navigate("/dashboard");

      }

    } catch (error) {

      console.log(error);

      toast.error(

        error.response?.data
          ?.message ||

        "Login failed"

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      className="
      min-h-screen

      flex
      items-center
      justify-center

      px-6
      py-16
      "
    >

      <GlassCard
        className="
        w-full
        max-w-155

        px-8
        sm:px-14

        py-12

        rounded-[40px]

        flex
        flex-col
        items-center
        "
      >

        {/* icon */}

        <div
          className="
          w-20
          h-20

          rounded-3xl

          bg-indigo-500/10

          border
          border-indigo-500/20

          flex
          items-center
          justify-center

          text-4xl
          text-indigo-400

          mb-8
          "
        >

          <FiLogIn />

        </div>

        {/* title */}

        <h2
          className="
          text-4xl
          sm:text-5xl

          font-bold

          text-center
          "
        >

          Welcome Back

        </h2>

        <p
          className="
          mt-5

          text-slate-400

          text-center

          max-w-md

          leading-8
          "
        >

          Login to access your
          smart visitor management
          dashboard.

        </p>

        {/* form */}

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

          {/* email */}

          <div
            className="
            h-17

            px-6

            rounded-3xl

            bg-slate-900/80

            border
            border-white/10

            flex
            items-center

            gap-4
            "
          >

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

          {/* password */}

          <div
            className="
            h-17

            px-6

            rounded-3xl

            bg-slate-900/80

            border
            border-white/10

            flex
            items-center

            gap-4
            "
          >

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

          {/* buttom */}

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
                ? "Logging in..."
                : "Login"
            }

          </button>

          {/* signup */}

          <div
            className="
            mt-6

            text-center
            "
          >

            <p
              className="
              text-slate-400
              "
            >

              Don't have an account?

              <Link
                to="/signup"

                className="
                ml-2

                text-indigo-400

                hover:text-indigo-300

                font-semibold
                "
              >

                Create Account

              </Link>

            </p>

          </div>

          {/* forget password ke liye  */}

          <div
            className="
            mt-4

            text-right
            "
          >

            <Link

              to="/forgot-password"

              className="
              text-indigo-400
              hover:text-indigo-300
              text-sm
              "
            >

              Forgot Password?

            </Link>

          </div>

        </form>

      </GlassCard>

    </div>

  );

};

export default Login;