import React, { useState } from "react";
import { RxLockClosed } from "react-icons/rx";
import { Link } from "react-router-dom";

import "../../Pages/CartCard/Style/style.css";

import LP from "../../assets/logo.jpg";
import { useMainContext } from "../../contexts/MainContext";
import CartCard from "../../Pages/CartCard/View/CartCard";

const Sidebar = () => {
  const { usersData, products } = useMainContext();

  const [isCart, setIsCart] = useState(false);
  return (
    <>
      <div className="w-[300px] bg-white h-full relative flex flex-col items-center justify-start overflow-y-scroll hideScroll pr-8 border-r-[1px] border-gray-200 z-[4]">
        <div className="flex flex-row w-full justify-end p-2 py-6">
          <div
            className="hover:text-red-700 hover:cursor-pointer w-[50px] h-[50px] relative flex justify-center items-center"
            onClick={() => setIsCart((prev) => !prev)}
          >
            <RxLockClosed size={40} />
            <p className="w-[50px] h-[50px] absolute top-[7px] right-0 text-[12px] font-[600] flex justify-center items-center">
              {products?.length}
            </p>
          </div>
        </div>
        <div
          className="flex flex-row w-full justify-center items-center"
          onClick={() => setIsCart(false)}
        >
          <Link to={`/`}>
            <img src={LP} />
          </Link>
        </div>
        <div
          className="flex flex-1 flex-col items-start justify-center"
          onClick={() => setIsCart(false)}
        >
          <Link
            className="text-[18px] font-[900] hover:text-red-700 hover:underline"
            to={`/contactus`}
          >
            Contact Us
          </Link>
          {usersData ? (
            <Link
              className="hover:text-red-700 hover:underline"
              to={`/account`}
            >
              Account
            </Link>
          ) : (
            <Link className="hover:text-red-700 hover:underline" to={`/Login`}>
              Login
            </Link>
          )}
          {usersData?.Role === "Admin" && (
            <Link
              className="hover:text-red-700 hover:underline"
              to={`/addProduct`}
            >
              Add Product
            </Link>
          )}
        </div>
      </div>

      {isCart && (
        <div
          className="flex flex-row flex-1 absolute top-0 left-0 w-full h-full bg-[rgb(0,0,0,0.3)] z-[2]"
          onClick={() => setIsCart(false)}
        ></div>
      )}

      <CartCard setIsCart={setIsCart} isCart={isCart} />
    </>
  );
};

export default Sidebar;
