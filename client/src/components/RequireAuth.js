import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (!userData && location.pathname !== "/login") {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
export default RequireAuth;
