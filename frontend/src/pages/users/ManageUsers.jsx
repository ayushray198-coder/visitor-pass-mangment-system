import { useEffect, useState } from "react";

import GlassCard from "../../components/common/GlassCard.jsx";

import SearchFilter from "../../components/common/SearchFilter.jsx";

import axiosInstance from "../../api/axios.js";

const ManageUsers = () => {

  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("all");

  useEffect(() => {

    const fetchUsers =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const response =
            await axiosInstance.get(

              "/users",

              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }

            );

          setUsers(
            response.data.data
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    fetchUsers();

  }, []);

  /* filter user */

  const filteredUsers =
    users.filter((user) => {

      const matchesSearch =

        user.name
          ?.toLowerCase()

          .includes(
            search.toLowerCase()
          )

        ||

        user.email
          ?.toLowerCase()

          .includes(
            search.toLowerCase()
          );

      const matchesFilter =

        filter === "all"

        ||

        user.role === filter;

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

      {/* header */}

      <GlassCard className="
        p-8
        rounded-[32px]
      ">

        <div>

          <h1 className="
            text-4xl
            font-bold
          ">

            Manage Users

          </h1>

          <p className="
            mt-3
            text-slate-400
          ">

            Manage employees
            and security staff.

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
          Search users...
          "

          options={[

            {
              label:
                "All Roles",

              value:
                "all"
            },

            {
              label:
                "Admin",

              value:
                "admin"
            },

            {
              label:
                "Employee",

              value:
                "employee"
            },

            {
              label:
                "Security",

              value:
                "security"
            },

            {
              label:
                "Visitor",

              value:
                "visitor"
            }

          ]}

        />

      </GlassCard>

      {/* user */}

      <GlassCard className="
        p-8
        rounded-[32px]
      ">

        {
          loading ? (

            <div className="
              text-slate-400
            ">

              Loading users...

            </div>

          ) : filteredUsers.length === 0 ? (

            <div className="
              text-slate-400
            ">

              No users found

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

                      Name

                    </th>

                    <th className="
                      text-left
                      py-4
                    ">

                      Email

                    </th>

                    <th className="
                      text-left
                      py-4
                    ">

                      Role

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
                    filteredUsers.map(
                      (user) => (

                        <tr
                          key={user._id}

                          className="
                            border-b
                            border-white/5
                          "
                        >

                          <td className="
                            py-5
                          ">

                            {user.name}

                          </td>

                          <td className="
                            py-5
                          ">

                            {user.email}

                          </td>

                          <td className="
                            py-5
                            capitalize
                          ">

                            {user.role}

                          </td>

                          <td className="
                            py-5
                          ">

                            {
                              user.isActive

                                ? "Active"

                                : "Inactive"
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

export default ManageUsers;