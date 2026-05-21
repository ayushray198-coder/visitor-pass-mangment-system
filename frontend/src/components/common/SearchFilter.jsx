const SearchFilter = ({
    search,
    setSearch,

    filter,
    setFilter,

    options = [],
    placeholder = "Search..."

}) => {

    return (

        <div className="
      flex 
      flex-col
      lg:flex-row

      gap-5
    ">

            {/* search  */}

            <input
                type="text"
                placeholder={placeholder}
                value={search}

                onChange={(e) => setSearch( e.target.value )}

                className="
          flex-1

          min-h-[58px]
          w-full
          lg:w-[220px]
          flex-shrink-0
          px-5

          rounded-2xl

          bg-slate-900

          border
          border-white/10

          outline-none
        "
            />

            {/* filter*/}

            <select
                value={filter}

                onChange={(e) =>
                    setFilter(
                        e.target.value
                    )
                }

                className="
          h-[58px]
          min-h-[58px]
          
          w-full
          lg:w-[220px]
          flex-shrink-0
          px-5

          rounded-2xl

          bg-slate-900

          border
          border-white/10

          outline-none
        "
            >

                {
                    options.map(
                        (option) => (

                            <option
                                key={option.value}

                                value={option.value}
                            >

                                {option.label}

                            </option>

                        )
                    )
                }

            </select>

        </div>

    );

};

export default SearchFilter;