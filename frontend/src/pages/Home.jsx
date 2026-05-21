import Navbar from "../components/common/Navbar";

import Hero from "../components/landing/Hero";

import About from "../components/landing/About";

import Features from "../components/landing/Features";

import HowItWorks from "../components/landing/HowItWorks";

import Footer from "../components/common/Footer";

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