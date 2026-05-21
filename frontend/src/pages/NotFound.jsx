import { Link } from "react-router-dom";

const NotFound = () => {
  return (

    <div className="min-h-screen flex items-center justify-center px-6">

      <div className="text-center">

        <h1
          className="
          text-8xl
          font-bold
          text-indigo-500
          "
        >

          404

        </h1>

        <p className="text-slate-400 text-xl mt-5">

          Page Not Found

        </p>

        <Link
          to="/"
          className="
          inline-block
          mt-8
          bg-indigo-600
          hover:bg-indigo-700
          transition
          px-8
          py-4
          rounded-2xl
          font-semibold
          "
        >

          Go Home

        </Link>

      </div>

    </div>
  );
};

export default NotFound;