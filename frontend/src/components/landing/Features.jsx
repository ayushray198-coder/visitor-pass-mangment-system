import Container from "../common/Container.jsx";

import SectionTitle from "../common/SectionTitle.jsx";

import GlassCard from "../common/GlassCard.jsx";

import {
  FiShield,
  FiUsers,
  FiSmartphone,
  FiBarChart2
} from "react-icons/fi";

const features = [
  {
    icon: <FiShield />,
    title: "Secure Access",
    desc: "Enterprise-grade visitor verification and secure access workflows."
  },

  {
    icon: <FiUsers />,
    title: "Role Management",
    desc: "Separate dashboards for admin, employee and security teams."
  },

  {
    icon: <FiSmartphone />,
    title: "QR Passes",
    desc: "Generate secure QR-based digital visitor passes instantly."
  },

  {
    icon: <FiBarChart2 />,
    title: "Analytics",
    desc: "Advanced reports and visitor analytics dashboard."
  }
];

const Features = () => {
  return (

    <section
      id="features"
      className="section-space"
    >

      <Container>

        <SectionTitle
          title="Powerful Features"
          subtitle="Everything required for enterprise-gradevisitor management workflows.
          "
        />

        <div className="
        grid
         lg:grid-cols-4
          md:grid-cols-2
           gap-8
           items-stretch">

          {
            features.map((feature, index) => (
              <GlassCard
                key={index}
                className="
              p-8
              sm:p-10
              lg:p-12
              pt-14
              flex
              flex-col
              items-center
              text-center
              gap-4
              h-full
             "
              >

                <div
                  className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-cyan-500/10
                  flex
                  items-center
                  justify-center
                  text-3xl
                  text-cyan-400
                  mb-6
                  "
                >

                  {feature.icon}

                </div>

                <h3 className="text-2xl font-bold mb-5">

                  {feature.title}

                </h3>

                <p className="text-slate-400 leading-8">

                  {feature.desc}

                </p>

              </GlassCard>
            ))
          }

        </div>

      </Container>

    </section>
  );
};

export default Features;