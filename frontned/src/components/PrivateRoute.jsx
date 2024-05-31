import { Navigate, Outlet } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";

//loading spinner
import Spinner from "./Spinner";

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  //if checking status, show loading spinner
  if (checkingStatus) {
    return <Spinner />;
  }

  //if logged in, show outlet (page), else redirect to /homepage
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
