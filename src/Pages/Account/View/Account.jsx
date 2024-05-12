import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "../../CartCard/Style/style.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useMainContext } from "../../../contexts/MainContext";

const Account = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { setUsersData, setToken, usersData } = useMainContext();
  const handleLogout = async () => {
    try {
      const url = `/logout`;
      await axiosPrivate(url);
      setUsersData(null);
      setToken(null);
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="w-full h-full flex flex-col pt-2 md:pb-2 pb-[100px] gap-10 py-10 px-8 overflow-y-scroll hideScroll">
      <div className="flex flex-row gap-3 text-[14px]">
        <Link className="hover:text-red-600" to={`/`}>{`Home`}</Link>
        <p className="text-gray-500">{`/`}</p>
        <p className="text-gray-500">{`Account`}</p>
      </div>
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex flex-col gap-3">
          <div className="font-[500] text-[26px]">
            <p>My Account</p>
          </div>
          <div className=" text-[14px]">
            <p>Order History</p>
          </div>
        </div>
        <div>
          <button
            className="h-full p-4 px-[30px] border-[2px] border-black font-[600]"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </div>

      <div>
        <p>You haven't placed any orders yet.</p>
      </div>

      <div className="font-[500] text-[26px]">
        <p>Account Details</p>
      </div>

      <div className="font-[500]">
        <p>{usersData?.username}</p>
      </div>

      <div>
        <p>{usersData?.email}</p>
      </div>
    </div>
  );
};

export default Account;
