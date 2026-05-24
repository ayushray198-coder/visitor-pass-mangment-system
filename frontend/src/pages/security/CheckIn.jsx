import { useEffect, useState } from "react";

import { Html5Qrcode } from "html5-qrcode";

import GlassCard from "../../components/common/GlassCard.jsx";

import axiosInstance from "../../api/axios.js";

import toast from "react-hot-toast";

const CheckIn = () => {

  const [loading, setLoading] = useState(false);

  const [manualCode, setManualCode] = useState("");

  useEffect(() => {

    const html5QrCode =
      new Html5Qrcode("reader");

    const startScanner =
      async () => {

        try {

          await html5QrCode.start(

            {
              facingMode:
                "environment"
            },

            {
              fps: 10,

              qrbox: {
                width: 250,
                height: 250
              }
            },

            async (decodedText) => {

              toast.success(decodedText)
              const passCode= decodedText.split("/").pop()

              await html5QrCode.stop();

              await verifyPass(
                passCode
              );

            },

            () => { }

          );

        } catch (error) {

          console.log(error);

        }

      };

    startScanner();

    return () => {

      html5QrCode
        .stop()
        .catch(() => { });

    };

  }, []);

  const verifyPass =
    async (passCode) => {

      try {

        setLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axiosInstance.post(

            "/checklog/check-in",

            {
              passCode
            },

            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }

          );

        toast.success(
          response.data.message
        );

      } catch (error) {

        toast.error(

          error.response?.data
            ?.message ||

          "Check-in failed"

        );

      } finally {

        setLoading(false);

      }

    };

  const handleManualSubmit =
    async (e) => {

      e.preventDefault();

      if (!manualCode) {

        return toast.error(
          "Pass code required"
        );

      }

      await verifyPass(
        manualCode
      );

      setManualCode("");

    };

  return (

    <div className="
      flex
      flex-col
      gap-6

      w-full
      max-w-5xl
      mx-auto
    ">

      {/* header */}

      <GlassCard className="
        p-5
        md:p-8

        rounded-[32px]
      ">

        <h1 className="
          text-3xl
          md:text-4xl

          font-bold
        ">

          Visitor Check-In

        </h1>

        <p className="
          mt-3
          text-slate-400
        ">

          Scan visitor QR code
          for secure entry.

        </p>

      </GlassCard>

      {/* scanner */}

      <GlassCard className="
        p-5
        md:p-8

        rounded-[32px]
      ">

        <div
          id="reader"
          className="
            overflow-hidden
            rounded-3xl
            w-full
          "
        />

      </GlassCard>

      {/* manual check */}

      <GlassCard className="
        p-5
        md:p-8

        rounded-[32px]
      ">

        <h2 className="
          text-2xl
          font-bold
        ">

          Manual Pass Check

        </h2>

        <p className="
          mt-3
          text-slate-400
        ">

          Use manual code if
          scanner is unavailable.

        </p>

        <form
          onSubmit={
            handleManualSubmit
          }

          className="
            mt-8

            flex
            flex-col

            gap-5
          "
        >

          <input
            type="text"

            placeholder="
            Enter Pass Code
            "

            value={manualCode}

            onChange={(e) =>
              setManualCode(
                e.target.value
              )
            }

            className="
              h-[60px]

              px-5

              rounded-2xl

              bg-slate-900

              border
              border-white/10

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
            "
          >

            {
              loading
                ? "Checking..."
                : "Verify Pass"
            }

          </button>

        </form>

      </GlassCard>

    </div>

  );

};

export default CheckIn;