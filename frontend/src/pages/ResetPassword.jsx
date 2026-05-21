import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import axiosInstance from "../api/axios.js";

import toast from "react-hot-toast";

import GlassCard from "../components/common/GlassCard.jsx";

const ResetPassword = () => {

  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response =
        await axiosInstance.post(

          `/auth/reset-password/${token}`,

          { password }

        );

      toast.success(
        response.data.message
      );

      navigate("/login");

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Failed to reset password"

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="
      min-h-screen

      bg-[#030712]

      flex
      items-center
      justify-center

      px-6
    ">

      <GlassCard className="
        w-full
        max-w-xl

        p-8
        rounded-[32px]
      ">

        <h1 className="
          text-4xl
          font-bold
          text-white
        ">

          Reset Password

        </h1>

        <p className="
          mt-3
          text-slate-400
        ">

          Enter your new password

        </p>

        <form
          onSubmit={handleSubmit}
          className="
            mt-10
            flex
            flex-col
            gap-6
          "
        >

          <input

            type="password"

            placeholder="New Password"

            value={password}

            onChange={(e) =>
              setPassword(e.target.value)
            }

            required

            className="

              h-[60px]

              px-5

              rounded-2xl

              bg-slate-900

              border
              border-white/10

              text-white

              outline-none

            "
          />

          <button

            type="submit"

            disabled={loading}

            className="

              h-[60px]

              rounded-2xl

              bg-indigo-600
              hover:bg-indigo-700

              transition-all

              text-white

            "
          >

            {
              loading
                ? "Resetting..."
                : "Reset Password"
            }

          </button>

        </form>

      </GlassCard>

    </div>

  );

};

export default ResetPassword;