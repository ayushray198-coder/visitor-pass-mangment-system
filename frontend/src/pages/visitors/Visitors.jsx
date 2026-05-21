import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import GlassCard from "../../components/common/GlassCard";

import axiosInstance from "../../api/axios";

const Visitors = () => {

  const [visitors, setVisitors] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchVisitors = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await axiosInstance.get(

          "/visitor",

          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }

        );

        setVisitors(response.data.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchVisitors();

  }, []);

  return (

    <div className="flex flex-col gap-8">

      <GlassCard className="p-8 rounded-[32px]">

        <div className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-5
        ">

          <div>

            <h1 className="text-4xl font-bold">

              Visitors

            </h1>

            <p className="mt-3 text-slate-400">

              Manage all organization visitors.

            </p>

          </div>

          <Link
            to="/dashboard/create-visitor"
            className="
              h-[58px]
              px-6
              rounded-2xl
              bg-indigo-600
              hover:bg-indigo-700
              transition-all
              flex
              items-center
              justify-center
            "
          >

            Create Visitor

          </Link>

        </div>

      </GlassCard>

      <GlassCard className="p-8 rounded-[32px]">

        {
          loading ? (

            <div className="text-slate-400">

              Loading visitors...

            </div>

          ) : visitors.length === 0 ? (

            <div className="text-slate-400">

              No visitors found

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b border-white/10">

                    <th className="text-left py-4">

                      Name

                    </th>

                    <th className="text-left py-4">

                      Email

                    </th>

                    <th className="text-left py-4">

                      Phone

                    </th>

                    <th className="text-left py-4">

                      Details

                    </th>

                  </tr>

                </thead>

                <tbody>

                  {
                    visitors.map((visitor) => (

                      <tr
                        key={visitor._id}
                        className="border-b border-white/5"
                      >

                        <td className="py-5">

                          {visitor.name}

                        </td>

                        <td className="py-5">

                          {visitor.email}

                        </td>

                        <td className="py-5">

                          {visitor.phone}

                        </td>

                        <td className="py-5">

                          <Link
                            to={`/dashboard/visitors/${visitor._id}`}
                            className="text-indigo-400"
                          >

                            View

                          </Link>

                        </td>

                      </tr>

                    ))
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

export default Visitors;