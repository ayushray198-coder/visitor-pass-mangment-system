import { Navigate } from "react-router-dom";

const RoleRoute = ({ children, allowedRoles }) => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  /* NO USER */

  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }

  /* not allowed role ke liye  */

  if (

    !allowedRoles.includes(
      user.role
    )

  ) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }

  return children;

};

export default RoleRoute;