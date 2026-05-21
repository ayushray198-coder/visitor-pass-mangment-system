const SectionTitle = ({ title, subtitle, }) => {
  return (

    <div
      className="
      w-full
      flex
      flex-col

      items-center
      justify-center
      text-center
      
      mb-16
      lg:mb-20
      "
    >

      <h2
        className="
        text-3xl
        sm:text-4xl
      
        lg:text-5xl
        font-bold
        leading-tight
      
        tracking-tight
        max-w-4xl
        "
      >

        {title}

      </h2>

      <p
        className="
        mt-5
        
        max-w-2xl
      
        text-base
        sm:text-lg
      
        leading-8
        text-slate-400
        "
      >

        {subtitle}

      </p>

    </div>

  );
};

export default SectionTitle;