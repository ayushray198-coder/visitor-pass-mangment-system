import { useEffect, useState } from "react";

import {
  FiUsers,
  FiCalendar,
  FiShield
} from "react-icons/fi";

import GlassCard from "../../components/common/GlassCard";

import SearchFilter from "../../components/common/SearchFilter";

import axiosInstance from "../../api/axios";

import toast from "react-hot-toast";

const EmployeeDashboard = () => {

  const [analytics, setAnalytics] =
    useState({

      totalVisitors: 0,

      totalAppointments: 0,

      totalActivePasses: 0

    });

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("all");

  useEffect(() => {

    const fetchAnalytics =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const response =
            await axiosInstance.get(

              "/analytics/dashboard",

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }

            );

          setAnalytics({

            totalVisitors:

              response.data.data
                .totalVisitors || 0,

            totalAppointments:

              response.data.data
                .totalAppointments || 0,

            totalActivePasses:

              response.data.data
                .totalCheckIns || 0

          });

        } catch (error) {

          toast.error(

            error.response?.data
              ?.message ||

            "Failed to load dashboard"

          );

        } finally {

          setLoading(false);

        }

      };

    fetchAnalytics();

  }, []);

  /* stats */

  const stats = [

    {
      title: "Appointments",
      value: analytics.totalAppointments,
      icon: <FiCalendar />,
      type: "appointments"
    },

    {
      title: "Visitors",
      value: analytics.totalVisitors,
      icon: <FiUsers />,
      type: "visitors"
    },

    {
      title: "Active Passes",
      value: analytics.totalActivePasses,
      icon: <FiShield />,
      type: "passes"
    }

  ];

  /* filtered stats */

  const filteredStats =
    stats.filter((item) => {

      const matchesSearch =

        item.title
          .toLowerCase()

          .includes(
            search.toLowerCase()
          );

      const matchesFilter =

        filter === "all"

        ||

        item.type === filter;

      return (
        matchesSearch &&
        matchesFilter
      );

    });

  return (

    <div className="
      flex
      flex-col
      gap-8
    ">

      {/* hero */}

      <GlassCard className="
        p-8
        lg:p-10
        rounded-[32px]
      ">

        <div>

          <h1 className="
            text-4xl
            lg:text-5xl
            font-bold
          ">

            Employee Dashboard

          </h1>

          <p className="
            mt-5
            text-slate-400
            leading-8
            max-w-2xl
          ">

            Manage visitors,
            appointments and
            visitor passes
            efficiently.

          </p>

        </div>

      </GlassCard>

      {/* search filter */}

      <GlassCard className="
        p-6
        rounded-[32px]
      ">

        <SearchFilter

          search={search}

          setSearch={setSearch}

          filter={filter}

          setFilter={setFilter}

          placeholder="
          Search analytics...
          "

          options={[

            {
              label:
                "All Analytics",

              value:
                "all"
            },

            {
              label:
                "Visitors",

              value:
                "visitors"
            },

            {
              label:
                "Appointments",

              value:
                "appointments"
            },

            {
              label:
                "Active Passes",

              value:
                "passes"
            }

          ]}

        />

      </GlassCard>

      {/* STATS */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      ">

        {
          filteredStats.map(
            (item, index) => (

              <GlassCard
                key={index}

                className="
                  p-7
                  rounded-[28px]
                "
              >

                <div className="
                  flex
                  items-center
                  justify-between
                ">

                  <div>

                    <p className="
                      text-slate-400
                      text-lg
                    ">

                      {item.title}

                    </p>

                    <h2 className="
                      mt-4
                      text-5xl
                      font-bold
                    ">

                      {
                        loading

                        ? "..."

                        : item.value
                      }

                    </h2>

                  </div>

                  <div className="
                    w-16
                    h-16

                    rounded-2xl

                    bg-indigo-500/10

                    border
                    border-indigo-500/20

                    flex
                    items-center
                    justify-center

                    text-3xl
                    text-indigo-400
                  ">

                    {item.icon}

                  </div>

                </div>

              </GlassCard>

            )
          )
        }

      </div>

      {/* STATUS */}

      <GlassCard className="
        p-8
        rounded-[32px]
      ">

        <div>

          <h2 className="
            text-3xl
            font-bold
          ">

            Organization Activity

          </h2>

          <p className="
            mt-3
            text-slate-400
          ">

            Current visitor and
            appointment activity
            summary.

          </p>

        </div>

        <div className="
          mt-10

          grid
          grid-cols-1
          md:grid-cols-3

          gap-5
        ">

          <div className="
            p-6

            rounded-3xl

            bg-slate-900

            border
            border-white/10
          ">

            <p className="
              text-slate-400
            ">

              Total Visitors

            </p>

            <h3 className="
              mt-3
              text-3xl
              font-bold
            ">

              {
                loading

                ? "..."

                : analytics.totalVisitors
              }

            </h3>

          </div>

          <div className="
            p-6

            rounded-3xl

            bg-slate-900

            border
            border-white/10
          ">

            <p className="
              text-slate-400
            ">

              Appointments

            </p>

            <h3 className="
              mt-3
              text-3xl
              font-bold
            ">

              {
                loading

                ? "..."

                : analytics.totalAppointments
              }

            </h3>

          </div>

          <div className="
            p-6

            rounded-3xl

            bg-slate-900

            border
            border-white/10
          ">

            <p className="
              text-slate-400
            ">

              Active Passes

            </p>

            <h3 className="
              mt-3
              text-3xl
              font-bold
            ">

              {
                loading

                ? "..."

                : analytics.totalActivePasses
              }

            </h3>

          </div>

        </div>

      </GlassCard>

    </div>

  );

};

export default EmployeeDashboard;