import Navbar from "../components/common/Navbar.jsx";

import Hero from "../components/landing/Hero.jsx";

import About from "../components/landing/About.jsx";

import Features from "../components/landing/Features.jsx";

import HowItWorks from "../components/landing/HowItWorks.jsx";

import Footer from "../components/common/Footer.jsx";

const Home = () => {
  return (

    <main className="overflow-hidden">

      <Navbar />

      <Hero />

      <About />

      <Features />

      <HowItWorks />

      <Footer />

    </main>

  );
};

export default Home;