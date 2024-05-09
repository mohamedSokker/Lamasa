import React from "react";
import { FiMenu } from "react-icons/fi";
import { RxLockClosed } from "react-icons/rx";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.jpg";
import { useMainContext } from "../../contexts/MainContext";

const Navbar = ({ handleOpenSidebarMobile, handleCloseSidebarMobile }) => {
  const { usersData, products } = useMainContext();
  return (
    <div className="w-full h-[50px] p-2 px-6 flex flex-row relative shadow-sm justify-between items-center overflow-hidden">
      <Link
        className="flex justify-center items-center"
        to={"/"}
        onClick={handleCloseSidebarMobile}
      >
        <img
          className="w-[30px] h-[30px] absolute left-8 "
          src={logo}
          style={{ objectFit: "cover", scale: "3.8" }}
        />
      </Link>
      <div className="flex flex-row justify-center items-center gap-4">
        <Link
          to={`/cart`}
          className="hover:text-red-700 hover:cursor-pointer w-[50px] h-[50px] relative flex justify-center items-center"
        >
          <RxLockClosed size={24} />
          <p className="w-[50px] h-[50px] absolute top-[4px] right-0 md:text-[12px] text-[8px] font-[600] flex justify-center items-center">
            {products?.length}
          </p>
        </Link>
        <div onClick={handleOpenSidebarMobile}>
          <FiMenu size={24} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
