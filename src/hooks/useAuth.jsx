import { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

// import { Navbar, Sidebar } from "../components";
// import UnAuthorized from "../pages/UnAuthorized";
import { useMainContext } from "../contexts/MainContext";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

const RequiredAuth = ({ allowedRole }) => {
  const { usersData } = useMainContext();
  const location = useLocation();
  const { screenSize, setScreenSize } = useMainContext();

  const [isSidebarModbile, setIsSidebarMobile] = useState(false);

  const handleOpenSidebarMobile = () => {
    setIsSidebarMobile(true);
  };

  const handleCloseSidebarMobile = () => {
    setIsSidebarMobile(false);
  };

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);

  return true ? (
    <div
      className="flex flex-row justify-center items-center w-screen h-screen relative m-0 p-0"
      style={{ flexDirection: screenSize > 1200 ? "row" : "column" }}
    >
      {screenSize > 1200 ? (
        <Sidebar handleCloseSidebarMobile={handleCloseSidebarMobile} />
      ) : (
        <div className="w-full">
          <Navbar
            handleOpenSidebarMobile={handleOpenSidebarMobile}
            handleCloseSidebarMobile={handleCloseSidebarMobile}
          />
          <div
            className="absolute top-0 right-0 w-[250px] bg-white h-full z-[3]"
            style={
              isSidebarModbile
                ? {
                    transform: "translate(0)",
                    transition: "all 0.2s ease-in-out",
                  }
                : {
                    transform: "translate(100%)",
                    transition: "all 0.2s ease-in-out",
                  }
            }
          >
            <Sidebar handleCloseSidebarMobile={handleCloseSidebarMobile} />
          </div>
        </div>
      )}
      <div
        className="w-full h-[calc(100%-50px)]"
        onClick={handleCloseSidebarMobile}
      >
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/Login" state={{ from: location }} replace />
  );
};

export default RequiredAuth;
