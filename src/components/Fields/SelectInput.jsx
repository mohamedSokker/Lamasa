import React, { useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";

const SelectInput = ({ value, setValue, options, placeHolder }) => {
  const input = useRef();
  return (
    <div
      className="border-[1px] text-[14px] flex flex-col items-end relative border-gray-300 flex-1 rounded-md outline-none"
      onClick={() => input.current.click()}
    >
      <div
        className="flex flex-row justify-start items-center absolute left-3 top-1 hover:cursor-default"
        onClick={() => input.current.click()}
      >
        <p className="w-full text-gray-400 text-[12px]">{placeHolder}</p>
      </div>
      <select
        ref={input}
        className="w-full p-3 pb-1 pt-5 outline-none appearance-none bg-white rounded-md focus:border-transparent focus:shadow-[0px_0px_0px_2px_rgba(29,78,216,0.6)]"
        style={{ transition: "all 0.2s ease-in-out" }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {options?.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </select>
      <div className="h-full flex justify-center items-center absolute top-0 right-[10px]">
        <IoIosArrowDown />
      </div>
    </div>
  );
};

export default SelectInput;
