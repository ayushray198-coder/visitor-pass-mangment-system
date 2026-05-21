import { useEffect, useState } from "react";

import axiosInstance from "../../api/axios.js";

import GlassCard from "../../components/common/GlassCard.jsx";

import SearchFilter from "../../components/common/SearchFilter.jsx";

import {
  FiLogIn,
  FiLogOut,
  FiClock,
  FiShield
} from "react-icons/fi";

const CheckLogs = () => {

  const [logs, setLogs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("all");

  useEffect(() => {

    fetchLogs();

  }, []);

  const fetchLogs = async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await axiosInstance.get(

          "/checklog",

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          },

        );

      setLogs(
        response.data.data
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  /* FILTER LOGS */

  const filteredLogs =
    logs.filter((log) => {

      const visitorName =

        log.visitorId?.name
          ?.toLowerCase()

        || "";

      const passCode =

        log.passId?.passCode
          ?.toLowerCase()

        || "";

      const matchesSearch =

        visitorName.includes(
          search.toLowerCase()
        )

        ||

        passCode.includes(
          search.toLowerCase()
        );

      const matchesFilter =

        filter === "all"

        ||

        (
          filter === "active"

          &&

          !log.checkOutTime
        )

        ||

        (
          filter === "completed"

          &&

          log.checkOutTime
        );

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

              Check Logs

            </h1>

            <p className="
              mt-3
              text-slate-400
            ">

              Monitor visitor
              check-in and
              check-out activity.

            </p>

          </div>

        </div>

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
          Search logs...
          "

          options={[

            {
              label:
                "All Logs",

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
                "Completed",

              value:
                "completed"
            }

          ]}

        />

      </GlassCard>

      {/* log table  */}

      <GlassCard className="
        p-8
        rounded-[32px]
      ">

        {
          loading ? (

            <div className="
              text-slate-400
            ">

              Loading logs...

            </div>

          ) : filteredLogs.length === 0 ? (

            <div className="
              text-slate-400
            ">

              No logs found

            </div>

          ) : (

            <div className="
              overflow-x-auto
            ">

              <table className="
                w-full
              ">

                <thead>

                  <tr className="
                    border-b
                    border-white/10
                  ">

                    <th className="
                      text-left
                      py-4
                    ">

                      Visitor

                    </th>

                    <th className="
                      text-left
                      py-4
                    ">

                      Pass Code

                    </th>

                    <th className="
                      text-left
                      py-4
                    ">

                      Check-In

                    </th>

                    <th className="
                      text-left
                      py-4
                    ">

                      Check-Out

                    </th>

                    <th className="
                      text-left
                      py-4
                    ">

                      Status

                    </th>

                  </tr>

                </thead>

                <tbody>

                  {
                    filteredLogs.map(
                      (log) => (

                        <tr
                          key={log._id}

                          className="
                            border-b
                            border-white/5
                          "
                        >

                          {/* visitor */}

                          <td className="
                            py-5
                          ">

                            <div className="
                              flex
                              items-center
                              gap-3
                            ">

                              <div className="
                                w-11
                                h-11

                                rounded-xl

                                bg-indigo-500/10

                                flex
                                items-center
                                justify-center

                                text-indigo-400
                              ">

                                <FiShield />

                              </div>

                              <div>

                                <h3 className="
                                  font-semibold
                                ">

                                  {
                                    log.visitorId?.name
                                  }

                                </h3>

                                <p className="
                                  text-sm
                                  text-slate-400
                                ">

                                  {
                                    log.visitorId?.email
                                  }

                                </p>

                              </div>

                            </div>

                          </td>

                          {/* pass */}

                          <td className="
                            py-5

                            font-semibold

                            text-indigo-400
                          ">

                            {
                              log.passId?.passCode
                            }

                          </td>

                          {/* check in ke */}

                          <td className="
                            py-5
                          ">

                            <div className="
                              flex
                              items-center
                              gap-2

                              text-emerald-400
                            ">

                              <FiLogIn />

                              {
                                new Date(
                                  log.checkInTime
                                ).toLocaleString()
                              }

                            </div>

                          </td>

                          {/* check out */}

                          <td className="
                            py-5
                          ">

                            {
                              log.checkOutTime ? (

                                <div className="
                                  flex
                                  items-center
                                  gap-2

                                  text-rose-400
                                ">

                                  <FiLogOut />

                                  {
                                    new Date(
                                      log.checkOutTime
                                    ).toLocaleString()
                                  }

                                </div>

                              ) : (

                                <div className="
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

                          </td>

                          {/* status */}

                          <td className="
                            py-5
                          ">

                            {
                              log.checkOutTime ? (

                                <div className="
                                  inline-flex

                                  px-4
                                  py-2

                                  rounded-xl

                                  bg-emerald-500/10

                                  border
                                  border-emerald-500/20

                                  text-emerald-400
                                ">

                                  Completed

                                </div>

                              ) : (

                                <div className="
                                  inline-flex

                                  px-4
                                  py-2

                                  rounded-xl

                                  bg-yellow-500/10

                                  border
                                  border-yellow-500/20

                                  text-yellow-400
                                ">

                                  Active

                                </div>

                              )
                            }

                          </td>

                        </tr>

                      )
                    )
                  }

                </tbody>

              </table>

            </div>

          )
        }

      </GlassCard>

    </div>

  );

};

export default CheckLogs;