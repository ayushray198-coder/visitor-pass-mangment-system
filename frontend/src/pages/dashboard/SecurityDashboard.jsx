import { useState } from "react";

import { Link } from "react-router-dom";

import {
  FiLogIn,
  FiLogOut,
  FiShield
} from "react-icons/fi";

import GlassCard from "../../components/common/GlassCard.jsx";

import SearchFilter from "../../components/common/SearchFilter.jsx";

const SecurityDashboard = () => {

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("all");

  const cards = [

    {
      title: "Visitor Check-In",

      description:
        "Verify visitor entry with QR scanner.",

      icon: <FiLogIn />,

      link: "/dashboard/check-in",

      type: "checkin"
    },

    {
      title: "Visitor Check-Out",

      description:
        "Verify visitor exit with QR scanner.",

      icon: <FiLogOut />,

      link: "/dashboard/check-out",

      type: "checkout"
    }

  ];

  /* filtered cards */

  const filteredCards =
    cards.filter((card) => {

      const matchesSearch =

        card.title
          .toLowerCase()

          .includes(
            search.toLowerCase()
          )

        ||

        card.description
          .toLowerCase()

          .includes(
            search.toLowerCase()
          );

      const matchesFilter =

        filter === "all"

        ||

        card.type === filter;

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

      {/* hero */}

      <GlassCard className="
        p-8
        lg:p-10
        rounded-[32px]
      ">

        <div>

          <h1 className="
            text-4xl
            lg:text-5xl
            font-bold
          ">

            Security Dashboard

          </h1>

          <p className="
            mt-5
            text-slate-400
            leading-8
            max-w-2xl
          ">

            Manage visitor entry
            and exit securely using
            QR verification.

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
          Search security tools...
          "

          options={[

            {
              label:
                "All Actions",

              value:
                "all"
            },

            {
              label:
                "Check-In",

              value:
                "checkin"
            },

            {
              label:
                "Check-Out",

              value:
                "checkout"
            }

          ]}

        />

      </GlassCard>

      {/* card */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-6
      ">

        {
          filteredCards.map(
            (card, index) => (

              <GlassCard
                key={index}

                className="
                  p-8
                  rounded-[32px]
                "
              >

                <div className="
                  w-16
                  h-16

                  rounded-2xl

                  bg-indigo-500/10

                  border
                  border-indigo-500/20

                  flex
                  items-center
                  justify-center

                  text-3xl
                  text-indigo-400
                ">

                  {card.icon}

                </div>

                <h2 className="
                  mt-8
                  text-3xl
                  font-bold
                ">

                  {card.title}

                </h2>

                <p className="
                  mt-4
                  text-slate-400
                  leading-7
                ">

                  {card.description}

                </p>

                <Link
                  to={card.link}

                  className="
                    mt-8

                    h-[56px]

                    rounded-2xl

                    bg-indigo-600
                    hover:bg-indigo-700

                    transition-all

                    flex
                    items-center
                    justify-center

                    gap-3
                  "
                >

                  Open Scanner

                  <FiShield />

                </Link>

              </GlassCard>

            )
          )
        }

      </div>

    </div>

  );

};

export default SecurityDashboard;