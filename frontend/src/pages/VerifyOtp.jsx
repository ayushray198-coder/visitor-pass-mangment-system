import { useState } from "react";

import {
    useLocation,
    useNavigate
} from "react-router-dom";

import {
    FiShield
} from "react-icons/fi";

import GlassCard from "../components/common/GlassCard.jsx";

import axiosInstance from "../api/axios.js";

import toast from "react-hot-toast";

const VerifyOtp = () => {

    const navigate = useNavigate();

    const location = useLocation();

    const email =
        location.state?.email || "";

    const [otp, setOtp] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const handleVerify =
        async (e) => {

            e.preventDefault();

            try {

                setLoading(true);

                const response =
                    await axiosInstance.post(

                        "/auth/verify-otp",

                        {
                            email,
                            otp
                        }

                    );

                localStorage.setItem(

                    "token",

                    response.data.data.token

                );

                localStorage.setItem(

                    "user",

                    JSON.stringify(
                        response.data.data
                    )

                );

                toast.success(
                    response.data.message
                );

                navigate("/dashboard");

            } catch (error) {

                toast.error(

                    error.response?.data?.message ||

                    "OTP verification failed"

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
          max-w-[600px]

          px-8
          sm:px-14

          py-12

          rounded-[40px]

          flex
          flex-col
          items-center
        "
            >

                <div
                    className="
            w-20
            h-20

            rounded-3xl

            bg-cyan-500/10

            border
            border-cyan-500/20

            flex
            items-center
            justify-center

            text-4xl
            text-cyan-400

            mb-8
          "
                >

                    <FiShield />

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

                    Verify OTP

                </h2>

                {/* description */}

                <p
                    className="
            mt-5

            text-slate-400

            text-center

            max-w-md

            leading-8
          "
                >

                    Enter the verification
                    code sent to your email.

                </p>

                {/* email */}

                <div
                    className="
            mt-8

            text-indigo-400

            font-medium

            text-center

            break-all
          "
                >

                    {email}

                </div>

                {/* form*/}

                <form
                    onSubmit={handleVerify}

                    className="
            mt-14

            w-full

            flex
            flex-col

            gap-8
          "
                >

                    {/* otp input */}

                    <div
                        className="
              h-[78px]

              px-6

              rounded-3xl

              bg-slate-900/80

              border
              border-white/10

              flex
              items-center
              justify-center
            "
                    >

                        <input
                            type="text"

                            placeholder="Enter OTP"

                            value={otp}

                            onChange={(e) =>
                                setOtp(
                                    e.target.value
                                )
                            }

                            maxLength={6}

                            className="
                w-full

                bg-transparent

                outline-none

                text-center

                tracking-[12px]

                text-2xl
                sm:text-3xl

                font-bold
              "
                        />

                    </div>

                    {/* submit button */}

                    <button
                        type="submit"

                        disabled={loading}

                        className="
              h-[68px]

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
                                ? "Verifying..."
                                : "Verify OTP"
                        }

                    </button>

                </form>

            </GlassCard>

        </div>

    );

};

export default VerifyOtp;