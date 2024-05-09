import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import useRefreshToken from "../../hooks/useRefreshToken";
import { useMainContext } from "../../contexts/MainContext";
import MainLoading from "../MainLoading/MainLoading";
import logo from "../../assets/logo.jpg";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { token } = useMainContext();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : err?.message
        );
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    !token ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  // useEffect(() => {
  //   console.log(`isLoading: ${isLoading}`);
  //   console.log(`aT: ${JSON.stringify(token)}`);
  // }, [isLoading]);

  return isLoading ? (
    <div className="w-[100vw] h-[100vh] flex flex-col gap-2 justify-center items-center">
      <img src={logo} alt="logo" className="text-white w-20 h-20 rounded-sm" />
      <MainLoading />
    </div>
  ) : (
    <Outlet />
  );
};

export default PersistLogin;
