

const SecondaryButton = ({ children }) => {
  return (

    <button
      className="
      inline-flex
      items-center
      justify-center

      whitespace-nowrap

      px-7
      py-4

      rounded-2xl

      border
      border-white/10

      bg-white/[0.04]
      backdrop-blur-xl

      text-white
      font-semibold

      transition-all
      duration-300

      hover:bg-white/[0.08]
      hover:border-cyan-400/20

      active:scale-[0.98]
      "
    >

      {children}

    </button>

  );
};

export default SecondaryButton;