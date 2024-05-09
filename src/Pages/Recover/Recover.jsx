import React from "react";

const Recover = () => {
  return (
    <div className="w-screen h-screen flex flex-col p-2 gap-10 px-8">
      <div className="font-[500] text-[26px]">
        <p>Reset your password</p>
      </div>
      <div>
        <p>We will send you an email to reset your password.</p>
      </div>
      <div className="w-full flex flex-col gap-4">
        <input
          type="text"
          placeholder="Email"
          className="w-full border-[1px] border-gray-300 outline-none py-4 pl-3"
        />
      </div>
      <div className="w-full flex flex-row justify-between">
        <div>
          <button className="bg-black p-4 px-[80px] text-white font-[600]">
            Submit
          </button>
        </div>
        <div>
          <button className="hover:text-red-600">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Recover;
