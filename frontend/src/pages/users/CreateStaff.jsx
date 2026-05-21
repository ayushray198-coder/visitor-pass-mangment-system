import { useState } from "react";

import axiosInstance from "../../api/axios.js";

import toast from "react-hot-toast";

import GlassCard from "../../components/common/GlassCard.jsx";

import {

  FiMail,

  FiBriefcase,
  FiFileText
} from "react-icons/fi";

const CreateStaff = () => {

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      department: "",

      role: "employee",
      notes: "",
      isActive: true

    });

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setFormData({

      ...formData,

      [name]: value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await axiosInstance.post(

          "/users/create-staff",

          formData,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );

      toast.success(
        response.data.message
      );

      setFormData({
        email: "",
        department: "",

        role: "employee",
        notes: "",

        isActive: true

      });

    } catch (error) {

    

      toast.error(

        error.response?.data?.message ||

        "Failed to create staff"

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="
      max-w-5xl
      mx-auto
    ">

      {/* HEADER */}

      <GlassCard className="
        p-8
        rounded-[32px]
      ">

        <h1 className="
          text-4xl
          font-bold
          text-white
        ">

          Create Staff

        </h1>

        <p className="
          mt-3
          text-slate-400
        ">

          Add and manage
          organization staff
          professionally.

        </p>

      </GlassCard>

      {/* FORM */}

      <GlassCard className="
        mt-8

        p-8

        rounded-[32px]
      ">

        <form
          onSubmit={handleSubmit}
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          "
        >



          {/* EMAIL */}

          <div>

            <label className="
              text-slate-300
              mb-3
              block
            ">

              Email Address

            </label>

            <div className="
              h-[60px]

              px-5

              rounded-2xl

              bg-slate-900

              border
              border-white/10

              flex
              items-center
              gap-4
            ">

              <FiMail className="
                text-slate-400
              " />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
                className="
                  flex-1

                  bg-transparent

                  outline-none

                  text-white
                "
              />

            </div>

          </div>



          {/* department */}

          <div>

            <label className="
              text-slate-300
              mb-3
              block
            ">

              Department

            </label>

            <div className="
              h-[60px]

              px-5

              rounded-2xl

              bg-slate-900

              border
              border-white/10

              flex
              items-center
              gap-4
            ">

              <FiBriefcase className="
                text-slate-400
              " />

              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Enter department"
                required
                className="
                  flex-1

                  bg-transparent

                  outline-none

                  text-white
                "
              />

            </div>

          </div>

          {/* role */}

          <div className="
            md:col-span-2
          ">

            <label className="
              text-slate-300
              mb-3
              block
            ">

              Select Role

            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="
                w-full
                h-[60px]

                px-5

                rounded-2xl

                bg-slate-900

                border
                border-white/10

                text-white

                outline-none
              "
            >

              <option value="employee">

                Employee

              </option>

              <option value="security">

                Security

              </option>

              <option value="admin">

                Admin

              </option>

            </select>

          </div>

          {/* notes */}

          <div className="
            md:col-span-2
          ">

            <label className="
              text-slate-300
              mb-3
              block
            ">

              Notes

            </label>

            <div className="
              p-5

              rounded-2xl

              bg-slate-900

              border
              border-white/10

              flex
              gap-4
            ">

              <FiFileText className="
                text-slate-400
                mt-1
              " />

              <textarea
                rows="5"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Write notes..."
                className="
                  flex-1

                  bg-transparent

                  outline-none

                  resize-none

                  text-white
                "
              />

            </div>

          </div>

          

          <div className="
            md:col-span-2

            flex
            items-center
            gap-4
          ">

            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({

                  ...formData,

                  isActive:
                    e.target.checked

                })
              }
            />

            <p className="
              text-slate-300
            ">

              Active Account

            </p>

          </div>

          {/* button */}

          <div className="
            md:col-span-2
          ">

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                h-[60px]

                rounded-2xl

                bg-indigo-600
                hover:bg-indigo-700

                transition-all

                text-white
                font-semibold
              "
            >

              {
                loading
                  ? "Creating..."
                  : "Create Staff"
              }

            </button>

          </div>

        </form>

      </GlassCard>

    </div>

  );

};

export default CreateStaff;