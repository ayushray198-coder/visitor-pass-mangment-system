import { useState } from "react";

import { Link } from "react-router-dom";

import Container from "./Container";

import {
  FiArrowRight,
  FiMenu,
  FiX
} from "react-icons/fi";

const links = [
  {
    name: "About",
    href: "#about"
  },

  {
    name: "Features",
    href: "#features"
  },

  {
    name: "How It Works",
    href: "#how"
  },

  {
    name: "Contact",
    href: "#footer"
  }
];

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (

    <header
      className="
      fixed
      top-0
      left-5
      right-5
      inset-x-0
      z-50
      pt-4
      "
    >

      <Container>

        {/* navbar ke liye */}

        <nav
          className="
          h-20
          px-5
          sm:px-6
          lg:px-8

          rounded-3xl

          border
          border-white/10

          bg-black/20
          backdrop-blur-2xl

          shadow-[0_8px_40px_rgba(0,0,0,0.35)]

          flex
          items-center
          justify-between
          "
        >

          {/* logo ke liye */}

          <a
            href="#hero"
            className="
            flex
            items-center
            gap-4
            shrink-0
            "
          >

            <div
              className="
              w-11
              h-11
              sm:w-12
              sm:h-12

              rounded-2xl

              bg-gradient-to-br
              from-cyan-400
              to-indigo-600

              flex
              items-center
              justify-center

              text-white
              font-bold
              text-lg

              shadow-lg
              shadow-cyan-500/20
              "
            >

              V

            </div>

            <div>

              <h2
                className="
                text-xl
                sm:text-2xl
                font-bold
                tracking-tight
                "
              >

                VisitFlow

              </h2>

              <p
                className="
                hidden
                sm:block

                text-xs
                text-slate-400
                -mt-1
                "
              >

                Visitor Management

              </p>

            </div>

          </a>

          {/* links ke liye */}

          <div
            className="
            hidden
            lg:flex
            items-center
            gap-10
            "
          >

            {
              links.map((link, index) => (

                <a
                  key={index}
                  href={link.href}
                  className="
                  relative

                  text-slate-300
                  hover:text-white

                  text-sm
                  font-medium
                  tracking-wide

                  transition-all
                  duration-300

                  after:absolute
                  after:left-0
                  after:-bottom-2
                  after:h-[2px]
                  after:w-0
                  after:bg-cyan-400
                  after:transition-all
                  after:duration-300

                  hover:after:w-full
                  "
                >

                  {link.name}

                </a>

              ))
            }

          </div>

          {/* right side */}

          <div className="flex items-center gap-3">

            {/* login ke lie */}

            <Link
              to="/login"
              className="
              hidden
              md:flex

              items-center
              justify-center

              px-5
              py-3

              rounded-xl

              border
              border-white/10

              bg-white/[0.03]

              text-slate-300
              hover:text-white
              hover:bg-white/[0.06]

              transition-all
              duration-300
              "
            >

              Login

            </Link>

            {/* signup ke liye */}

            <Link
              to="/signup"
              className="
              hidden
              sm:flex

              items-center
              gap-2

              px-5
              lg:px-6

              py-3

              rounded-xl

              bg-gradient-to-r
              from-cyan-500
              to-indigo-600

              text-white
              font-semibold

              shadow-lg
              shadow-cyan-500/20

              hover:scale-[1.03]

              transition-all
              duration-300
              "
            >

              Get Started

              <FiArrowRight />

            </Link>

            {/* mibile 3 line menu button */}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="
              lg:hidden

              w-11
              h-11

              rounded-xl

              border
              border-white/10

              bg-white/[0.03]

              flex
              items-center
              justify-center

              text-white
              text-xl

              transition-all
              duration-300
              "
            >

              {
                isOpen
                  ? <FiX />
                  : <FiMenu />
              }

            </button>

          </div>

        </nav>

        {/* mobile menu ke lie */}

        <div
          className={`
          lg:hidden

          overflow-hidden

          transition-all
          duration-300

          ${isOpen
            ? "max-h-[500px] opacity-100 mt-4"
            : "max-h-0 opacity-0"
          }
          `}
        >

          <div
            className="
            p-5

            rounded-3xl

            border
            border-white/10

            bg-black/30
            backdrop-blur-2xl

            shadow-[0_8px_40px_rgba(0,0,0,0.35)]

            flex
            flex-col
            "
          >

            {/* links ke liye */}

            <div className="flex flex-col gap-5">

              {
                links.map((link, index) => (

                  <a
                    key={index}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="
                    text-slate-300
                    hover:text-white

                    py-2

                    transition-all
                    duration-300
                    "
                  >

                    {link.name}

                  </a>

                ))
              }

            </div>

            {/* mobile button ke liye */}

            <div
              className="
              flex
              flex-col
              gap-4
              mt-6
              pt-6

              border-t
              border-white/10
              "
            >

              <Link
                to="/login"
                className="
                w-full

                py-3

                rounded-xl

                border
                border-white/10

                bg-white/[0.03]

                text-center
                text-slate-300

                hover:bg-white/[0.06]
                hover:text-white

                transition-all
                duration-300
                "
              >

                Login

              </Link>

              <Link
                to="/signup"
                className="
                w-full

                py-3

                rounded-xl

                bg-gradient-to-r
                from-cyan-500
                to-indigo-600

                text-center
                text-white
                font-semibold

                transition-all
                duration-300
                "
              >

                Get Started

              </Link>

            </div>

          </div>

        </div>

      </Container>

    </header>
  );
};

export default Navbar;