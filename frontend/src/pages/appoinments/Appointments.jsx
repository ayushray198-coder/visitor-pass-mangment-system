import { useEffect, useState } from "react";

import axiosInstance from "../../api/axios.js";

import toast from "react-hot-toast";

import GlassCard from "../../components/common/GlassCard.jsx";

import SearchFilter from "../../components/common/SearchFilter.jsx";

import {
  FiCheck,
  FiX,
  FiClock
} from "react-icons/fi";

const Appointments = () => {

  const [appointments,
    setAppointments] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [search,
    setSearch] =
    useState("");

  const [filter,
    setFilter] =
    useState("all");

  const user = JSON.parse(

    localStorage.getItem(
      "user"
    )

  );

  const token =

    localStorage.getItem(
      "token"
    );

  /* FETCH APPOINTMENTS */

  const fetchAppointments =
    async () => {

      try {

        setLoading(true);

        const response =

          await axiosInstance.get(

            "/appointment",

            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }

          );

        setAppointments(
          response.data.data
        );

      } catch (error) {

        console.log(error);

        toast.error(

          error.response?.data
            ?.message ||

          "Failed to load appointments"

        );

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    fetchAppointments();

  }, []);

  /* UPDATE STATUS */

  const updateStatus =
    async (
      appointmentId,
      status
    ) => {

      try {

        const response =

          await axiosInstance.patch(

            `/appointment/${appointmentId}/status`,

            { status },

            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }

          );

        /* GENERATE PASS */

        if (
          status === "approved"
        ) {

          try {

            await axiosInstance.post(

              "/pass/generate",

              {
                appointmentId
              },

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }

            );

          } catch (passError) {

            console.log(passError);

            toast.error(
              "Pass generation failed"
            );

          }

        }

        toast.success(
          response.data.message
        );

        /* REFRESH APPOINTMENTS */

        await fetchAppointments();

      } catch (error) {

        console.log(error);

        toast.error(

          error.response?.data
            ?.message ||

          "Failed to update appointment"

        );

      }

    };

  /* FILTERED APPOINTMENTS */

  const filteredAppointments =

    appointments.filter(

      (appointment) => {

        const matchesSearch =

          appointment.visitor?.name
            ?.toLowerCase()

            .includes(
              search.toLowerCase()
            )

          ||

          appointment.purpose
            ?.toLowerCase()

            .includes(
              search.toLowerCase()
            );

        const matchesFilter =

          filter === "all"

          ||

          appointment.status
            === filter;

        return (

          matchesSearch &&
          matchesFilter

        );

      }

    );

  if (loading) {

    return (

      <div className="
        text-white
        text-xl
      ">

        Loading appointments...

      </div>

    );

  }

  return (

    <div className="
      flex
      flex-col
      gap-6
    ">

      {/* HEADER */}

      <div>

        <h1 className="
          text-4xl
          font-bold
          text-white
        ">

          Appointments

        </h1>

        <p className="
          mt-2
          text-slate-400
        ">

          Manage visitor requests

        </p>

      </div>

      {/* SEARCH FILTER */}

      <GlassCard className="
        p-6
        rounded-[28px]
      ">

        <SearchFilter

          search={search}

          setSearch={setSearch}

          filter={filter}

          setFilter={setFilter}

          placeholder="
          Search appointments...
          "

          options={[

            {
              label:
                "All Status",

              value:
                "all"
            },

            {
              label:
                "Pending",

              value:
                "pending"
            },

            {
              label:
                "Approved",

              value:
                "approved"
            },

            {
              label:
                "Rejected",

              value:
                "rejected"
            }

          ]}

        />

      </GlassCard>

      {/* EMPTY */}

      {
        filteredAppointments.length
        === 0 && (

          <GlassCard className="
            p-8
            rounded-[28px]
          ">

            <h2 className="
              text-2xl
              text-white
              font-semibold
            ">

              No appointments found

            </h2>

          </GlassCard>

        )
      }

      {/* APPOINTMENTS */}

      {
        filteredAppointments.map(

          (appointment) => (

            <GlassCard
              key={appointment._id}

              className="
                p-6
                rounded-[28px]

                flex
                flex-col
                gap-6
              "
            >

              {/* TOP */}

              <div className="
                flex
                flex-col

                lg:flex-row
                lg:items-center
                lg:justify-between

                gap-5
              ">

                <div>

                  <h2 className="
                    text-2xl
                    font-semibold
                    text-white
                  ">

                    {
                      appointment
                        .visitor?.name ||

                      "Visitor"
                    }

                  </h2>

                  <p className="
                    text-slate-400
                    mt-1
                  ">

                    {
                      appointment
                        .visitor?.email ||

                      appointment
                        .organizationId?.name
                    }

                  </p>

                </div>

                {/* STATUS */}

                <div className="
                  flex
                ">

                  {
                    appointment.status
                    === "approved" && (

                      <div className="
                        h-[45px]
                        px-5

                        rounded-xl

                        bg-emerald-500/10

                        border
                        border-emerald-500/20

                        flex
                        items-center
                        gap-2

                        text-emerald-400
                      ">

                        <FiCheck />

                        Approved

                      </div>

                    )
                  }

                  {
                    appointment.status
                    === "rejected" && (

                      <div className="
                        h-[45px]
                        px-5

                        rounded-xl

                        bg-red-500/10

                        border
                        border-red-500/20

                        flex
                        items-center
                        gap-2

                        text-red-400
                      ">

                        <FiX />

                        Rejected

                      </div>

                    )
                  }

                  {
                    appointment.status
                    === "pending" && (

                      <div className="
                        h-[45px]
                        px-5

                        rounded-xl

                        bg-yellow-500/10

                        border
                        border-yellow-500/20

                        flex
                        items-center
                        gap-2

                        text-yellow-400
                      ">

                        <FiClock />

                        Pending

                      </div>

                    )
                  }

                </div>

              </div>

              {/* PURPOSE */}

              <div>

                <h3 className="
                  text-lg
                  text-slate-300
                  mb-2
                ">

                  Purpose

                </h3>

                <p className="
                  text-slate-400
                  leading-relaxed
                ">

                  {
                    appointment.purpose
                  }

                </p>

              </div>

              {/* DATE */}

              <div>

                <h3 className="
                  text-lg
                  text-slate-300
                ">

                  Visit Date

                </h3>

                <p className="
                  text-slate-400
                  mt-1
                ">

                  {
                    new Date(
                      appointment.visitDate
                    ).toLocaleDateString()
                  }

                </p>

              </div>

              {/* ACTIONS */}

              {
                (
                  user?.role ===
                  "admin"

                  ||

                  user?.role ===
                  "employee"
                )

                &&

                appointment.status
                === "pending" && (

                  <div className="
                    flex
                    flex-wrap
                    gap-4
                  ">

                    {/* APPROVE */}

                    <button

                      onClick={() =>
                        updateStatus(
                          appointment._id,
                          "approved"
                        )
                      }

                      className="
                        h-[55px]

                        px-8

                        rounded-2xl

                        bg-emerald-600
                        hover:bg-emerald-700

                        transition-all

                        text-white
                      "
                    >

                      Approve

                    </button>

                    {/* REJECT */}

                    <button

                      onClick={() =>
                        updateStatus(
                          appointment._id,
                          "rejected"
                        )
                      }

                      className="
                        h-[55px]

                        px-8

                        rounded-2xl

                        bg-red-600
                        hover:bg-red-700

                        transition-all

                        text-white
                      "
                    >

                      Reject

                    </button>

                  </div>

                )
              }

            </GlassCard>

          )

        )
      }

    </div>

  );

};

export default Appointments;