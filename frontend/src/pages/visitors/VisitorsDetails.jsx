import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import GlassCard from "../../components/common/GlassCard.jsx";

import axiosInstance from "../../api/axios.js";

const VisitorDetails = () => {

  const { id } = useParams();

  const [visitor, setVisitor] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchVisitor = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await axiosInstance.get(

          `/visitor/${id}`,

          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }

        );

        setVisitor(response.data.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchVisitor();

  }, [id]);

  if (loading) {

    return (
      <div className="text-slate-400">

        Loading visitor...

      </div>
    );

  }

  if (!visitor) {

    return (
      <div className="text-slate-400">

        Visitor not found

      </div>
    );

  }

  return (

    <GlassCard className="p-8 rounded-[32px]">

      <h1 className="text-4xl font-bold">

        Visitor Details

      </h1>

      <div className="mt-10 flex flex-col gap-6">

        <div>

          <p className="text-slate-400">

            Name

          </p>

          <h2 className="mt-2 text-2xl font-semibold">

            {visitor.name}

          </h2>

        </div>

        <div>

          <p className="text-slate-400">

            Email

          </p>

          <h2 className="mt-2 text-2xl font-semibold">

            {visitor.email}

          </h2>

        </div>

        <div>

          <p className="text-slate-400">

            Phone

          </p>

          <h2 className="mt-2 text-2xl font-semibold">

            {visitor.phone}

          </h2>

        </div>

      </div>

    </GlassCard>

  );

};

export default VisitorDetails;