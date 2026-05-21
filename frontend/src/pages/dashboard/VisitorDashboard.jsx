import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
  FiBriefcase,
  FiUsers,
  FiShield,
  FiArrowRight
} from "react-icons/fi";

import GlassCard from "../../components/common/GlassCard";

import SearchFilter from "../../components/common/SearchFilter";

import axiosInstance from "../../api/axios";

const VisitorDashboard = () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [stats, setStats] =
    useState({

      organizations: 0,

      visitRequests: 0,

      activePasses: 0

    });

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("all");

  useEffect(() => {

    const fetchDashboardData =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          /* APPOINTMENTS */

          const appointmentsRes =
            await axiosInstance.get(

              "/appointment",

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }

            );

          /* PASSES */

          const passesRes =
            await axiosInstance.get(

              "/pass",

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }

            );

          setStats({

            organizations:

              user?.organizationId
                ? 1
                : 0,

            visitRequests:

              appointmentsRes
                .data.data.length || 0,

            activePasses:

              passesRes
                .data.data.length || 0

          });

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    fetchDashboardData();

  }, []);

  /* dashboard stats */

  const dashboardStats = [

    {
      title: "Organizations",

      value: stats.organizations,

      icon: <FiBriefcase />,

      type: "organization"
    },

    {
      title: "Visit Requests",

      value: stats.visitRequests,

      icon: <FiUsers />,

      type: "requests"
    },

    {
      title: "Active Passes",

      value: stats.activePasses,

      icon: <FiShield />,

      type: "passes"
    }

  ];

  /* filtered stats*/

  const filteredStats =
    dashboardStats.filter(
      (item) => {

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

      }
    );

  return (

    <div className="
      flex
      flex-col
      gap-8
    ">

      {/* hero  */}

      <GlassCard className="
        p-8
        lg:p-10
        rounded-[32px]
      ">

        <div className="
          flex
          flex-col
          lg:flex-row

          lg:items-center
          lg:justify-between

          gap-8
        ">

          <div>

            <h1 className="
              text-4xl
              lg:text-5xl
              font-bold
              leading-tight
            ">

              Welcome,

              <span className="
                text-indigo-400
              ">

                {" "}
                {user?.name}

              </span>

            </h1>

            <p className="
              mt-5
              text-slate-400
              leading-8
              max-w-2xl
            ">

              Manage your visitor
              activities, access
              passes and
              organization setup
              professionally.

            </p>

          </div>

          {
            !user?.organizationId && (

              <Link
                to="/create-organization"

                className="
                  h-[62px]

                  px-8

                  rounded-2xl

                  bg-indigo-600
                  hover:bg-indigo-700

                  transition-all
                  duration-300

                  flex
                  items-center
                  justify-center

                  gap-3

                  text-lg
                  font-semibold
                "
              >

                Create Organization

                <FiArrowRight />

              </Link>

            )
          }

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
          Search dashboard...
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
                "Organizations",

              value:
                "organization"
            },

            {
              label:
                "Requests",

              value:
                "requests"
            },

            {
              label:
                "Passes",

              value:
                "passes"
            }

          ]}

        />

      </GlassCard>

      {/* stats */}

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

      {/* recent activity */}

      <GlassCard className="
        p-8
        rounded-[32px]
      ">

        <div className="
          flex
          items-center
          justify-between
          mb-8
        ">

          <div>

            <h2 className="
              text-3xl
              font-bold
            ">

              Recent Activity

            </h2>

            <p className="
              mt-3
              text-slate-400
            ">

              Latest visitor and
              pass activities.

            </p>

          </div>

        </div>

        <div className="
          h-[300px]

          rounded-3xl

          border
          border-dashed
          border-white/10

          flex
          items-center
          justify-center

          text-slate-500
          text-lg
        ">

          No activity available

        </div>

      </GlassCard>

    </div>

  );

};

export default VisitorDashboard;