import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="w-screen h-screen flex flex-col p-2 gap-10 px-8">
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
          placeholder="Email"
          className="w-full border-[1px] border-gray-300 outline-none py-4 pl-3"
        />
        <input
          type="text"
          placeholder="Password"
          className="w-full border-[1px] border-gray-300 outline-none py-4 pl-3"
        />
      </div>
      <div className="w-full flex flex-row justify-between">
        <div>
          <button className="bg-black p-4 px-[80px] text-white font-[600]">
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
