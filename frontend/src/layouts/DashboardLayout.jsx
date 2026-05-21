import { useState } from "react";

import {
  Outlet,
  Link,
  useLocation
} from "react-router-dom";

import {
  FiMenu,
  FiX,
  FiHome,
  FiUsers,
  FiBriefcase,
  FiLogOut,
  FiShield,
  FiUserPlus,
  FiCreditCard,
  FiLogIn,
  FiClipboard,
  FiCalendar,
  FiLogOut as FiExit
} from "react-icons/fi";

const DashboardLayout = () => {

  const location = useLocation();

  const [openSidebar, setOpenSidebar] =
    useState(false);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  let links = [];

  /* visitor */

  if (user?.role === "visitor") {

    links = [

      {
        name: "Dashboard",
        path: "/dashboard",
        icon: <FiHome />
      },

      {
        name: "Create Organization",
        path: "/create-organization",
        icon: <FiBriefcase />
      },

      {
        name: "Create Request",
        path: "/dashboard/create-appointment",
        icon: <FiCalendar />
      },

      {
        name: "My Requests",
        path: "/dashboard/appointments",
        icon: <FiBriefcase />
      },

      {
        name: "Passes",
        path: "/dashboard/passes",
        icon: <FiCreditCard />
      }

    ];

  }

  /* admin */

  if (user?.role === "admin") {

    links = [

      {
        name: "Dashboard",
        path: "/dashboard/admin",
        icon: <FiHome />
      },

      {
        name: "Manage Users",
        path: "/dashboard/manage-users",
        icon: <FiUsers />
      },

      {
        name: "Create Staff",
        path: "/dashboard/create-staff",
        icon: <FiUserPlus />
      },
      {
        name: "Visitors",
        path: "/dashboard/visitors",
        icon: <FiUsers />
      },

      {
        name: "Appointments",
        path: "/dashboard/appointments",
        icon: <FiCalendar />
      },

      {
        name: "Passes",
        path: "/dashboard/passes",
        icon: <FiCreditCard />
      },
      {
        name: "Check Logs",
        path: "/dashboard/check-logs",
        icon: <FiClipboard />
      }

    ];

  }

  /* employee */

  if (user?.role === "employee") {

    links = [

      {
        name: "Dashboard",
        path: "/dashboard/employee",
        icon: <FiHome />
      },

      {
        name: "Visitors",
        path: "/dashboard/visitors",
        icon: <FiUsers />
      },

      {
        name: "Appointments",
        path: "/dashboard/appointments",
        icon: <FiCalendar />
      },

      {
        name: "Passes",
        path: "/dashboard/passes",
        icon: <FiCreditCard />
      }

    ];

  }

  /* security */

  if (user?.role === "security") {

    links = [

      {
        name: "Dashboard",
        path: "/dashboard/security",
        icon: <FiHome />
      },

      {
        name: "Check-In",
        path: "/dashboard/check-in",
        icon: <FiLogIn />
      },

      {
        name: "Check-Out",
        path: "/dashboard/check-out",
        icon: <FiExit />
      },
      {
        name: "Check Logs",
        path: "/dashboard/check-logs",
        icon: <FiClipboard />
      }

    ];

  }

  const logoutHandler = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "/login";

  };

  return (

    <div className="
      min-h-screen
      bg-[#030712]
      text-white
      flex
    ">

      {/* sidebar */}

      <aside className={`

        fixed
        top-0
        left-0
        z-50

        min-h-screen

        w-[280px]

        bg-slate-950/95

        backdrop-blur-xl

        border-r
        border-white/10

        p-6

        flex
        flex-col
        shrink-0
        transition-all
        duration-300

        ${openSidebar
          ? "translate-x-0"
          : "-translate-x-full"
        }

        lg:translate-x-0

      `}>

        {/* logo */}

        <div className="
          flex
          items-center
          justify-between
          mb-12
        ">

          <div className="
            flex
            items-center
            gap-3
          ">

            <div className="
              w-12
              h-12

              rounded-2xl

              bg-indigo-600

              flex
              items-center
              justify-center

              text-2xl
              font-bold
            ">

              V

            </div>

            <div>

              <h2 className="
                text-2xl
                font-bold
              ">

                VisitFlow

              </h2>

              <p className="
                text-sm
                text-slate-400
              ">

                Dashboard

              </p>

            </div>

          </div>

          <button
            onClick={() =>
              setOpenSidebar(false)
            }
            className="
              lg:hidden
              text-2xl
            "
          >

            <FiX />

          </button>

        </div>

        {/* links */}

        <nav className="
          flex
          flex-col
          gap-3
          overflow-y-auto
        ">

          {
            links.map((link, index) => (

              <Link
                key={index}
                to={link.path}
                className={`

                  h-[58px]

                  px-5

                  rounded-2xl

                  flex
                  items-center

                  gap-4

                  text-base

                  transition-all
                  duration-300

                  ${location.pathname === link.path

                    ? "bg-indigo-600 text-white"

                    : "hover:bg-white/5 text-slate-300"

                  }

                `}
              >

                <span className="
                  text-2xl
                ">

                  {link.icon}

                </span>

                {link.name}

              </Link>

            ))
          }

        </nav>

        {/* user */}

        <div className="
          mt-auto
          border-t
          border-white/10
          pt-6
        ">

          <div className="mb-6">

            <h3 className="
              text-lg
              font-semibold
            ">

              {user?.name}

            </h3>

            <p className="
              text-sm
              text-slate-400
            ">

              {user?.email}

            </p>

          </div>

          <button
            onClick={logoutHandler}
            className="

              w-full
              h-[58px]

              rounded-2xl

              bg-red-500/10
              hover:bg-red-500/20

              border
              border-red-500/20

              flex
              items-center
              justify-center

              gap-3

              text-red-400

              transition-all
              duration-300

            "
          >

            <FiLogOut />

            Logout

          </button>

        </div>

      </aside>

      {/* main */}

      <div className="
        flex-1
        lg:ml-[280px]
        min-w-0
      ">

        {/* header */}

        <header className="

          h-[90px]

          px-6
          lg:px-10

          border-b
          border-white/10

          bg-slate-950/70

          backdrop-blur-xl

          flex
          items-center
          justify-between

          sticky
          top-0
          z-40

        ">

          <div className="
            flex
            items-center
            gap-4
          ">

            <button
              onClick={() =>
                setOpenSidebar(true)
              }
              className="
                lg:hidden
                text-3xl
              "
            >

              <FiMenu />

            </button>

            <div>

              <h2 className="
                text-2xl
                font-bold
              ">

                Welcome Back...

              </h2>

              <p className="
                text-slate-400
              ">

                Manage your platform professionally

              </p>

            </div>

          </div>

        </header>

        {/* CONTENT */}

        <main className="
          p-6
          lg:p-10
        ">

          <Outlet />

        </main>

      </div>

    </div>

  );

};

export default DashboardLayout;