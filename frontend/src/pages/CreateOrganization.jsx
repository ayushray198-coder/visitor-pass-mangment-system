import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiBriefcase,
  FiImage,
  FiHome
} from "react-icons/fi";

import GlassCard from "../components/common/GlassCard.jsx";
import axiosInstance from "../api/axios.js";
import toast from "react-hot-toast";

const CreateOrganization = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    logo: ""
  });

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      const response = await axiosInstance.post(
        "/organization/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const updatedUser = response.data.data.user;

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      toast.success(response.data.message);

      navigate("/admin/dashboard");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Organization creation failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      px-6
      py-16
    ">

      <GlassCard className="
        w-full
        max-w-162.5
        px-8
        sm:px-14
        py-12
        rounded-[40px]
        flex
        flex-col
        items-center
      ">

        {/* ICON */}

        <div className="
          w-20
          h-20
          rounded-3xl
          bg-cyan-500/10
          border
          border-cyan-500/20
          flex
          items-center
          justify-center
          text-4xl
          text-cyan-400
          mb-8
        ">

          <FiBriefcase />

        </div>

        {/* TITLE */}

        <h2 className="
          text-4xl
          sm:text-5xl
          font-bold
          text-center
        ">

          Create Organization

        </h2>

        <p className="
          mt-5
          text-slate-400
          text-center
          max-w-md
          leading-8
        ">

          Setup your company and
          start managing visitor
          passes professionally.

        </p>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="
            mt-14
            w-full
            flex
            flex-col
            gap-7
          "
        >

          {/* ORGANIZATION NAME */}

          <div className="
            h-17
            px-6
            rounded-3xl
            bg-slate-900/80
            border
            border-white/10
            flex
            items-center
            gap-4
          ">

            <FiBriefcase className="
              text-2xl
              text-slate-400
            " />

            <input
              type="text"
              name="name"
              placeholder="Organization Name"
              value={formData.name}
              onChange={handleChange}
              className="
                w-full
                bg-transparent
                outline-none
                text-lg
              "
            />

          </div>

          {/* LOGO */}

          <div className="
            h-17
            px-6
            rounded-3xl
            bg-slate-900/80
            border
            border-white/10
            flex
            items-center
            gap-4
          ">

            <FiImage className="
              text-2xl
              text-slate-400
            " />

            <input
              type="text"
              name="logo"
              placeholder="Logo URL (Optional)"
              value={formData.logo}
              onChange={handleChange}
              className="
                w-full
                bg-transparent
                outline-none
                text-lg
              "
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="
              mt-4
              h-17
              rounded-3xl
              bg-indigo-600
              hover:bg-indigo-700
              transition-all
              duration-300
              text-lg
              font-semibold
              disabled:opacity-60
            "
          >

            {
              loading
                ? "Creating..."
                : "Create Organization"
            }

          </button>

        </form>

      </GlassCard>

    </div>
  );
};

export default CreateOrganization;