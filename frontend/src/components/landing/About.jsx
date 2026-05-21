import Container from "../common/Container";

import SectionTitle from "../common/SectionTitle";

import GlassCard from "../common/GlassCard";

import {
  FiShield,
  FiActivity,
  FiBarChart2
} from "react-icons/fi";

const cards = [
  {
    icon: <FiShield />,
    title: "Security First",
    desc: "Enterprise-grade authentication and secure access workflows."
  },

  {
    icon: <FiActivity />,
    title: "Smart Workflow",
    desc: "Simplified approvals and visitor tracking system."
  },

  {
    icon: <FiBarChart2 />,
    title: "Analytics",
    desc: "Real-time visitor analytics and insights dashboard."
  }
];

const About = () => {
  return (

    <section
      id="about"
      className="
      py-24
      lg:py-32
      flex
      

      section-space
      "
    >

      <Container>

        {/* title ke liye*/}

        <SectionTitle
          title="About VisitFlow"
          subtitle=" Modern enterprise visitor management platform for organizations and security teams.
          "
        />

        {/* cards ke lie */}

        <div
          className="
          mt-16
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
          "
        >

          {
            cards.map((card, index) => (

              <GlassCard
                key={index}
                className="
                h-full
                p-10
                flex
               flex-col
               items-center
                text-center
                "
              >

                {/* icon ke liye */}

                <div
                  className="
                 w-16
                 h-16
                 rounded-2xl
                 bg-indigo-500/10
                 border
                 border-indigo-500/20
                 flex
                 items-center
                 justify-center
                 text-indigo-400
                 mb-8
                mx-auto
                "
                >

                  <div className="text-3xl mx-auto">

                    {card.icon}

                  </div>

                </div>

                {/* title ke lie */}

                <h3
                  className="
                  text-2xl
                  lg:text-3xl
                  font-bold
                  mb-5
                  "
                >

                  {card.title}

                </h3>

                {/* deiscrptiin ke liye*/}

                <p
                  className="
                  text-slate-400
                  leading-8
                  text-base
                  "
                >

                  {card.desc}

                </p>

              </GlassCard>

            ))
          }

        </div>

      </Container>

    </section>
  );
};

export default About;