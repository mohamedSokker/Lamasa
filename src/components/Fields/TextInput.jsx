import React, { useRef } from "react";

const TextInput = ({ value, setValue, placeHolder }) => {
  const input = useRef();
  return (
    <div
      className="border-[1px] text-[14px] flex flex-col items-end relative border-gray-300 flex-1 rounded-md outline-none hover:cursor-text"
      onClick={() => input.current.focus()}
    >
      <div
        className="flex flex-row justify-start items-center absolute left-3 top-1"
        style={{
          opacity: value === "" ? 0 : 0.9,
          transition: "all 0.2s ease-in-out",
        }}
      >
        <p className="w-full text-gray-400 text-[12px]">{placeHolder}</p>
      </div>
      <input
        ref={input}
        type="text"
        placeholder={placeHolder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="p-3 flex w-full  outline-none rounded-md focus:border-transparent focus:shadow-[0px_0px_0px_2px_rgba(29,78,216,0.6)]"
        style={{
          paddingBottom: value === "" ? "12px" : "4px",
          paddingTop: value === "" ? "12px" : "20px",
          transition: "all 0.2s ease-in-out",
        }}
      />
    </div>
  );
};

export default TextInput;
