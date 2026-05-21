import { useState } from "react";

import { useNavigate } from "react-router-dom";

import GlassCard from "../../components/common/GlassCard";

import axiosInstance from "../../api/axios";

import toast from "react-hot-toast";

const CreateVisitor = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    phone: ""

  });

  const [loading, setLoading] = useState(false);

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

      const token = localStorage.getItem("token");

      const response = await axiosInstance.post(

        "/visitor",

        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );

      toast.success(response.data.message);

      navigate("/dashboard/visitors");

    } catch (error) {

      toast.error(
        error.response?.data?.message
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <GlassCard className="p-8 rounded-[32px]">

      <h1 className="text-4xl font-bold">

        Create Visitor

      </h1>

      <p className="mt-3 text-slate-400">

        Add a new visitor to your organization.

      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 flex flex-col gap-6"
      >

        <input
          type="text"
          name="name"
          placeholder="Visitor Name"
          value={formData.name}
          onChange={handleChange}
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

        <input
          type="email"
          name="email"
          placeholder="Visitor Email"
          value={formData.email}
          onChange={handleChange}
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

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
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

        <button
          type="submit"
          disabled={loading}
          className="
            h-[60px]
            rounded-2xl
            bg-indigo-600
            hover:bg-indigo-700
            transition-all
          "
        >

          {
            loading
              ? "Creating..."
              : "Create Visitor"
          }

        </button>

      </form>

    </GlassCard>

  );

};

export default CreateVisitor;