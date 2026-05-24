import Container from "../common/Container.jsx";

import GlassCard from "../common/GlassCard.jsx";

import PrimaryButton from "../common/PrimaryButton.jsx";

import SecondaryButton from "../common/SecondryButton.jsx";

import visitorPassImg from "../../assets/visitor-pass.png"

import {
  FiShield,
  FiCheckCircle,
  FiPlay,
  FiUsers,
  FiTrendingUp
} from "react-icons/fi";

const stats = [
  {
    value: "10K+",
    label: "Visitors Managed"
  },

  {
    value: "99.9%",
    label: "Security Uptime"
  },

  {
    value: "24/7",
    label: "Live Monitoring"
  }
];

const Hero = () => {
  return (

    <section
      id="hero"
      className="
      relative
      overflow-hidden

      min-h-screen

      flex
      items-center

      pt-36
      sm:pt-40
      lg:pt-44

      pb-20
      "
    >

      {/* bg glow ke liye */}

      <div
        className="
        absolute
        top-0
        left-1/2
        -translate-x-1/2

        w-[500px]
        sm:w-[700px]

        h-[500px]
        sm:h-[700px]

        bg-cyan-500/10

        blur-[120px]
        sm:blur-[160px]

        rounded-full
        pointer-events-none
        "
      ></div>

      <Container>

        <div
          className="
          relative
          z-10

          grid
          grid-cols-1
          lg:grid-cols-[1.1fr_.9fr]

          gap-16
          lg:gap-20

          items-center
          "
        >

          {/* left side */}

          <div
            className="
            text-center
            lg:text-left

            flex
            flex-col

            items-center
            lg:items-start
            "
          >

            {/* badge */}

            <div
              className="
              inline-flex
              items-center
              gap-3

              px-5
              py-3

              rounded-full

              bg-cyan-500/10

              border
              border-cyan-400/20

              text-cyan-300
              text-sm
              font-medium

              backdrop-blur-xl

              mb-8
              "
            >

              <FiShield />

              Enterprise Visitor Platform

            </div>

            {/* heading */}

            <h1
              className="
              text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl

              font-black

              leading-[1.05]
              tracking-tight

              max-w-4xl
              "
            >

              Smart Visitor

              <br />

              Management

              <span
                className="
                block

                bg-gradient-to-r
                from-cyan-400
                to-indigo-500

                bg-clip-text
                text-transparent
                "
              >

                System

              </span>

            </h1>

            {/* description */}

            <p
              className="
              mt-8

              text-base
              sm:text-lg

              leading-8
              sm:leading-9

              text-slate-400

              max-w-2xl
              "
            >

              Secure visitor tracking,
              QR-based digital passes,
              role-based dashboards
              and enterprise-grade
              access management for
              modern organizations.

            </p>

            {/* cta buttons */}

            <div
              className="
              flex
              flex-col
              sm:flex-row

              items-center

              gap-4
              sm:gap-5

              mt-12

              w-full
              sm:w-auto
              "
            >

              <div className="w-full sm:w-auto">

                <PrimaryButton>

                  Get Started

                </PrimaryButton>

              </div>

              <div className="w-full sm:w-auto">

                <SecondaryButton>

                  <span className="flex items-center gap-2">

                    <FiPlay />

                    Watch Demo

                  </span>

                </SecondaryButton>

              </div>

            </div>

            {/* stats */}

            <div
              className="
              grid
              grid-cols-1
              md:grid-cols-3
              sm:grid-cols-3

              gap-8
              sm:gap-10

              mt-16

              w-full
              "
            >

              {
                stats.map((item, index) => (

                  <div key={index}>

                    <h3
                      className="
                      text-3xl
                      sm:text-4xl

                      font-bold
                      text-white
                      "
                    >

                      {item.value}

                    </h3>

                    <p
                      className="
                      text-slate-500
                      mt-2
                      "
                    >

                      {item.label}

                    </p>

                  </div>

                ))
              }

            </div>

          </div>

          {/* right side */}

          <div
            className="
            flex
            justify-center
            "
          >

            <div
              className="
             relative

             w-full
             max-w-[320px]
             sm:max-w-[380px]
             lg:max-w-[430px]

             transition-all
             duration-500

            hover:-translate-y-2
            "
            >

              {/* glow */}

              <div
                className="
                absolute
                inset-0

               rounded-[40px]

                border
               border-cyan-400/20

               shadow-[0_0_35px_rgba(34,211,238,0.18)]

              pointer-events-none
              "
              />

              {/* image */}

              <img
                src={visitorPassImg}

                alt="Visitor Pass"

                className="
               relative
                z-10

               w-full
               h-auto

                 object-contain
               "
              />

            </div>

          </div>

        </div>

      </Container>

    </section>
  );
};

export default Hero;