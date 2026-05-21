import Container from "./Container.jsx";

import GlassCard from "./GlassCard.jsx";

import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiTwitter
} from "react-icons/fi";

const Footer = () => {
  return (

    <footer
      id="footer"
      className="
      section-space
      relative
      overflow-hidden

      pt-24
      sm:pt-28

      pb-10

      border-t
      border-white/10

      bg-[#050816]
      "
    >

      {/* background glow ke liye for modern look */}

      <div
        className="
        absolute
        top-0
        left-1/2
        -translate-x-1/2
        w-[400px]
        sm:w-[600px]
        h-[400px]
        sm:h-[600px]
        bg-cyan-500/10
        blur-[100px]
        sm:blur-[140px]
        rounded-full
        pointer-events-none
        "
      ></div>

      <Container>

        {/* top grid ke liye */}

        <div
          className="
          relative
          z-10
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-10
          lg:gap-14
          "
        >

          {/* brand ke liye*/}

          <div
            className="
            text-center
            sm:text-left
            "
          >

            <div
              className="
              flex
              items-center
              justify-center
              sm:justify-start
              gap-4
              mb-8
              "
            >

              <div
                className="
                w-14
                h-14
                rounded-2xl

                bg-gradient-to-br
                from-cyan-400
                to-indigo-600

                flex
                items-center
                justify-center

                text-white
                text-2xl
                font-bold

                shadow-lg
                shadow-cyan-500/20
                "
              >

                V

              </div>

              <div>

                <h2
                  className="
                  text-3xl
                  sm:text-4xl

                  font-bold
                  "
                >

                  VisitFlow

                </h2>

                <p
                  className="
                  text-xs
                  text-slate-500
                  mt-1
                  "
                >

                  Visitor Management

                </p>

              </div>

            </div>

            <p
              className="
              text-slate-400
              leading-8

              max-w-sm

              mx-auto
              sm:mx-0
              "
            >

              Modern enterprise visitor
              management platform built
              for organizations, employees
              and security teams.

            </p>

            {/* socials ke liye */}

            <div
              className="
              flex
              items-center

              justify-center
              sm:justify-start

              gap-4
              mt-8
              "
            >

              {
                [
                  <FiGithub />,
                  <FiLinkedin />,
                  <FiTwitter />
                ].map((icon, index) => (

                  <div
                    key={index}
                    className="
                    w-12
                    h-12

                    rounded-2xl
                    bg-white/[0.03]

                    border
                    border-white/10

                    flex
                    items-center
                    justify-center

                    text-slate-300

                    hover:bg-cyan-500/10
                    hover:text-cyan-400
                    hover:border-cyan-400/20

                    transition-all
                    duration-300

                    cursor-pointer
                    "
                  >

                    {icon}

                  </div>

                ))
              }

            </div>

          </div>

          {/* product ke liye */}

          <div
            className="
            text-center
            sm:text-left
            "
          >

            <h3
              className="
              text-2xl
              font-semibold
              mb-8
              "
            >

              Product

            </h3>

            <div
              className="
              flex
              flex-col
              gap-5

              text-slate-400
              "
            >

              {
                [
                  "Features",
                  "Security",
                  "Analytics",
                  "Dashboard"
                ].map((item, index) => (

                  <span
                    key={index}
                    className="
                    hover:text-cyan-400
                    transition
                    cursor-pointer
                    "
                  >

                    {item}

                  </span>

                ))
              }

            </div>

          </div>

          {/* company ke liye */}

          <div
            className="
            text-center
            sm:text-left
            "
          >

            <h3
              className="
              text-2xl
              font-semibold
              mb-8
              "
            >

              Company

            </h3>

            <div
              className="
              flex
              flex-col
              gap-5

              text-slate-400
              "
            >

              {
                [
                  "About",
                  "Careers",
                  "Contact",
                  "Support"
                ].map((item, index) => (

                  <span
                    key={index}
                    className="
                    hover:text-cyan-400

                    transition
                    cursor-pointer
                    "
                  >

                    {item}

                  </span>

                ))
              }

            </div>

          </div>

          {/* contact card ke liye */}

          <GlassCard
            className="
            p-6
            sm:p-8

            bg-white/[0.02]
            "
          >

            <h3
              className="
              text-2xl
              font-semibold

              mb-8

              text-center
              sm:text-left
              "
            >

              Contact Us

            </h3>

            <div className="space-y-6">

              {
                [
                  {
                    icon: <FiMail />,
                    label: "Email",
                    value: "support@visitflow.com"
                  },

                  {
                    icon: <FiPhone />,
                    label: "Phone",
                    value: "+91 9876543210"
                  },

                  {
                    icon: <FiMapPin />,
                    label: "Location",
                    value: "Bangalore, India"
                  }
                ].map((item, index) => (

                  <div
                    key={index}
                    className="
                    flex
                    items-start
                    gap-4
                    "
                  >

                    <div
                      className="
                      w-12
                      h-12
                      rounded-xl

                      bg-cyan-500/10
                      border
                      border-cyan-400/20

                      flex
                      items-center
                      justify-center

                      text-cyan-400
                      text-xl

                      shrink-0
                      "
                    >

                      {item.icon}

                    </div>

                    <div>

                      <p
                        className="
                        text-sm
                        text-slate-500
                        mb-1
                        "
                      >

                        {item.label}

                      </p>

                      <p
                        className="
                        text-slate-300
                        break-all
                        "
                      >

                        {item.value}

                      </p>

                    </div>

                  </div>

                ))
              }

            </div>

          </GlassCard>

        </div>

        {/* bottom ke liye */}

        <div
          className="
          relative
          z-10

          border-t
          border-white/10

          mt-20
          pt-8

          flex
          flex-col
          md:flex-row

          items-center
          justify-between

          gap-5
          "
        >

          <p
            className="
            text-slate-500
            text-sm

            text-center
            md:text-left
            "
          >

            © 2026 VisitFlow. All rights reserved.

          </p>

          <div
            className="
            flex
            flex-wrap

            items-center
            justify-center

            gap-6

            text-sm
            text-slate-500
            "
          >

            <span className="hover:text-cyan-400 transition cursor-pointer">

              Privacy Policy

            </span>

            <span className="hover:text-cyan-400 transition cursor-pointer">

              Terms of Service

            </span>

          </div>

        </div>

      </Container>

    </footer>
  );
};

export default Footer;