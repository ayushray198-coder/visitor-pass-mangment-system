import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import axiosInstance from "../../api/axios.js";

import GlassCard from "../../components/common/GlassCard.jsx";

import {
  FiShield,
  FiCalendar,
  FiUser,
  FiHash,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiCheckCircle
} from "react-icons/fi";

const PassDetails = () => {

  const { id } = useParams();

  const [pass, setPass] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchPass =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const response =
            await axiosInstance.get(

              `/pass/${id}`,

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }

            );

          setPass(
            response.data.data
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    fetchPass();

  }, [id]);

  if (loading) {

    return (

      <div className="
        text-white
        text-xl
      ">

        Loading Pass...

      </div>

    );

  }

  if (!pass) {

    return (

      <div className="
        text-white
        text-xl
      ">

        Pass not found

      </div>

    );

  }

  return (

    <div className="
      max-w-5xl
      mx-auto

      flex
      flex-col
      gap-8
    ">

      {/* HEADER */}

      <GlassCard className="
        p-8
        rounded-[32px]
      ">

        <div className="
          flex
          flex-col
          lg:flex-row

          items-start
          lg:items-center

          justify-between

          gap-6
        ">

          <div>

            <h1 className="
              text-4xl
              font-bold
              text-white
            ">

              Secure Digital Visitor Pass

            </h1>

            <p className="
              mt-3
              text-slate-400
            ">

              Enterprise-grade secure
              visitor verification system

            </p>

          </div>

          {/* STATUS */}

          <div className="
            h-[55px]

            px-6

            rounded-2xl

            bg-emerald-500/10

            border
            border-emerald-500/20

            flex
            items-center
            gap-3

            text-emerald-400
            font-semibold
          ">

            <FiShield />

            {
              pass?.appointmentId?.status ||
              "approved"
            }

          </div>

        </div>

      </GlassCard>

      {/* PASS CARD */}

      <GlassCard className="
        p-8
        sm:p-10

        rounded-[36px]

        overflow-hidden
        relative
      ">

        {/* BG EFFECT */}

        <div className="
          absolute
          top-0
          right-0

          w-[320px]
          h-[320px]

          bg-indigo-500/10

          blur-3xl

          rounded-full
        " />

        {/* VISITOR PHOTO */}

        <div className="
          absolute
          top-8
          right-8

          z-20
        ">

          <img
            src={
              pass?.visitorId?.photo

                ? `${import.meta.env.VITE_API_URL.replace("/api", "")}/${pass.visitorId.photo}`

                : "/default-avatar.png"
            }

            alt="Visitor"

            className="
              w-24
              h-24

              sm:w-28
              sm:h-28

              rounded-[32px]

              object-cover

              border-4
              border-white/10

              shadow-2xl
            "
          />

        </div>

        <div className="
          relative
          z-10

          flex
          flex-col
          lg:flex-row

          gap-10
        ">

          {/* LEFT */}

          <div className="
            flex-1

            flex
            flex-col

            gap-8
          ">

            {/* VISITOR */}

            <div>

              <div className="
                flex
                items-center
                gap-3

                text-slate-400
              ">

                <FiUser />

                Visitor Name

              </div>

              <h2 className="
                mt-3

                text-3xl
                sm:text-4xl

                font-bold
                text-white

                leading-tight
              ">

                {
                  pass?.visitorId?.name ||
                  "Visitor"
                }

              </h2>

            </div>

            {/* EMAIL */}

            <div>

              <div className="
                flex
                items-center
                gap-3

                text-slate-400
              ">

                <FiMail />

                Email Address

              </div>

              <p className="
                mt-3

                text-lg
                text-white

                break-all
              ">

                {
                  pass?.visitorId?.email ||
                  "Not Available"
                }

              </p>

            </div>

            {/* PHONE */}

            <div>

              <div className="
                flex
                items-center
                gap-3

                text-slate-400
              ">

                <FiPhone />

                Phone Number

              </div>

              <p className="
                mt-3

                text-lg
                text-white
              ">

                {
                  pass?.visitorId?.phone ||
                  "Not Available"
                }

              </p>

            </div>

            {/* ORGANIZATION */}

            <div>

              <div className="
                flex
                items-center
                gap-3

                text-slate-400
              ">

                <FiBriefcase />

                Organization

              </div>

              <h2 className="
                mt-3

                text-2xl
                font-semibold
                text-white
              ">

                {
                  pass?.organizationId?.name ||
                  "Organization"
                }

              </h2>

            </div>

            {/* PASS CODE */}

            <div>

              <div className="
                flex
                items-center
                gap-3

                text-slate-400
              ">

                <FiHash />

                Pass Code

              </div>

              <h2 className="
                mt-3

                text-2xl
                sm:text-3xl

                font-bold

                tracking-[0.2em]
                uppercase

                text-indigo-400

                break-all
              ">

                {
                  pass?.passCode
                }

              </h2>

            </div>

            {/* VISIT DATE */}

            <div>

              <div className="
                flex
                items-center
                gap-3

                text-slate-400
              ">

                <FiCalendar />

                Valid Till

              </div>

              <h2 className="
                mt-3

                text-xl
                sm:text-2xl

                font-semibold
                text-white

                leading-8
              ">

                {
                  new Date(

                    pass?.appointmentId?.visitDate

                  ).toLocaleString()
                }

              </h2>

            </div>

          </div>

          {/* RIGHT */}

          <div className="
            w-full
            lg:w-[340px]

            flex
            flex-col
            items-center
            justify-start

            gap-8

            lg:pt-36
          ">

            {/* QR */}

            <div className="
              p-5

              rounded-[32px]

              bg-white

              shadow-2xl
            ">

              <img

                src={pass?.qrCode}

                alt="QR Code"

                className="
                  w-[220px]
                  h-[220px]

                  object-cover
                "
              />

            </div>

            {/* ACTIVE */}

            <div className="
              w-full

              rounded-2xl

              bg-white/5

              border
              border-white/10

              p-5

              text-center
            ">

              <div className="
                flex
                items-center
                justify-center
                gap-2

                text-emerald-400
                font-semibold
              ">

                <FiCheckCircle />

                Active Pass

              </div>

              <p className="
                mt-3

                text-slate-400
                leading-7
              ">

                Show this QR code
                at security check-in
                for secure verification.

              </p>

            </div>

          </div>

        </div>

      </GlassCard>

    </div>

  );

};

export default PassDetails;