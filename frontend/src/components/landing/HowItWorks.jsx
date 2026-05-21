import Container from "../common/Container.jsx";

import SectionTitle from "../common/SectionTitle.jsx";

import GlassCard from "../common/GlassCard.jsx";

const steps = [
  {
    no: "01",
    title: "Visitor Registration",
    desc: "Visitor details are securely added into the system."
  },

  {
    no: "02",
    title: "Approval Process",
    desc: "Employee or admin approves visitor requests."
  },

  {
    no: "03",
    title: "Generate QR Pass",
    desc: "Secure digital visitor pass gets generated instantly."
  },

  {
    no: "04",
    title: "Security Check-In",
    desc: "Security team scans QR for secure entry management."
  }
];

const HowItWorks = () => {
  return (

    <section
      id="how"
      className="section-space"
    >

      <Container>

        <SectionTitle
          title="How It Works"
          subtitle="Simple and secure workflow for visitor management systems.
          "
        />

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">

          {
            steps.map((step, index) => (
              <GlassCard
                key={index}
                className="
                p-8
                text-center
                h-full
                "
              >

                <h2
                  className="
                  text-6xl
                  font-bold
                  text-indigo-500
                  mb-6
                  "
                >

                  {step.no}

                </h2>

                <h3 className="text-2xl font-bold mb-5">

                  {step.title}

                </h3>

                <p className="text-slate-400 leading-8">

                  {step.desc}

                </p>

              </GlassCard>
            ))
          }

        </div>

      </Container>

    </section>
  );
};

export default HowItWorks;