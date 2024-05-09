import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="w-screen h-screen flex flex-col p-2 gap-10 px-8">
      <div className="flex flex-row gap-3 text-[14px]">
        <Link className="hover:text-red-600" to={`/`}>{`Home`}</Link>
        <p className="text-gray-500">{`/`}</p>
        <p className="text-gray-500">{`Account`}</p>
      </div>
      <div className="font-[500] text-[26px]">
        <p>Create an account</p>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-row w-full gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="flex-1 border-[1px] border-gray-300 outline-none py-4 pl-3"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="flex-1 border-[1px] border-gray-300 outline-none py-4 pl-3"
          />
        </div>
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
          <button
            className="bg-black p-4 px-[80px] text-white font-[600] hover:bg-red-600"
            style={{ transition: "all 0.2s ease-in-out" }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
