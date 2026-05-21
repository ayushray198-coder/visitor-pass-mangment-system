const PrimaryButton = ({children }) => {
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

      bg-gradient-to-r
      from-cyan-500
      to-indigo-600

      text-white
      font-semibold

      transition-all
      duration-300

      hover:scale-[1.02]

      shadow-lg
      shadow-cyan-500/20

      active:scale-[0.98]
      "
    >

      {children}

    </button>

  );
};

export default PrimaryButton;