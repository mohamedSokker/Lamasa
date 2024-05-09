import React from "react";
import { Link } from "react-router-dom";

import "../CartCard/Style/style.css";

const ContactUs = () => {
  return (
    <div className="w-full h-full flex flex-col pt-2 md:pb-2 pb-[100px] gap-10 py-10 px-8 overflow-y-scroll hideScroll">
      <div className="flex flex-row gap-3 text-[14px]">
        <Link className="hover:text-red-600" to={`/`}>{`Home`}</Link>
        <p className="text-gray-500">{`/`}</p>
        <p className="text-gray-500">{`Contact Us`}</p>
      </div>
      <div className="font-[500] text-[26px]">
        <p>Contact Us</p>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-row justify-start w-full">
          <p className="font-[500] text-[26px]">Drop us a line</p>
        </div>
        <div className="flex md:flex-row flex-col w-full gap-4">
          <input
            type="text"
            placeholder="Name"
            className="flex-1 border-[1px] border-gray-300 outline-none py-4 pl-3"
          />
          <input
            type="text"
            placeholder="Email"
            className="flex-1 border-[1px] border-gray-300 outline-none py-4 pl-3"
          />
        </div>
        <textarea
          type="text"
          placeholder="Message"
          className="w-full h-[100px] border-[1px] border-gray-300 outline-none py-4 pl-3"
        />
      </div>
      <div className="w-full flex flex-row justify-between">
        <div>
          <button
            className="bg-black p-4 px-[40px] text-white font-[600] hover:bg-red-600"
            style={{ transition: "all 0.2s ease-in-out" }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
