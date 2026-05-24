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

      {/* SEARCH FILTER */}

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
          Search passes...
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
                "Active",

              value:
                "active"
            },

            {
              label:
                "Used",

              value:
                "used"
            },

            {
              label:
                "Expired",

              value:
                "expired"
            }

          ]}

        />

      </GlassCard>

      {/* PASSES */}

      <GlassCard className="
        p-6
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
              flex
              flex-col
              gap-4
            ">

              {
                filteredPasses.map(
                  (pass) => (

                    <div
                      key={pass._id}

                      className="
                        flex
                        flex-col
                        lg:flex-row

                        lg:items-center
                        justify-between

                        gap-5

                        p-5

                        rounded-[24px]

                        border
                        border-white/10

                        bg-white/[0.03]
                      "
                    >

                      {/* LEFT */}

                      <div className="
                        flex
                        flex-col
                        gap-3
                      ">

                        <h2 className="
                          text-xl
                          font-semibold
                        ">

                          {
                            pass.visitorId?.name
                          }

                        </h2>

                        <p className="
                          text-sm
                          text-slate-400
                        ">

                          {
                            pass.visitorId?.email
                          }

                        </p>

                        <div className="
                          flex
                          flex-wrap
                          gap-6

                          mt-2
                        ">

                          <div>

                            <p className="
                              text-xs
                              text-slate-500
                            ">

                              Pass Code

                            </p>

                            <h3 className="
                              mt-1

                              font-semibold

                              text-indigo-400

                              tracking-wider
                            ">

                              {
                                pass.passCode
                              }

                            </h3>

                          </div>

                          <div>

                            <p className="
                              text-xs
                              text-slate-500
                            ">

                              Valid Till

                            </p>

                            <h3 className="
                              mt-1
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

                      </div>

                      {/* RIGHT */}

                      <div className="
                        flex
                        items-center
                        gap-4
                        flex-wrap
                      ">

                        <div className={`

                          px-4
                          py-2

                          rounded-xl

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

                          {
                            pass.status
                          }

                        </div>

                        <Link
                          to={`/dashboard/passes/${pass._id}`}

                          className="
                            h-[46px]

                            px-5

                            rounded-xl

                            bg-indigo-600
                            hover:bg-indigo-700

                            transition-all

                            flex
                            items-center
                            justify-center
                          "
                        >

                          View Pass

                        </Link>

                      </div>

                    </div>

                  )
                )
              }

            </div>

          )
        }

      </GlassCard>

    </div>

  );

};

export default Passes;