import React, { useState } from "react";

import "../Style/Style.css";
import "../../CartCard/Style/style.css";

import CheckOutForm from "../../Checkout/Components/CheckOutForm";

const PayNow = ({ setIsPayNow, isCardChecked }) => {
  const [isCanceled, setIsCanceled] = useState(false);

  console.log(window.location.origin);
  return (
    <div
      className="fixed opacity-100 w-screen h-screen flex flex-col items-center justify-center left-0 top-0 "
      style={{ zIndex: "1000" }}
    >
      <div
        className="absolute  w-screen h-screen flex flex-col items-center justify-center left-0 top-0 z-[1000]"
        style={{ backdropFilter: "blur(10px)", opacity: 0.9 }}
      ></div>
      <div className="absolute  w-screen h-screen flex flex-col items-center justify-center left-0 top-0 z-[1001] bg-[rgb(0,0,0,0.6)]"></div>
      <div
        className={`md:w-[40%] w-[90%] md:h-[75%] bg-white h-[80%] rounded-lg p-3 flex flex-col justify-start items-center  relative z-[1001] mainContent overflow-y-scroll hideScroll`}
        style={{
          animation: !isCanceled
            ? "animate-in 0.5s ease-in-out"
            : "animate-out 0.5s ease-in-out",
        }}
      >
        <div className="flex flex-row w-full p-2 justify-between items-center">
          <div>
            <p className="text-[20px] font-[600]">Card details</p>
          </div>
          <div>
            <div>
              <button
                className="hover:cursor-pointer px-2 rounded-full text-[16px] aspect-square flex justify-center items-center"
                onClick={() => {
                  setIsCanceled(true);
                  setTimeout(() => {
                    isCardChecked && setIsPayNow(false);
                  }, 500);
                }}
              >
                X
              </button>
            </div>
          </div>
        </div>

        <CheckOutForm />
      </div>
    </div>
  );
};

export default PayNow;
