

const Container = ({ children, className = "", }) => {
  return (

    <div
      className={`
      w-full
      max-w-[1400px]
      mx-auto
      px-5
      sm:px-6
      lg:px-10
      xl:px-12
      ${className}
      `}
    >

      {children}

    </div>

  );
};

export default Container;
