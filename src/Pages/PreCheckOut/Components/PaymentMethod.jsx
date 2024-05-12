import React from "react";

import card from "../../../assets/card.svg";
import debit from "../../../assets/debit.svg";
import master from "../../../assets/master.svg";
import visa from "../../../assets/visa.svg";

const PaymentMethod = ({
  isCardChecked,
  setIsCardChecked,
  isCashChecked,
  setIsCashChecked,
}) => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full  flex flex-col items-start justify-center ">
        <div
          className="w-full flex flex-row justify-between items-center p-3 rounded-t-md  border-[1px] "
          style={{
            backgroundColor: isCardChecked ? "rgb(219,234,254)" : "white",
            borderColor: isCardChecked ? "rgb(59,130,246)" : "rgb(209,213,219)",
          }}
        >
          <div className="flex flex-row gap-4">
            <input
              type="radio"
              id="payment"
              name="payment"
              checked={isCardChecked}
              onChange={() => {
                setIsCardChecked(true);
                setIsCashChecked(false);
              }}
            />
            <p className="max-w-[200px]">{`Pay via (Debit/Credit cards/Wallets/Installments)`}</p>
          </div>
          <div className="flex md:flex-row flex-col flex-1 justify-end gap-1">
            <img src={debit} className="w-[38px] h-[24px]" />
            <img src={master} className="w-[38px] h-[24px]" />
            <img src={card} className="w-[38px] h-[24px]" />
            <img src={visa} className="w-[38px] h-[24px]" />
          </div>
        </div>
        <div
          className="bg-gray-50 border-r-[1px] border-l-[1px] border-gray-300 w-full flex flex-col justify-center items-center gap-4 overflow-hidden"
          style={{
            height: isCardChecked ? "200px" : "0",
            padding: isCardChecked ? "12px" : "0",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <div className="w-full flex flex-row justify-center items-center">
            <div
              className="w-[163px] relative border-gray-500 rounded-md flex flex-col overflow-hidden"
              style={{
                height: isCardChecked ? "81px" : "0",
                borderWidth: isCardChecked ? "2px" : "0",
                transition: "all 0.3s ease-in-out",
              }}
            >
              <div className="w-full h-[20%] border-b-[2px] border-gray-500 flex flex-row justify-start px-2 py-1 gap-2">
                <div className="w-1 h-1 rounded-full bg-gray-500"></div>
                <div className="w-1 h-1 rounded-full bg-gray-500"></div>
                <div className="w-1 h-1 rounded-full bg-gray-500"></div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <p className="text-[14px] w-full flex flex-row text-center justify-center">
              {`After clicking “Pay now”, you will be redirected to Pay via
              (Debit/Credit cards/Wallets/Installments) to complete your
              purchase securely.`}
            </p>
          </div>
        </div>
      </div>
      <div
        className="w-full  flex flex-col items-start justify-center p-3  rounded-b-md border-[1px] "
        style={{
          backgroundColor: isCashChecked ? "rgb(219,234,254)" : "white",
          borderColor: isCashChecked ? "rgb(59,130,246)" : "rgb(209,213,219)",
        }}
      >
        <div className="flex flex-row gap-4">
          <input
            type="radio"
            id="payment"
            name="payment"
            checked={isCashChecked}
            onChange={() => {
              setIsCardChecked(false);
              setIsCashChecked((prev) => !prev);
            }}
          />
          <p className="max-w-[200px]">{`Cash on Delivery (COD)`}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
