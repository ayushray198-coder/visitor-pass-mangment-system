import { useEffect, useState } from "react";

import {
  FiUsers,
  FiCalendar,
  FiActivity,
  FiClock
} from "react-icons/fi";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip
} from "recharts";

import GlassCard from "../../components/common/GlassCard";

import SearchFilter from "../../components/common/SearchFilter";

import axiosInstance from "../../api/axios";

const AdminDashboard = () => {

  const [analytics, setAnalytics] =
    useState({

      totalVisitors: 0,

      totalAppointments: 0,

      totalCheckIns: 0,

      pendingAppointments: 0

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

          setAnalytics(
            response.data.data
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    fetchAnalytics();

  }, []);

  /* stats */

  const stats = [

    {
      title: "Total Visitors",
      value: analytics.totalVisitors,
      icon: <FiUsers />,
      type: "visitors"
    },

    {
      title: "Appointments",
      value: analytics.totalAppointments,
      icon: <FiCalendar />,
      type: "appointments"
    },

    {
      title: "Check-Ins",
      value: analytics.totalCheckIns,
      icon: <FiActivity />,
      type: "checkins"
    },

    {
      title: "Pending Requests",
      value: analytics.pendingAppointments,
      icon: <FiClock />,
      type: "pending"
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

  /* chart data */

  const chartData = [

    {
      name: "Visitors",
      value: analytics.totalVisitors
    },

    {
      name: "Appointments",
      value: analytics.totalAppointments
    },

    {
      name: "CheckIns",
      value: analytics.totalCheckIns
    },

    {
      name: "Pending",
      value: analytics.pendingAppointments
    }

  ];

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

            Admin Dashboard

          </h1>

          <p className="
            mt-5
            text-slate-400
            leading-8
            max-w-2xl
          ">

            Monitor visitors,
            appointments and
            security activity
            professionally.

          </p>

        </div>

      </GlassCard>

      {/* search and filter */}

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
                "Check-Ins",

              value:
                "checkins"
            },

            {
              label:
                "Pending",

              value:
                "pending"
            }

          ]}

        />

      </GlassCard>

      {/* stats */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
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

      {/* chart */}

      <GlassCard className="
        p-8
        rounded-[32px]
      ">

        <div className="
          mb-8
        ">

          <h2 className="
            text-3xl
            font-bold
          ">

            Analytics Overview

          </h2>

          <p className="
            mt-3
            text-slate-400
          ">

            Real-time organization
            analytics summary.

          </p>

        </div>

        <div className="
        w-full
          h-[350px]
          min-w-0
        ">

          <ResponsiveContainer
            width="99%"
            height={350}
          >

            <BarChart
        
              data={chartData}
            >

              <XAxis
                dataKey="name"
              />

              <Tooltip />

              <Bar
                dataKey="value"

                radius={[
                  12,
                  12,
                  0,
                  0
                ]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </GlassCard>

      {/* activity */}

      <GlassCard className="
        p-8
        rounded-[32px]
      ">

        <div>

          <h2 className="
            text-3xl
            font-bold
          ">

            System Status

          </h2>

          <p className="
            mt-3
            text-slate-400
          ">

            Platform currently
            running normally.

          </p>

        </div>

        <div className="
          mt-10

          p-6

          rounded-3xl

          bg-emerald-500/10

          border
          border-emerald-500/20

          text-emerald-400
        ">

          All organization
          services are active.

        </div>

      </GlassCard>

    </div>

  );

};

export default AdminDashboard;