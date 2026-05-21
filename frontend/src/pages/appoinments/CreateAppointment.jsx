import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import GlassCard from "../../components/common/GlassCard.jsx";

import axiosInstance from "../../api/axios.js";

import toast from "react-hot-toast";

const CreateAppointment = () => {

  const navigate = useNavigate();

  const [organizations, setOrganizations] = useState([]);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({

    organizationId: "",

    purpose: "",

    visitDate: ""

  });

  useEffect(() => {

    const fetchOrganizations = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const response =
          await axiosInstance.get(

            "/organization",

            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }

          );

        setOrganizations(
          response.data.data
        );

      } catch (error) {

        console.log(error);

        toast.error(

          error.response?.data?.message ||

          "Failed to load organizations"

        );

      }

    };

    fetchOrganizations();

  }, []);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const response =
        await axiosInstance.post(

          "/appointment",

          formData,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );

      toast.success(

        response.data.message ||

        "Appointment created"

      );

      navigate(
        "/dashboard/appointments"
      );

    } catch (error) {

      console.log(error);

      toast.error(

        error.response?.data?.message ||

        "Failed to create appointment"

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <GlassCard className="
      p-8
      rounded-[32px]
    ">

      <h1 className="
        text-4xl
        font-bold
      ">

        Create Visit Request

      </h1>

      <p className="
        mt-3
        text-slate-400
      ">

        Request a visit
        to an organization

      </p>

      <form
        onSubmit={handleSubmit}
        className="
          mt-10
          flex
          flex-col
          gap-6
        "
      >

        {/* ORGANIZATION */}

        <select

          name="organizationId"

          value={formData.organizationId}

          onChange={handleChange}

          required

          className="

            h-[60px]

            px-5

            rounded-2xl

            bg-slate-900

            border
            border-white/10

            outline-none

          "
        >

          <option value="">

            Select Organization

          </option>

          {
            organizations.map((org) => (

              <option
                key={org._id}
                value={org._id}
              >

                {org.name}

              </option>

            ))
          }

        </select>

        {/* PURPOSE */}

        <textarea

          name="purpose"

          placeholder="Visit Purpose"

          value={formData.purpose}

          onChange={handleChange}

          rows="5"

          required

          className="

            p-5

            rounded-2xl

            bg-slate-900

            border
            border-white/10

            outline-none
            resize-none

          "
        />

        {/* DATE */}

        <input

          type="date"

          name="visitDate"

          value={formData.visitDate}

          onChange={handleChange}

          required

          className="

            h-[60px]

            px-5

            rounded-2xl

            bg-slate-900

            border
            border-white/10

            outline-none

          "
        />

        {/* BUTTON */}

        <button

          type="submit"

          disabled={loading}

          className="

            h-[60px]

            rounded-2xl

            bg-indigo-600
            hover:bg-indigo-700

            transition-all

            disabled:opacity-50

          "
        >

          {
            loading

              ? "Creating..."

              : "Submit Request"
          }

        </button>

      </form>

    </GlassCard>

  );

};

export default CreateAppointment;