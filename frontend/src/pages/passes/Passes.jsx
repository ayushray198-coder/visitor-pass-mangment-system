import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import GlassCard from "../../components/common/GlassCard.jsx";

import SearchFilter from "../../components/common/SearchFilter.jsx";

import axiosInstance from "../../api/axios.js";

const Passes = () => {

  const [passes, setPasses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("all");

  useEffect(() => {

    const fetchPasses =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const response =
            await axiosInstance.get(

              "/pass",

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }

            );

          setPasses(
            response.data.data
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    fetchPasses();

  }, []);

  const filteredPasses =
    passes.filter((pass) => {

      const matchesSearch =

        pass.visitorId?.name
          ?.toLowerCase()

          .includes(
            search.toLowerCase()
          )

        ||

        pass.passCode
          ?.toLowerCase()

          .includes(
            search.toLowerCase()
          );

      const matchesFilter =

        filter === "all"

        ||

        pass.status === filter;

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

      {/* HEADER */}

      <GlassCard className="
        p-8
        rounded-[32px]
      ">

        <h1 className="
          text-4xl
          font-bold
        ">

          Passes

        </h1>

        <p className="
          mt-3
          text-slate-400
        ">

          Manage all generated
          visitor passes.

        </p>

      </GlassCard>

      {/* SEARCH + FILTER */}

      <GlassCard className="
        p-6
        rounded-[32px]
      ">

        <SearchFilter

          search={search}

          setSearch={setSearch}

          filter={filter}

          setFilter={setFilter}

          placeholder="Search passes..."

          options={[

            {
              label: "All Status",
              value: "all"
            },

            {
              label: "Active",
              value: "active"
            },

            {
              label: "Used",
              value: "used"
            },

            {
              label: "Expired",
              value: "expired"
            }

          ]}

        />

      </GlassCard>

      {/* PASSES */}

      <GlassCard className="
        p-8
        rounded-[32px]
      ">

        {
          loading ? (

            <div className="
              text-slate-400
            ">

              Loading passes...

            </div>

          ) : filteredPasses.length === 0 ? (

            <div className="
              text-slate-400
            ">

              No passes found

            </div>

          ) : (

            <div className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3

              gap-6
              items-stretch
            ">

              {
                filteredPasses.map((pass) => (

                  <GlassCard
                    key={pass._id}

                    className="
                      h-full

                      flex
                      flex-col

                      p-6

                      rounded-[30px]

                      relative

                      overflow-hidden

                      hover:-translate-y-2
                      hover:border-indigo-500/20

                      transition-all
                      duration-300
                    "
                  >

                    {/* STATUS */}

                    <div className="
                      absolute
                      top-5
                      right-5
                    ">

                      <div className={`
                        px-4
                        py-2

                        rounded-2xl

                        text-sm
                        font-semibold

                        ${
                          pass.status ===
                          "active"

                          ? "bg-emerald-500/10 text-emerald-400"

                          : pass.status ===
                          "used"

                          ? "bg-cyan-500/10 text-cyan-400"

                          : "bg-red-500/10 text-red-400"
                        }
                      `}>

                        {pass.status}

                      </div>

                    </div>

                    {/* PHOTO */}

                    <div className="
                      flex
                      items-center
                      gap-5
                    ">

                      <img
                        src={`http://localhost:4141${pass.visitorId?.photo}`}

                        alt="Visitor"

                        className="
                          w-20
                          h-20

                          rounded-3xl

                          object-cover

                          border
                          border-white/10
                        "
                      />

                      <div className="min-w-0">

                        <h2 className="
                          text-2xl
                          font-bold
                        ">

                          {
                            pass.visitorId?.name
                          }

                        </h2>

                        <p className="
                          mt-1
                          text-slate-400
                          truncate
                        ">

                          {
                            pass.visitorId?.email
                          }

                        </p>

                      </div>

                    </div>

                    {/* PASS INFO */}

                    <div className="
                      mt-8

                      flex
                      flex-col

                      gap-5
                    ">

                      <div>

                        <p className="
                          text-slate-400
                          text-sm
                        ">

                          Pass Code

                        </p>

                        <h3 className="
                          mt-2

                          text-xl
                          font-bold

                          tracking-widest
                          uppercase

                          text-indigo-400
                        ">

                          {
                            pass.passCode
                          }

                        </h3>

                      </div>

                      <div>

                        <p className="
                          text-slate-400
                          text-sm
                        ">

                          Valid Till

                        </p>

                        <h3 className="
                          mt-2
                          text-lg
                          font-semibold
                        ">

                          {
                            new Date(
                              pass.validTill
                            ).toLocaleString()
                          }

                        </h3>

                      </div>

                    </div>

                    {/* BUTTON */}

                    <Link
                      to={`/dashboard/passes/${pass._id}`}

                      className="
                        mt-auto
                        pt-8

                        h-[52px]

                        rounded-2xl

                        bg-indigo-600
                        hover:bg-indigo-700

                        transition-all

                        flex
                        items-center
                        justify-center
                      "
                    >

                      View Digital Pass

                    </Link>

                  </GlassCard>

                ))
              }

            </div>

          )
        }

      </GlassCard>

    </div>

  );

};

export default Passes;