import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

// import { Navbar, Sidebar } from "../components";
// import UnAuthorized from "../pages/UnAuthorized";
import { useMainContext } from "../contexts/MainContext";
import Sidebar from "../components/sidebar/Sidebar";

const RequiredAuth = ({ allowedRole }) => {
  const { usersData } = useMainContext();
  const location = useLocation();

  return true ? (
    <div className="flex flex-row justify-center items-center w-screen h-screen relative m-0 p-0">
      <Sidebar />

      <Outlet />
    </div>
  ) : (
    <Navigate to="/Login" state={{ from: location }} replace />
  );
};

export default RequiredAuth;
