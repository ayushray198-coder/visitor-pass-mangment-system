import { useState } from "react";

import axiosInstance from "../api/axios.js";

import toast from "react-hot-toast";

import GlassCard from "../components/common/GlassCard.jsx";

const ForgotPassword = () => {

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response =
        await axiosInstance.post(

          "/auth/forgot-password",

          { email }

        );

      toast.success(
        response.data.message
      );

    

    } catch (error) {

        console.log(error);
        

      toast.error(

        error.response?.data?.message ||

        "Something went wrong"

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

          Forgot Password

        </h1>

        <p className="
          mt-3
          text-slate-400
        ">

          Enter your email to
          reset password

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

            type="email"

            placeholder="Enter Email"

            value={email}

            onChange={(e) =>
              setEmail(e.target.value)
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
                ? "Sending..."
                : "Send Reset Link"
            }

          </button>

        </form>

      </GlassCard>

    </div>

  );

};

export default ForgotPassword;