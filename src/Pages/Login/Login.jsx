import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import "../CartCard/Style/style.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useMainContext } from "../../contexts/MainContext";

const Login = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const prevData = location.state?.from?.state?.data;
  const from = location.state?.from?.pathname || "/account";
  const { setToken, setUsersData } = useMainContext();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    if (userName === "" || password === "") return false;
    return true;
  };

  const handleLogin = async () => {
    try {
      if (!validate()) throw new Error("Validation Error");

      setIsLoading(true);
      const url = `/handleLoginApp`;
      const data = await axiosPrivate(url, {
        method: "POST",
        data: JSON.stringify({ username: userName, password: password }),
      });
      console.log(data?.data);
      setToken(data?.data?.token);
      setUsersData(data?.data?.user);
      setIsLoading(false);
      navigate(from, {
        replace: true,
        state: { data: prevData },
      });
    } catch (err) {
      console.log(err.message);
      setIsLoading(false);
    }
  };
  return (
    <div className="w-screen h-screen flex flex-col  pt-2 md:pb-2 pb-[100px] gap-10 px-8 overflow-y-scroll hideScroll">
      {isLoading && (
        <div
          className="absolute  w-full h-full flex flex-col items-center justify-center left-0 top-0 z-[1000]"
          style={{ backdropFilter: "blur(2px)", opacity: 0.8 }}
        ></div>
      )}
      <div className="flex flex-row gap-3 text-[14px]">
        <Link to={`/`}>{`Home`}</Link>
        <p className="text-gray-500">{`/`}</p>
        <p className="text-gray-500">{`Account`}</p>
      </div>
      <div className="font-[500] text-[26px]">
        <p>Customer Login</p>
      </div>
      <div className="w-full flex flex-col gap-4">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="UserName"
          className="w-full border-[1px] border-gray-300 outline-none py-4 pl-3"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border-[1px] border-gray-300 outline-none py-4 pl-3"
        />
      </div>
      <div className="w-full flex flex-row justify-between">
        <div>
          <button
            className="bg-black p-4 md:px-[80px] px-[30px] text-white font-[600]"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row justify-end">
            <Link
              className="hover:text-red-600 italic"
              to={`/recover`}
            >{`Forgot your password?`}</Link>
          </div>

          <div>
            <Link
              className="hover:text-red-600 font-[700]"
              to={`/register`}
            >{`New Customer? Sign Up!`}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
